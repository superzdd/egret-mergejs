# 打包白鹭引擎发布后的代码

## 背景

使用白鹭引擎开发 html5 时，往往会碰到这样一个情况：

> 发布(publish)后，会生成一个 js 文件夹，里面有很多以随机字符串结尾的 js 文件(数了一下，一共 8 个，具体数量不一定是 8 个，根据引用的 egret 库多少来定)。同时，在 js 文件夹外的 manifest.json 文件中，包含了 js 文件夹中每个 js 文件的引用。

这个情况会造成两个问题：

1. 有多少个 js 文件就会造成多少个文件请求，这样的请求数量越少越好。
2. 在真实项目中，往往会碰到将 js 文件放到 cdn 上的情况，这是就需要修改 manifest.json 中的 js 链接。如果每次在 publish 后都进行这样的修改，会比较麻烦，浪费时间。

基于以上两点，我写了一个 mergejs 的小文件，目的是在发布完成后，可以简化上述问题带来的重复劳动。

## 使用方法

### step1

安装 nodejs，如果没有安装 nodejs 的同学请先跳转到 node 官网安装

### step2

下载本代码中的 app.js，将其复制到需要打包的 egret 项目文件夹下：

例如，如果下面是一个常规的白鹭引擎发布后的文件夹路径：

```
D:\xxx\bin-release\web\200204213233
```

那将 app.js 复制到改文件夹后，app.js 的路径即为：

```
D:\xxx\bin-release\web\200204213233\app.js
```

### step3

资源地址替换，**注意：此步骤很重要**。

如果碰到今后资源文件和 index.html 文件放在不同服务器上的情况，比如资源文件要放 cdn 上。那需要修改 cdn 路径，否则的话，也要改成本地相对引用。

打开 app.js，将倒数第二行

```
let replaceURL = 'http://xxx.xxx.com/project-name';
```

中的 url 地址替换成你项目真正发布后资源所在的地址，如果资源地址和 index.html 地址在同一文件夹下，请把 `replaceURL` 替换成`'./'`。

修改完成后，保存。

### step4

运行 cmd，cd 到当前文件夹，执行命令

```
node app.js
```

执行完成后，app.js 将会在当前文件夹下新增一个 4 位随机数的文件夹，该文件夹中包含了三个文件，分别是：

-   gamexxxxx.js
-   mergeyyyyy.js
-   manifest.json

其中，xxxxx 和 yyyyy 都是 5 位随机数，`manifest.json`中包含了这两个 js 的路径引用，打包完成。
