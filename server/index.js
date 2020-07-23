/*
 * @Date: 2020-07-23 14:58:31
 * @LastEditors: kjs
 * @LastEditTime: 2020-07-23 15:44:47
 * @FilePath: \im\server\index.js
 */
const express = require('express');
const cors = require("cors")
const WebSocket = require('ws');

const app = express();
app.use(cors())//跨域

//需要发送到浏览器的数据
const stepArr = [
    {
        type: "预约",
        status: 1,//0 未检查 1 线上已检查 
    },
    {
        type: "签到",
        status: 0,
    },
    {
        type: "缴费",
        status: 1,
    },
    {
        type: "检验检查",
        status: 0,
    },
    {
        type: "报告",
        status: 0,
    },
    {
        type: "取药",
        status: 0,
    }
]

// 短轮询 浏览器通过设置定时器不断的请求该接口获取服务器的内容
app.get('/polling', function (req, res) {
    res.json(stepArr);
});

//长轮询
app.get('/comet', function (req, res) {
    res.json(stepArr);
});

//基于iframe的长连接流模式

//server-sent event (sse) 由浏览器发起与服务器之间的tcp连接，并维持这个连接直到任一方断开
app.get('/sse', function (req, res) {
    res.header({
        "Content-Type": "text/event-stream",//表示该响应头为事件流，客户端不会关闭连接，等待服务端不停发送响应结果
        "Cache-Control": "no-cache",//浏览器不触发强缓存
        "Connection": "keep-alive"
    });
    res.write("retry: 2000\r\n"); // 指定通信的最大间隔时间,2s发送一次信息到浏览器
    res.write(`data: ${JSON.stringify(stepArr)}\n\n`);//当res.write的数据data 以 \n\n 结尾时默认该次消息发送完毕。浏览器通过触发onmessage的方法
    res.end(); // 不加end不会认为本次数据传输结束 会导致不会有下一次请求
});


//websocket 全双工通信
const wss = new WebSocket.Server({ port: 8888 });
wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
        console.log("这个是浏览器发给我的：" + msg);
        setInterval(()=>{
            //每2秒向浏览器推送消息
            ws.send(JSON.stringify(stepArr))
        },2000)
    })

    ws.on("close",()=>{
        console.log("websocket 关闭了");
    })
})
app.get('/websocket', function (req, res) {
    res.send('respond with a resource');
});

app.listen(3000);