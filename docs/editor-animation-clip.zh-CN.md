---
order: 4.1
title: 美术-动画切片
type: 编辑器
---

动画切片(**AnimationClip**)  为**一段时间轴上的动画组合**，可以是多个物体的旋转、位移、缩放、权重动画，如**走路、跑步、跳跃**可以分别导出 3 个动画切片；Oasis 引擎可以选择播放哪一个动画切片，前提是建模软件导出的 FBX 或者 GLTF 里面包含多个动画切片。
​

为减少沟通成本，本文列举了几种常见的动画切片方法，导出 GLTF 方便 Oasis 引擎直接使用，也可以通过 [GLTF 预览](https://oasisengine.cn/gltf-viewer) 页面进行功能校验。

​

Blender 的动画编辑页面非常友好，能够清晰地可视化显示受动画影响的节点，并且在时间轴上显示关键帧，因此推荐使用 Blender 进行动画切片。
​

### Blender

1. 打开 Blender，导入 Blender 支持的模型格式，然后切换到 **动画编辑** 窗口：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622617152228-2c30967c-9203-4ad2-b239-6033cb004bc3.png#clientId=u8b862108-a194-4&from=paste&height=650&id=jbhxs&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1949&originWidth=3835&originalType=binary&size=1172604&status=done&style=none&taskId=u9c1a0a56-d11c-4204-b35c-461269e1a4c&width=1278.3333333333333)

2. 通过上图的 “新建动画切片”按钮，可以快速的复制当前动画切片，然后进行独有的操作，如果没有显式改按钮，请确保打开了 “**动作编辑器**”：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622617514416-e0b83cd6-439f-4003-aa23-f85ca0df04dc.png#clientId=u8b862108-a194-4&from=paste&height=163&id=nJzva&margin=%5Bobject%20Object%5D&name=image.png&originHeight=488&originWidth=2162&originalType=binary&size=151966&status=done&style=none&taskId=u0fef5886-46ae-4d4e-af22-ba1957d9501&width=720.6666666666666)

- 举例，新建了一个名为 **animation_copy **的动画切片，然后只保留最后 5 帧动画：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622617643472-17314b46-06a6-4368-952a-416814227566.png#clientId=u8b862108-a194-4&from=paste&height=132&id=hPacq&margin=%5Bobject%20Object%5D&name=image.png&originHeight=395&originWidth=1464&originalType=binary&size=58042&status=done&style=none&taskId=uaf76c052-c2dc-420c-a43e-01bcf153cfe&width=488)

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622617795573-fb73aeec-fbb0-4851-9f8a-1a1909b789d8.png#clientId=u8b862108-a194-4&from=paste&height=256&id=C8pN7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=769&originWidth=1412&originalType=binary&size=170314&status=done&style=none&taskId=u4736c5bf-33f8-4053-bba9-fd81c9e343b&width=470.6666666666667)![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622617813768-69bf92bc-ec55-4b00-9ff8-b7ce324e9526.png#clientId=u8b862108-a194-4&from=paste&height=157&id=CFO2b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=471&originWidth=1483&originalType=binary&size=62305&status=done&style=none&taskId=u78d4ba08-ab6b-45d2-b5cd-da55a8c9280&width=494.3333333333333)

- 导出的切片时间轴必须一致，可以通过右下角或者输出属性两个地方进行配置：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622617921344-b032018a-3e07-4189-99f6-f76a1157cc85.png#clientId=u8b862108-a194-4&from=paste&height=193&id=PFFKQ&margin=%5Bobject%20Object%5D&name=image.png&originHeight=579&originWidth=2720&originalType=binary&size=135722&status=done&style=none&taskId=uec5b0efa-7f23-4398-8d9b-e0a5c298b36&width=906.6666666666666)

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622617946932-c561c4c6-0f30-466e-859a-f948de54541c.png#clientId=u8b862108-a194-4&from=paste&height=433&id=WL9XC&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1298&originWidth=686&originalType=binary&size=148115&status=done&style=none&taskId=u8353389d-78b3-4f6d-b0c7-bd68784a6ab&width=228.66666666666666)

3. 因为时间轴必须一致，因此需要将刚才切的动画切片，都移到起始帧，拖拽即可：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622618070076-2d006e34-9dcc-4ead-b97c-c86398b63ba4.png#clientId=u8b862108-a194-4&from=paste&height=164&id=CVfkI&margin=%5Bobject%20Object%5D&name=image.png&originHeight=493&originWidth=1438&originalType=binary&size=62524&status=done&style=none&taskId=ub4a78b11-1b68-495f-a82e-e6ba6b679b1&width=479.3333333333333)

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622618030553-ac8afb11-cfea-48b7-82e1-9ca1243af167.png#clientId=u8b862108-a194-4&from=paste&height=150&id=mYFye&margin=%5Bobject%20Object%5D&name=image.png&originHeight=451&originWidth=1498&originalType=binary&size=62906&status=done&style=none&taskId=u01d35f7a-e1e4-40cc-9a7a-08453fbde70&width=499.3333333333333)

4. 至此，动画切片已经准备完成，导出 GLTF 或者 FBX ，接入 Oasis 引擎即可：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622618144473-9b9c24eb-2186-408f-8b75-ee41c2bf9dbd.png#clientId=u8b862108-a194-4&from=paste&height=432&id=oQlgA&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1296&originWidth=1263&originalType=binary&size=306088&status=done&style=none&taskId=u28fd5468-9bf9-4007-95bf-591f179e125&width=421)

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622618286939-c987bfa3-b6a7-46eb-b9cf-f3a7da86bb83.png#clientId=u8b862108-a194-4&from=paste&height=364&id=x2BPQ&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1092&originWidth=2510&originalType=binary&size=2946226&status=done&style=none&taskId=u710a83c3-5fae-453f-9173-88fb854de47&width=836.6666666666666)


Unity 也可以导出动画切片，但是效率比较低。

### Unity
插件：[AntG-Unity-Plugin.unitypackage.zip](https://www.yuque.com/attachments/yuque/0/2021/zip/381718/1622541632701-4f33e890-5295-4430-8798-d979b8df504f.zip?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2021%2Fzip%2F381718%2F1622541632701-4f33e890-5295-4430-8798-d979b8df504f.zip%22%2C%22name%22%3A%22AntG-Unity-Plugin.unitypackage.zip%22%2C%22size%22%3A490677%2C%22type%22%3A%22application%2Fzip%22%2C%22ext%22%3A%22zip%22%2C%22status%22%3A%22done%22%2C%22taskId%22%3A%22u4c98eaae-9ce5-43c7-ae94-c26f4ce0c0f%22%2C%22taskType%22%3A%22upload%22%2C%22id%22%3A%22uef3d6075%22%2C%22card%22%3A%22file%22%7D)

1. 下载插件。
2. 打开 Unity 。
3. 双击插件， **Import** 默认框选选项：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622551409520-2797ff27-65e9-4360-aa67-6d8438ec46f7.png#clientId=u3d801fa4-f2ba-4&from=paste&height=1300&id=u73b058a7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1300&originWidth=1548&originalType=binary&size=869036&status=done&style=none&taskId=uc14f58a8-b1d6-4e58-992f-bfc59331d9d&width=1548)

- 若安装成功，可以看到菜单栏多出 **AntG** 选项：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622551587689-1f963ad1-2530-4d5a-b312-25a87e7b99e0.png#clientId=u3d801fa4-f2ba-4&from=paste&height=46&id=u2e6a915e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=46&originWidth=1486&originalType=binary&size=103536&status=done&style=none&taskId=ub3b27b76-38da-43ab-a955-516c489f520&width=1486)

4. 把需要切片的 FBX 文件拖拽进资源栏：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622551819216-1fecbc86-c8e8-4416-82d5-20cd63094fd4.png#clientId=u3d801fa4-f2ba-4&from=paste&height=366&id=u1771a4bd&margin=%5Bobject%20Object%5D&name=image.png&originHeight=366&originWidth=1760&originalType=binary&size=110529&status=done&style=none&taskId=u2c075dcb-b67e-45c4-b264-313f449b485&width=1760)

5. 单击该资源，出现动画调试预览框。增加动画切片，并根据需求调整每个切片的时间轴 **start**、**end**，如果预览动画效果异常，确认没有勾选 **Resample Curves** 这个默认开启选项，切片完成后，记得点击右下角的 **Apply** 确认按钮。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622552141748-0151be0c-4f6c-40ee-9071-c7bddbc9eb0c.png#clientId=u3d801fa4-f2ba-4&from=paste&height=1408&id=u107d903f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1408&originWidth=2472&originalType=binary&size=1669701&status=done&style=none&taskId=ue97e1678-4816-4581-b4ce-ff9d3bb6926&width=2472)

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622552692349-5551e817-70b5-4093-9b40-b9a7dd45c365.png#clientId=u3d801fa4-f2ba-4&from=paste&height=142&id=ubf8f3220&margin=%5Bobject%20Object%5D&name=image.png&originHeight=142&originWidth=862&originalType=binary&size=30842&status=done&style=none&taskId=u9c0a6bf0-4ed9-4128-bf3a-64005480bb6&width=862)

6. 至此，动画切片资源已经制作完毕，接下来介绍如何导出，先将该资源拖拽到节点树中：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622552417304-8b1f1b7b-d99f-47d7-925f-5a70468d4a3e.png#clientId=u3d801fa4-f2ba-4&from=paste&height=468&id=uf2e509eb&margin=%5Bobject%20Object%5D&name=image.png&originHeight=468&originWidth=586&originalType=binary&size=120906&status=done&style=none&taskId=uad73cb67-35d1-4fb9-9a48-1e48f766e5f&width=586)

7. 然后给该节点增加 **Animator** Component:

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622552470594-9e7df115-24c6-4a16-9a64-a7c28206900e.png#clientId=u3d801fa4-f2ba-4&from=paste&height=1168&id=u9234635f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1168&originWidth=1628&originalType=binary&size=262858&status=done&style=none&taskId=ud04bd0c6-2cdc-4edf-b769-42b0dfaf9ba&width=1628)

8. 可以看到，Animator 组件需要绑定一个 Animator Controller 资源，因此我们需要在资源栏新建一个 Animator Controller 资源：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622552588576-858cb05e-f340-4005-885e-429bbb957403.png#clientId=u3d801fa4-f2ba-4&from=paste&height=656&id=u9c93c341&margin=%5Bobject%20Object%5D&name=image.png&originHeight=656&originWidth=1056&originalType=binary&size=409595&status=done&style=none&taskId=u6b12463d-9d16-45d1-b473-2ac0bb55469&width=1056)

9. 双击该 controller 资源，将我们之前的动画切片拖拽进去：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622552779345-91dcf315-cb56-48a5-9f05-86504a59268a.png#clientId=u3d801fa4-f2ba-4&from=paste&height=1408&id=uedcebdad&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1408&originWidth=1984&originalType=binary&size=727084&status=done&style=none&taskId=u20d00d21-c495-4c44-b969-2cb49d19828&width=1984)

10. Animator Controller 资源制作完毕，绑定到刚才的 Component 上：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622552894104-3693f7fe-2c4d-4dc1-8413-3a3391e11984.png#clientId=u3d801fa4-f2ba-4&from=paste&height=468&id=ua992cea4&margin=%5Bobject%20Object%5D&name=image.png&originHeight=468&originWidth=916&originalType=binary&size=213198&status=done&style=none&taskId=u70179f5a-2524-4240-bf9d-27f09a6aafb&width=916)

11. 右键该节点，选择导出 AntG：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/381718/1622552925151-16b86fcc-4680-4611-aa32-d3697bbe5086.png#clientId=u3d801fa4-f2ba-4&from=paste&height=822&id=ua3139f8a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=822&originWidth=692&originalType=binary&size=221059&status=done&style=none&taskId=u47aee066-1899-40bd-bcc8-91506011d78&width=692)

12. 至此，制作的动画切片 gltf 文件导出完毕，可以访问 Oasis 的 [gltf 预览](https://oasisengine.cn/gltf-viewer) 进行功能校验。
