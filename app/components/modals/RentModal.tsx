'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";

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

    const [step, setStep] = useState(STEPS.CATEGORY);
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

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="以下哪一个最能描述您的房屋？" subtitle="选择类别"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {
                    categories.map((item)=>(
                        <div key={item.label} className="col-span-1">
                            {item.label}
                        </div>
                    ))
                }
            </div>
        </div>
    )

    return (
        <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={rentModal.onClose}
        actionLabel={actionLabel}
        secondaryLable={secondaryLabel}
        secondaryAction={step===STEPS.CATEGORY?undefined:onBack}
        title="在爱彼迎上出租您的家"
        body = {bodyContent}
        />
    )
}

export default RentModal;