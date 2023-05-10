\---

order: 7

title: Time

type: Core

label: Core

\---

`Time` Tools for get time information：

## 属性

| 名称                                                   | 释义                                                         |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| [timeScale](${api}core/Time#timeScale)                 | The scale of time                                            |
| [maximumDeltaTime](${api}core/Time#maximumDeltaTime)   | The maximum delta time, when the frame rate is too low or stuck |
| [frameCount](${api}core/Time#frameCount)               | The total number of frames since the start of the engine     |
| [deltaTime](${api}core/Time#deltaTime)                 | The delta time in seconds from the last frame to the current frame, will not exceed  [maximumDeltaTime](${api}core/Time#maximumDeltaTime) *  [timeScale](${api}core/Time#timeScale) |
| [actualDeltaTime](${api}core/Time#actualDeltaTime)     | The actual delta time in seconds from the last frame to the current frame，ignore [timeScale](${api}core/Time#timeScale) and [maximumDeltaTime](${api}core/Time#maximumDeltaTime) impact |
| [elapsedTime](${api}core/Time#elapsedTime)             | The elapsed time in seconds since the start of the engine    |
| [actualElapsedTime](${api}core/Time#actualElapsedTime) | The unscaled elapsed time in seconds since the start of the engine |

