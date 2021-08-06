## 上传资产

### 使用上传按钮

在资产面板顶部栏的右侧，鼠标移动至第一个按钮即可选择所需的上传资产类型：

<img src="https://gw.alipayobjects.com/zos/OasisHub/addd31fb-1bb5-413e-aea7-7e35d50b7242/image-20210722151210168.png" height="300px" />

编辑器当前支持的上传资产类型：

- 立方纹理

  立方纹理可以用来制作环境映射和天空盒等效果，需包含以 `[px,py,pz,nx,ny,nz].***` 命名的6张图片的文件夹。

- 模型

  上传模型文件（支持`.gltf` `.glb` `.fbx` `.obj`）或包含模型和资源文件（`.bin`、贴图等）的 Zip 压缩包。

- Spine

  需包含 `.json` `.atlas` `.png/jpg` 的 Zip 压缩包。

- 纹理

  支持 `.png` `.jpg` 类型的图片，可多选。

- VFX

  [Mars](https://render.alipay.com/p/s/mars-editor) 编辑器导出的特效工程文件。

### 拖拽文件上传

当然，如果觉得手选上传麻烦的话，你可以直接将文件拖至资产面板区域：

<img src="https://gw.alipayobjects.com/zos/OasisHub/df4e6718-846c-4901-bf87-84177e213e01/Screen%252520Recording%2525202021-07-22%252520at%25252015.14.55.gif" height="300px" />


## 资产面板

### 顶部操作栏

<img src="https://gw.alipayobjects.com/zos/OasisHub/a2b23cbf-1cf2-489b-bba2-71603abb0775/image-20210722153338834.png" height="150px" />

资产面板的顶部栏分为三个部分：

1. 视图查看类型
   - 标准视图

     <img width="150" src="https://gw.alipayobjects.com/zos/OasisHub/41cb9baf-c6e5-4ce9-ae71-b8a35688dd25/image-20210722165947088.png" />

   - 小图标视图

     <img width="150" src="https://gw.alipayobjects.com/zos/OasisHub/60c8f8b1-0415-4fcb-93be-2acf89fdd83a/image-20210722170113845.png" />

   - 列表视图

     <img width="150" src="https://gw.alipayobjects.com/zos/OasisHub/633644bc-652a-4b0f-9874-e4f7ae63b0e8/image-20210722170204288.png" />

2. 资产筛选
   - 类型筛选
   - 关键词筛选
3. 资产管理
   - 上传
   - 新增
   - 删除

<br />

在资产面板也可以右键打开菜单「上传」或「新增」资产：

<img height="150" src="https://gw.alipayobjects.com/zos/OasisHub/ec2c5c54-7bd5-444f-8a49-912611bf68ec/image-20210722173621994.png" />

### 新增资产

<img width="150" src="https://gw.alipayobjects.com/zos/OasisHub/66e4a69e-2c94-4dc6-9807-1af5b1ae51a3/image-20210722175046349.png" />

当前编辑器支持的新增资产类型：
- BlinnPhong 材质
- Standard PBR 材质
- Standard(Specular) PBR 材质
- Unity 材质
- Spirte
- 文件夹（该类资产仅在编辑器生效，用于资产分组）

### 资产列表

#### 资产选择

左键单击资产即可打开资产检查器：

<img height="300" src="https://gw.alipayobjects.com/zos/OasisHub/9ecd2aee-521d-469b-a989-21762e0c8c3e/s_sel.gif" />

按住左键并拖动鼠标，可多选资产：

<img height="150" src="https://gw.alipayobjects.com/zos/OasisHub/dfa3d20e-0a0d-4723-8124-abdd3e6fd6bb/m_sel.gif" />

**多选快捷键**
- `Alt` + `A` (`⌘` + `A` on Mac)：全选
- `Shift`：连续选择
- `Alt`：单独选择

#### 目录

移动资产至某目录，直接拖动操作即可：

<img height="150" src="https://gw.alipayobjects.com/zos/OasisHub/c87c9f27-e76f-4fa4-878c-39d086a9653b/put_in.gif" />

双击文件夹可进入对应目录，可使用顶部的面包屑导航快速切换目录：

<img height="150" src="https://gw.alipayobjects.com/zos/OasisHub/465ad9b6-a5b6-47eb-9c63-604f40e08e70/in.gif" />

#### 重命名

左键单击资产名称即可重命名：

<img height="150" src="https://gw.alipayobjects.com/zos/OasisHub/3fb2d5b5-63b3-4465-9a25-d8b6fb1180dd/image-20210722194724616.png" />


## 常见问题

**Q:** 我找不到我的资产文件了！<br />
**A:** 请检查是否开启了资产筛选。

**Q:** 我明明只删了一个文件，为什么消失了好几个？<br />
**A:** 部分资产有关联关系（比如模型和纹理），被删时会连同其他资产一并删除。
