
import gsap from 'gsap';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(gsap)

const img = new Image();
img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXwAAAGeCAYAAACXa7pDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGNkVBOTRDQzAzOTQxMUU1OTJBN0NCQUE5MzVFMkU1QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGNkVBOTRDRDAzOTQxMUU1OTJBN0NCQUE5MzVFMkU1QiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY2RUE5NENBMDM5NDExRTU5MkE3Q0JBQTkzNUUyRTVCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY2RUE5NENCMDM5NDExRTU5MkE3Q0JBQTkzNUUyRTVCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5F7L3QAAFEtJREFUeNrs3SGQ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"

 class Dot {
    constructor(x, y, r, g, b, imageX, imageY) {
      this.x = x
      this.y = y
      this.r = r
      this.g = g
      this.b = b
      this.imageX = imageX
      this.imageY = imageY
    }
  
    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, false)
      ctx.fillStyle = 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')'
      ctx.fill()
    }
  }

addEventListener('load', ()=>{
    ctx.drawImage(img,0,0);
    const imgPixelData = ctx.getImageData(0,0, img.naturalWidth, img.naturalHeight).data;

    const dots =[];
    const pixels = [];

    for(let i=0; i<imgPixelData.length; i+=4){
        if(ImageData[i]===0) continue;
        const x = (i/4)%img.naturalWidth;
        const y = Math.floor(Math.floor(i/img.naturalWidth)/4)
        if(x%5===0 && y%5===0)
       { pixels.push(
            {   
                x,
                y,
                r:imgPixelData[i],
                g:imgPixelData[i+1],
                b:imgPixelData[i+2]
            }
        )}

    }
    pixels.forEach(pixel=>{
        // const x = pixel.x + canvas.width/2 -(img.naturalWidth/2);
        // const y = pixel.y + canvas.height/2 -(img.naturalHeight/2);
        const rand = Math.random() *Math.PI*2;
        const x = Math.sin(rand)*100+canvas.width/2;
        const y = Math.cos(rand)*100+canvas.height/2;
        dots.push(new Dot(x,y, pixel.r,pixel.g, pixel.b, 0,0))

    })
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    function animate(){
        requestAnimationFrame(animate);
        dots.forEach(dot=>{
            dot.draw()
            
        })
    }
    animate()
})