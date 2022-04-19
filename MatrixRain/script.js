let canvas = document.querySelector('#canvas1');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//===================================линейный градиент

//синтаксис: ctx.createLinearGradient(x0, y0, x1, y1);
//(x0, y0) - координаты начала
//(x1, y1) - координаты конца

//let linearGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height); // - это объект

//установим цвета
//синтаксис linearGradient.addColorStop(offset, color); offset - задается от 0 - 1 процентное соотношение,
// точка остановки цвета color
/*
linearGradient.addColorStop(0, 'red'); // 0%
linearGradient.addColorStop(0.2, 'yellow'); // 0% - 20%
linearGradient.addColorStop(0.4, 'green'); // 20% - 40%
linearGradient.addColorStop(0.6, 'cyan'); // 40% - 60%
linearGradient.addColorStop(0.8, 'blue'); // 60% - 80%
linearGradient.addColorStop(1, 'magenta'); // 80% - 100%
*/
//===================================радиальный градиент

//синтаксис: ctx.createRadialGradient(x0, y0, radius0, x1, y1, radius1);
//x0, y0, radius0 - координаты центра x0, y0 внутренней окружности радиусом radius0
//x1, y1, radius1 - координаты центра x1, y1 внешней окружности радиусом radius1
//градиент будет между этими окружнастями

/*
let radialGradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 100, canvas.width / 2, canvas.height / 3, 400);

// начинает с центра внутренней окружности и постепенно по слоям к внешней
radialGradient.addColorStop(0, 'red'); // 0% 
radialGradient.addColorStop(0.2, 'yellow'); // 0% - 20%
radialGradient.addColorStop(0.4, 'green'); // 20% - 40%
radialGradient.addColorStop(0.6, 'cyan'); // 40% - 60%
radialGradient.addColorStop(0.8, 'blue'); // 60% - 80%
radialGradient.addColorStop(1, 'magenta'); // 80% - 100%
*/
class Symbol {
    constructor(x, y, fontSize, canvasWidth, canvasHeight){
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.text = '';
    }
    draw(context){
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if(this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98){
            this.y = 0;
        }else{
            this.y += 1;
        }

    };
}

class Effect {
    constructor(canvasWidth, canvasHeight){
        this.fontSize = 18;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
    #initialize(){
        for (let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasWidth, this.canvasHeight);
            
        }
    }
    resize(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height);

//установка частоты кадров
let lastTime = 0;
const fps = 160;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp){
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if(timer > nextFrame){
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //подключаем градиент
        ctx.fillStyle = '#0aff0a'; //radialGradient //linearGradient;
        //ctx.textAlign = 'center/left/right/start/end'
        ctx.textAlign = 'center';
        //устновка шрифта
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    }else{
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}

animate(0);

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height)
})
