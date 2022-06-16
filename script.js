const qs = (el)=>document.querySelector(el);


document.body.addEventListener('keyup', (event)=>{
    playSound(event.code.toLocaleLowerCase());
});

qs('.composer .tocar').addEventListener('click', ()=> {
    let song = qs('#input').value; 
    
    if(song !== '' ){ //se a let song for deferente de vazio... 
        let songArray = song.split(''); 
        playComposition(songArray); 
        
    }
    
});
function playSound(sound){
    let audioElement = qs(`#s_${sound}`);
    let keyElement = qs(`div[data-key="${sound}"]`);
    
    if(audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }
    if(keyElement){
        keyElement.classList.add('active');

        setInterval(()=>{
            keyElement.classList.remove('active');
        }, 400);
    }
    
}

function playComposition(songArray){
    let wait = 0;                   
    let timer = qs('.timer').value; 
    let ms = parseInt(timer);       
    for(let songItem of songArray){ 
        setTimeout(()=>{
            playSound(`key${songItem}`);
        }, wait);
        if(timer === ''){
            wait += 350;
        }else {
            wait += ms;  
        }
        
    }
}
