 'use client';

import {AiOutlineMenu} from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeUser } from '@/app/types';
import { signOut } from 'next-auth/react';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

 const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    /*
    定义了一个名为 isOpen 的状态变量和一个名为 toggleOpen 的回调函数，用于切换 isOpen 的值(下拉框点击展开，再点击收回)。
    由于使用了 useCallback 钩子函数对 toggleOpen 进行了性能优化，所以可以提高组件的渲染性能。
    (由于 toggleOpen 函数没有任何依赖项，所以只会在组件挂载时缓存一次，并在整个组件生命周期内共享该缓存的函数实例。)
    */
    const toggleOpen = useCallback(
        ()=>{setIsOpen((value)=>!value);}, []
    );

    const onRent = useCallback(()=>{
        if (!currentUser){
            return loginModal.onOpen();
        }
        rentModal.onOpen();
    },[currentUser, loginModal, rentModal]);
 
    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent} className="
                hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    来爱彼迎发布房源
                </div>
                <div onClick={toggleOpen} className="
                p-4 md:py-1 md:px-1 border-[1px] border-neutral-200 flex flex-row items-center
                gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                <AiOutlineMenu />
                <div className='hidden md:block'>
                    <Avatar src={currentUser?.image} />
                </div>
                </div>
            </div>
            {
                isOpen && (
                    <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                        <div className="flex flex-col cursor-pointer">
                            {
                                currentUser? (
                                <>
                                <MenuItem onClick={()=>router.push('/trips')} label='我的旅行计划'/>
                                <MenuItem onClick={()=>{}} label='我喜欢的房间'/>
                                <MenuItem onClick={()=>router.push('/reservations')} label='我的房源预订'/>
                                <MenuItem onClick={()=>{}} label='我发布的房源'/>
                                <MenuItem onClick={onRent} label='来爱彼迎发布房源'/>
                                <hr />
                                <MenuItem onClick={signOut} label='退出'/>
                                </>
                                ):(
                                    <>
                                    <MenuItem onClick={loginModal.onOpen} label='登录'/>
                                    <MenuItem onClick={registerModal.onOpen} label='注册'/>
                                    </>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
 }

 export default UserMenu;