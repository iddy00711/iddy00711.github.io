const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height - window.innerHeight;

let particlesArray;

let mouse={
    x:null,
    y:null,
    radius:150
};

window.addEventListener('mousemove', function (event){
    mouse.x = event.x,
    mouse.y = event.y
})

class Particle {
    constructor(x, y, directionX, directionY, size, colour){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.colour = colour;

    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size,0, Math.PI*2, false);
        ctx.fillStyle ='#8c5523';
        ctx.fill()
    }

    update(){
        //checks if ball(ie object at x/y) has collided with edge of canvas
        if(this.x >= canvas.width || this.x < 0){
            this.directionX = -this.directionX
        }
        if(this.y >= canvas.height || this.y < 0){
            this.directionY = -this.directionY
        }
        //calculates distance from mouse to ball obj(x/y)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dy*dy + dx*dx);
        //if the mouse pointer touches ball obj then...
        if(distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size*10){
                this.x += 10
            }
            if(mouse.x > this.x && this.x > this.size*10){
                this.x -= 10
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size*10){
                this.y += 10
            }
            if(mouse.y > this.y && this.y > this.size *10){
                this.x -= 0
            }
        }
        //move particle

        this.x+=this.directionX;
        this.y+=this.directionY;
        //draw particle
        this.draw();

    
    }
}

function init(){
     particlesArray = [];
    let numberOfParticles = (canvas.height*canvas.width) /9000;
    for(let i=0; i<numberOfParticles;i++){
        let size = (Math.random()*5)+1;
        let x = (Math.random()*((innerWidth - size*5)-(size*2))+size*2);
        let y = (Math.random()*((innerHeight - size*5)-(size*2))+size*2);
        let directionX = (Math.random()*4)-2.5;
        let directionY = (Math.random()*4)-2.5;
        let colour = '#8c5523'

        particlesArray.push(new Particle(x, y, directionX, directionY, size, colour))
    }
}
function connect(){
    let opacityValue =1;

    for(let a=0; a<particlesArray.length; a++) {
        for(let b=a; b<particlesArray.length;b++){
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))+ ((particlesArray[a].y- particlesArray[b].y)*(particlesArray[a].y - particlesArray[b].y));
            if(distance<(canvas.width/10)*(canvas.height/10)){
                opacityValue = 1-(distance/20000);
                ctx.strokeStyle=`rgba(140,85,31,${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke()
            }
        }
    }
}

function animate(){
    requestAnimationFrame(animate);
     ctx.clearRect(0,0,canvas.width, canvas.height);
    for(let i=0; i<particlesArray.length; i++){
        particlesArray[i].update()
    }
    connect()
}
window.addEventListener('mouseout',()=>{
    mouse.x = undefined;
    mouse.y = undefined;
})



init();
animate();