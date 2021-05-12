---
order: 4
title: 使用引擎开发小程序项目
type: 编辑器
---

> 使用代码直接开发 3D 小程序适用于更高阶开发者或是简易的 demo 项目，一般的业务不推荐使用代码开发。

Oasis3D 引擎可以直接使用在小程序项目当中，内部小程序项目创建可以参考：https://yuque.alibaba-inc.com/volans/fuze0p/cli-2.0#158fd19f。初始化项目之后，就可以开启 Oasis 3D 的开发了。

## 1. 关闭 appx2.0 构建

小程序里的 Native Canvas 组件只支持 appx 1.0 的构建，需要关闭 appx 2.0 才能使用：

1. ide 关闭：
   
2. cli 构建关闭, `mini.project.json` 里的 component2 设置成 false ：

2. 安装 Oasis 3D

``` shell
tnpm i @alipay/o3 @alipay/o3-adapter-miniprogram -S
```

3. 在页面中添加 Canvas 元素
具体 Native Canvas 文档可以查看：https://yuque.antfin-inc.com/qxfzv9/gu4hyn/qz3gvz
下面代码示例会给创建一个全屏的 canvas 对象，注意声明 type="webgl" ，Oasis3D 需要获取 GL 的上下文。
<canvas style="width:100vw;height:100vh" id="canvas" type="webgl"/>
4. 获取小程序 NativeCanvas 上下文
my._createCanvas({
  id: 'canvas', // canvas dom id
  success: (canvas) => {
    
  }
});
在 Page 的 onLoad 方法里调用 my._createCanvas 在 success 方法回调即可获取对应的 canvas。
5. 创建 Oasis 3D 场景
注意在页面上方引用小程序的 Oasis 3D 和适配库。
import * as o3 from "@alipay/o3/dist/miniprogram";
import { registerCanvas } from "@alipay/o3-adapter-miniprogram/dist/miniprogram";
在 success 回调里使用 canvas 创建 Oasis 3D engine。创建 canvas 之后，必须调用 registerCanvas  在适配库里注册 canvas，因为小程序里创建图片和调用 raf 的 api 依赖于 canvas，需要前置注册 canvas。
my._createCanvas({
  id: 'canvas', // canvas dom id
  success: (canvas) => {
    registerCanvas(canvas, "canvas"); // 适配库中注册 canvas
    const engine = new o3.WebGLEngine(canvas);
    ...
  }
});
完整 page 代码如下:
// 获取全局 app 实例
import * as o3 from "@alipay/o3/dist/miniprogram";
Page({
  // 声明页面数据
  data: {},
  // 监听生命周期回调 onLoad
  onLoad() {
    my._createCanvas({
      id: "canvas",
      success: function success(canvas) {
        registerCanvas(canvas, "canvas"); // 适配库中注册 canvas
        const engine = new o3.WebGLEngine(canvas);
        
        // 适配 canvas
        const info = my.getSystemInfoSync();
        const { windowWidth, windowHeight, pixelRatio, titleBarHeight } = info;
        engine.canvas.width = windowWidth * pixelRatio;
        engine.canvas.height = (windowHeight - titleBarHeight) * pixelRatio;
        const rootEntity = engine.sceneManager.activeScene.createRootEntity();
        // 初始化 camera
        const cameraEntity = rootEntity.createChild("camera");
        cameraEntity.addComponent(o3.Camera);
        const pos = cameraEntity.transform.position;
        pos.setValue(10, 10, 10);
        cameraEntity.transform.position = pos;
        cameraEntity.transform.lookAt(new o3.Vector3(0, 0, 0));
        // 初始化 light
        rootEntity.addComponent(o3.AmbientLight, { intensity: 1.2 });
        // 初始化 cube
        const cubeEntity = rootEntity.createChild("cube");
        const renderer = cubeEntity.addComponent(o3.GeometryRenderer);
        renderer.geometry = new o3.CuboidGeometry();
        const material = new o3.BlinnPhongMaterial("blinn");
        material.emission = new o3.Vector4(1, 0.25, 0.25, 1);
        renderer.material = material;
        engine.run();
      },
    });
  },
});
完成后即可看见上面图示的红色方块了。更多场景开发资料请查看 Oasis 3D 用户手册。