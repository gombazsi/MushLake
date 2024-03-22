function handleScroll() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const canvasWidth = 1920;
    const canvasHeight = 1080;
    const resolution = 100;
    const numberOfLines = 10;
    const lineWidth = 5;
    const color = "#00ff00";
    
    const speed = getScrollSpeed();
    
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.beginPath();
    
    // Define a start point
    for(var i = 0; i < numberOfLines; i++){
        ctx.moveTo(0, canvasHeight / 2);
        for(var j = 0; j < resolution + 1; j++){
            ctx.lineTo(canvasWidth / resolution * (j) , getY(j, resolution, canvasHeight, speed, i+1))
        }
        ctx.stroke();
    }

    for(var i = 0; i < numberOfLines; i++){
        ctx.moveTo(canvasWidth, canvasHeight / 2);
        for(var j = 0; j < resolution + 1; j++){
            ctx.lineTo(canvasWidth - canvasWidth / resolution * (j) , getY(j, resolution, canvasHeight, speed, i+1))
        }
        ctx.stroke();
    }
    
}  

function getY(i, resolution, canvasHeight, speed, modifier) {
    const constModifier = 0.1;
    return canvasHeight / 2 + /*Math.sin(i / resolution)*/ i * modifier * constModifier * speed;
}            

var getScrollSpeed = (function(){            
    var lastPos, newPos, timer, delta, 
    delay =  30; // in "ms" (higher means lower fidelity )                
    function clear() {
        lastPos = null;
        delta = 0;
    }                
    clear();
    
    return function(){
        newPos = window.scrollY;
        if ( lastPos != null ){ // && newPos < maxScroll 
            delta = newPos -  lastPos;
        }
        lastPos = newPos;
        clearTimeout(timer);
        timer = setTimeout(clear, delay);
        return delta;
    };
})();                   
