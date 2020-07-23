
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
- 短轮询
- 长轮询
- sse协议通讯
- websocket通讯
