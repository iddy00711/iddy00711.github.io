


const canvas = document.querySelector('canvas');






const c= canvas.getContext('2d');

const{width:innerWidth}= canvas;

const{height:innerHeight} = canvas;

const wave ={
    y:canvas.height/2,
    amplitude:100,
    length:0.01,
    frequency:0.01,
}
const strokeColour={
    h:200,
    s:50,
    l:50
}
const backGroundColor={
    r:0,
    g:0,
    b:0,
    a:0.01
}

let increment = wave.frequency;

const{y, amplitude, length, frequency} = wave;
const{h,s, l} = strokeColour;
const{r, g ,b, a} = backGroundColor;

function animate(){
    requestAnimationFrame(animate);
    c.fillStyle=`rgba(${r}, ${g}, ${b}, ${a})`;
    c.fillRect(0,0,canvas.width, canvas.height);

    c.beginPath();
c.moveTo(0, canvas.height/2);




for(let i =0; i<canvas.width; i++){

    let sinWave = y + Math.sin(i * length+increment) * amplitude *Math.sin(increment);

    c.lineTo(i, sinWave);
    c.fillStyle='rgba(200, 200, 200, 0.5)';
    
}
c.strokeStyle=`hsl(${h}, ${s}%, ${l}%)`
c.stroke()
increment += frequency;



}

animate()