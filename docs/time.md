\---

order: 7

title: Time

type: Core

label: Core

\---

`Time` Tools for get time information：

## 属性

| 名称                                                         | 释义                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [frameCount](${api}core/Engine#frameCount)                   | The total number of frames since the start of the engine                                  |
| [deltaTime](${api}core/Engine#deltaTime)                     | The delta time in seconds from the last frame to the current frame                               |
| [unscaledDeltaTime](${api}core/Engine#unscaledDeltaTime)     | The unscaled delta time in seconds from the last frame to the current frame，ignore [timeScale]((${api}core/Engine#timeScale)) impact |
| [elapsedTime](${api}core/Engine#elapsedTime)                 | The elapsed time in seconds since the start of the engine                                    |
| [unscaledElapsedTime](${api}core/Engine#unscaledElapsedTime) | The unscaled elapsed time in seconds since the start of the engine，ignore [timeScale]((${api}core/Engine#timeScale)) impact |
| [timeScale](${api}core/Engine#timeScale)                     | The scale of time                                                  |