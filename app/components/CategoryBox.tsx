'use client';

import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType,
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  /*
    定义一个名为 currentQuery 的变量，初始化为空对象 {}。
    如果传入了 params 参数，则将其转换成一个对象并赋值给 currentQuery，这里使用了第三方库 qs 的 parse 函数来解析查询参数。
    定义一个名为 updatedQuery 的变量，使用对象展开运算符 ... 将 currentQuery 对象的所有属性复制到 updatedQuery 中，然后再添加一个 category 属性，值为 label 变量的值。
    如果当前的查询参数中已经包含了 category 属性，并且其值等于 label 变量的值，则将 updatedQuery 对象中的 category 属性删除(类别标签双击取消)。
    使用 qs 库的 stringifyUrl 函数将当前的 URL 和查询参数对象合并成一个字符串 URL，这里使用了 {skipNull: true} 选项来跳过值为 null 或 undefined 的查询参数。
    最后，使用 router 对象的 push 方法将 URL 传递给 Next.js 路由系统，以便进行路由导航。
   */
  const handleClick = useCallback(() => {
    let currentQuery = {};
    
    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
  }, [label, router, params]);

  return ( 
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
   );
}
 
export default CategoryBox;