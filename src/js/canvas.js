const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// canvas.width = window.innerWidth;
// canvas.height - window.innerHeight;

canvas.width = window.innerWidth/2
canvas.height = window.innerHeight/2

console.log(window)
// import { randomIntFromRange, randomColor, distance } from './js/utils'

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}


const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners


addEventListener('resize', () => {
  canvas.width = innerWidth/2
  canvas.height = innerHeight/2

  init()
})

// Objects
class Star {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = {
      x:(Math.random()-0.5)*3,
      y:1
    }
    this.friction = 0.22;
    this.gravitas = 0.5;
    this.timeToLive= 0.5;
  }

  draw() {
    
    c.save()
    c.beginPath()
    c.moveTo(this.x - 5, this.y);
        c.lineTo(this.x, this.y - 7);
        c.lineTo(this.x + 5, this.y);
        c.arc(this.x, this.y, this.radius, 0, Math.PI, false);
     //c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.shadowColor='#e3eaef';
    c.shadowBlur = 10;
    c.fill()
    c.closePath()
    c.restore()
  }
  drawStar() {
    
    c.save()
    c.beginPath()
    
     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.shadowColor='#e3eaef';
    c.shadowBlur = 10;
    c.fill()
    c.closePath()
    c.restore()
  }

  shatter(){
    this.radius = this.radius*this.timeToLive;
    this.timeToLive = 0;

    for(let i=0; i<8; i++){

      miniStars.push(new MiniStar(this.x, this.y, 2, '#e3eaef'))

    }
    
  }

  update() {
    this.draw();
    if(this.y + this.radius + this.velocity.y > canvas.height){
      this.shatter();
      this.velocity.y = -this.velocity.y*this.friction;
    }
    else{
      this.velocity.y += this.gravitas;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

class MiniStar extends Star{
  constructor(x, y, radius, color){
    super(x, y, radius, color);
    this.velocity = {
      x:randomIntFromRange(-5, 5),
      y:randomIntFromRange(-15, 15)
    }
    this.friction = 0.8;
    this.gravitas = 0.9;
    this.timeToLive= 100;
    this.opacity = 1;

  }

  miniDraw() {
    c.save();
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = `rgba(30, 144, 255, ${this.opacity})`;
    c.shadowColor='#e3eaef';
    c.shadowBlur = 1;
    c.fill()
    c.closePath()
    c.restore()
  }

  miniUpdate() {
    this.miniDraw();
    if(this.y + this.radius + this.velocity.y > canvas.height){
      this.velocity.y = -this.velocity.y*this.friction;
    }
    else{
      this.velocity.y += this.gravitas;
    }
    this.y += this.velocity.y;
    this.x += this.velocity.x;
    this.timeToLive -= 1;
    this.opacity -= 1/this.timeToLive;
  }
}

function createMountain(amount, height, colour){
  for(let i=0; i<amount; i++){
    const mountainwidth = canvas.width/amount;
    c.beginPath();
    c.moveTo(i* mountainwidth, canvas.height);
    c.lineTo(i*mountainwidth + mountainwidth + 325, canvas.height);
    c.lineTo(i*mountainwidth+mountainwidth/2, canvas.height-height+325);
    c.lineTo(i*mountainwidth - 325, canvas.height);
    c.fillStyle = colour;
    c.fill();
    c.closePath()
  }
}

// function createCloud(moveToX, moveToY){
//   c.beginPath();
//   c.moveTo(moveToX, moveToY);
//   c.bezierCurveTo(33, 207, 81, 53, 180, 109);
//   c.bezierCurveTo(175, 18, 362, 5, 362, 118);
  
//    c.bezierCurveTo(482, 36, 554,257, 349, 226);
  
//   c.closePath();
//   c.lineWidth = 1;
//   c.fillStyle = '#8ED6FF';
//   c.fill();
//   c.strokeStyle = '#0000ff';
//   c.stroke();
// }
function createText(x, y, text, pixels){
  c.save()
  c.fillStyle = `rgba(255, 255, 240, 0.5)`;
    c.shadowColor='#e3eaef';
    c.shadowBlur = 3;
  c.font = `${pixels}px Verdana`;
  c.fillText(text, x, y);
  c.restore()
}


// Implementation
const backGroundGradient = c.createLinearGradient(0,0,0, canvas.height);
backGroundGradient.addColorStop(0, '#171e26');
backGroundGradient.addColorStop(1, '#3f586b')
let stars;
let miniStars;
let backgroundstars;
let ticker =0;
function init() {
  stars = []
  miniStars=[]
  backgroundstars=[]

  // for (let i = 0; i < 400; i++) {
  //    stars.push(new Star(canvas.width/2, 30, 30, "#e3eaef"))
  // }
  for(let i= 0; i<150; i++){
    const x = Math.random()*canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random()*3;
    backgroundstars.push(new Star(x, y, radius, 'white'))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = backGroundGradient;
  c.fillRect(0, 0, canvas.width, canvas.height)

  backgroundstars.forEach(star=>{
    star.drawStar()
  })

  createMountain(1, canvas.height-50, '#384551')
  createMountain(2, canvas.height-100, '#2b3843');
  createMountain(3, canvas.height-300, '#26333e');

  

  
    stars.forEach((star, index )=> {
    
    star.update();
    if(star.radius === 0){
      stars.splice(index, 1)
    }
  })

  miniStars.forEach((miniStar,index)=>{
    miniStar.miniUpdate();
    if(miniStar.timeToLive === 0){
      miniStars.splice(index, 1)
    }
  })

  ticker++
  if(ticker%2===0){
    stars.push(new Star(Math.random()*canvas.width, -100, Math.random()*5, 'DodgerBlue'))
  }

  // function makeText(){
  //   const textName = 'Idris'
  //       ctx.fillStyle = `rgba(0, 255, 240, 0.5)`;
  //   ctx.shadowColor='#e3eaef';
  //   ctx.shadowBlur = 3;
  // ctx.font = `40px Verdana`;
  // ctx.fillText(textName, canvas.width/2-100, canvas.height/2+50);

  // const textProjects = 'Projects'
  //       ctx.fillStyle = `rgba(0, 255, 240, 0.5)`;
  //   ctx.shadowColor='#e3eaef';
  //   ctx.shadowBlur = 3;
  // ctx.font = `40px Verdana`;
  // ctx.fillText(textProjects, canvas.width/2-520, canvas.height/2+70;

  // const textContact = 'Contact'
  //       ctx.fillStyle = `rgba(0, 255, 240, 0.5)`;
  //   ctx.shadowColor='#e3eaef';
  //   ctx.shadowBlur = 3;
  // ctx.font = `40px Verdana`;
  // ctx.fillText(textContact, canvas.width/2+410, canvas.height/2+70);
  // }

  const name = 'Idris Dodwell';
  const portfolio = 'Portfolium';
  

  createText(canvas.width/2-100, canvas.height/2+50, name, 40)
  createText(canvas.width/2-75, canvas.height/2+110, portfolio, 40)
  

  // createCloud(140, 221);
  // createCloud2()
  
  let linkWidthProjects = c.measureText(name).width;
 

  
let linkURL = 'http://api.openweathermap.org/data/2.5/weather';
let linkX = canvas.width/2-50;
let linkY = canvas.height/2+130;
let linkHeight = 95;

let isLink = false;



canvas.addEventListener("mousemove", (event)=>{CanvasMouseMove(event, linkX, linkY)}, false);
canvas.addEventListener("click", Link_click, false);





  function CanvasMouseMove(e, x1, y1) {
    let x;
    let y;
    
    if (e.layerX || e.layerX == 0) { // for firefox
        x = e.layerX;
        y = e.layerY;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    if (x >= x1&& x <= (x1 + linkWidthProjects+30) 
            && y <= y1 && y >= (y1 - linkHeight)) {
        document.body.style.cursor = "alias";
        isLink = true;
    }
    else {
        document.body.style.cursor = "";
        isLink = false;
    }
}
function Link_click() {
  console.log(2)
  if (isLink) {
    console.log(1)
      window.location = linkURL;
      
  }
}

  
  
}

init()
animate()
