---
order: 3
title: Spine
type: Animation
label: Animation
---

Spine animation is a kind of `2D skeleton animation` for game development. It can create animation by binding pictures to bones and control them.<br>
Spine animation is excellent in `control` and `flexibility`, it also provide more efficient and concise workflow for art and design.

|  | Effects | Performance | Size | Flexibility | Complexity | Free |
| --- | --- | --- | --- | --- | --- | --- |
| Spine | Excellent | Excellent | Excellent | Excellent | Compliex | NO |
| Lottie | Good | Good | Good | Good | Simple | YES |
| Sequence | Bad | Bad | Bad | Bad | Simple | YES |

Spine animation supports skin changing, blending and control animations with code.

## Preparation

### Designer
Download spine editor and select version 3.8 or above.

### Developer
Add dependencies [@galacean/spine](https://github.com/galacean/engine-spine).

```bash
npm i @galacean/spine --save
```

## Usage

### Export Resource
Export resource files via spine editor: 
![](https://gw.alipayobjects.com/mdn/mybank_yul/afts/img/A*jh0UTYlkKrIAAAAAAAAAAAAAARQnAQ#crop=0&crop=0&crop=1&crop=1&id=xGebk&originHeight=1232&originWidth=1754&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

Galacean spine needs to use resource files of. JSON (or. Bin), Atlas, PNG on runtime. The file formats that can be used are as follows:

#### Export JSON

![](https://gw.alipayobjects.com/mdn/mybank_yul/afts/img/A*VWQEQoiALSwAAAAAAAAAAAAAARQnAQ#crop=0&crop=0&crop=1&crop=1&id=sIw42&originHeight=1342&originWidth=1726&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

#### Export Binary

![](https://gw.alipayobjects.com/mdn/mybank_yul/afts/img/A*gs1HRId9wPcAAAAAAAAAAAAAARQnAQ#crop=0&crop=0&crop=1&crop=1&id=q3yyW&originHeight=1180&originWidth=1710&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

After export, you will find resource files in three formats: JSON (or. Bin), Atlas and PNG in the target folder that Galacean spine can load and play the spine animation on runtime. It should be noted that Galacean Spine only supports loading a single texture at present, so when the map size is too large, it is neccssary to scale the image resources to control the number of maps in one.

For detailed configuration of file export, please refer to the official file of spine：
[http://zh.esotericsoftware.com/spine-export](http://zh.esotericsoftware.com/spine-export/)

### Import Resource

When the _@galacean/spine_ is imported, the resource loader for the spine resource will be automatically registered on [resourceManager]($%7Bapi%7Dcore/Engine#resourceManager) at [engine]($%7Bapi%7Dcore/Engine) [resourceManager].
Through the [load]($%7Bapi%7Dcore/ResourceManager/#load) method of ResourceManager, the spine animation resources can be loaded.

- When the transfer parameter is URL, the default spine animation resources have the same baseurl, just pass the CDN of JSON (or bin) file.

- If you want to pass three parameters (jspng, jspng), then you need to pass three parameters. 

- The resource's type must be specified as spine.


After loading, a spine entity object will be returned synchronously, and the spine animation can be added to the scene directly through the addchild method.

<playground src="spine-animation.ts"></playground>

### Animation Play

When you need to play the animation, you need to get the SpineAnimation component on the spine entity. SpineAnimation component external exposure [animationstate](http://zh.esotericsoftware.com/spine-api-reference#AnimationState) And [skeleton](http://zh.esotericsoftware.com/spine-api-reference#Skeleton) Interface that can play animation with the help of spin core native API.

#### Animation Control

Through the animation state object exposed by SpineAnimation, animation control can be realized, such as loop playing animation,pause animation playback,etc.Here you can refer to the following example.

For detailed API. please refer to the official documentation of AnimationState: [http://zh.esotericsoftware.com/spine-api-reference#AnimationState](http://zh.esotericsoftware.com/spine-api-reference#AnimationState)

#### Animation Event

spine also provides some events for users to develop.The mechanism of animation events is shown in the following figure:
![](https://gw.alipayobjects.com/mdn/mybank_yul/afts/img/A*fC1NT5tTET8AAAAAAAAAAAAAARQnAQ#crop=0&crop=0&crop=1&crop=1&id=JUZeZ&originHeight=280&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

More Detail:
[http://esotericsoftware.com/spine-unity-events](http://esotericsoftware.com/spine-unity-events)

Through the addListener method of animationstate,you can add callback methods when different events are triggered.

### Slot Split

The spine component will merge all the vertices of the spine animation to generate a `Mesh`. The slot with the specified name can be split into separate `Submesh` by using the `addSeparateSlot` method, and then the material of the split slot can be replaced by the `hackSeparateSlotTexture` method.

<playground src="spine-hack-slot-texture.ts"></playground> 
