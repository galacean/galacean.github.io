\---

order: 7

title: 时间

type: 核心

label: 核心

\---

`Time` 包含了引擎时间相关的信息：

## 属性

| 名称                                                         | 释义                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [timeScale](${api}core/Engine#timeScale)                     | 时间的缩放                                                   |
| [maximumDeltaTime](${api}core/Engine#maximumDeltaTime)       | 最大间隔，帧率过低或卡顿时, `deltaTime` 不会超过 `maximumDeltaTime` * `timeScale` |
| [frameCount](${api}core/Engine#frameCount)                   | 引擎启动后累计的帧数                                         |
| [deltaTime](${api}core/Engine#deltaTime)                     | 上一帧距离当帧的增量时间，以秒为单位                         |
| [unscaledDeltaTime](${api}core/Engine#unscaledDeltaTime)     | 上一帧距离当帧的增量时间，以秒为单位，并且忽略了 [timeScale]((${api}core/Engine#timeScale)) 影响 |
| [elapsedTime](${api}core/Engine#elapsedTime)                 | 引擎启动后累计经过的时间                                     |
| [unscaledElapsedTime](${api}core/Engine#unscaledElapsedTime) | 引擎启动后累计经过的时间，并且忽略了 [timeScale]((${api}core/Engine#timeScale)) 影响 |
