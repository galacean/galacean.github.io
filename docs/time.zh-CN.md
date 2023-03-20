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
| [timeScale](${api}core/Time#timeScale)                     | 时间的缩放                                                   |
| [maximumDeltaTime](${api}core/Time#maximumDeltaTime)       | 最大间隔，帧率过低或卡顿时, `deltaTime` 不会超过 `maximumDeltaTime` * `timeScale` |
| [frameCount](${api}core/Time#frameCount)                   | 引擎启动后累计的帧数                                         |
| [deltaTime](${api}core/Time#deltaTime)                     | 上一帧距离当帧的增量时间，以秒为单位                         |
| [unscaledDeltaTime](${api}core/Time#unscaledDeltaTime)     | 上一帧距离当帧的增量时间，以秒为单位，并且忽略了 [timeScale](${api}core/Time#timeScale) 影响 |
| [elapsedTime](${api}core/Time#elapsedTime)                 | 引擎启动后累计经过的时间                                     |
| [actualElapsedTime](${api}core/Time#actualElapsedTime) | 引擎启动后累计经过的时间，并且忽略了 [timeScale](${api}core/Time#timeScale) 和 [maximumDeltaTime](${api}core/Time#maximumDeltaTime) 影响 |
