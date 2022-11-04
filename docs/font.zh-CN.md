---
order: 6
title: 字体资源
type: 图形
group: 2D
label: Graphics/2D
---

[Font](${api}core/Font) 是字体资源，用于表示文本使用的字体。

## 属性说明

| 属性名 | 属性类型 | 描述 |
| :--- | :--- | :--- |
|[name](${api}core/Sprite#name)|string|字体资源名称，用来唯一标识一个字体资源，目前用这个字段来表示需要的系统字体|

## 使用 Font
```typescript
const font = Font.createFromOS(engine, "Arial");
```

## 使用自定义 Font，目前支持格式：ttf/otf/woff
```typescript
const font = await engine.resourceManager.load({
  url: "https://gw.alipayobjects.com/os/bmw-prod/109b0cd8-8762-4919-bb0c-ed969d6144c9.ttf",
  type: AssetType.SourceFont
});
```