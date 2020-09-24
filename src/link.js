var canvas, ctx;
var linkText = "Authorcode";
var linkURL = "https://www.google.com";
var linkX = 150;
var linkY = 150;
var linkHeight = 15;
var linkWidth;
var isLink = false;



    canvas = document.getElementById("canvas1");
    // check if supported
    
        ctx = canvas.getContext("2d");
        const text = 'Idris'
        ctx.fillStyle = `rgba(0, 255, 240, 0.5)`;
    ctx.shadowColor='#e3eaef';
    ctx.shadowBlur = 3;
  ctx.font = `40px cursive`;
  ctx.fillText(text, 150, 150);
        
        linkWidth = ctx.measureText(text).width;
        console.log(linkWidth)

        canvas.addEventListener("mousemove", CanvasMouseMove, false);
        canvas.addEventListener("click", Link_click, false);
    

function CanvasMouseMove(e) {
    var x, y;
    if (e.layerX || e.layerX == 0) { // for firefox
        x = e.layerX;
        y = e.layerY;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    if (x >= linkX && x <= (linkX + linkWidth) 
            && y <= linkY && y >= (linkY - linkHeight)) {
        document.body.style.cursor = "pointer";
        isLink = true;
    }
    else {
        document.body.style.cursor = "";
        isLink = false;
    }
}

function Link_click(e) {
    if (isLink) {
        window.location = linkText;
    }
}
//drawHyperLink()
