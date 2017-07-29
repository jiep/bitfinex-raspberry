const five = require("johnny-five");
const Raspi = require("raspi-io");

var board = new five.Board({
	io: new Raspi()
}); 

board.on("ready", () => {
	console.log("Raspberry is ready");
	var led = new five.Led("P1-11");
	led.blink();
}); 
