// Happy Birthday canvas animation
// Edit the ASSETS object below to point to your files in the workspace.
// Put your files in the workspace (for example a folder called `Assets`) and set paths relative to this file (index.html).

const ASSETS = {
  // Background image path (optional). Example: '../Assets/background.jpg'
  // Paste your background file path between the quotes below:
  background: '../images/backgroundGoat.jpg', // <-- paste background path here

  // Stickers: list two sticker image paths you will add to the workspace.
  // Each entry should be a string with the relative path from index.html.
  stickers: [
    '../images/kiki_1.png', // <-- paste first sticker path here (e.g. '../Assets/hamster.png')
    '../images/kiki_2.png'  // <-- paste second sticker path here
  ]
};

// apply background if present
if(ASSETS.background) document.body.style.backgroundImage = `url(${ASSETS.background})`;

// load sticker images
const stickerImages = [];
for(const p of (ASSETS.stickers || [])){
  const img = new Image();
  img.onload = ()=> stickerImages.push(img);
  img.onerror = ()=> console.warn('Failed to load sticker:', p);
  img.src = p;
}

// canvas setup
const canvas = document.getElementById('balloons');
const ctx = canvas.getContext('2d');
let W = canvas.width = innerWidth;
let H = canvas.height = innerHeight;
window.addEventListener('resize', ()=>{ W = canvas.width = innerWidth; H = canvas.height = innerHeight });

class Balloon{
  constructor(){ this.reset(true) }
  reset(init){ this.x = Math.random()*W; this.y = init? Math.random()*H : H+50+Math.random()*200; this.size = 20+Math.random()*40; this.speed = 0.6+Math.random()*1.4; this.color = `hsl(${Math.random()*360},70%,60%)`; this.rot=(Math.random()-0.5)*0.3 }
  update(){ this.y -= this.speed; this.x += Math.sin(this.y/50)*(this.size/80); if(this.y<-120) this.reset(false) }
  draw(c){
    c.save();
    c.translate(this.x,this.y);
    c.rotate(this.rot);

    // balloon body
    c.fillStyle = this.color;
    c.beginPath();
    c.ellipse(0,0,this.size*0.7,this.size,0,0,Math.PI*2);
    c.fill();

    // string under the balloon: a thin curved line that moves with the balloon
    const startY = this.size * 1.02;
    const endY = this.size * 2.2;
    // use the balloon's vertical position to create a subtle sway in the string
    const sway = Math.sin(this.y / 20) * (this.size * 0.08);
    c.strokeStyle = 'rgba(154, 6, 6, 0.85)';
    c.lineWidth = Math.max(1, this.size * 0.03);
    c.beginPath();
    c.moveTo(0, startY);
    // quadratic curve to give a natural string curve
    c.quadraticCurveTo(sway, startY + (endY - startY) * 0.5, sway * 0.3, endY);
    c.stroke();

    c.restore();
  }
}

const balloons = Array.from({length:20}, ()=>new Balloon());

// stickers sprites (positions & which image index to use)
let sprites = [];
function ensureSprites(){ if(sprites.length) return; const count = 16; for(let i=0;i<count;i++){ sprites.push({ x:Math.random()*W, y:H+Math.random()*300, size:30+Math.random()*70, speed:0.5+Math.random()*1.2, sway:(Math.random()-0.5)*1.5, rot:(Math.random()-0.5)*0.2, imgIndex: Math.floor(Math.random()*(stickerImages.length||1)) }) } }

function loop(){
  ctx.clearRect(0,0,W,H);
  for(const b of balloons){ b.update(); b.draw(ctx) }

  // if sticker images loaded, draw them; otherwise draw placeholders
  if(stickerImages.length){
    ensureSprites();
    for(const s of sprites){
      s.y -= s.speed; s.x += Math.sin(s.y/50)*s.sway; s.rot*=0.99; if(s.y<-150){ s.y=H+40+Math.random()*200; s.x=Math.random()*W; s.imgIndex=Math.floor(Math.random()*stickerImages.length) }
      const img = stickerImages[s.imgIndex] || null;
      if(img){ const aspect = img.width/img.height||1; const w = s.size*aspect; const h = s.size; ctx.save(); ctx.translate(s.x,s.y); ctx.rotate(s.rot); ctx.drawImage(img,-w/2,-h/2,w,h); ctx.restore() }
    }
  } else {
    // placeholders so you always see movement
    ensureSprites();
    for(const s of sprites){ s.y -= s.speed; s.x += Math.sin(s.y/50)*s.sway; s.rot*=0.99; if(s.y<-150){ s.y=H+40+Math.random()*200; s.x=Math.random()*W }
      ctx.save(); ctx.translate(s.x,s.y); ctx.rotate(s.rot); ctx.fillStyle = `hsla(${Math.floor(Math.random()*360)},70%,60%,0.95)`; ctx.beginPath(); ctx.ellipse(0,0,s.size*0.6,s.size,0,0,Math.PI*2); ctx.fill(); ctx.restore()
    }
  }

  requestAnimationFrame(loop)
}

loop();
