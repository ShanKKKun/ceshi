# request

## 描述 {#intro}

工具类，对ajax请求的封装，使用axios库

## 依赖 {#dependencies}

| 名称 | 引用路径 |
| ------ | ------ |
| axios | npm 模块 |
| qs | npm模块 |
| getAuth | src/utils/getAuth |
| isWechat | src/utils/isWechat |
| validateAuth | src/utils/validateAuth |
| handleError | src/utils/handleError |
| loadingTip | src/native-components/loadingTip |

## 详情 {#detail}

1.ajax请求拦截器拦截配置信息
2.创建loading交互弹窗。此处为每个请求创建一个唯一弹窗ID，用于处理多个请求并发时的弹窗处理，请求完成时需要使用对应请求弹窗ID关闭弹窗。
3.判定是否配置跳过鉴权字段skipAuth，若为true则不进行鉴权字段操作
4.若未设置skipAuth，获取本地缓存的sessionId，写入header，若本地缓存中没有sessionid则进行获取微信授权或跳转登录。当前接口直接取消，并返回相应错误信息
5.设置请求来源token （此处token放于skipAuth判断之外是为了兼容跳过鉴权的接口）
6.ajax返回值拦截器拦截服务器返回信息
7.隐藏当前请求对应的loading弹窗
8.根据返回码判定请求调用是否成功，成功则返回接口数据，否则处理错误

## 配置参数 {#config}

| key | value | type |
| ------ | ------ |
| url | 接口路径地址 | string |
| method | 请求方式 | 'get'、'post' |
| params | 请求参数 | object |
| params.skpiAuth | 是否跳过鉴权 | true (默认false，可不填) |

## 使用 {#use}

在api文件中引入request模块，配置url和请求方法，并返回一个promise流

```js
/** api.js */
import request from '@/utils/request'

export const fetchRequest = (params) => request({
  url: '********',
  method: 'post',
  params
})
```

页面引入接口api方法，执行调用，使用promise规范处理数据

```js
/** page.js **/
import { fetchRequest } from './api'

fetchRequest({
  // skipAuth: true, // 是否跳过鉴权，默认为false需要鉴权，可不填
  param1,
  param2,
  ...
  paramN
}).then(res => {
  // TODO 接口成功回调
}).catch(err => {
  // TODO 失败回调，因request有配置拦截抓取，此处可不做处理，但按照promise规范，不可省略catch
  console.warn(err)
})
```

因接口promise化，可直接处理多接口并行、前置情况，参见promise.all等api使用方法
