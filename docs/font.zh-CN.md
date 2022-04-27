---
order: 6
title: 字体资源
type: 图形
group: 2D
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
