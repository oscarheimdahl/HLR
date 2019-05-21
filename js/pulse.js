let started = false;
let time = 0;
let startTime = 0;
let presses = 0;
let showClock = true;
function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('p5');
	background(100, 0, 0);
}

function draw() {
	background(200, 0, 0, 4);
	if (started && showClock) {
		let seconds = Math.round((Date.now() - startTime) / 1000);
		$('#time')
			.empty()
			.append(seconds);
	}
}

function windowResized() {
	createCanvas(windowWidth, windowHeight);
	background(100, 0, 0);
}

function keyPressed() {
	if (keyCode === 32) {
		background(100, 0, 0);
		if (!started) {
			$('#time').empty();
			$('#ppm').empty();
			startTime = Date.now();
			started = true;
			loop();
		}
		presses++;
	}
	if (keyCode === 13) {
		started = false;
		time = Date.now() - startTime;
		let minutes = time / 60000;
		let ppm = Math.round((presses / minutes) * 10) / 10;
		if (ppm < 120 && ppm > 100) {
			background(0, 120, 0);
			noLoop();
		}
		$('#ppm')
			.empty()
			.append(ppm);
		console.log('Presses/min: ' + ppm);
		presses = 0;
	}
	if (keyCode === 75) {
		if (showClock) $('#time').css('display', 'none');
		else $('#time').css('display', 'initial');
		showClock = !showClock;
	}
}
