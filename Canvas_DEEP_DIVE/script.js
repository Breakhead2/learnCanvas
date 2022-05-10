let canvas;
let ctx;
let flowField;
let animation;

window.onload = function () {
	canvas = document.getElementById('canvas1');
	ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
	flowField.animate(0);
};

window.onresize = function () {
	cancelAnimationFrame(animation);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
	flowField.animate(0);
}


class FlowFieldEffect {
	#ctx;
	#width;
	#height;

	constructor(ctx, width, height) {
		this.#ctx = ctx;
		this.#width = width;
		this.#height = height;
		this.angle = 0;
		this.lastTime = 0;
		this.interval = 1000 / 60;
		this.time = 0;
		this.cellSize = 10;
		this.radius = 0;
		this.vr = 0.03;
		this.gradient;
		this.#createLinearGradient();
		this.#ctx.strokeStyle = this.gradient;
	}

	#createLinearGradient() {
		this.gradient = this.#ctx.createLinearGradient(0, 0, this.#width, this.#height);
		this.gradient.addColorStop("0.1", "#ff5c33");
		this.gradient.addColorStop("0.2", "#ff66b3");
		this.gradient.addColorStop("0.4", "#ccccff");
		this.gradient.addColorStop("0.6", "#b3ffff");
		this.gradient.addColorStop("0.8", "#80ff80");
		this.gradient.addColorStop("0.9", "#ffff33");
	}

	#draw(angle, x, y) {
		this.#ctx.beginPath();
		this.#ctx.moveTo(x, y);
		this.#ctx.lineTo(x + Math.cos(angle) * 20, y + Math.sin(angle)  * 20);
		this.#ctx.stroke();
	}

	animate(timeStamp) {
		let deltaTime = timeStamp - this.lastTime;
		this.lastTime = timeStamp;
		if (this.time > this.interval) {
			this.#ctx.clearRect(0, 0, this.#width, this.#height);
			this.radius += this.vr;
			if(this.radius > 8 || this.radius < -8) this.radius *= -1;
			for (let y = 0; y < this.#height; y += this.cellSize) {
				for (let x = 0; x < this.#width; x += this.cellSize) {
					const angle = (Math.cos(x * 0.01) + Math.sin(y * 0.01)) * this.radius;
					this.#draw(angle, x, y);
				}
			}
			this.time = 0;
		} else {
			this.time += deltaTime;
		}
		animation = requestAnimationFrame(this.animate.bind(this)); // необходимо использ метод bind с указанием объекта this иначе будет ошибка
	}
}