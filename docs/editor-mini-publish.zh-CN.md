---
order: 6
title: 支付宝小程序项目发布
type: 界面
label: Editor-Interface
---

Galacean 编辑器导出支付宝小程序的功能仍在开发中，交互方式和模板工程后续可能会有改动。

## 导出步骤

### 在编辑器里导出

![image-20230419145508090](https://mdn.alipayobjects.com/rms/afts/img/A*YnAqSZKNNDQAAAAAAAAAAAAAARQnAQ/original/image-20230419145508090.png)

点击下载后会下载一个 zip 文件，解压文件目录结构如下：

```shell
.
├── mini # 📁 小程序执行目录
│   ├── dist # 📁 代码构建结果
│   ├── pages # 📁 小程序页面
│   ├── app.json # ⚙️ 项目配置文件
│   ├── app.js # 代码入口
├── public # 📁 公共资源目录
│		├── scene.json # 场景文件
│   └── ... # 其他
├── src # 📁 源代码目录
├── mini.project.json # ⚙️ 工程配置文件
├── project.json # ⚙️ 编辑器导出工程配置
└── ... # 其他
```

### 本地资源处理

#### 蚂蚁集团内部用户

直接使用『上传到 CDN 』即可，使用集团默认 CDN 即可。若想使用自定义 CDN，参考非蚂蚁集团内部用户。

#### 非蚂蚁集团内部用户

1.  public 文件请自行上传 CDN
2. 修改 scene.json 文件或配置 baseUrl（待 1.0 升级）

## 包内文件加载（WIP）

目前还没有支持小程序的本地文件加载，

## 包使用

安装依赖和启动项目

```shell
npm install
npm run dev
```

用小程序 IDE 打开可以看到：

![image-20230420111035524](https://mdn.alipayobjects.com/rms/afts/img/A*kEUkTbfSMIwAAAAAAAAAAAAAARQnAQ/original/image-20230420111035524.png)

## 已知问题

- 小程序不支持 WebAssembly，目前无法使用 PhysX 作为物理后端
- 目前 ResourceManager 不支持 baseUrl 配置，需要手动修改 scene.json 文件（1.0 会支持）
- 目前不支持本地文件加载，需要手动上传到 CDN