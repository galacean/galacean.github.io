---
order: 2
title: 导出支付宝小程序包
type: 编辑器
group: 发布
---

Oasis Engine 也支持在支付宝小程序环境中运行。和[导出 Web 平台包](${docs}editor-export-web-cn)一样，Oasis 编辑器也支持导出小程序包，包中已经封装了许多小程序行为，使用请遵循[小程序自定义组件规范](https://opendocs.alipay.com/mini/framework/custom-component-overview)，构建使用的是 [sherry-appx 框架](http://sherry.alipay.net/appx/component/component.html#%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B)。

## 使用

下载互动小程序组件到本地，解压后是一个 sherry-appx 的[小程序组件](http://sherry.alipay.net/appx/component/component.html#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)。

## 本地预览

1. 先使用 `tnpm i --by=yarn` 安装依赖之后。
1. 使用 `tnpm run dev` 监听代码的修改。
1. 使用 `tnpm run ide` 即可编辑器里预览小程序组件。

<img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*-94OSqZg240AAAAAAAAAAAAAARQnAQ" alt="image.png" style="zoom:50%;" />

> 预览前提是安装了[小程序开发者工具](https://opendocs.alipay.com/mini/ide/download)，需要 1.15 以上才可以预览 WebGL 小程序组件。

## 发布和使用

使用 tnpm 安装依赖后，在具体使用组件的页面的 _app.json_ 里加入：

```json
{
  "usingComponents": {
    "my-component":"@alipay/oasis-mini-component"
  }
}
```

请移步 [小程序自定义组件使用文档](https://opendocs.alipay.com/mini/framework/custom-component-overview) 了解更多的小程序组件使用的开发和使用细节。