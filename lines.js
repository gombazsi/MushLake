function handleScroll() {
    const canvas = document.getElementById("canvas");    
    const ctx = canvas.getContext("2d");
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const canvasWidth = 1920;
    const canvasHeight = 1080;
    const resolution = 1;
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
        for(var j = 1; j < resolution + 1; j++){
            ctx.lineTo(canvasWidth / resolution * (j) , getY(j, resolution, canvasHeight / 2, speed, i+1))
        }
        ctx.stroke();
    }

    for(var i = 0; i < numberOfLines; i++){
        ctx.moveTo(canvasWidth, canvasHeight / 2);
        for(var j = 1; j < resolution + 1; j++){
            ctx.lineTo(canvasWidth - canvasWidth / resolution * (j) , getY(j, resolution, canvasHeight / 2, speed, i+1))
        }
        ctx.stroke();
    }
    
}  

function getY(i, resolution, base, speed, modifier) {
    const limit = 2000;
    const constModifier = 20;
    var y = i * modifier * constModifier * speed;
    
    if(speed < 0){
        y = Math.max(y, limit * (-1));
        if (y == 0){
            y = i * modifier * constModifier * constModifier;
        }
    } 
    else if (speed > 0){
        y = Math.min(y, limit);
        if (y == 0){
            y = i * modifier * constModifier * constModifier * (-1);
        }
    }  

    return (base + y);

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
