---
order: 3
title: 本地开发指南
type: 编辑器
group: 发布
label: 编辑器/发布
---

> 在 [导出小程序](${docs}editor-export-minprogram-cn) 和 [导出 Web 平台包](${docs}editor-export-web-cn) 之后，部分 Pro Code 用户希望可以通过本地 IDE 和 git 工作流去开发项目，线上只用来编辑场景。本文档针对这类用户提供了一套解决方案。

为了满足此类需求，我们提供两个功能:

- 线上场景文件同步本地
- 本地代码同步到线上

在执行下面功能之前:

1. [导出小程序](${docs}editor-export-minprogram-cn)或者[导出 Web 平台包](${docs}editor-export-web-cn)。
2. 使用 Terminal 进入到工程根目录。
3. 完成 `tnpm install`。

## 线上场景同步本地

只拉取场景文件：

```bash
tnpm run pull
```

## 本地代码同步线上

> 本操作执行时间较慢，建议确认之后再操作。

同步所有脚本文件：

```bash
tnpm run push:script
```
