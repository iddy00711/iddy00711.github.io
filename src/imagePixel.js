const canvas = document.getElementById('canvas2')
const ctx = canvas.getContext('2d');

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
ctx.fillText('NC News.', 0, 50);
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

// canvas.width = window.innerWidth/3+500;
// canvas.height = window.innerHeight/3+500;
// let particleArray =[];

// const mouse = {
//     x:null,
//     y:null,
//     radius:80
// }

// window.addEventListener('mousemove',(event)=>{
//     mouse.x = event.x+canvas.clientLeft/2;
//     mouse.y = event.y+canvas.clientTop/2;
//     //console.log(event)
// });
// window.addEventListener('mouseout', ()=>{
//     mouse.x = undefined;
//     mouse.y = undefined;
// })

// function drawImage(png, x, y, num1=4, num2=4){
//     let imageWidth = png.width;
//     let imageHeight = png.height;
//     const imagePixelArray = ctx.getImageData(x,y, imageWidth, imageHeight);
//     ctx.clearRect(0,0, canvas.width, canvas.height);

//     class Particle{
//         constructor(x, y, colour, size){
//             this.x = x+canvas.width/2-png.width*2,
//             this.y = y+canvas.height/2-png.height*2,
//             this.colour = colour,
//             this.size = 2.5,
//             this.baseX = x+canvas.width/2-png.width*2,
//             this.baseY = y+canvas.height/2-png.height*2,
//             this.density = (Math.random()*30)+2
//         }
    
//          draw() {
            
//              ctx.beginPath();
//              ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
//              ctx.closePath();
//              ctx.fill();
//          }
    
//          update(){
//              ctx.fillStyle = this.colour;
    
//              let dx = mouse.x - this.x;
//             let  dy = mouse.y - this.y;
    
//             let distance = Math.sqrt(dx*dx + dy*dy);
    
//             let forceDirectionX = dx /distance;
//             let forceDirectionY = dy /distance;
    
//             const maxDistance = 100;
//             let force = (maxDistance - distance)/maxDistance;
//             if(force<0){force = 0};
    
//             let direcVariable = force*this.density*0.7;
//             let diectionX = forceDirectionX * direcVariable;
//             let directionY = forceDirectionY * direcVariable;
    
//             if(distance<mouse.radius+this.size){
//                 this.x += diectionX;
//                 this.y +=directionY;
//             }
//             else{
//                 if(this.x !== this.baseX){
//                 let dx = this.x - this.baseX;
//                 this.x -= dx/20;
//                 }
//                 if(this.y !== this.baseY){
//                     let dy = this.y - this.baseY;
//                     this.y -= dy/20;
//                 }
                
//             }
//             this.draw()
//          }
//     }
//     function init(){
//         particleArray = []
        
//         let{width:imaWidth, height:imaHeight, data:imaData} = imagePixelArray;
        
//         let y2 = imaHeight; 
//         let x2 = imaWidth;
//         for(let y = 0;y<y2; y++){
//             for(let x =0; x<x2; x++){
//                 if(imaData[(y*4*imaWidth)+(x*4)+3]>128){
//                     let positionX = x;
//                     let positionY = y;
//                     let colour = `rgb(${imaData[(y*4*imaWidth)+(x*4)]}, ${imaData[(y*4*imaWidth)+(x*4)+1]}, ${imaData[(y*4*imaWidth)+(x*4)+2]})`;

//                     particleArray.push(new Particle(positionX*3, positionY*3, colour))

//                 }

//             }

//         }

       
//     }
//                 function animate(){
//                     requestAnimationFrame(animate);
//                     ctx.fillStyle= 'rgba(0,0,0,0.5)';
//                     ctx.shadowBlur=10;
//                     ctx.shadowColor= 'black'
//                     ctx.fillRect(0,0, canvas.width, canvas.height);
        
//                     for(let i=0; i<particleArray.length; i++){
//                         particleArray[i].update();
//                     }
//                 }
//                 init();
//                 animate();
                
//     // window.addEventListener('resize',()=>{
//     //     canvas.width = window.innerWidth;
//     //     canvas.height = window.innerHeight;
//     //     init();
//     // })

// }
// const png = new Image();
// png.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALUAAAAoCAYAAAC4q7s0AAAAiXpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjaVY7ZDcQwCET/qWJL4DJHOUnkSOlgy18cZxX5fQwDQgPQv9cJnwGhgjYPSzMsNDV5KxM4EURipFFLJ08VKsfVPj0IT2MZjvouquJCEws7Xd2t2WEHVzp3kVtJEO6tETZeyTdob/+v1jnHegB+/MotFCRYA4AAAAoEaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMTgxIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iNDAiCiAgIHRpZmY6SW1hZ2VXaWR0aD0iMTgxIgogICB0aWZmOkltYWdlSGVpZ2h0PSI0MCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIvPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+hrifHgAAAARzQklUCAgICHwIZIgAAAtkSURBVHja7Zx7kBXFFcZ/u8tTIWJUREQRFMpHkguF8UGfG4wBiRJLDYoWFTXRMqjgM2qCYIwoRq34DBof8YkVMVhJtFS0qMSY2w0+UHMlGFlFkFUk8hAFF1h29+aPOVPbjjNz711Fd6vmq5ramb7d092nT58+5+uehQwZMmTIkCFDhgwZMmTIkMFDTaUZC+QOB76hj6vyFBdn4svQaZW6QG4w8CbQVZNWA4PzFDdnIszQ0VBbYb5fegoN0A84MxNfhk5pqQvk9gTeBnoAJa/cu8DQPMWmTIwZOpulvkQVGuBvwCt6PxA4NRNhhk5lqQvkdgOWAzuqlRZV5j9plreAA/IUWzJRZugslvoiVWiABXrNVdcDYAhwcibGDJ1CqQvk+gDnekk35imSp9gM3OKlTy2Qq8lEmaEzWOopwE6em/G499u9wAa9/xZwfCbKDB1aqQvkegEXeEk35ym2hg95ihuBe7zfLy+Qy6SZoUNb6rOBXfV+LfBgTJ7fAyGdNwIYm4kzQ0dAl4T0eRoUAqzPU2yMZshTbCiQO8QLJD/IxJkhQ4YM2wE1CT71cM+K1+cpfpyQbwjQRx/X5CmuSKpIxOwM5IF9ge7AGmAR8Lq1rpRQpqcGoknYBiy31n0cU3YH4KAq5bHCWrdGxOwIHOilL7bWbYmpY6gXTK+31i1L6X9/4DCgP9CqK9sia11DJQ0TMX21/ABNeg94wVr3YUqZ3YFdEn7+BFhlrWtNKd8TGFSl/BpFTDdPLnHYDGyy1pXrc62Ow14qswZgqbWupT3uxzNAX73/e4Hc2IQNlhuBY/X+j8BZMQ3bG7gGmKDK7KMEvCVirgYejunkYOClMoJsETELgCutdc956ftXUDYulrgL+DawMPKupTH5bwaO0fs/E8PZi5jvAtcCR8bEMK0ixgFTrXUuYWCHqfzGxoxXi4h5FphurXstpvglesWhBGzQ8rdZ6xbG5BnmuaGVYBTwL2AM8GRKvlZgpYiZC1xvrVsX6TMEu9UzCDb7fOO7TsTM0XIN1QSKPn4A/Lo9y4CIGQMUtYHdE1aKocBsYI6I6d6Oaup0BZgvYjrMtr2IQcScBzhgdIKsa7Xtz4uYi2PKnwu8CIxLMEB1OqleEDHnqjJUs0rvDJwCWBFzp1rYr4qg2Ae4FFgkYgZGfr9YyYl9YryJXYDJwBIRc1g1ljqKaQVyC/IUn61iUA8m4LZ7eskfAgWgUd2KYV6jTwaaRcxPUpalpYDvBgzwltc64HYR87TO/Cbadj5DfBPorfdbCY7Q+tj0JQ7cqcCtkUFpIDg70xU41GOYaoGNkfI/A2bFlH9V8x8C7K7p3TTvJuChhPZsBVZ69fXzgvxaYBLQV8ScmOKSvKEuXxI+TVgRVtN2GK6L9juc5PsAdwJHq97spitT2O/VwHOqRyM9D2IF8NoXUeo6YHaB3Ig8xYYKFLqLzrSe3nIzA/itta7JW2JGAQ97fuJE4DGCg1NxmGCte92rpw64XN+NKuw44CFr3X9UYH67ZuksByha6w7dTlZ694hCbiHYzLo/VBi1ij8HrgNuw+P9RcwATavxlGWK9qvVk/EU4HpV6hpgloiZb62LY6KWWOtGRMZonLpQod98AsEu8qyErh1lrXu/SnG0AIOsdVu9ce+v+jE6fK+I6WetWw0c4enNZuA71ro1XptPAa4CTg3f2R73I8RuwJwCua4V5D0uEmjdYK27KlRoAGsd1rrngR9q48Ml8bJKl1ENGK4FPo744V83zqbtK6EScI617l7fAlrrmqx1s3S1mhZZnS4EennlT7PWPRAp32ytuwU43yvXWxW9Etk1W+seJzik5k+Cy1V5tgt03FcRnNH39XBfve8VcZHqIm1+GBhqrStWGyj6+C9wgN6PBG4gOOiUhuMjUfbMlE4uETH3eRb0MF1W/1eFb+hPzi3bYSyGKXsTRZ+USe3L78GU/r8dk3yCd78A+EtK2+4GzvOYnuOBaVUo2SoRM9OzznsAh6ubGMXAlLjnA2tdNV9CRd2YZv37jpfWA3hdxDwAPAUsVGPQUs5hL4c/RCLZCwrkxpcp49NwC6115XzVZyJKekCFy3x3Xb57e8mvbAelnqNsSPQaGdOmOmVLQsxPoiwT+tQ74jY9m0Z96bvneUlDRUzXKvs3L2X8fDhgWcI1qso+zogYojfCLim54HsIlwL/BNaKmEdFzBHtofSi9MvpqixhNHpvgVwxpYyvZBsqqGNd5HnHhHxPiJgmT/n3iOR9DfjH1+x6dFcfN6lv5dA7YmwqKb8mEv/0LBPQRbE28tzrS5RHHfCiiClFXA1/3B6w1m0MXUoRM05XtyMjgXJvpYZPEjGzgTOtdc3tChTzFNcXyE1QDrIHAbE+N0Xg6zwfaWAFVeyVMkifWf5S3lEPjC+3NLUTDQlK0g/YIZK2RWOEXgl9K4cNGlyFvuTeFZTZM8JyVMvi9I88r0/It8xzEyphPkLjk3babT4RLt1a976IGa0M0ckEHP3+3mSvAU5T1+669rIf5Cm+XCD3C+D20M/0aJooXlHKCeBgEbNv2m4bcJJ3vxmo9t8v3A9MsdY1bifrO8ZatzRmGX2Kts2XcEBaRcxi9UsBjhYx3fwguYyP2yhi6j0X7AQRMy1psmpQd6yX9O+0XcIEjI9QcIsS8o1qB/uRhouBW+Paqy7Xi3qFm3gTgV/Rtls5MU6pa6tsxB20fcoFyZ+DPRLhJe9OIvZFzLHAj72kv6YEHGOU/hui1jPEEX6U3AHwmHc/AJie4l8eE7P58KjvI5cJ/Kbz2a3sR6qkH3PAZT71F/Fpvyia1coO0nHyabjvqXv7uTaJGIko+Upr3XVK54Xo216f2rfWFMhNAoaXCeYKuqwcpc9HAs/prtlL1rqSsglnA1d6k2sLcHXKez8MLYWImaQRcY0K7CYRc1a58wRfEe7RJXWPUPE0OJpprVur7e+vAdB5wHIR831r3Xuaf5ZSc+HmzG/07Mc1yuUiYvqpQvtfJ60gOK4QSwqImB6eMRoAnKiWz6cfp6bIsEsZuq8lISheoZzyChEzw2PDjiPYpJrtKXQ/4Amgv4i5i4BHX2atC7l9fxfxg/ayH1HF3qTuwqdpXCRwRsSajgReINi7byDYXbyWtu3zEnC+te7NCpfpeZEBPBP4UUfQaA16Tvf88BoC7nmViKkXMe8Q7O5dqCvMfgTHBMLy62LKTwbeEzHLRMwyggNNk73VshGYmOKCDVPXbrPmrVf5+wo9k/QzG/XqryddEyoQzw3Ay16/bhMxe6lCQ7AZt7ca3MkEX129K2JeVSX265j7pSi1KvYS4JwUnxq1qKP4/Fbmzmol/Bm/CTjdWndPlU25hLat8Bp1c3btIIo9X90qn/3pqq7ToIi79CZwhm8hrXVPa/mPIkzCYL388quAsQmHkirBRrX4V5RZ6bqpEUq6aiuQSzPwU9o23PoA94mYGq37oggtW6NKPpzgmAMe9XdTNUodzubGlGh3NsGJtjBfU0wHlmsEO0kbGg12VhN8QXOgtW52TB0l7/2NUf/LWvcJwcnAT/X3nYDfpch0m/eurWVozMR6I0xD4vusdU8q53tHDKNQ0gk5HRhhratPKH+gLsGrY+pfSXBO4iBrnU3oR3PMtU0ni1N/fT9r3Z0xCl1KKJ90hUauSRmwddrvUqRfbwBXeHmGqxuCtW6xkgzj1Q3ZEGnPW8BUYHTcceDEQE+/Dg9/a80nxA36XWI4MUp5iqUyQUkf5bq7EewYrkzbmNDlyJ94rVHBax6/vaWU89mV5itbbzXv81iKIUoDblOFbKh0Y0bPFg9W+q6k5d8tU2ddQgBdArZVcJ65hs/+u7myQWE7mJdK+r2r8tofARs6SNyUIUOGDBkyZMiQIUOGDBk6C/4P474iaemLLR0AAAAASUVORK5CYII=";

// window.addEventListener('load', ()=>{
//     console.log('page loaded');
//     ctx.drawImage(png, 0, 0);
//     drawImage(png, 0, 0);
// })


