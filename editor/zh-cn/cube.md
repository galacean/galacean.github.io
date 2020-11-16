# 创建一个立方体

这个教程将带你开发一个“旋转的方块”示例。

1. 打开 [Oasis Editor](https://oasistwa.alipay.com/3d)，点击 *创作项目* ：

![截屏2020-07-31_下午8_03_41.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/6148/1596197120306-4d52f22a-754a-4e16-bb1f-033f993e0088.png#align=left&display=inline&height=435&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2020-07-31_%E4%B8%8B%E5%8D%888_03_41.png&originHeight=435&originWidth=1331&size=46391&status=done&style=none&width=1331)

2. 输入项目名称和描述，点击 *确定* ：

![截屏2020-07-31 下午8.07.43.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/6148/1596197272360-9de80539-c843-4893-8f9c-333a1bf525ef.png#align=left&display=inline&height=327&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2020-07-31%20%E4%B8%8B%E5%8D%888.07.43.png&originHeight=327&originWidth=1162&size=19116&status=done&style=none&width=1162)

3. 进入编辑，可以看到默认的场景中已经有一个方块，点击左侧 *层级* 的 *model* 节点，可以看到方块呈选中状态，并且右边的 *节点检查器* 中添加了[几何体模型](${book.manual}component/basic-geometry) 组件：

![截屏2020-07-31_下午8_21_1811.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/6148/1596198291822-23a8fdea-1102-41b3-9974-395030b38b94.png#align=left&display=inline&height=767&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2020-07-31_%E4%B8%8B%E5%8D%888_21_1811.png&originHeight=767&originWidth=1531&size=286769&status=done&style=none&width=1531)

4. 点击右上角的 *预览* 按钮，就可以在浏览器新窗口中预览场景：

![截屏2020-07-31_下午8_16_36.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/6148/1596197886229-667788c0-b359-44ae-b5bd-59ac3095a1e4.png#align=left&display=inline&height=513&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2020-07-31_%E4%B8%8B%E5%8D%888_16_36.png&originHeight=513&originWidth=840&size=153700&status=done&style=none&width=840)

5. 接下来给方块增加旋转功能，鼠标移到 *资源* 面板的 *+* 上，点击浮层中的 [脚本](${book.manual}component/script)：

![截屏2020-07-31_下午8_59_09.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/6148/1596200402170-65944355-1cee-41dd-b607-fd42ce0e5e86.png#align=left&display=inline&height=606&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2020-07-31_%E4%B8%8B%E5%8D%888_59_09.png&originHeight=606&originWidth=761&size=143620&status=done&style=none&width=761)
重命名为 _rotate.ts _:
![截屏2020-07-31_下午9_04_10.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/6148/1596200709199-7d0229fa-5d22-4e94-9b17-bc6d20cf0ee1.png#align=left&display=inline&height=277&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2020-07-31_%E4%B8%8B%E5%8D%889_04_10.png&originHeight=277&originWidth=1084&size=25836&status=done&style=none&width=1084)

6. 选中 *model* 节点，点击 *添加组件* 按钮，选择 *脚本/_rotate.ts_*:

![截屏2020-07-31_下午9_07_22.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/6148/1596200959974-fc5c1ec1-bfaa-4351-a446-b013143e5f6c.png#align=left&display=inline&height=920&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2020-07-31_%E4%B8%8B%E5%8D%889_07_22.png&originHeight=920&originWidth=940&size=191195&status=done&style=none&width=940)

7. 双击 *rotate.ts* ，打开代码编辑器，可以看到自动生成的[脚本组件](${book.manual}component/script)模板：

![截屏2020-07-31 下午9.11.20.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/6148/1596201101293-ff782d99-178b-4e1c-8b22-9bb092cfd8d3.png#align=left&display=inline&height=897&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2020-07-31%20%E4%B8%8B%E5%8D%889.11.20.png&originHeight=897&originWidth=1530&size=156724&status=done&style=stroke&width=1530)

8. 在 [onUpdate](${book.manual}component/script?id=组件生命周期函数) 函数中增加以下代码：

```typescript
private _tempVector = new Vector3(0, 1, 0);

onUpdate(deltaTime) {
  this.entity.transform.rotate(this._tempVector);
}
```
使用快捷键 _Command+S _保存文件，即可看到右侧预览面板中方块旋转。

# 小结
通过这个简单的示例，我们看到编辑器为我们省去了大量的**样板式代码**的编写工作量，使开发者专注于逻辑的开发。因此，我们强烈推荐你使用编辑器开发项目，在复杂项目中能省去更多时间。