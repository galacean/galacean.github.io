---
order: 0
title: 项目
type: 编辑器
group: 基础操作
label: 编辑器/基础操作
---

## 创建项目

在项目列表页点击“创作项目”，填好项目名称和项目描述后点击“编辑”按钮就会进入项目编辑界面。

  ![Untitled4](https://gw.alipayobjects.com/mdn/mybank_yulibao/afts/img/A*GVB1QYtYagEAAAAAAAAAAAAAARQnAQ)

### 创建项目选项

- 平台：目前有“Oasis”和“方舟”两个选项，默认Oasis平台。方舟是一个依托编辑器内核通过集成插件来实现的动作库平台，我们将来会有单独的文档介绍。
  
  ![image-20210721164322101](https://gw.alipayobjects.com/mdn/mybank_yulibao/afts/img/A*7MSdSa1KdbwAAAAAAAAAAAAAARQnAQ)
  
- 自定义引擎版本：点开高级选项，可以自定义项目依赖的引擎版本。不建议普通用户自定义，编辑器会默认使用 Oasis 引擎的 latest 版本创建项目。

  ![image-20210721164557958](https://gw.alipayobjects.com/mdn/mybank_yulibao/afts/img/A*3hLJT7KSok8AAAAAAAAAAAAAARQnAQ)

## 项目列表

在项目列表界面可以对项目进行克隆、删除和编辑项目成员等操作。

### 克隆
点击“克隆”按钮后，编辑器会克隆所选项目，克隆项目会命名为“xxx-copy”

  ![Untitled5](https://gw.alipayobjects.com/mdn/mybank_yulibao/afts/img/A*Tl-5QoTzGckAAAAAAAAAAAAAARQnAQ)

### 编辑项目成员
项目创建好后，只有创建者才有权限编辑项目。如果你希望与其他同学一起编辑，可以在项目列表中添加/删除项目成员。

  ![Untitled6](https://gw.alipayobjects.com/mdn/mybank_yulibao/afts/img/A*GXaTSY5XRiEAAAAAAAAAAAAAARQnAQ)


## 项目升级
项目创建后，项目引用的引擎版本是不变的。如果 Oasis 引擎有发布新版本，菜单烂的项目菜单会有小红点提示。

![image-20210721170216979](https://gw.alipayobjects.com/mdn/mybank_yulibao/afts/img/A*SjgER5VoDn8AAAAAAAAAAAAAARQnAQ)

打开“项目”菜单，可以根据项目需求选择升级

  ![Untitled7](https://gw.alipayobjects.com/mdn/mybank_yulibao/afts/img/A*5wFOSqotxUkAAAAAAAAAAAAAARQnAQ)

项目升级后，原来版本的项目会自动备份，命名为“xxx-copy”。

## 快照
快照包含了项目在一个时间点的所有数据，你可以在将来恢复到指定快照的状态。

### 创建快照
点击“项目”菜单，选择“版本控制”，在弹出层中点击“添加快照”，填入快照名称。

  ![Untitled8](https://gw.alipayobjects.com/mdn/mybank_yulibao/afts/img/A*0SNWTKw1jhcAAAAAAAAAAAAAARQnAQ)

### 恢复快照
如果你希望将项目状态恢复回某个版本的快照，在“版本控制”弹出层中选择对应的快照，点击“回滚到此版本“后，项目会自动回滚，并且回滚之前的状态也会自动备份到快照中。

  ![Untitled9](https://gw.alipayobjects.com/mdn/mybank_yulibao/afts/img/A*SYRSTrmOIsIAAAAAAAAAAAAAARQnAQ)
