# 导出支付宝小程序包

Oasis Engine 也支持在支付宝小程序环境中运行。和[导出 Web 平台包](${book.editor}export-web)一样，Oasis 编辑器也支持导出小程序包，包中已经封装了许多小程序行为，使用请遵循[小程序自定义组件规范](https://opendocs.alipay.com/mini/framework/custom-component-overview)，构建使用的是 [sherry-appx 框架](http://sherry.alipay.net/appx/component/component.html#%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B)。

## 1. 组件导出
在组件开发完成后，在编辑器页面点击下载组件，并且选择小程序组件进行导出。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/161276/1599448951634-8c6d000a-7d95-4c23-ae9e-bd08003f93c6.png#align=left&display=inline&height=491&margin=%5Bobject%20Object%5D&name=image.png&originHeight=981&originWidth=1314&size=283999&status=done&style=none&width=657)
完成后会把组件的 zip 包下载到本地，解压后会是一个 sherry-appx 的[小程序组件](http://sherry.alipay.net/appx/component/component.html#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)。


## 2. 本地预览


1. 先使用 `tnpm i --by=yarn` 安装依赖之后。
1. 使用 `tnpm run dev` 监听代码的修改。
1. 使用 `tnpm run ide` 即可编辑器里预览小程序组件。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/161276/1605099688623-bc2ce8d1-6873-4f7e-a26a-456cad56571f.png#align=left&display=inline&height=660&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1320&originWidth=746&size=175992&status=done&style=none&width=373)

> 预览前提是安装了[小程序开发者工具](https://opendocs.alipay.com/mini/ide/download)，需要 1.15 以上才可以预览 WebGL 小程序组件。

## 3. 发布和使用

组件发布与 web 平台一致，可以查看 [导出 Web 平台包](${book.editor}export-web)。

使用 tnpm 安装依赖后，在具体使用组件的页面的 _app.json_ 里加入：

```json
{
  "usingComponents": {
    "my-component":"@alipay/o3-mini-component"
  }
}
```

请移步 [小程序自定义组件使用文档](https://opendocs.alipay.com/mini/framework/custom-component-overview) 了解更多的小程序组件使用的开发和使用细节。