# 连环夺宝   lhdb
一个运行在[phaser](<http://phaser.io/>)上的网页[连环夺宝]。

---
 

## 描述
- 在学习 phaser 项目后，做的一个完整的 单机游戏，用最精简的代码，达到练手实践效果。 (后续稍加修改可以实现,泡泡龙 消消乐 类型))

---

## 项目目录简介
``` 
assets                        静态资源 
build                         webpack构建后的文件目录
 
src             
    |___game                  
       |___ initModel.js      初始化模块 提前加载当前项目所需的静态资源
       |___ logicModel.js     游戏逻辑模块
       
    |___scenes                游戏场景
       |___ endScene.js       结束页面
       |___ mainScene.js      主游戏页面
       |___ preloadScene      进入游戏前预先加载页面
    index.js                  入口
     
``` 

---
 
## 安装
``` 
1. 安装node  yarn
2. yarn add html-webpack-plugin@3.2.0
3. yarn run start
 
注: 开发环境下 用根目录下的index.html 作为本地测试页面，其中页面中,根目录下看不到project.bundle.js 但还是引入了，不会报错。  热更新插件会默认生成，能引用到.


```

## 素材图
- 来自 opengameart.org  找游戏素材图