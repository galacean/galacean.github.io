---
order: 20
title: 项目发布
type: 编辑器
---

1. 点击编辑器的项目和下载项目进行项目的发布：

![image-20210806111147746](https://gw.alipayobjects.com/zos/OasisHub/809ab57b-2c41-44ad-a3f8-6ac3b82182b0/image-20210806111147746.png)

2. 输入项目名称，选择项目类型

![image-20210806111342074](https://gw.alipayobjects.com/zos/OasisHub/cd728052-0515-4d4e-89c3-7b407848e870/image-20210806111342074.png)

名称指的是下载项目中 package.json 的 name，类型目前支持：

- **Pure JavaScript**： 纯 JavaScript 项目
- **React Component**：React 组件
- **Rax Component** ：Rax 组件
- **Mini Component**：小程序组件

下载完成成，解压 zip 文件夹，在**工程目录下**内执行：

```shell
tnpm install
tnpm run dev
```

即可进行 debug。

执行：

```shell
tnpm publish
```

发布组件。关于 tnpm 的发布可以参考 [tnpm 文档](https://npm.alibaba-inc.com/)。

