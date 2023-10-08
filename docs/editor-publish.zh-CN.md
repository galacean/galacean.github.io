---
order: 6
title: 项目导出
type: 界面
label: Editor-Interface
---

## HTML5 项目导出

Galacean Editor 项目导出功能可以将当前编辑器项目作为一个前端项目下载到本地。你可以在编辑器中配置项目导出的参数，如资产导出配置、渲染导出配置、物理导出配置等。基于这些配置，编辑器会生成出项目所需的代码、资产，生成对应的 `package.json`，并最终打包成一个 zip 包供你下载。

<img src="https://gw.alipayobjects.com/zos/OasisHub/e07d04fd-499c-40b6-90d7-f6f183e0b6a2/image-20231007201437362.png" alt="image-20231007201437362" style="zoom:50%;" />

### 导出配置

#### 资产导出配置

资产导出配置可以用来控制导出的资源类型和质量等参数。在资产导出配置中，你可以选择导出的资源类型，例如模型、纹理、HDR 等等，以及选择每种类型的导出质量和格式等参数。在导出模型时，你可以选择是否导出模型的网格信息、骨骼信息、动画信息等。

| 配置          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| glTF Quantize | 一种 glTF 压缩算法，详见[这里](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_mesh_quantization/README.md) |
| KTX2          | 勾选 [KTX2](https://www.khronos.org/ktx/) 开启[纹理压缩](${docs}texture-compression-cn)优化选项，能减少约 80% 的纹理显存。默认的压缩配置是 UASTC，开启 MIPMAP 和 ZSTD 压缩。后续编辑器的迭代会逐步开放更多的配置选项 |

#### 渲染导出配置

渲染导出配置可以用来控制项目的渲染效果和性能等参数。

| 配置                                                         | 描述                                                       |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| WebGL Mode                                                   | WebGL 的版本，`Auto` 值表示根据设备能力自动选择 WebGL 版本 |
| WebGL  [Context](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext) 的配置 | Anti-Alias、Alpha、Preserve Drawing Buffer 等              |
| Device Pixel Ratio                                           | 设备的像素比，用来控制画布的尺寸                           |

### 项目启动

在点击导出面板中的下载按钮后，你将得到一个项目的压缩包。解压缩后进入文件夹，在 Terminal 中依次运行：

```bash
npm install
npm run dev
```

项目就可以在本地运行了。

## 小程序项目导出
Galacean 编辑器导出支付宝小程序的功能仍在开发中，交互方式和模板工程后续可能会有改动。

### 导出步骤

#### 在编辑器里导出

![image-20231008145913073](https://mdn.alipayobjects.com/rms/afts/img/A*kNF_SYH1AakAAAAAAAAAAAAAARQnAQ/original/image-20231008145913073.png)

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

#### 本地资源处理

##### 蚂蚁集团内部用户

直接使用『上传到 CDN 』即可，使用集团默认 CDN 即可。若想使用自定义 CDN，参考非蚂蚁集团内部用户。

##### 非蚂蚁集团内部用户

1.  public 文件请自行上传 CDN
2. 修改 scene.json 文件或配置 baseUrl

### 包内文件加载（WIP）

目前还没有支持小程序的本地文件加载。

### 包使用

安装依赖和启动项目

```shell
npm install
npm run dev
```

用小程序 IDE 打开可以看到：

![image-20230420111035524](https://mdn.alipayobjects.com/rms/afts/img/A*kEUkTbfSMIwAAAAAAAAAAAAAARQnAQ/original/image-20230420111035524.png)

### 已知问题

- 小程序不支持 WebAssembly，目前无法使用 PhysX 作为物理后端
- 目前不支持本地文件加载，需要手动上传到 CDN

## 注意事项

在使用编辑器项目导出功能时，你需要注意以下事项：

1. 导出的项目需要在支持 WebGL 的环境中运行。
2. 导出的项目中可能包含大量的资源文件，你需要对项目进行优化和压缩，以提高项目的性能和加载速度。
3. 导出的项目中可能包含敏感信息和数据，你需要对项目进行安全性评估和保护，以防止信息泄漏和数据丢失等情况。
