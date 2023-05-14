'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
    CATEGORY = 0,
    LOACATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal=()=>{
    const rentModal = useRentModal();
    const router = useRouter()
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, setValue, watch, formState: {errors,}, reset} = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });
    /*
    定义了一个 category 变量，使用 watch 方法监视了表单中名为 category 的控件的值。在这个示例中，category 变量将会随着表单控件的值的变化而更新。
    还定义了一个 setCustomValue 函数，用于设置表单控件的值。该函数接受两个参数，第一个参数是表单控件的 id，第二个参数是要设置的值。在设置表单控件的值时，setCustomValue 函数还传入了一个选项对象，用于指定设置值的行为，包括是否进行验证、是否标记为已修改、是否标记为已触摸等选项。
    */
    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount')

    const Map = useMemo(()=>dynamic(()=>import('../Map'),{ssr:false}),[location])

    const setCustomValue = (id: string, value: any) =>{
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = ()=>{
        setStep((value)=>value-1);
    }
    const onNext = ()=>{
        setStep((value)=>value+1);
    }

    const actionLabel = useMemo(()=>{
        if (step === STEPS.PRICE){
            return '创建';
        }
        return '下一步';
    }, [step]);

    const secondaryLabel = useMemo(()=>{
        if(step === STEPS.CATEGORY){
            return undefined;
        }
        return '回退';
    }, [step]);

    const onSubmit: SubmitHandler<FieldValues> =(data) => {
        if (step!==STEPS.PRICE){
            return onNext();
        }
        setIsLoading(true);
        axios.post('api/listings', data)
        .then(()=>{
            toast.success('房源发布成功！');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(()=>{
            toast.error('出错了！');
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="以下哪一个最能描述您的房屋？" subtitle="选择类别"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {
                    categories.map((item)=>(
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                            onclick = {(category)=>setCustomValue('category', category)}
                            key = {item.label}
                            selected = {category === item.label}
                            label = {item.label}
                            icon = {item.icon}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
    
    if (step === STEPS.LOACATION){
        bodyContent = (
            <>
            <div className="flex flex-col gap-8">
                <Heading title="您的住所位于哪里？" subtitle="帮客人找到你"/>
                <div className="z-10 top-0">
                <CountrySelect value={location} onChange={(value)=>setCustomValue('location', value)}/>
                </div>
                <div className="z-0">
                <Map center={location?.latlng} />
                </div>
            </div>
            </>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="分享一些关于您的住所的基本信息"
              subtitle="您住所有哪些设施？"
            />
          <Counter title="房客数" subtitle="可以接待多少位租客？" value={guestCount} onChange={(value)=>setCustomValue('guestCount', value)}/>
          <hr />
          <Counter title="房间数" subtitle="有多少个房间？" value={roomCount} onChange={(value)=>setCustomValue('roomCount', value)}/>
          <hr />
          <Counter title="浴室数" subtitle="有多少间浴室？" value={bathroomCount} onChange={(value)=>setCustomValue('bathroomCount', value)}/>
          </div>
        )
    }
    
    if (step === STEPS.IMAGES) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="添加您的住所照片"
              subtitle="向客人展示您的住所是什么样子的！"
            />
          </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="你会如何描述你的住所？"
              subtitle="简单而精炼的描述最佳！"
            />
            <Input id="title" label="标题" disabled={isLoading} register={register} errors={errors} required/>
            <hr />
            <Input id="description" label="描述" disabled={isLoading} register={register} errors={errors} required/>
          </div>
        )
      }

      if (step === STEPS.PRICE) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="设置您的房价"
              subtitle="您每晚收取多少费用？"
            />
            <Input id="price" label="价格" formatPrice type="number" disabled={isLoading} register={register} errors={errors} required/>
          </div>
        )
      }

    return (
        <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryLable={secondaryLabel}
        secondaryAction={step===STEPS.CATEGORY?undefined:onBack}
        title="来爱彼迎发布房源"
        body = {bodyContent}
        />
    )
}

export default RentModal;