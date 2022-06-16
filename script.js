const qs = (el)=>document.querySelector(el);

//evento de click na tela inteira para capiturar qual tecla foi digitada
document.body.addEventListener('keyup', (event)=>{
    playSound(event.code.toLocaleLowerCase());
});
//evento para ler as letras digitadas no "Faça uma composição" e tocar o som conforme oq esta escrito
qs('.composer .tocar').addEventListener('click', ()=> {
    let song = qs('#input').value; //grava as letras na let song
    
    if(song !== '' ){ //se a let song for deferente de vazio... 
        let songArray = song.split(''); // transforma a informaçao salva na let song em arrays saparados
        playComposition(songArray); // faz a leitura(toca o som equivalente a cada letra gravada no array songarray)
        
    }
    
});
function playSound(sound){
    let audioElement = qs(`#s_${sound}`);//salva na let o id do som equivalente a tecla apertada
    let keyElement = qs(`div[data-key="${sound}"]`);//salva na let as teclas que tocam som quando apertadas
    
    if(audioElement) {
        audioElement.currentTime = 0;//para tocar 1 som logo que a tecla for clicada, sem intervalo para que o primeiro termine antes de tocar o proximo
        audioElement.play();
    }
    if(keyElement){
        keyElement.classList.add('active');//adiciona a class active para que a letra fique amarela

        setInterval(()=>{
            keyElement.classList.remove('active');// remove a cor amarela das teclas apos tocar o som
        }, 400);
    }
    
}

function playComposition(songArray){// função para não tocar todos os sons juntos, 
    let wait = 0;                   //para tocar na sequencia com intervalo de 350ms entre eles
    let timer = qs('.timer').value; //let para mudar o intervalo entre os sons
    let ms = parseInt(timer);       //let para transformar o valor digitado string em Number
    for(let songItem of songArray){ 
        setTimeout(()=>{
            playSound(`key${songItem}`);
        }, wait);
        if(timer === ''){
            wait += 350;
        }else {
            wait += ms;  //intervalo entre 1 som e outro
        }
        
    }
}
