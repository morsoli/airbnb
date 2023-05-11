'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {toast} from "react-hot-toast"
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    /*
    调用了 `useForm` Hook，并传入了一个泛型类型参数 `FieldValue`，用于指定表单数据的类型。
    同时，我们还传入了一个 `defaultValues` 属性，用于设置表单字段的初始值。
    在获取到 `register`、`handleSubmit` 和 `formState.errors` 属性后，
    我们就可以使用它们来注册表单字段、处理表单提交事件和显示表单验证错误信息。
    */
    const { 
        register, 
        handleSubmit,
        formState: {
          errors,
        },
      } = useForm<FieldValues>({
        defaultValues: {
          name: '',
          email: '',
          password: ''
        },
      });
    /* 
    定义了一个名为 `onSubmit` 的回调函数，并将其指定为 `SubmitHandler<FieldValue>` 类型。
    在该回调函数中，我们首先将 `isLoading` 状态设置为 `true`，表示表单正在提交。
    然后，使用 Axios 库向服务器发送一个 HTTP POST 请求，将表单数据传递给服务器。
    如果请求成功，则调用 `registerModal.onClose()` 方法，关闭模态框。
    如果请求失败，则将错误信息输出到控制台。无论请求成功还是失败，最后都将 `isLoading` 状态设置为 `false`，表示表单提交已经完成
    */
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
    
        axios.post('/api/register', data)
        .then(() => {
          toast.success('注册成功!');
          registerModal.onClose();
        })
        .catch(() => {
          toast.error("出错了!");
        })
        .finally(() => {
          setIsLoading(false);
        })
      }
      const bodyContent = (
        <div className="flex flex-col gap-4">
          <Heading
            title="欢迎使用爱彼迎"
            subtitle="创建账号"
          />
          <Input
            id="email"
            label="邮件"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="name"
            label="名字"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="password"
            label="密码"
            type="password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      )
    
      const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <Button 
            outline 
            label="使用 Google 注册"
            icon={FcGoogle}
            onClick={() => {}} 
          />
          <Button 
            outline 
            label="使用 Github 注册"
            icon={AiFillGithub}
            onClick={()=>{}}
          />
          <div 
            className="
              text-neutral-500 
              text-center 
              mt-4 
              font-light
            "
          >
            <p>已注册账号？
              <span 
                onClick={()=>{}} 
                className="
                  text-neutral-800
                  cursor-pointer 
                  hover:underline
                "
                > 直接登录</span>
            </p>
          </div>
        </div>
      )
    
      return (
        <Modal
          disabled={isLoading}
          isOpen={registerModal.isOpen}
          title="注册"
          actionLabel="继续"
          onClose={registerModal.onClose}
          onSubmit={handleSubmit(onSubmit)}
          body={bodyContent}
          footer={footerContent}
        />
      );
}

export default RegisterModal;