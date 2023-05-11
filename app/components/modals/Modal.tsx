/* 
Modal 组件是一个通用的模态框组件，可以通过传递不同的属性来定制它的外观和行为，在实际的项目中可以用于实现各种类型的弹出窗口 
这个通用的模态框组件具有以下属性：
isOpen：一个可选的布尔值，表示模态框是否打开。默认值为 false。
onClose：必需的函数，表示模态框关闭时要执行的回调函数。
onSubmit：必需的函数，表示模态框提交时要执行的回调函数。
title：一个可选的字符串，表示模态框的标题。
body：一个可选的 React 元素，表示模态框的主体内容。
footer：一个可选的 React 元素，表示模态框的页脚内容。
actionLabel：必需的字符串，表示模态框提交按钮的标签文本。
disabled：一个可选的布尔值，表示模态框中的提交按钮和次要操作按钮是否应该被禁用。默认为 false。
secondaryAction：一个可选的函数，表示模态框中的次要操作（secondary action）。如果没有传递该属性，则不会显示次要操作按钮。
secondaryLable：一个可选的字符串，表示模态框中的次要操作按钮的标签文本。如果没有传递 secondaryAction 属性，则该属性无效。
*/

'use client';

import { useCallback, useEffect, useState } from "react";
import {IoMdClose} from "react-icons/io";
import Button from "../Button";

interface ModalProps {
    isOpen?: boolean;
    onClose: () =>void;
    onSubmit: ()=>void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: ()=>void;
    secondaryLable?: string;

}

const Modal: React.FC<ModalProps> = ({
    isOpen, onClose, onSubmit, title, body,
    footer, actionLabel, disabled, secondaryAction, secondaryLable
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(()=>{
        setShowModal(isOpen);
    },[isOpen]);

    const handleClose = useCallback(()=>{
        if (disabled){
            return
        }
        setShowModal(false);
        setTimeout(()=>{onClose()}, 300)
    }, [disabled, onClose]);

    const handleSubmit = useCallback(()=>{
        if(disabled){
            return;
        }
        onSubmit();
    },[disabled, onSubmit]);

    const HandleSecondaryAction = useCallback(()=>{
        if (disabled || !secondaryAction) {
            return
        }
        secondaryAction();
    },[disabled, secondaryAction]);

    if (!isOpen){
        return null;
    }

    return (
        <>
        <div className="justify-center items-center flex overflow-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
            <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
                {/* CONTENT */}
                <div className={`translate duration-300 h-full ${showModal? 'translate-y-0':'translate-y-full'} ${showModal? 'opacity-100': 'opacity-0'}`}>
                    <div className="translate  h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/* HEADER */}
                        <div className="flex items-center p-6 rounded-t justify-center real
                         border-b-[1px]">
                            <button
                            onClick={handleClose}
                            className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                                <IoMdClose size={18}/>
                            </button>
                            <div className="text-lg font-semibold">
                                {title}
                            </div>
                        </div>
                        {/* BODY */}
                        <div className="relative p-6 flex-auto">
                            {body}
                        </div>
                        {/* FOOTER */}
                        <div className="flex flex-col gap-2 p-6">
                            <div className="flex flex-row items-center gap-4 w-full">
                                {secondaryAction && secondaryLable && (<Button disabled={disabled} label={secondaryLable} onClick={HandleSecondaryAction} outline/>)}
                                <Button disabled={disabled} label={actionLabel} onClick={handleSubmit}/>
                            </div>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Modal;