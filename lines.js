function handleScroll() {
    const canvas = document.getElementById("canvas");    
    const ctx = canvas.getContext("2d");
    
    const canvasWidth = 1920;
    const canvasHeight = 1080;
    const resolution = 1;
    const numberOfLines = 10;
    const lineWidth = 5;
    const color = "#00ff00";
    
    const speed = getScrollSpeed();
    const base = canvasHeight / 2;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
    for(var i = 0; i < numberOfLines; i++){        
        ctx.beginPath();    
        ctx.moveTo(0, base);
        for(var j = 1; j < resolution + 1; j++){ 
            const y = getY(j, resolution, base, speed, i+1);
            if(y != base){
                ctx.lineTo(canvasWidth / resolution * (j) , y);
                ctx.stroke();
            }
        }
    }

    for(var i = 0; i < numberOfLines; i++){      
        ctx.beginPath();    
        ctx.moveTo(canvasWidth, base);
        for(var j = 1; j < resolution + 1; j++){
            const y = getY(j, resolution, base, speed, i+1);
            if(y != base){
                ctx.lineTo(canvasWidth - canvasWidth / resolution * (j) , y)
                ctx.stroke();
            }
        }        
    }
    
    
}  

function getY(i, resolution, base, speed, modifier) {
    const limit = 2000;
    const constModifier = 20;
    var y = i * modifier * constModifier * speed;
    
    if(speed < 0){
        y = Math.max(y, limit * (-1));
    } 
    else{
        y = Math.min(y, limit);
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
