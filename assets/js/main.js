
// canvas setup

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height =500;

let score =0;
let gameFrame = 0;
ctx.font = '50px Georgia';


//mouse Interativity

let canvasPosition = canvas.getBoundingClientRect();
const mouse ={
    x : canvas.width/2,
    y: canvas.height/2,
    click : false
}

canvas.addEventListener('mousedown',function(event){
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
});

canvas.addEventListener('mouseup',function(){
    mouse.click = false;
});


// player 





class Player{
   constructor(){
    this.x = canvas.width;
    this.y = canvas.height/2;
    this.redius = 50;
    this.angle =0;
    this.frameX =0;
    this.frameY=0;
    this.frame =0;
    this.spriteWidth = 498;
    this.spriteHeight = 327;
   }
   update(){
       const dx = this.x = mouse.x;
       const dy = this.y = mouse.y;
       if(mouse.x != this.x){
           this.x -= dx/20;
       }
       if(mouse.y != this.y){
           this.y -= dy/20;
       }
   }
   draw(){
        if(mouse.click){
              ctx.lineWidth = 0.2;
              ctx.beginPath();
              ctx.moveTo(this.x , this.y);
              ctx.lineTo(mouse.x,mouse.y);
              ctx.stroke();
        }
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x , this.y, this.redius , 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        // ctx.fillRect(this.x, this.redius ,10);
       
   }
}

const player = new Player();


// bubbles
 const bubblesArray = [];
 const bubble = new Image();
 bubble.src = 'https://i.ibb.co/ZX3thkw/pop2.png';
 class Bubble{
     constructor(){
         this.x =Math.random() * canvas.width;
         this.y =canvas.height + 100;
         this.redius = 50;
         this.speed = Math.random() * 5 + 1;
         this.distance;
         this.counted = false;
         this.sound = Math.random() <=0
        this.frameX = 0;
        this.spriteWidth = 91;
        this.spriteHeight = 91;
        this.pop = false;
     }
     update(){
         this.y -=this.speed;
         const dx = this.x - player.x;
         const dy = this.y - player.y;
         this.distance =Math.sqrt(dx*dx + dy*dy);
     }
     draw(){
        //  ctx.fillStyle = 'white';
        //  ctx.beginPath();
        //  ctx.arc(this.x,this.y, this.redius,0,Math.PI * 2);
        //  ctx.fill();
        //  ctx.closePath();
        //  ctx.stroke();

         ctx.drawImage(bubble, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 68, this.y - 68, this.spriteWidth*1.5, this.spriteHeight*1.5);
     }
 }

 function handleBubbels(){
     if(gameFrame % 50 == 0){
         bubblesArray.push(new Bubble());
     }
     for (let index = 0; index < bubblesArray.length; index++) {
      bubblesArray[index].update();
      bubblesArray[index].draw();  
     
     }
     for (let i = 0; i < bubblesArray.length; i++) {
        if(bubblesArray[i].y <0 - this.redius * 2) {
            bubblesArray.splice(i ,1);
        }
        if(bubblesArray[i].distance < bubblesArray[i].redius + player.redius * 2) {
            if(!bubblesArray[i].counted){
                 score++;
                 bubblesArray[i].counted = true;
                 bubblesArray.splice(i, 1);
            }
           
        }
          
      }   
}

// animation 

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height );
    handleBubbels();
    player.update();
    player.draw();
    ctx.fillStyle ='white';
    ctx.fillText(' score  ' + score , 10 ,50);
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();
 