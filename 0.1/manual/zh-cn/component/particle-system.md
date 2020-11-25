# 粒子动画

Oasis Engine 的 **GPU 粒子系统** [GPUParticleSystem](${book.api}classes/core.gpuparticlesystem.html) 内部将会根据配置参数，自动生成几何体和材质，不需要手动创建和添加。所以，使用粒子系统，我们唯一需要关注的是配置参数。

```typescript
let particleComp = obj.addComponent(GPUParticleSystem);

// 初始化
particleComp.initialize({
  maxCount: 1000,
  spawnCount: 100,
  once: true,
  options: {
    velocity: new Vector3(0.2, 0.2, 0.2),
    acceleration: new Vector3(0, -0.02, 0),
    color: new Vector3(1, 0, 0),
    lifetime: 5,
    size:20,
  }
});

// 发射粒子
particleComp.start();

// 停止发射
particleComp.stop();

// 发射过程中调整发射参数
particleComp.setOptions({
  velocity: new Vector3(0, 0, 0),
  lifetime: 10,
});
```


## 参数


粒子参数需要在初始化（[GPUParticleSystem.initialize](${book.api}classes/core.gpuparticlesystem.html#initialize)）时配置，不同粒子参数生成的粒子效果有千百种，在使用时，需要分析想要实现的特效的物理特性，例如：初始位置、初速度、加速度和这些参数的随机范围等。。初始化参数很多，但是都有默认值，在查看之前，你最好对每个参数的含义都有简单的认识：


- [`maxCount`](${book.api}classes/core.gpuparticlesystem.html#maxcount) ：最大粒子数，决定所占内存的大小，需要合理分配。
- [`once`](${book.api}classes/core.gpuparticlesystem.html#once) ：是否只发射一次，默认 `false` （循环发射）。
- [`blendFunc`](${book.api}classes/core.gpuparticlesystem.html#blendfunc) :  支持传入 webgl 混合因子，下图左为透明度混合，下图右为柔和相加混合，默认透明度混合 `[gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA]` 。

    ![](https://gw.alipayobjects.com/zos/rmsportal/NTAMmVCYSrXYsRvgjBYw.png#align=left&display=inline&height=190&margin=%5Bobject%20Object%5D&originHeight=200&originWidth=422&status=done&style=none&width=400)

- [`particleTex`](${book.api}classes/core.gpuparticlesystem.html#particletex) ： 粒子形状贴图。
- [`maskTexture`](${book.api}classes/core.gpuparticlesystem.html#particlemasktex) ：粒子遮罩贴图，遮罩用于在粒子上叠加特定透明度的发光效果，使用遮罩前后对比：

    ![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/161276/1566567166055-23ed9fc8-907e-4855-ba83-24703d7c2cc0.png#align=left&display=inline&height=217&margin=%5Bobject%20Object%5D&name=image.png&originHeight=433&originWidth=890&size=345326&status=done&style=none&width=445)


- [`useOriginColor`](${book.api}classes/core.gpuparticlesystem.html#useorigincolor) ：是否使用图片原色，为 `true`  时使用图片原色，为 `false`  时，图片原色混合用户配置的颜色，可以在原图的基础上混合出任意的颜色：

    ![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/161276/1566567187067-d4067842-c5b3-43f8-a936-395c628ce97c.png#align=left&display=inline&height=250&margin=%5Bobject%20Object%5D&name=image.png&originHeight=499&originWidth=1009&size=506372&status=done&style=none&width=504.5)


- [`rotateToVelocity`](${book.api}classes/core.gpuparticlesystem.html#rotatetovelocity) ：是否跟随粒子运动速度的方向，默认 `false`，为 `true`  时，将粒子贴图的单位向量旋转至粒子运动速度的方向，例如烟花：

    ![xi.gif](https://intranetproxy.alipay.com/skylark/lark/0/2019/gif/161276/1566567277218-594ec692-7608-4b5a-8aff-05e6cea2b62f.gif#align=left&display=inline&height=385&margin=%5Bobject%20Object%5D&name=xi.gif&originHeight=489&originWidth=494&size=345464&status=done&style=none&width=389)


  为 `false` 时，无旋转，适用于方向一致的场景，例如孔明灯：

    ![xx.gif](https://intranetproxy.alipay.com/skylark/lark/0/2019/gif/161276/1566567330802-a71c903d-5f3c-4daa-a058-d076df2372ed.gif#align=left&display=inline&height=389&margin=%5Bobject%20Object%5D&name=xx.gif&originHeight=489&originWidth=494&size=1532055&status=done&style=none&width=393)


- [`isScaleByLifetime`](${book.api}classes/core.gpuparticlesystem.html#isscalebylifetime) ：是否随生命周期缩小至消失。为 `true` 时粒子会越来越小，为 `false` 时粒子大小保持不变，只有透明度会降低，可用于制作淡出消失的效果：

    ![](https://gw.alipayobjects.com/zos/rmsportal/ZtxLeEHDUbWvGliQmWMu.gif#align=left&display=inline&height=534&margin=%5Bobject%20Object%5D&originHeight=638&originWidth=478&status=done&style=none&width=400) |


- [`fadeIn`](${book.api}classes/core.gpuparticlesystem.html#fadein) ：是否添加淡入效果，可用于制作烟雾效果：

    ![](https://gw.alipayobjects.com/zos/rmsportal/xwSEmEOkXGJMAWfNbyRR.gif#align=left&display=inline&height=363&margin=%5Bobject%20Object%5D&originHeight=630&originWidth=694&status=done&style=none&width=400) |


- [`getOptions`](${book.api}classes/core.gpuparticlesystem.html#getoptions) : 获取更新参数的回调函数，常用于按照曲线公式更新粒子初始位置，效果为粒子按照曲线的轨迹运动，用法示例如下：

  ```typescript
  const getPosition = (tick) => {
    let r = Math.acos(Math.sin(tick));
    let x = r * Math.cos(tick);
    let y = r * Math.sin(tick);
    return new Vector3(x, y, 0);
  }

  const options = {
    velocityRandomness: new Vector3(0.2, 0.2, 0.2),
    acceleration: new Vector3(0, -0.02, 0),
    color: new Vector3(1, 0, 0),
    colorRandomness: 0.5,
    lifetime: 5,
    size:30,
  };

  particleComp.init({
    maxCount: 10000,
    spawnCount: 20,
    once: false,
    useOriginColor:false,
    getOptions: function(time) { // time 为累计运行时间，单位秒
      var position = getPosition(time);
      if(position) {
        options.position = position;
      }
      return options;
    }
  });
  ```

- [`options`](${book.api}classes/core.gpuparticlesystem.html#options) ： 粒子属性控制参数集，包含粒子发射位置、速度、加速度、旋转角度、颜色、大小、初始旋转角度、自转角速率、生命周期长度和相应随机因子的配置。随机因子用于控制参数生成的随机范围。


  - **大小随机因子**，取值在 0~1 之间，例如：大小为 50，随机因子为 0，则生成的粒子大小均为 50，随机因子为 0.5，则生成的粒子大小范围在 25~75 之间随机，随机因子为 1，则生成粒子大小范围在 0~100 之间随机：

    ```typescript
    size = size + (Math.random() - 0.5）* 2 * sizeRandomness * size
    ```


  - **颜色随机因子**，取值在0~1之间，颜色的 R、G、B通道的色值会分别在随机因子范围内取一个随机值，然后截取在 0~1 范围内：

    ```typescript
    color[i] = color[i] + (Math.random() - 0.5) * colorRandomness
    ```

  - **初始旋转角度随机因子**，取值在 0~1 之间，例如：rotate 为 0，随机因子为 0，则生成的粒子角度均为 0，随机因子为 1，则生成的角度在 -PI~PI 之间随机：

    ```typescript
    startAngle = startAngle + (Math.random() - 0.5) * Math.PI * startAngleRandomness * 2
    ```