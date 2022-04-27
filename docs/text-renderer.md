---
order: 8.2
title: TextRenderer
type: Graphics Rendering
group: 2D Rendering
---

[TextRenderer](${api}core/TextRenderer) Used to display texts in 3D/2D scenes.

<playground src="text-renderer.ts"></playground>

## Basic usage

1、Create [TextRenderer](${api}core/TextRenderer) to display text    
2、Set [Font](${docs}font-cn) object by [font](${api}core/TextRenderer#font)    
3、Set the text to be displayed by [text](${api}core/TextRenderer#text)    
3、Set font size by [fontSize](${api}core/TextRenderer#fontSize)    
4、Set color by [color](${api}core/TextRenderer#color)    

```typescript
import { Camera, Color, Font, FontStyle, TextRenderer, Vector3, WebGLEngine } from "oasis-engine";

const textEntity = rootEntity.createChild("text");
// Add TextRenderer for entity
const textRenderer = textEntity.addComponent(TextRenderer);
// Set font
textRenderer.font = Font.createFromOS(engine, "Arial");
// Set text
textRenderer.text = "First text for Oasis！";
// Set fontSize
textRenderer.fontSize = 36;
// Set color
textRenderer.color.setValue(1, 0, 0, 1);
```

## Set width and height

You can set the size of the text in 3D space through width and height, mainly for the following purposes： 

1、Calculations for bounding box      
2、When multiple lines of text need to be displayed, the width and height will be combined to confirm the wrapping principle    

```typescript
// Set width
textRenderer.width = 10;
// Set height
textRenderer.height = 10;
```

## Set line spacing

When you need to display multiple lines of text, you can use lineSpacing to set the vertical spacing between two lines of text

```typescript
// Set line spacing
textRenderer.lineSpacing = 0.1;
```

## Multi-line text display

When the text is too long, you may want the text to be displayed on multiple lines. At this time, you can set the wrapping mode to be enabled through the enableWrapping field. After the wrapping mode is turned on, the wrapping will be performed according to the width set previously. If the width is set to 0 at this time, then the text will not render

```typescript
// Set wrapping enable
textRenderer.enableWrapping = true;
```

## Text overflow

When displaying multiple lines of text, there may be too many lines of text. At this time, you can set whether to overflow a part of the display through the overflowMode field, and only keep the content within the set height for display. The specific display content is also aligned with the text in the vertical direction. Related (see: text alignment), as follows:

```typescript
// Text overflow
textRenderer.overflowMode = OverflowMode.Overflow;
// Text truncate
textRenderer.overflowMode = OverflowMode.Truncate;
```

## Text alignment

Text alignment is used to set how the text is displayed within the width and height when the width and height are specified, as follows:

| parameter | type | description |
| :--- | :--- | :--- |
|[horizontalAlignment](${api}core/TextRenderer#horizontalAlignment)|[TextHorizontalAlignment](${api}core/TextHorizontalAlignment)|Horizontal Alignment: Left/Center/Right|
|[verticalAlignment](${api}core/TextRenderer#verticalAlignment)|[TextVerticalAlignment](${api}core/TextVerticalAlignment)|Vertical Alignment：Top/Center/Bottom|

## Example of multi-line text

<playground src="text-wrap-alignment.ts"></playground>
