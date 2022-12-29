---
order: 5
title: Asset Panel
type: Editor
group: Basic
label: Editor/Basic
---

# Asset Panel

![image-20221228150531761](https://mdn.alipayobjects.com/rms/afts/img/A*ZAjNRZ02xVkAAAAAAAAAAAAAAARQnAQ/original/image-20221228150531761.png)

The asset panel is the key to resource management of the entire project. Users can create and import assets into the project asset panel, that is, they can use assets to build scenes. Currently supported assets are:

| Supported Assets | Description |
| ---------- | -------------------------------------- ---------------------- |
| Model | Support gltf/glb/fbx file upload, can be dragged into the scene |
| Textures | Support png/jpeg file upload, create 2D textures |
| HDR | Support .hdr file upload, can be used for scene sky, ambient light |
| Material | Directly added to adjust the rendering effect |
| Meshes | cannot be added, only internal meshes and meshes in the model can be used |
| Animation Controller | Directly added to control animation state |
| Sprites | Add directly for 2D effect creation |
| Sprite Atlas | Add directly for 2D material optimization |
| Lottie | Support lottie file (.json) file upload, you need to convert the external link image to base64 |
| Fonts | Support .ttf, .otf, .woff file upload for making 2D text |
| folder | add directly |
|            |                                                              |

## Asset Add 

There are two ways to add assets:

1. Right-click the Assets panel and click Create
2. Click the + button in the upper right corner of the Assets panel

![oasis-drag](https://mdn.alipayobjects.com/rms/afts/img/A*Dl7bQ7C-a7wAAAAAAAAAAAAAARQnAQ/original/oasis-drag.gif)

## Asset Import

There are two ways to import assets

**1. Directly drag in**

You can directly drag the files in the Folder to the assets panel

![oasis-drag](https://mdn.alipayobjects.com/rms/afts/img/A*d9OMQZfHiyAAAAAAAAAAAAAAARQnAQ/original/oasis-drag.gif)

**2. Panel Import**

Click the upload button in the upper right corner of the asset panel, and select the type to be uploaded:

![oasis-drag](https://mdn.alipayobjects.com/rms/afts/img/A*zFaaRJRAGeYAAAAAAAAAAAAAAARQnAQ/original/oasis-drag.gif)

## Asset Delete

Asset deletion can be deleted by right-clicking, or by selecting the asset and clicking the delete button in the upper right corner:

![oasis-drag](https://mdn.alipayobjects.com/rms/afts/img/A*nh1JR4TebMQAAAAAAAAAAAAAAARQnAQ/original/oasis-drag.gif)

## Moving Assets

Drag the asset into the folder, or the directory on the left:

![oasis-drag](https://mdn.alipayobjects.com/rms/afts/img/A*I8oWSpAqH0gAAAAAAAAAAAAAAARQnAQ/original/oasis-drag.gif)

## Select Asset Type to View

Click the button in the upper left corner to select a specific type to view:

![oasis-drag](https://mdn.alipayobjects.com/rms/afts/img/A*s7cHQqnnFzsAAAAAAAAAAAAAAARQnAQ/original/oasis-drag.gif)

## Asset Search

Press command + f in the assets panel, or click the search box:

![oasis-drag](https://mdn.alipayobjects.com/rms/afts/img/A*z9S8TqajrXwAAAAAAAAAAAAAAARQnAQ/original/oasis-drag.gif)