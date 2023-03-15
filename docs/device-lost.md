\---

order: 4

title: Device Restore

type: Resource

label: Resource

\---

Since the GPU is a shared resource, in some cases the GPU may reclaim control, resulting in the loss of your program's GPU device. For example, the device may be lost in the following situations:

- A page is stuck for too long
- Multiple pages take too much GPU resources, all pages lose context and restore only the foreground page
- Switch the graphics card or update the graphics card driver on the PC device

After the device is lost, the engine will automatically restore all the contents of the program at the right time, and the user usually does not need to care about it. When necessary, the user can code the device loss and recovery logic through the following mechanism.

### Lost and restored handling

When the GPU device is lost, `Engine` will dispatch the `devicelost` event, and the user can do some logic such as user prompts or save configuration:

```typescript
engine.on("devicelost", () => {
  // Do some device lost logic here
  // For example，prompt user or save configuration etc
});
```



The engine supports automatic recovery of GPU devices. When the program can be restored, `Engine` will dispatch the `devicerestored` event. The engine will automatically rebuild low-level GPU resources such as textures, buffers, and shaders, and will try to automatically restore their data content. Usually, resources created by means of Loader and PrimitiveMesh provided by the engine can fully automatically restore their content, and developers do not need to do anything. Manual processing is only required when the developer modifies the resource content by himself, such as manually modifying the pixel content of the texture.

```typescript
engine.on("devicerestored", () => {
  // Do some device restore logic here
  // For example，restore user-modified texture content
  texture.setPixelBuffer(pixels, 0, offsetX, offsetY, width, height);
});
```



### Custom content restorer

Another situation is that the resource is completely created by the developer, such as custom [Loader](${docs}resource-manager) or programmatically generated resources. In addition to being handled in the `devicerestored` event in the above way, it can also be implemented through a custom content restorer. The following case is to register a custom restorer for the texture created by the user and register it in the `ResourceManager`. When the device needs to be restored, the `restoreContent` method is automatically triggered and restores its content.

```typescript
// Step 1: Define content restorer
export class CustomTextureContentRestorer extends ContentRestorer<Texture2D> {
  
  /**
   * Constructor of CustomTextureContentRestorer.
   * @param resource - Texture2D resource
   * @param url - Texture2D content source url
   */
  constructor(resource: Texture2D, public url: string) {
    super(resource);
  }

  /**
   * @override
   */
  restoreContent(): AssetPromise<Texture2D> | void {
    return request<HTMLImageElement>(this.url).then((image) => {
      const resource = this.resource;
      resource.setImageSource(image);
      resource.generateMipmaps();
      return resource;
    });
  }
} 

// Step 2: Register Content Restorer
resourceManager.addContentRestorer(new CustomTextureContentRestorer(texture, url));
```

NOTE: Restorer implementations are not recommended to be dependent and CPU-intensive

### Simulate device loss and recovery

The probability of triggering device loss and recovery in actual projects is small. In order to facilitate developers to test program performance and logic processing after device loss and recovery, `Engine` provides a built-in method to simulate device loss and recovery.

| Method                                                     | Explain      |
| ---------------------------------------------------------- | ------------ |
| [forceLoseDevice](${api}core/Engine#forceLoseDevice)       | 强制丢失设备 |
| [forceRestoreDevice](${api}core/Engine#forceRestoreDevice) | 强制恢复设备 |

### Reference

- 《WebGL Handling Context Lost》：https://www.khronos.org/webgl/wiki/HandlingContextLost