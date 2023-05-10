这是一个基于[Next.js](https://nextjs.org/) 框架模仿Aribnb网页版的练习项目，使用脚手架工具 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)创建

## 本地启动

下载依赖包
```bash
npm install -D
```
启动开发环境
```bash
npm run dev
```
打开[http://localhost:3000](http://localhost:3000) 即可看到效果

## 笔记部分

### React Hooks
useState, useEffect, 和 useCallback 都是 React Hooks，用于在函数组件中管理状态、副作用和性能优化等方面。它们的作用不同，但有一些联系和相互影响。

    1. useState：用于在函数组件中声明和更新状态。它接收一个初始状态值，并返回一个数组，该数组包含当前状态和一个更新状态的函数。当更新状态函数被调用时，React 会重新渲染组件并使用新状态值更新组件。

    2. useEffect：用于在组件渲染后执行副作用操作，例如订阅事件、发送网络请求等。它接收一个函数和一个依赖数组作为参数。当依赖数组中的任何一个值发生变化时，React 会重新执行该函数。如果没有依赖数组，则每次组件更新时都会执行该函数。

    3. useCallback：用于缓存一个回调函数，以便在依赖项未更改时避免重新创建回调函数。它接收一个回调函数和一个依赖数组作为参数，并返回一个新的回调函数。当依赖数组中的任何一个值发生变化时，React 会重新创建一个新的回调函数。通常在将回调函数传递给子组件时使用。

### React Props
在 React 中，Props 是指在组件之间传递数据的一种机制。组件可以接收 Props（属性）作为输入，使用这些 Props 来渲染 UI 或执行其他逻辑。

使用 Props，可以将数据从一个组件传递到另一个组件，从而实现组件之间的通信和数据共享。Props 可以是任何 JavaScript 数据类型，包括数字、字符串、对象、数组等等。

在 React 中，Props 是只读的，也就是说，父组件传递给子组件的 Props 不能在子组件中直接修改。如果需要修改 Props 中的数据，需要在父组件中修改数据并重新传递给子组件。

    React Props：MenuItem 组件接收两个 Props，onClick 和 label，它们定义在 MenuItemProps 接口中。
    React onClick 事件处理：onClick Props 是一个函数，当组件被点击时会被调用。
    TypeScript 接口：MenuItemProps 是一个 TypeScript 接口，它定义了组件 Props 的类型和结构。
    TypeScript 类型注解：MenuItem 组件使用了 TypeScript 的类型注解，它指定了 MenuItemProps 作为组件 Props 的类型。
    TypeScript 泛型：React.FC 是一个泛型类型，它接收一个 Props 类型作为参数，并返回一个 React 函数组件类型
```tsx
'use client';

interface MenuItemProps {
    onClick: ()=>void;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({onClick, label}) =>{
    return (
    <div 
    onClick={onClick} 
    className="px-4 py-3 hover:bg-neutral-100 translation font-semibold"> 
    {label}
    </div> 
    ); 
}
export default MenuItem;
```
