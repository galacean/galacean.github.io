---
order: 4

title: AE && lottie —— 写给设计师

type: 美术
---
<a name="LUKWX"></a>
### 1、lottie 简介
[lottie](https://airbnb.io/lottie/) 是 Airbnb 于 2017 年前后发布的一款跨平台的动画解决方案，可应用于 iOS，Android，React Native 和 web，通过 Bodymovin 插件解析 [AE](https://www.adobe.com/products/aftereffects.html) 动画，并导出可在移动端和 web 端渲染动画的 json 文件。设计师通过 AE 来制作动画，再用 Bodymovin 导出相应的 json 文件给到前端，前端可以使用这个 json 文件直接生成 100% 还原的动画。<br />

![image.png](https://gw.alicdn.com/imgextra/i3/O1CN01hwDRHF1D8MQ1AewTj_!!6000000000171-2-tps-485-204.png#align=left&display=inline&height=495&margin=%5Bobject%20Object%5D&name=image.png) <br />

<a name="Cbszs"></a>
### 2、为什么选择 lottie

- 对于设计师：可以充分发挥创意和设计，可以不用费力讲解复杂的函数曲线和细致的效果，开发能直接 100% 还原动画；不会像 GIF 等手段一样带来超大文件和锯齿边缘，可以流畅实现高清动画。
- 对于开发：可以通过简单的导入和简短的代码，高保真实现复杂动画；而且 lottie 发布之后处于持续更新，任何 issue 都可以很快响应和解决；性能流畅，很少卡顿；集团内已有洛丽塔、lottie 的降级、lottie 的小程序等相关支持。
- 对于 PD：可以在不增加工期的情况下，给产品增加更流畅细腻的动画。



<a name="PhTdf"></a>
### 3、使用 lottie 的步骤
![image.png](https://cdn.nlark.com/yuque/0/2020/png/168092/1597657251435-a5f7cd47-b7f9-41fb-8196-705c8ee94370.png#align=left&display=inline&height=107&margin=%5Bobject%20Object%5D&name=image.png&originHeight=213&originWidth=1450&size=209191&status=done&style=none&width=725) <br />

<a name="wozti"></a>
### 4、使用 Bodymovin 和洛丽塔导出动画
4.1、 什么是 Bodymovin

- Bodymovin 是一个 AE 的插件，它可以把动画直接输出成代码，直接给程序员使用放在各个终端上使用。
- 你可以在 github 上找到最新版本的 bodymovin 使用。
- Bodymovin的版本等于输出的json文件版本。


4.2、怎样使用 Bodymovin

- 到 Bodymovin 的 GitHub 首页（链接：airbnb/lottie-web）克隆项目到本地，或者下载 .zip 包。  <br />   
![image.png](https://cdn.nlark.com/yuque/0/2020/png/168092/1597673434824-27e06992-4a7d-486a-8514-62a470c53789.png#align=left&display=inline&height=99&margin=%5Bobject%20Object%5D&name=image.png&originHeight=198&originWidth=397&size=18215&status=done&style=none&width=198.5)
      
- 在项目目录的“/build/extension”目录下找到“bodymovin.zxp”文件，这个就是插件包了。
- 下载安装ZXP Installer。
ZXP插件安装器地址: [https://aescripts.com/learn/zxp-installer](https://aescripts.com/learn/zxp-installer) <br />
- 打开软件，点击“File”>“Open”菜单项载入上述.zxp插件包，ZXP Installer会自动开始安装。安装完成后的软件主页面如下图所示，表示插件已成功安装。<br />
![image.png](https://cdn.nlark.com/yuque/0/2020/png/168092/1597674042809-af5a084f-f21b-4bf4-b0d4-7404466b2a1e.png#align=left&display=inline&height=183&margin=%5Bobject%20Object%5D&name=image.png&originHeight=365&originWidth=536&size=15772&status=done&style=none&width=268)

- 打开AE，点击“编辑”>“首选项”>“常规”菜单项，选中“允许脚本写入文件和访问网络”，点击确定。  
      
![image.png](https://cdn.nlark.com/yuque/0/2020/png/168092/1597674058269-f2242296-32c5-4ae9-973b-2943e04e94bc.png#align=left&display=inline&height=345&margin=%5Bobject%20Object%5D&name=image.png&originHeight=689&originWidth=852&size=52030&status=done&style=none&width=426)
- 点击“窗口”>“扩展”>“Bodymovin”菜单项，就可以打开Bodymovin的界面使用插件了。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/168092/1597674100420-41e2440c-fe9a-4280-8000-4f384ccdf9c3.png#align=left&display=inline&height=326&margin=%5Bobject%20Object%5D&name=image.png&originHeight=651&originWidth=1037&size=68383&status=done&style=none&width=518.5)

- 打开一个 AE 项目。         
      
![image.png](https://cdn.nlark.com/yuque/0/2020/png/168092/1597675384725-91198995-b2f1-4e8a-bf9e-c9573f4e8d5b.png#align=left&display=inline&height=896&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1792&originWidth=2406&size=2091475&status=done&style=none&width=1203)
      
- 打开Bodymovin插件窗口，可以发现该项目的名称出现在了下面的列表中。选中该名称，设置好 json 文件输出位置，点击 “Render”。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/168092/1597675512496-6c7320a9-fb09-460b-a2b0-e1a133020d9e.png#align=left&display=inline&height=495&margin=%5Bobject%20Object%5D&name=image.png&originHeight=990&originWidth=1278&size=296007&status=done&style=none&width=639)

- 点击上图中的 Settings，可以对导出的 json 进行配置：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/168092/1597675671244-f967fb47-da02-4033-9c37-277e2056af40.png#align=left&display=inline&height=495&margin=%5Bobject%20Object%5D&name=image.png&originHeight=990&originWidth=1278&size=498776&status=done&style=none&width=639)
      
- 导出 json 以后，通过蚂蚁金服开放的“洛丽塔”平台进行上传和预览。
- “洛丽塔”平台地址：[https://design.alipay.com/lolita](https://design.alipay.com/lolita)

- 点击“新文件导入”：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/168092/1597675804466-e14c7c20-5dde-46d4-95d1-944372f41613.png#align=left&display=inline&height=821&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1642&originWidth=2878&size=245024&status=done&style=none&width=1439)
      
- 上传成功以后，点击右上角“文件检测”：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/168092/1597675911965-a219246c-3050-4827-ba70-ce9a0083a11b.png#align=left&display=inline&height=819&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1638&originWidth=2878&size=1210960&status=done&style=none&width=1439)
      
- 通过“文件检测”查看低性能以及不支持的属性，可以回到 AE 中进行修改：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/168092/1597675975163-4bb8f3bd-0a4a-4de0-ba8b-f087d039e8fb.png#align=left&display=inline&height=818&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1636&originWidth=2876&size=1185678&status=done&style=none&width=1438)
      
- 修改完毕以后点击右上角“压缩并导出”：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/168092/1597676018672-5db0ed0e-344c-4b78-a1b7-c356c61b852a.png#align=left&display=inline&height=372&margin=%5Bobject%20Object%5D&name=image.png&originHeight=744&originWidth=810&size=126464&status=done&style=none&width=405)
![image.png](https://cdn.nlark.com/yuque/0/2020/png/168092/1597676097360-87548e7f-1fb6-413b-bd30-242011384571.png#align=left&display=inline&height=352&margin=%5Bobject%20Object%5D&name=image.png&originHeight=704&originWidth=1602&size=232448&status=done&style=none&width=801)
      
- 视情况选择图片保留质量，并点击“执行”，进行动画压缩
- 执行完毕以后，使用手淘扫码查看动画表现，并将导出的 json 文件地址给到前端、客户端开发
![image.png](https://cdn.nlark.com/yuque/0/2020/png/168092/1597676232725-254fa0a7-72f0-4b95-b6ff-5e1b98f99b49.png#align=left&display=inline&height=533&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1066&originWidth=1604&size=477307&status=done&style=none&width=802)



<a name="IyIyt"></a>
### 5、支持度和兼容性方面的重要建议

- 不使用表达式和特效。lottie 暂不支持。
- 注意遮罩尺寸。若使用 alpha 遮罩，遮照的大小会对性能产生很大的影响。尽可能地把遮罩尺寸维持到最小。
- 不使用混合模式和亮度蒙版。
- 描边动效不支持，因为这个属性会导致 lottie 性能问题，所以后来 lottie 去掉了对该属性的支持。
- 设置空白对象。若使用空白对象，需确保勾选可见并设置透明度为 0% ，否则不会被导出到 json 文件。
- Matte 和 mask 有尺寸问题，使用半透明遮罩会影响性能，可能会造成潜在的渲染错误以及严重的性能损耗！很多设计师习惯画图形用纯色图层，纯色图层形成的形状是基于蒙版的，这个要注意。如果必须使用遮罩，请覆盖最小的区域。
- lottie 不支持图层样式，图层效果不支持drop shadow, color overlay 或 stroke。
- lottie 不支持合成路径（merged path），如果从 AI 中制作的图形有，请删掉。
- 图层命名尽量用英文。**如果你使用了渐变，那么工程名（包括aep文件名）以及渐变图层、到其父级图层、到根级图层这条链路中的每一层都要用英文，包括变换属性命名，否则会出现渲染错误：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/168092/1597677516151-39787ab8-75cf-4ac1-9d04-65839abb68fc.png#align=left&display=inline&height=108&margin=%5Bobject%20Object%5D&name=image.png&originHeight=216&originWidth=340&size=24623&status=done&style=none&width=170)**



<a name="DjBmt"></a>
### 6、其他兼容性上的建议

- 滤镜效果在客户端上不全支持；颜色滤镜的试用对客户端的运行上存在额外的性能损耗。
- 图层如果存在 “自动定向” 特性，在 Web 和 Android 上不支持。
- 不推荐使用“遮罩层”，遮罩层对客户端运行性能的损耗极大，建议避免使用。如果可以用蒙版效果替代，建议用蒙版替代使用。
- 蒙版的使用对客户端运行性能消耗比较大，如果存在蒙版为“非必需”的，务必删除。
- 图层如果使用 “时间重映射” 特性，在 iOS 上不支持。
- 矢量的形状在客户端运行时存在性能的损耗。尤其是在形状图层数量比较大的情况下。如果一个形状无形变要求，可以考虑转化成png图片替代，以提高运行性能。
- 建议用“形状”图层替代“纯色”；纯色模块自带一个无意义的“蒙版”，对客户端运行有不必要的性能损耗，量大时引起客户端卡顿；
- 其他兼容性上的问题可查阅：[https://www.yuque.com/lottie/lint](https://www.yuque.com/lottie/lint)



<a name="P9v7j"></a>
### 7、性能方面的建议

- 动画简单化。创建动画时需时刻记着保持 json 文件的精简，比如尽量不使用占用空间最多的路径关键帧动画。诸如自动跟踪描绘、颤动之类的技术会使得 json 文件变得非常大且耗性能。
- 如果有循环的帧，请不要在动画文件里面循环，请数出帧数，让开发自行控制这段动画的循环，能节省相同图层和动画的体积。
- 建立形状图层。将 AI、EPS、SVG 和 PDF 等资源转换成形状图层否则无法在 lottie 中正常使用，转换好后注意删除该资源以防被导出到 json 文件。
- 设置尺寸。在 AE 中可设置合成尺寸为任意大小，但需确保导出时合成尺寸和资源尺寸大小保持一致。
- 在尽量满足效果的情况下，请对路径做适当的裁剪，这个对性能影响很大。
- lottie 进行动画的时候会按照 AE 的设计进行分层，所以要尽量减少层数。
- 若确实没有必要使用路径动画，请将矢量图形替换为 png 图片，并用 transfrom 属性完成动画。
- 可以根据实际状况，斟酌降低动画帧率或者减少关键帧数量，这会减少每秒绘制的次数。
- 精简动画时长，可以循环的动作，就不要在时间轴做两遍，每一次读取关键帧都会消耗性能。编排上尽量避免 a 动作结束，b 动作开始，可以让动作有所重叠，减少动画长度。
- 同类项合并，有些元素是相似的，或者相同的用在了不同的地方，那就把这个元素预合成重复使用这一个元件，可以通过对该预合成的动画属性的调整达到想要的动画效果。
- 尽量减少图层个数。每个图层都会导出成相应的 json 数据，图层减少能从很大程度上减小 json 大小。
- 尽可能所有的图层都是在 AE 里面画出来的，而不是从其他软件引入的。如果是其他软件引入的，很可能导致描述这个图形的 json 部分变得很大。
- 制作的时候，请将动画元素**铺满**整个画布，这样可以避免浪费，也方便前端进行尺寸的调整。
- 如果矢量图形是在 AI 中导出的，请将多余的“组”等没有任何实际效用的元素删掉。
- 删除那些关闭了和无用的属性。
- 只导出 1x 图。
- 为了防止 lottie 导出的兼容性问题，请尽量使用英文版本 AE ，图层需简洁，命名清晰
- 避免大面积矢量部分，以及大面积粒子效果
- 避免使用 3D 等高性能损耗样式



<a name="00b87"></a>
### 8、更换文字和图片

- 在 svg 渲染模式下，开发人员需要一个 id 进行元素查找，设计这边只需要在AE对应图层名字前加上“ # ” 即可。并将命名以后的字符告知到开发人员。并在导出 json 的时候，取消 “Glyphs” 的选中。

![image.png](https://gw.alicdn.com/imgextra/i4/O1CN01b6vFVd1RGW5oI3VOh_!!6000000002084-2-tps-2398-622.png)
![image.png](https://cdn.nlark.com/yuque/0/2020/png/168092/1597677675709-67f326aa-efe5-4ec9-9614-b2229ce484c1.png#align=left&display=inline&height=495&margin=%5Bobject%20Object%5D&name=image.png&originHeight=990&originWidth=1278&size=387946&status=done&style=none&width=639)


<br />导出完成以后，会出现询问字体样式的弹窗，可以不设置，配置以后点击“save”自动生成完毕。<br />![image.png](https://gw.alicdn.com/imgextra/i3/O1CN01X9AQ7R1Emx8ek1DcV_!!6000000000395-2-tps-640-496.png) <br />
<br /> 
<a name="mNn9O"></a>
### 9、动画被导入 AE 的时候尽量重新绘制图片
动画的图片我们一般都是使用sketch或者AI画好以后再导进去AE。但是最好的解决方案把图片重新在AE里面重新绘制。而在AE里面重新绘制就需要用到「从矢量图层创建形状」这个了。因为设计师把图片“画”进AE之后，连图片包都不需要了，直接一个动画一段代码就完成了。这样就省去很多沟通时间和解决适配的问题了。这里提供两个方法。<br />      
1. sketch 导出 svg 格式后转成 .ai 文件<br />第一种方法比较复杂，但不会踩雷。其实就是把切图转成 ai 格式导进去 ae 再创建形状。可是这样处理后导入AE，形状可以保留更多编辑。具体步骤如下：

   - sketch 里面把切图导出 svg 格式
   - svg 转成.ai格式导进去 AE
   - 使用 AE 的「从矢量图层创建形状」重新绘制

2. 使用「AEUX」插件<br />
   - 这个对于比较简单的图形还是支持导出的。但是遇到相对应复杂的图形，例如使用了布尔运算绘制的图形，就会有一些效果缺失等奇奇怪怪的问题。插件链接下载和教程网址：[https://oursketch.com/plugin/aeux](https://oursketch.com/plugin/aeux) <br />

<a name="KE8oQ"></a>
### 10、官方提供的属性支持度
![image.png](https://gw.alicdn.com/imgextra/i4/O1CN01hoo8Nt1U5vmjDCPJS_!!6000000002467-2-tps-593-2336.png)
