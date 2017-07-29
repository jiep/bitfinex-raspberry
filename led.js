const five = require("johnny-five");
const Raspi = require("raspi-io");

const BFX = require('bitfinex-api-node')

const API_KEY = null
const API_SECRET = null

const opts = {
  version: 2,
  transform: true
}

const bws = new BFX(API_KEY, API_SECRET, opts).ws

bws.on('error', console.error)

var board = new five.Board({
	io: new Raspi()
});

bws.on('open', () => {
	bws.subscribeTrades('BTCUSD')
});

board.on("ready", () => {
	board.io.reset();
	var lastvalue = 0;

	var led_red = new five.Led("GPIO4");
	var led_orange = new five.Led("GPIO17");
	var led_green = new five.Led("GPIO18");

	var leds = [led_red, led_orange, led_green];

	var array = new five.Leds(leds);

	console.log("Raspberry is ready");

	bws.on('trade', (pair, trade) => {
		let price = trade[1].PRICE;
		if(price - lastvalue > 0){
			led_green.on();
		}else if(price - lastvalue < 0){
			led_red.on();
		}else{
			led_orange.on();
		}
		lastvalue = price;
		
	  console.log("Price", price);
	});

});

process.on('SIGINT', function() {
	array.off();
	process.exit();
});

