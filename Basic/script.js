let canvas = document.querySelector('#canvas1');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// в случае изменения окна все работает также (копируем параметры)
window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

//==============<РИСУЕМ ПРЯМОУГОЛЬНИЕ>=====================
/*

ctx.fillStyle = 'white'; // задаем цвет
ctx.fillRect(10, 10, 150, 50); 

*/
//==============<РИСУЕМ КРУГ>==============================
/*

//цвет заливки
ctx.fillStyle = 'red';

//полый круг задаем цвет линии
ctx.strokeStyle = 'yellow'

//задание ширины линии
ctx.lineWidth = 5;

// объявляю начало пути (рисую кистью, может быть несколько линий)
ctx.beginPath();

// рисую круг с центром в коорд x=100, y=100 радиусом 60,
// и началом рисования кисти от 0 град до 360 град по часовой стрелке
ctx.arc(100, 100, 60, 0, 2 * Math.PI);

//заполняю круг, цветов что задан параметром fillStyle
ctx.fill();

//зарисовываю полый круг
ctx.stroke();

*/
//==============<ИНТЕРАКТИВ>=====================
/*
const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
})

//имитация кисти

canvas.addEventListener('mousemove', (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
})

function drawFillCircle(){
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 20, 0, 2 * Math.PI);
    ctx.fill();
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFillCircle();
    requestAnimationFrame(animate);
}

animate();

*/
//==============<ПРОСТАЯ АНИМАЦИЯ>=====================

let circles = [];

//изменение цветва через hsl

let hue = 0;

// чертеж (класс) окружности
class Circle {
    /*
    constructor(){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.size = Math.random()*15 + 5;
        this.speedX = Math.random()*3 - 1.5;
        this.speedY = Math.random()*3 - 1.5;
    }
    */

    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random()*15 + 1;
        this.speedX = Math.random()*3 - 1.5;
        this.speedY = Math.random()*3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) this.size -= 0.1;
    }

    draw(){
        //ctx.fillStyle = 'white';
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
        ctx.fill();
    }
}

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i < 5; i++){
        circles.push(new Circle);
    }
})

// canvas.addEventListener('mousemove', (event)=>{
//     mouse.x = event.x;
//     mouse.y = event.y;
//     for(let i = 0; i < 5; i++){
//         circles.push(new Circle);
//     }
// })

function handleCircles(){
    for(let i = 0; i < circles.length; i++){
        circles[i].update();
        circles[i].draw();

        for(let j = 0; j < circles.length; j++){
            let dx = circles[i].x - circles[j].x;
            let dy = circles[i].y - circles[j].y;
            let distance = Math.sqrt(dx**2 + dy**2);
            if(distance > 100){
                ctx.beginPath()
                ctx.strokeStyle = circles[i].color; // задаем цветы
                // ctx.lineWidth = circles[i].size;
                ctx.moveTo(circles[i].x, circles[i].y); // первая координата точки линии
                ctx.lineTo(circles[j].x, circles[j].y); // конечная точка 
                ctx.stroke(); // рисуем линию
            }
        }

        if (circles[i].size <= 0.3){
            circles.splice(i, 1);
            i--;
        }
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /* эффекты различные   */

    // ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    //ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';

    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    handleCircles();
    hue += 5;
    requestAnimationFrame(animate);
}

animate();