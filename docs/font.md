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
