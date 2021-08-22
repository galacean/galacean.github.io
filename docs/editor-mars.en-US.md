---
order: 8
title: Mars Component
type: Editor
---

Mars is a very powerful tool to help us create web special effects, including a [special effects editor](https://render.alipay.com/p/s/mars-editor/) and a special effects playback library. If you want to know more about Mars, please go to [Mars](https://yuque.antfin-inc.com/oasisgroup/mars).

## Usage

Before using our engine to play Mars special effects, designers need to use Mars to make special effects and export the `.vfx` file. If you don’t know Mars, please take a look at [here](https://render.alipay.com/p/s/mars-editor/#).

1. After the developer gets the `.vfx`, first upload the `.vfx` file to our Oasis editor, as follows:

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*lhieRKWLn64AAAAAAAAAAAAAARQnAQ)

2. Select an entity and add the Mars component as follows:

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*zIECQJ0MzCsAAAAAAAAAAAAAARQnAQ)

3. After adding the Mars component, you can select the corresponding `.vfx` and set the animation to be played, as follows:

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*HGUdTLoJuHcAAAAAAAAAAAAAARQnAQ)

4. After completing the above steps, you can view the effect by adjusting the parameters. The parameters are described as follows:

| parameter | description |  |
| :--- | :--- | --- |
| `resource` | Select the _vfx_ resource file exported by Mars |  |
| `compositionName` | Each _vfx_ file contains one or more composition, just select the one to be played, `null` means not to play any one |  |
| `autoPlay` | Whether to play automatically, if checked, it will play automatically when running, otherwise you need to manually call `play` to play |  |