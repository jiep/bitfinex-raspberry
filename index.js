const WebSocket = require('ws')

const wss = new WebSocket('wss://api.bitfinex.com/ws/2')
wss.onmessage = (msg) => console.log(msg.data)
wss.onopen = () => {
  wss.send(JSON.stringify({"event":"subscribe", "channel":"ticker", "pair":"BTCUSD"}));
}
