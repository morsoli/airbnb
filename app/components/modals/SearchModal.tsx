'use client';

import { Range } from "react-date-range";
import qs from "query-string";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useSearchParams,useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import DatePicker from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () =>{
    const searchModal = useSearchModal();

    const params = useSearchParams();
    const router = useRouter()

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const onBack = useCallback(()=>{
        setStep((value)=> value-1);
    },[]);

    const onNext = useCallback(()=>{
        setStep((value)=> value+1)
    },[]);

    const onSubmit = useCallback(async ()=>{
        if (step !== STEPS.INFO){
            return onNext();
        }
        let currentQuery = {};
        if (params){
            currentQuery=qs.parse(params.toString()); 
        }
        // 实际开发中，由于查询条件的属性和值是动态的，很难确定它们的具体类型。
        // 因此，将 updateQuery 的类型定义为 any，可以让我们在代码中更加灵活地处理对象属性的动态更新，避免了类型检查带来的不必要的麻烦。
        const updateQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount
        };
        if (dateRange.startDate){
            updateQuery.startDate = formatISO(dateRange.startDate);
        }
        if (dateRange.endDate){
            updateQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url:'/',
            query: updateQuery
        }, {skipNull: true});
        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
    },[step,location, guestCount, roomCount, searchModal, router, onNext, params]);

    const actionLabel = useMemo(()=>{
        if (step === STEPS.INFO){
            return "搜索";
        }
        return "下一步";
    },[step]);

    const secondaryActionLabel = useMemo(()=>{
        if(step===STEPS.LOCATION){
            return undefined;
        }
        return "回退";
    },[step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="你想前往哪里？" subtitle="选择一处完美的地点！"/>
            <CountrySelect 
            value={location}
            onChange={(value)=>setLocation(value as CountrySelectValue)}
        />
        </div>
    );

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="你计划什么时候去？" subtitle="确保每个人都有时间！"/>
                <DatePicker 
                value={dateRange}
                onChange={(value)=>setDateRange(value.selection)}
                />
            </div>
        );
    };

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="更多信息" subtitle="帮你更好的匹配！"/>
                <Counter title="人数" subtitle="几个人去玩？" value={guestCount} onChange={(value)=>setGuestCount(value)}/>
                <Counter title="房间数" subtitle="需要几间房？" value={roomCount} onChange={(value)=>setRoomCount(value)}/>
            </div>
        );
    }

    return (
        <Modal 
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title="筛选"
        actionLabel={actionLabel}
        secondaryLable={secondaryActionLabel}
        secondaryAction={step===STEPS.LOCATION? undefined: onBack}
        body={bodyContent}
        />
    )
}

export default SearchModal;