const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height - window.innerHeight;

const particlesArray = [];
const adjustX = 30;
const adjustY = 30;


let mouse={
    x:null,
    y:null,
    radius:70
};

window.addEventListener('mousemove', function (event){
    mouse.x = event.x,
    mouse.y = event.y

    // console.log(mouse.x)
});
window.addEventListener('mouseout', function (event){
    mouse.x = undefined
    mouse.y = undefined

    // console.log(mouse.x)
})
ctx.fillStyle = 'blue';
ctx.font = '20px Verdana';
ctx.fillText('NC News is my first attempt at a project.', 0, 50);
//get's a rect and stores how many pixels are in it in arr.

const textImagePixelData = ctx.getImageData(0,0,100,100)

class Particle {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = 1;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random()*30)+1;

    }

    draw(){
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'red'
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2)
        ctx.closePath();
        ctx.fill()
    }
    update(){
        //getting the distance of mouse from object using trig
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y
        let distance = Math.sqrt(dx*dx+dy*dy);
        let forceDirectionX = dx/distance;
        let forceDirectionY = dy/distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance-distance)/maxDistance;
        //console.log(force)
        let directionX =force* forceDirectionX*this.density
        let directionY = force*forceDirectionY*this.density
        if(distance<mouse.radius){
            this.x -= directionX;
            this.y -= directionY;
        }
        else{
            if(this.x!==this.baseX){
                let dx = this.x-this.baseX;
                //slows speed
                this.x -= dx/5;
            }
            if(this.y!==this.baseY){
                let dy = this.y-this.baseY;
                //slows speed
                this.y -= dy/5;
            }
        }
    }
}

function init(){
    
    let y2=textImagePixelData.height;
    let x2=textImagePixelData.width;
    for(let y=0; y < y2; y++){
        for(let x = 0; x<x2; x++ ){
            if(textImagePixelData.data[(y * 4 * textImagePixelData.width) +( x * 4)+3] > 128){
                let positionX = x +adjustX;
                let positionY = y+adjustY;
                particlesArray.push(new Particle(positionX*8, positionY*8))
            }
        }
        
    }
}
init()


function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    for(let i=0; i<particlesArray.length; i++){
        
        particlesArray[i].draw();
        particlesArray[i].update()
    }
    connect()
    requestAnimationFrame(animate)
}
function connect(){
    let opacityValue = 1;
    let lineDistance = 20;
    for(let a=0; a<particlesArray.length;a++){
        for(let b=a; b<particlesArray.length; b++){
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx*dx + dy*dy)
            opacityValue = 1-(distance/lineDistance)
            if(distance<lineDistance){
                
                ctx.strokeStyle= `rgba(255, 255, 255, ${opacityValue})`
                ctx.lineWidth= 2;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}
animate()