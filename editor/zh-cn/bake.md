# 纹理烘焙

以 C4D-OC 渲染器的烘培（windows）为例讲解。

### 什么是烘焙

关于烘培就是将所有渲染好的材质颜色信息用一张贴图的形式表达出来。
 
烘培首先需要两组模型：一个高模，一个低模。高模用于烘培精细程度较高的贴图，低模用于在进入引擎后使用贴图两者在制作时要保证 uv 的统一，所以先产生低模排布好 uv 然后进行细节加工产生高模，高模可以较多的制作细节来烘培出细节更丰富的贴图。


![1.gif](https://intranetproxy.alipay.com/skylark/lark/0/2019/gif/35863/1575542283675-b8449bec-6071-45da-a22c-ccda8cca17b9.gif#align=left&display=inline&height=176&margin=%5Bobject%20Object%5D&name=1.gif&originHeight=176&originWidth=401&size=35087&status=done&style=none&width=401)

左边为低模 右边为高模 从布线信息可以看得出来，并且高模细的细节会多一些。

![2.gif](https://intranetproxy.alipay.com/skylark/lark/0/2019/gif/35863/1575542372069-0d12d79c-48cb-437d-8459-7b108c6bd13f.gif#align=left&display=inline&height=176&margin=%5Bobject%20Object%5D&name=2.gif&originHeight=176&originWidth=401&size=56229&status=done&style=none&width=401)

随便布线细节有差异但是两者的可以被看到的部分要保持一致 被遮盖的部分不做考虑所以高模必须由低模产生来保证uv的一致。


### 具体的烘培过程

1.将准备好的高模用C4D进行调节材质渲染出来需要的效果，像面部使用的贴图也需要按照整体的uv排布来绘制贴图。调节好材质之后就可以准备进行烘培了。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/35863/1575542465935-40c0a4e6-05f4-4971-a641-43381d77c177.png#align=left&display=inline&height=288&margin=%5Bobject%20Object%5D&name=image.png&originHeight=575&originWidth=531&size=315013&status=done&style=none&width=265.5)


2.  烘培重要的一点是需要对摄像机的模式进行选择，对需要进行输出的摄像机进行标签指定，加入OC渲染器特有的摄像机标签。

![](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/35863/1575542491611-fe624337-5647-4dfc-a431-764aa73e3719.png#align=left&display=inline&height=304&margin=%5Bobject%20Object%5D&originHeight=608&originWidth=646&status=done&style=none&width=323)                                      


3. 点击添加好的摄像机标签进入标签属性摄像机类型会有很多选项其中一项为烘培，选择烘培。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/35863/1575542512084-eddf6219-e4f2-469e-b432-52688727eadb.png#align=left&display=inline&height=274&margin=%5Bobject%20Object%5D&name=image.png&originHeight=547&originWidth=680&size=106104&status=done&style=none&width=340)


4. 在烘培菜单中将烘培群组ID设置为除1以外的数字这里设置为2。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/35863/1575542530282-1f86f98e-2416-4bc2-8a51-1cfd02e8891e.png#align=left&display=inline&height=283&margin=%5Bobject%20Object%5D&name=image.png&originHeight=566&originWidth=996&size=113806&status=done&style=none&width=498)


5. 然后需要将需要烘培的模型并为一组，如下图所示将所有需要的模型打一个组并且加入OC对象标签。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/35863/1575542550265-48752393-a119-4b21-8ded-b31fadd6f590.png#align=left&display=inline&height=375&margin=%5Bobject%20Object%5D&name=image.png&originHeight=750&originWidth=647&size=171653&status=done&style=none&width=323.5)


6. 点击标签出现标签属性选择对象图层，然后将里面的烘培ID设置为和烘培群组ID一样的数值这里是2，然后点击渲染即可,这样就可以烘培出需要的图片。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/35863/1575542555802-ec5edde6-658a-4196-9542-a11431594fc2.png#align=left&display=inline&height=376&margin=%5Bobject%20Object%5D&name=image.png&originHeight=753&originWidth=1310&size=176004&status=done&style=none&width=655)

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/35863/1575542590195-1ad6492f-7416-4671-8989-166f3b9e14ff.png#align=left&display=inline&height=622&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1243&originWidth=1206&size=1551397&status=done&style=none&width=603)


如果对烘焙的结果不是非常满意，C4D、Substance Painter 都能够涂刷修改贴图。真实感渲染不是唯一的选择，涂刷贴图也可以用来还原一些特殊的风格。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/76063/1591887902369-2c2103e1-1057-45b5-83f9-b621a29c1ad5.png#align=left&display=inline&height=332&margin=%5Bobject%20Object%5D&name=image.png&originHeight=738&originWidth=1456&size=594376&status=done&style=none&width=655)

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/76063/1591941521115-3d562946-2981-40d0-a89d-60bccec0a96a.png#align=left&display=inline&height=603&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1206&originWidth=2580&size=2820427&status=done&style=none&width=1290)
