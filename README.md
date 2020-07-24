
# 运行方式

### 1. 克隆项目到本地
```
git clone https://github.com/kangjs7854/im.git
```
### 2. client为浏览器客户端 server为node服务端，进入server文件夹，安装express依赖，运行服务器
```
cd server 
npm i 
node index.js//什么都没发生才是正确的---鲁迅
```
打开浏览器输入http://localhost:3000/ 查看服务器运行状态

### 3. 打开index.html页面，使用cdn引入了vue和axios，可以在代码中调试不同的通讯方式
#### 短轮询
> 就是浏览器不断的发送http请求，前往服务器获取新的内容

一般常见方法是就是使用定时器
+ 优点: 实现非常简单，兼容性比较好
+ 缺点：非常消耗资源，造成浪费

#### 长轮询
> 分为基于http的长轮询，以及基于iframe的长连接流模式

浏览器发送请求后服务端不会立即返回数据，保持连接状态直到有数据更新才返回给浏览器
+ 优点：相比短轮询，减少了一定次数的http请求
+ 缺点：还是会造成一定资源的浪费

- sse协议通讯
> 
- websocket通讯
