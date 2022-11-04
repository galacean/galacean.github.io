---
order: 6
title: Font
type: Graphics
group: 2D
label: Graphics/2D
---

[Font](${api}core/Font) is a font resource that represents the font used by the text renderer.

## Parameter description

| parameter | type | description |
| :--- | :--- | :--- |
|[name](${api}core/Sprite#name)|string|Font resource name, which is used to uniquely identify a font resource. Currently, this field is used to represent the required system font.|

## Font usage
```typescript
const font = Font.createFromOS(engine, "Arial");
```

## Custom Font usage，support format: ttf/otf/woff
```typescript
const font = await engine.resourceManager.load({
  url: "https://gw.alipayobjects.com/os/bmw-prod/109b0cd8-8762-4919-bb0c-ed969d6144c9.ttf",
  type: AssetType.SourceFont
});
```