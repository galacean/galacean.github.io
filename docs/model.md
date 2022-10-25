---
order: 3
title: 3. Load a 3D Model
type: Introduction
group: Basic
label: Introduction/Basic
---

glTF (GL Transmission Format) is a specification released by [khronos](https://www.khronos.org/) that can efficiently transmit and load 3D scenes. Like traditional model formats such as FBX and OBJ, it basically supports 3D scenes. All the features in Oasis are currently the preferred 3D file format recommended by Oasis.

The products of glTF are generally divided into (.gltf + .bin + png) or (.glb), the former is suitable for scenes with large pictures, so the pictures and models are separated, and models and textures can be loaded asynchronously; the latter is suitable for models For scenarios with large files, all data will be stored in binary, and the model needs to be parsed after all data is parsed.

## Basic usage

To load a 3D model, just call the [load](${api}core/ResourceManager/#load) method of the engine [ResourceManager](${docs}resource-manager) instance, as follows:

```typescript
engine.resourceManager.load("{glTF source}").then((gltf) => {
  entity.addChild(gltf.defaultSceneRoot);
});
```

If used in an asynchronous function body, you can use the `async/await` syntax:

```typescript
const gltf = await this.engine.resourceManager.load("{glTF source}");

entity.addChild(gltf.defaultSceneRoot);
```

The following demo:

<playground src="gltf-basic.ts"></playground>

## More cases

glTF has a lot of features, the official website provides many [examples](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0) for reference, and Oasis also provides a reprinted version For a quick overview, you can switch between different glTF models through the following **glTF List**.

Go to [glTF resources](${docs}gltf) to learn more about glTF related designs.

<playground src="gltf-loader.ts"></playground>
