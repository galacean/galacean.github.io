---
order: 1
title: 快速上手
type: 编辑器
group: 介绍
---

这个教程将带你开发一个“旋转的方块”示例。通过这个简单的示例，我们将看到编辑器为我们省去了大量的**样板式代码**的编写工作量，使开发者专注于逻辑的开发。

![image-20210730210543673](https://gw.alipayobjects.com/zos/OasisHub/0da575f2-01ba-4a2f-acc7-222ebce3db47/image-20210730210543673.png)

## 创建项目

打开 [Oasis Editor](https://oasistwa.alipay.com/3d)，点击 **创作项目** 按钮 ：

![iShot2021-07-30 15.51.30](https://gw.alipayobjects.com/zos/OasisHub/0deef242-34cc-40e6-8757-ce572e8b4422/iShot2021-07-30%25252015.51.30.png)

输入 **项目名称** 和 **项目描述**，点击 **确定** ：

![iShot2021-07-30 15.54.20](https://gw.alipayobjects.com/zos/OasisHub/9cb10230-9d75-42d6-ab85-f9dbc9dd952b/iShot2021-07-30%25252015.54.20.png)

## 搭建场景

进入编辑，可以看到默认场景的根节点下已经内置了一个直接光、一个方块、一个相机。

![image-20210730161033591](https://gw.alipayobjects.com/zos/OasisHub/b014300e-99bc-4c47-9e7a-db8abebfc3ad/image-20210730161033591.png)

点击左侧 **层级** 面板的 *model* 节点，可以看到方块呈选中状态，并且右边的 **检查器** 面板包含了 [几何体模型](${docs}primitive-mesh-cn) 组件：

![image-20210730171556754](https://gw.alipayobjects.com/zos/OasisHub/6c14ac7a-36a4-4501-89a1-54a1020346d1/image-20210730171556754.png)

接下去，为了添加一个地面，我们在节点树上新建一个节点，鼠标右击 **root** 节点，选择 **新建节点** > **entity**，并重命名为 *plane*：

![image-20210730171818845](https://gw.alipayobjects.com/zos/OasisHub/39a43174-dae5-49c3-8775-1aad08e87946/image-20210730171818845.png)

![image-20210730172558266](https://gw.alipayobjects.com/zos/OasisHub/005baf3e-f613-45b5-a23a-70083868205b/image-20210730172558266.png)

点击 **添加组件**，可以看到有很多引擎内置的组件，选择添加 **几何体模型** 组件：

![image-20210730173624469](https://gw.alipayobjects.com/zos/OasisHub/08510ea7-66e8-4394-b88a-963fb173dad9/image-20210730173624469.png)

几何体模型默认的类型是盒子，我们选择 **平面**，为了获得一个宽广的水平面，我们设置几何体模型组件的 **高宽** 属性，再设置**变换** 组件的 **位置（position）** 和 **旋转（rotation）** 的属性：

![image-20210730174006856](https://gw.alipayobjects.com/zos/OasisHub/08cbb5cc-46af-4b23-948a-97476def88ec/image-20210730174006856.png)

![image-20210730201757522](https://gw.alipayobjects.com/zos/OasisHub/dd7dbcdc-d048-4798-ba78-88a14d876ef0/image-20210730201757522.png)

现在看起来场景搭建好了，可是方块和地面的材质过于接近，为了区分二者，我们最好赋予方块一个新的材质。首先，在 **资源** 面板中右击添加一个 **BlinnPhong 材质** ：

![create-material](https://gw.alipayobjects.com/zos/OasisHub/cfd04ad7-4301-4cdb-aff4-1580accd7da3/create-material.gif)

点击 *model* 节点，点击 **几何体模型** 组件的材质（material）输入框，选择刚刚创建的 BlinnPhong 材质。再次选中 BlinnPhong 材质球缩略图，设置一个你喜欢的 **基础颜色** 。

![add-material](https://gw.alipayobjects.com/zos/OasisHub/97a2060e-7809-4991-b102-bd0324288252/add-material.gif)

##  添加脚本

接下来，我们为这个方块添加脚本组件，让它沿着 Y 轴匀速旋转。和创建材质一样，在资产面板中右击创建脚本并重名，然后添加脚本组件到 *model* 节点：

![add-script](https://gw.alipayobjects.com/zos/OasisHub/b6a33f8d-f8e3-4e4d-9bcf-3ac6e3920f70/add-script.gif)

双击脚本缩略图，打开脚本编辑器。为了实现旋转，我们在脚本组件的 `onUpdate` 函数中添加旋转逻辑，让方块每帧沿着 Y 轴旋转 1 度：

```typescript
this.entity.transform.rotate(0, 1, 0);
```

使用快捷键 _Command+S_ 保存文件，即可看到右侧预览面板中方块旋转：

![edit-script](https://gw.alipayobjects.com/zos/OasisHub/a7c3affa-c40a-4624-aa26-73bdbcb73bee/edit-script.gif)

## 下载产物

OK，恭喜你，完成了第一个 Oasis 项目！最后，在菜单栏中选择 **项目 > 下载项目**，选择适合自己的产物格式，比如 *React Component* ，点击确定按钮下载即可。

![download-project](https://gw.alipayobjects.com/zos/OasisHub/01f6a34e-0145-4680-87b3-24b73ac45001/download-project.gif)

