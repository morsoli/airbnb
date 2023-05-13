这是一个基于[Next.js](https://nextjs.org/) 框架模仿Aribnb网页版的练习项目，使用脚手架工具 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)创建

## 本地启动

下载依赖包
```bash
npm install
```
启动开发环境
```bash
npm run dev
```
打开[http://localhost:3000](http://localhost:3000) 即可看到效果

## 笔记部分

## React Hooks
useState, useEffect, 和 useCallback 都是 React Hooks，用于在函数组件中管理状态、副作用和性能优化等方面。它们的作用不同，但有一些联系和相互影响。

    1. useState：用于在函数组件中声明和更新状态。它接收一个初始状态值，并返回一个数组，该数组包含当前状态和一个更新状态的函数。当更新状态函数被调用时，React 会重新渲染组件并使用新状态值更新组件。

    2. useEffect：用于在组件渲染后执行副作用操作，例如订阅事件、发送网络请求等。它接收一个函数和一个依赖数组作为参数。当依赖数组中的任何一个值发生变化时，React 会重新执行该函数。如果没有依赖数组，则每次组件更新时都会执行该函数。

    3. useCallback：用于缓存一个回调函数，以便在依赖项未更改时避免重新创建回调函数。它接收一个回调函数和一个依赖数组作为参数，并返回一个新的回调函数。当依赖数组中的任何一个值发生变化时，React 会重新创建一个新的回调函数。通常在将回调函数传递给子组件时使用。

### useMemo
useMemo 的作用是对需要进行昂贵计算的值进行缓存，以便在组件重新渲染时能够避免重复计算。它接收两个参数：一个回调函数和一个依赖项数组。回调函数表示需要进行缓存的计算逻辑，依赖项数组表示回调函数所依赖的变量。当依赖项数组中的变量发生变化时，useMemo 将重新计算值并返回新值，否则将返回上一次缓存的值。
useMemo 的使用场景通常是在计算复杂的数据结构或进行昂贵的计算时，比如对数组进行过滤、排序或映射等操作，或者进行大量的数学计算或字符串处理。将这些计算结果缓存起来，可以避免在每次组件渲染时都重新计算，从而提高组件的渲染性能。
需要注意的是，使用 useMemo 只有在计算开销较大、依赖项较多的情况下才会带来性能优化的效果，对于简单的计算和依赖项较少的情况，使用 useMemo 可能会导致性能下降，甚至不如直接计算。因此，应该谨慎使用 useMemo，在实际使用中根据具体情况进行选择。
```jsx
function Example({ list }) {
  const filteredList = useMemo(() => {
    return list.filter(item => item.completed);
  }, [list]);

  return (
    <ul>
      {filteredList.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
```
## Nextjs Hooks
### useRouter
useRouter 函数是 Next.js 提供的一个钩子函数，用于访问路由对象，并提供了一些属性和方法来管理页面导航和路由信息。
```jsx
import { useRouter } from 'next/navigation';

function MyComponent() {
  const router = useRouter();

  function handleNavigation() {
    router.push('/about');
  }

  return (
    <div>
      <p>当前页面：{router.pathname}</p>
      <button onClick={handleNavigation}>关于我们</button>
    </div>
  );
}
```
在这个示例中，MyComponent 组件调用了 useRouter 钩子函数，获取了 Next.js 中的路由对象。具体来说，它使用解构赋值获取了 router 变量，并将路由对象的 pathname 属性渲染到了组件的 JSX 中。

在组件中还定义了一个 handleNavigation 函数，用于进行页面导航。当用户点击按钮时，将调用 router.push 方法，实现路由跳转到 /about 页面。

需要注意的是，useRouter 函数只能在客户端渲染的页面中使用，因为服务器端渲染时是没有路由对象的。如果你想在服务器端使用路由对象，可以使用 Next.js 提供的 getServerSideProps 或 getInitialProps 方法来获取路由信息，然后将其作为 props 传递给组件。

### useSearchParams
useSearchParams 函数是 Next.js 提供的一个钩子函数，用于访问当前页面的查询参数，并提供了一些方法来获取、设置或删除查询参数。
```jsx
import { useSearchParams } from 'next/navigation';

function MyComponent() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearch() {
    setSearchParams({ name: 'John', age: '30' });
  }

  return (
    <div>
      <p>当前查询参数：{JSON.stringify(searchParams)}</p>
      <button onClick={handleSearch}>搜索</button>
    </div>
  );
}
```
在这个示例中，MyComponent 组件调用了 useSearchParams 钩子函数，获取了当前页面的查询参数。具体来说，它使用解构赋值获取了 searchParams 和 setSearchParams 两个值，并将 searchParams 渲染到了组件的 JSX 中。

在组件中还定义了一个 handleSearch 函数，用于设置新的查询参数。当用户点击按钮时，将调用 setSearchParams 方法，并传入一个对象，表示要设置的查询参数。在这个示例中，将设置 name 参数为 John，age 参数为 30。

需要注意的是，useSearchParams 函数只能在客户端渲染的页面中使用，因为服务器端渲染时是没有查询参数的。如果你想在服务器端获取查询参数，可以使用 Next.js 提供的 getServerSideProps 或 getInitialProps 方法来获取查询参数，然后将其作为 props 传递给组件。

### zustand
`zustand` 是一个基于 React Hooks 的状态管理库，它提供了简单易用的 API，可以帮助开发者轻松地管理 React 应用中的状态。以下是 `zustand` 的一些特点：
- 基于函数式编程和 React Hooks，易于理解和使用。
- 只需要很少的代码就可以创建和管理状态，不需要像 Redux 那样编写大量的模板代码。
- 支持异步数据加载和处理。
- 支持使用中间件扩展功能，例如日志记录、网络请求等等。
- 支持使用插件来扩展功能，例如持久化、时间旅行等等。

使用 `zustand`，你可以通过创建一个状态容器（state container）来管理组件的状态。状态容器是一个包含状态和状态更新函数的对象，可以使用 `create` 函数来创建。例如：
```jsx
import create from 'zustand';

const useCounter = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

在上面的示例中，我们使用 `create` 函数创建了一个名为 `useCounter` 的状态容器。该容器包含了一个名为 `count` 的状态值和两个更新函数 `increment` 和 `decrement`，分别用于增加和减少 `count` 值。我们可以在 React 组件中使用这些状态和更新函数，例如：
```jsx
function Counter() {
  const { count, increment, decrement } = useCounter();
  return (
    <div>
      <button onClick={increment}>+</button>
      <span>{count}</span>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

在上面的组件中，我们使用 `useCounter` 钩子获取了状态容器中的状态和更新函数，并将它们渲染到了组件中。当用户点击增加或减少按钮时，状态容器中的状态值会被更新，组件会自动重新渲染。
除此之外，`zustand` 还提供了一些高级功能，例如使用中间件、使用插件、使用 React DevTools 等等。这些功能可以帮助开发者更加方便地管理和调试应用状态。

### react-hook-form
react-hook-form 是一个基于 React Hooks 的轻量级表单库，可以帮助我们更加方便地管理表单数据和验证表单输入。它具有以下特点：
    使用 React Hooks，不需要依赖 class 组件。
    非常轻量级，压缩后只有 5KB 左右。
    支持异步验证和自定义验证规则。
    支持多种表单输入类型，包括 input、select、textarea 等等。

```jsx
// 使用 react-hook-form 很简单，首先需要安装它：
npm install react-hook-form
// 然后，在需要使用表单的组件中引入它：
import { useForm } from 'react-hook-form';
```

使用 useForm 函数可以创建一个新的表单实例，例如：
```jsx
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input type="text" {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

在上面的代码中，我们使用 useForm 函数创建了一个新的表单实例，并使用 register 函数将输入框与表单数据进行关联。使用 handleSubmit 函数可以处理表单的提交事件，使用 errors 对象可以获取表单输入的错误信息。
react-hook-form 还提供了很多其他的功能和 API，例如：

    watch 函数：用于监听表单数据的变化。
    reset 函数：用于重置表单数据。
    setValue 和 getValues 函数：用于设置和获取表单数据。
    useFormContext 函数：用于在嵌套组件中共享表单数据。

### react-select
react-select 是一个基于 React 的开源组件库，用于创建自定义的下拉选择框。该组件库提供了多种样式和配置选项，使得开发者可以根据自己的需求来创建漂亮、交互性强的下拉选择框。
react-select 组件库的主要特点包括：
- 可定制性强：可以使用 CSS 或者组件库提供的样式属性来自定义下拉选择框的外观和行为。
- 多选和单选：支持单选和多选两种模式，可以通过配置选项来选择。
- 异步搜索：支持异步搜索功能，可以通过 API 来获取下拉列表的数据。
- 惰性加载：支持惰性加载功能，可以通过分页来减轻数据加载压力。
- 可访问性：支持键盘导航、屏幕阅读器和无障碍键盘操作等可访问性功能。

使用 react-select 组件库创建一个下拉选择框非常简单，只需要安装组件库，然后在 React 应用中引入组件并进行配置即可。例如，在单选模式下，可以使用以下代码来创建一个下拉选择框：
```jsx
import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'orange', label: 'Orange' },
];

function MySelect() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <Select options={options} value={selectedOption} onChange={handleChange} />
  );
}
```
在这个示例中，使用 useState 钩子函数创建了一个名为 selectedOption 的状态变量，并将其初始值设置为 null。使用 Select 组件来创建下拉选择框，其中 options 属性表示下拉列表中的选项，value 属性表示当前选中的选项，onChange 属性表示选项发生变化时的回调函数。

使用 react-select 组件库可以方便地创建自定义的下拉选择框，提高用户交互体验。需要注意的是，由于该组件库提供了丰富的配置选项，因此在使用时需要仔细阅读文档，并根据需要进行配置和定制。

## React Props
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

## react-hot-toast
react-hot-toast 是一个基于 React 的通知组件库，用于在页面中展示通知、警告和错误等信息。它提供了简单易用的 API，可以快速配置和自定义通知的样式和行为。
使用 react-hot-toast 很简单，首先需要安装它：
```jsx
npm install react-hot-toast
// 然后，在需要使用通知的组件中引入它：
import { toast } from 'react-hot-toast';
```

使用 toast 函数可以创建一个新的通知，例如：
```jsx
toast.success('操作成功！');
toast.error('操作失败！');
toast('正在加载中，请稍等...', { duration: 2000 });
```

在上面的代码中，我们分别创建了一个成功通知、一个错误通知和一个加载中通知。在第三个通知中，我们还指定了通知的持续时间为 2000 毫秒。
react-hot-toast 还提供了很多其他的配置选项，例如：
    duration：通知的持续时间，默认为 5000 毫秒。
    position：通知的位置，默认为 top-right。
    style：通知的样式，可以自定义。
    icon：通知的图标，可以自定义。
    总之，react-hot-toast 是一个简单易用的通知组件库，可以帮助我们在页面中展示通知、警告和错误等信息。它提供了丰富的配置选项，可以根据需要自定义通知的样式和行为。使用 react-hot-toast 可以提高用户体验，减少用户的困惑和不满。

## Prisma
Prisma 是一个现代化的 ORM（对象关系映射）工具，它提供了一个类型安全的 API，用于与数据库进行交互。Prisma 支持多种数据库，包括 PostgreSQL、MySQL、SQLite 和 Microsoft SQL Server，可以用于构建各种类型的应用程序，包括 Web 应用程序、API、CLI 工具等。
Prisma 的主要功能包括：
  数据建模：使用 Prisma 定义数据模型，包括表、列、外键等，Prisma 将自动生成数据库迁移脚本，并确保数据模型和数据库的一致性和正确性。
  数据访问：使用 Prisma 查询 API 可以轻松地进行 CRUD（创建、读取、更新和删除）操作，同时支持复杂的查询、过滤和排序等操作。
  数据类型安全：Prisma 提供了强类型的 API，支持 TypeScript 和 JavaScript，可以在编译时捕获类型错误和其他错误，并在开发过程中提供代码补全和文档支持。
  Prisma 还提供了许多其他功能，包括数据库连接池、事务管理、性能分析等，可以帮助开发人员更轻松地构建和维护数据库应用程序。

在使用 Prisma 时，需要先安装 Prisma CLI 和 Prisma Client，然后定义数据模型、生成迁移脚本、执行迁移、生成 Prisma Client，最后使用 Prisma Client 进行数据访问。Prisma 还提供了许多工具和插件，可以帮助开发人员更轻松地使用 Prisma，例如 Prisma Studio、Prisma Migrate 等。

## 其他
### axios
axios 是一个基于 Promise 的 HTTP 客户端，可以用于浏览器和 Node.js 环境中对 HTTP 请求进行封装和处理。

### react-icon
react-icons 是一个基于 React 的图标库，包含了众多常用的图标，并且支持自定义图标。它提供了一个简单易用的 API，可以方便地在 React 应用中使用各种图标。

### bcrypt
使用 bcrypt 实现加密逻辑

## 教程资源
- [NextAuth.js 官方文档](https://authjs.dev/)
- [Prisma 官方文档](https://www.prisma.io/docs)
- [Next.js 应用开发实战](https://nextjs-in-action-cn.taonan.lu/)
- [Next.js 小记](https://www.bilibili.com/read/cv20992052)
