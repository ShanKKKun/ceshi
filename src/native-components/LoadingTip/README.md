# LoadingTip 

## 描述 {#intro}

用于创建页面或某个元素内部（比如标签页、弹窗）的加载样式交互。

## 依赖 {#dependencies}

| 名称 | 引用路径 |
| ------ | ------ |
| config | src/config |

## 详情 {#detail}

提供页面加载中的loading样式

## 待做 {#todo}

- 元素内部（如button）展示loading的样式兼容处理

## 使用 {#use}

### 单例模式

为避免多个loading实例的重叠，此处提供一个已实例化的loadingTip。使用时请引用GlobalLoading

```js
/** page.js **/
import { GlobalLoading } from '@/native-components/loadingTip'

const id = 'example'
GlobalLoading.show(id)

...

GlobalLoading.hide(id)
```
注意：为避免页面逻辑混乱，统一交互行为。所有展示的loading都需要使用相应的id手动关闭，此处不提供任何强制清除行为！

### 多次实例

```js
/** page.js **/
import LoadingTip from '@/native-components/loadingTip'

const loadingTip = new LoadingTip()

const id = 'example'
loadinTip.show(id)

...

loadinTip.hide(id)
```

## API {#api}

### methods

1.show

展示loading加载图标

| 参数 | 描述 | 取值 |
| --- | --- | ---- |
| id | loading图标唯一标示 | string |

2.hide

隐藏loading加载图标

| 参数 | 描述 | 取值 |
| --- | --- | ---- |
| id | loading图标唯一标示，需与show方法传递的id对应 | string |
