//conts nao pode ser reatibuida/pegando o dino
const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
//cronometro
let hour = 0;
let minute = 0;
let second = 0;
let cron;

//space pressionado
function hendKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}
//
function jump(){
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval);
            isJumping = false;
            //descendo
            let downInterval = setInterval(() => {  
                if(position <= 0){
                    clearInterval(downInterval);
                }else{
                    position = position - 20;
                    dino.style.bottom = position + 'px';
                }
            },20);
        }else{
            //subindo
            position = position + 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}
//cactus
function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() =>{ 
        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="gamer-over">Fim de jogo</h1>';
        } else{
            
            cactusPosition = cactusPosition - 10;
            cactus.style.left = cactusPosition + 'px';
        }
    },20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', hendKeyUp, startCron());

//cronometro
function startCron(){
    cron = setInterval(() => {timer(); }, 10);
}
//tempo
function timer(){
    second++;

    if(second == 60){
        second = 0;
        minute++;
        
        if(minute == 60){
            minute = 0;
            hour++;
        }
    }

    var format = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second);
    document.getElementById('counter').innerText = format;
}