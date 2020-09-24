const canvas = document.getElementById('canvas1')
const c = canvas.getContext('2d')


canvas.width = window.innerWidth
canvas.height = window.innerHeight


function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}



const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});




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
    c.moveTo(this.x - 2, this.y);
        c.lineTo(this.x, this.y - 4);
        c.lineTo(this.x + 4, this.y);
        c.arc(this.x, this.y, this.radius, 0, Math.PI, false);
     
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

      miniStars.push(new MiniStar(this.x, this.y, 1.5, '#e3eaef'))

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
    // c.restore()
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


function createText(x, y, text, pixels){
  c.save();
  c.fillStyle = `rgba(255, 255, 240, 0.5)`;
    c.shadowColor='#e3eaef';
    c.shadowBlur = 3;
  c.font = `${pixels}px Verdana`;
  c.fillText(text, x, y);
  c.restore()
}
let x1 = canvas.width/2-130;
let y1 = canvas.height/2+90;
let x2 = canvas.width/2-10;
let y2 = canvas.height/2+90;
let diffx = x2-x1;
let diffy = y2-x1
function createLine( line,x=0, y=0, xd=0, yd=0){
  c.save();
  c.strokeStyle = 'rgba(255, 255, 240, 0.5)';
  c.lineWidth = line;
  c.shadowColor = 'white';
  c.shadowBlur = 3;
  c.beginPath();
  c.moveTo(x1+x, y1+y);
  c.lineTo(x2+xd, y2+yd);
  c.stroke();
  c.restore();
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

  for(let i= 0; i<150; i++){
    const x = Math.random()*canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random();
    backgroundstars.push(new Star(x, y, radius*2, 'white'))
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
    stars.push(new Star(Math.random()*canvas.width, -100, Math.random()/2, 'DodgerBlue'))
  }



  const name = 'Idris Dodwell';
  const portfolio = 'Portfolium';
  

  createText(canvas.width/2-130, canvas.height/2+80, name, 50)
  createLine(2);
  createLine(1.5, x2-635)
 
  

  
  
  
  
}

init()
animate()
