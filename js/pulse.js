let started = false;
let time = 0;
let startTime = 0;
let presses = 0;
let showClock = false;

let pulse = false;
let balls = [];

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('p5');
	$('#i').click(() => {
		$('#instructions').toggle();
	});
}

function draw() {
	background(44, 133, 157);
	noStroke();
	fill('#ba0031');
	if (started) {
		let seconds = Math.round((Date.now() - startTime) / 1000);
		$('#time')
			.empty()
			.append(seconds);
	}
	if (pulse) {
		for (let i = 0 - 1; i < balls.length; i++) {
			ellipse(balls[i], height / 2, 20, 20);
			balls[i] -= 5;
			if (balls[i] < width / 2) balls.shift();
		}
		ellipse(width + 5, height / 2, 30, 60);
	}
}

function windowResized() {
	createCanvas(windowWidth, windowHeight);
	background(100, 0, 0);
	$('img').css('left', 'calc(50vw - 200px)');
	$('img').css('top', 'calc(50vh - 170px)');
}

function keyPressed() {
	if (keyCode === 32) {
		compression();
	}
	if (keyCode === 13 && started) {
		finish();
	}

	if (keyCode === 80) {
		pulse = !pulse;
		balls = [];
	}
	if (keyCode === 75) {
		if (showClock) $('#time').css('display', 'none');
		else $('#time').css('display', 'inline-block');
		showClock = !showClock;
	}
}

function finish() {
	started = false;
	time = Date.now() - startTime;
	let minutes = time / 60000;
	let ppm = Math.round((presses / minutes) * 10) / 10;
	if (ppm < 120 && ppm > 100) {
		$('img')
			.animate({ width: '450px', left: '-=25', top: '-=25' }, 700)
			.delay(10)
			.animate({ width: '400px', left: '+=25', top: '+=25' }, 700);
		$('#ppm').css('color', 'white');
	}
	$('#ppm')
		.empty()
		.append(ppm + '<span id="ppm-text"><br />komprisioner per minut</span>');
	console.log('Presses/min: ' + ppm);
	presses = 0;
}

function compression() {
	if (!started) {
		$('#time').empty();
		$('#ppm').empty();
		startTime = Date.now();
		started = true;
		loop();
		// $('#content').css('background', 'rgb(44, 133, 157)');
		$('#ppm').css('color', '#888');
	}
	$('img')
		.animate({ width: '410px', left: '-=5', top: '-=5' }, 100)
		.delay(10)
		.animate({ width: '400px', left: '+=5', top: '+=5' }, 100);

	presses++;
	balls.push(width);
}
