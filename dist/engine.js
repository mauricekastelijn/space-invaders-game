export const W=100,H=138;
export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export class Game {
 constructor({random=Math.random,event=()=>{}}={}){this.random=random;this.event=event;this.mode='ready';this.score=0;this.wave=1;this.lives=3;this.player={x:50,y:124};this.aliens=[];this.bullets=[];this.shields=[];this.ufo=null;this.time=0;this.invincible=0;this.nextWave=0;}
 start(){this.score=0;this.wave=1;this.lives=3;this.player.x=50;this.time=0;this.invincible=1;this.nextWave=0;this.bullets=[];this.mode='playing';this.setupWave();this.event('start');}
 setupWave(){this.aliens=[];for(let r=0;r<4;r++)for(let c=0;c<8;c++)this.aliens.push({x:14+c*9.8,y:24+r*10,row:r,col:c,alive:true});this.shields=[];for(let s=0;s<3;s++)for(let y=0;y<6;y++)for(let x=0;x<12;x++){if((y===0&&(x<2||x>9))||(y>3&&x>=4&&x<=7))continue;this.shields.push({x:17+s*33+x*1.4,y:108+y*1.4,alive:true});}this.direction=1;this.shotTimer=.9;this.cooldown=0;this.ufoTimer=12+this.random()*8;this.ufo=null;this.bullets=[];this.nextWave=0;this.event('wave',this.wave);}
 pause(){if(this.mode==='playing'){this.mode='paused';return true;}return false;}
 resume(){if(this.mode==='paused')this.mode='playing';}
 hit(){if(this.invincible>0||this.mode!=='playing')return;this.lives--;this.invincible=2;this.bullets=this.bullets.filter(b=>b.friendly);this.event('hit',{x:this.player.x,y:this.player.y});if(this.lives<=0)this.end();}
 end(){this.mode='over';this.event('over',this.score);}
 step(dt,input={}){if(this.mode!=='playing')return;dt=clamp(dt,0,.04);this.time+=dt;this.invincible=Math.max(0,this.invincible-dt);this.cooldown-=dt;
 if(input.target!==undefined)this.player.x+=clamp(input.target-this.player.x,-85*dt,85*dt);else this.player.x=clamp(this.player.x+(input.move||0)*63*dt,5,95);this.player.x=clamp(this.player.x,5,95);
 if(this.nextWave>0){this.nextWave-=dt;if(this.nextWave<=0){this.wave++;this.setupWave();}return;}
 if(input.fire&&this.cooldown<=0){this.bullets.push({x:this.player.x,y:119,vy:-110,friendly:true});this.cooldown=.24;this.event('shoot');}
 const living=this.aliens.filter(a=>a.alive);if(!living.length){this.bullets=[];this.ufo=null;this.nextWave=1.7;this.event('clear',this.wave);return;}
 const speed=(3.4+this.wave*1.25+(32-living.length)*.38)*dt;let edge=false;for(const a of living){a.x+=this.direction*speed;if(a.x>95||a.x<5)edge=true;}
 if(edge){this.direction*=-1;for(const a of living){a.x=clamp(a.x,5,95);a.y+=4;}}
 for(const a of living){if(a.y>=119){this.end();return;}for(const s of this.shields)if(s.alive&&Math.abs(s.x-a.x)<5&&Math.abs(s.y-a.y)<4)s.alive=false;}
 this.shotTimer-=dt;if(this.shotTimer<=0){const cols=[...new Set(living.map(a=>a.col))];const col=cols[Math.floor(this.random()*cols.length)];const a=living.filter(a=>a.col===col).sort((a,b)=>b.y-a.y)[0];this.bullets.push({x:a.x,y:a.y+4,vy:27+this.wave*3,friendly:false});this.shotTimer=Math.max(.22,.95-this.wave*.06)+this.random()*.35;}
 this.ufoTimer-=dt;if(!this.ufo&&this.ufoTimer<=0){this.ufo={x:-8,y:12};this.ufoTimer=17+this.random()*9;}if(this.ufo){this.ufo.x+=16*dt;if(this.ufo.x>110)this.ufo=null;}
 for(const b of this.bullets){if(b.dead)continue;const old=b.y;b.y+=b.vy*dt;const crosses=(y,r)=>y>=Math.min(old,b.y)-r&&y<=Math.max(old,b.y)+r;
 const shield=this.shields.filter(s=>s.alive&&Math.abs(s.x-b.x)<1.15&&crosses(s.y,1.2)).sort((a,c)=>b.friendly?c.y-a.y:a.y-c.y)[0];if(shield){b.dead=true;for(const s of this.shields)if(Math.abs(s.x-shield.x)<2.2&&Math.abs(s.y-shield.y)<2.2)s.alive=false;continue;}
 if(b.friendly){const a=living.filter(a=>a.alive&&Math.abs(a.x-b.x)<4&&crosses(a.y,3)).sort((a,c)=>c.y-a.y)[0];if(a){a.alive=false;b.dead=true;const points=[30,20,20,10][a.row];this.score+=points;this.event('kill',{x:a.x,y:a.y,row:a.row,points});}else if(this.ufo&&Math.abs(this.ufo.x-b.x)<6&&crosses(this.ufo.y,3)){this.score+=150;this.event('bonus',{x:this.ufo.x,y:this.ufo.y,points:150});this.ufo=null;b.dead=true;}}
 else if(Math.abs(b.x-this.player.x)<4&&crosses(this.player.y,3)){b.dead=true;this.hit();}}
 this.bullets=this.bullets.filter(b=>!b.dead&&b.y>-5&&b.y<143);
 }
}
