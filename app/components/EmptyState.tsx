'use client';

import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
    title: string;
    subtitle: string;
    showReset?: boolean;
}


const EmptyState: React.FC<EmptyStateProps> = ({
    title="没有匹配到",
    subtitle="尝试重置或移除所有筛选条件",
    showReset
}) =>{
    const router = useRouter();
    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Heading center title={title} subtitle={subtitle}/>
            <div className="w-48 mt-4">
                {showReset && (
                    <Button outline label="移除所有筛选条件" onClick={()=>router.push("/")}/>
                )}
            </div>
        </div>
    )
}

export default EmptyState;