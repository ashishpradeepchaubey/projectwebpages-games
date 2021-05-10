function ageindays(){
    var birthyear=prompt("tell me ur birth year, u bitch!!!")
    var ageindayz=(2020-birthyear)*365;
    

    var h1=document.createElement('h1');
    var textans=document.createTextNode(ageindayz);
    h1.setAttribute('id','ageindays');
    h1.appendChild(textans);
    document.getElementById('flex-box-result').appendChild(h1);
    
}
function resetz(){
    document.getElementById('ageindays').remove();
}
function generateCat(){
    var image=document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    image.src="cat1.jpg";
    div.appendChild(image);
}
function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice,botChoice;
    humanChoice=yourChoice.id;
    botChoice=numberToChoice(randToRpsInt());
    console.log('computerChoice:',botChoice);
    results=decideWinner(humanChoice,botChoice);
    console.log(results);
    message=finalMessage(results);
    console.log(message);
    rpsFrontEnd(yourChoice.id,botChoice,message);
}
function randToRpsInt(){
    return Math.floor(Math.random()*3);
}
function numberToChoice(number){
    return['rock','paper','scissors'][number];
}
function decideWinner(yourChoice,computerChoice){
    rpsDatabase={
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0}
    };
    var yourScore=rpsDatabase[yourChoice][computerChoice];
    var computerScore=rpsDatabase[computerChoice][yourChoice];
    return[yourScore, computerScore];
}
function finalMessage([yourScore, computerScore]){
    {
        if(yourScore===0){
            return{'message':'you lost!','color':'red'};
        }
        else if(yourScore===0.5){
            return{'message':'you tied!','color':'yellow'};
        }
        else{
            return{'message':'you win!','color':'green'};
        }
    }
}
function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage){
    var imagesDatabase={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    
    var humanDiv=document.createElement('div');
    var botDiv=document.createElement('div');
    var messageDiv=document.createElement('div');

    humanDiv.innerHTML="<img src='"+imagesDatabase[humanImageChoice]+"'height=150 width=150 style='box-shadow:0px 10px 50px rgba(37,50,233,1);'>"
    messageDiv.innerHTML="<h1 style='color:" + finalMessage['color'] + "; font-size:60px; padding:30px;'>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML="<img src='"+imagesDatabase[botImageChoice]+"'height=150 width=150 style='box-shadow:0px 10px 50px rgba(243,38,24,1);'>"
    
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}

var allbutton=document.getElementsByTagName('button');
console.log(allbutton);
var copyallbuttons=[];
for(let i=0;i<allbutton.length;i++){
    copyallbuttons.push(allbutton[i].classList[1]);
}
console.log(copyallbuttons);

function buttoncolorchange(buttonthingy)
{
    if(buttonthingy.value==='red')
    {
        buttonred();
    }
    else if(buttonthingy.value==='green')
    {
        buttongreen();
    }

    else if(buttonthingy.value==='reset')
    {
            buttonreset();
    }
    else if(buttonthingy.value==='random')
    {
            buttonrandom();
    }
        
}
function buttonred(){
    for(let i=0;i<allbutton.length;i++){
        allbutton[i].classList.remove(allbutton[i].classList[1]);
        allbutton[i].classList.add('btn-danger');
    }
}
function buttongreen(){
    for(let i=0;i<allbutton.length;i++){
        allbutton[i].classList.remove(allbutton[i].classList[1]);
        allbutton[i].classList.add('btn-success');
    }
}
function buttonreset(){
    for(let i=0;i<allbutton.length;i++){
        allbutton[i].classList.remove(allbutton[i].classList[1]);
        allbutton[i].classList.add(copyallbuttons[i]);
    }
}
function buttonrandom(){
    let choices=['btn-primary','btn-danger','btn-success','btn-warning']
    for(let i=0;i<allbutton.length;i++){
        let randomnumber=Math.floor(Math.random()*4);
        allbutton[i].classList.remove(allbutton[i].classList[1]);
        allbutton[i].classList.add(choices[randomnumber]);
    }
}


let blackjackgame={
    'you': {'scorespan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scorespan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsmap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isstand':false,
    'turnsover':false,
};
const You=blackjackgame['you'];
const Dealer=blackjackgame['dealer'];
const hitsound=new Audio('swish.m4a');
const winsound=new Audio('cash.mp3');
const losssound=new Audio('aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackhit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerlogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackdeal);

function blackjackhit(){
    if(blackjackgame['isstand']===false)
    {
        let card=randomcard();
        showcard(card,You);
        updatescore(card,You);
        showscore(You);
    }
}
function randomcard(){
    let randomindex=Math.floor(Math.random()*13);
    return blackjackgame['cards'][randomindex];
}
function showcard(card,activeplayer){
    if (activeplayer['score']<=21){
        let cardimage=document.createElement('img');
        cardimage.src=`${card}.png`;
        document.querySelector(activeplayer['div']).appendChild(cardimage);
        hitsound.play();
   }
}

function blackjackdeal(){
    if(blackjackgame['turnsover']===true){
        blackjackgame['isstand']=false;
        let yourimages=document.querySelector('#your-box').querySelectorAll('img');
        let dealerimages=document.querySelector('#dealer-box').querySelectorAll('img');
        for(i=0;i<yourimages.length;i++){
            yourimages[i].remove();
        }
        for(i=0;i<dealerimages.length;i++){
            dealerimages[i].remove();
        }
        You['score']=0;
        Dealer['score']=0;
        document.querySelector('#your-blackjack-result').textContent=0;
        document.querySelector('#dealer-blackjack-result').textContent=0;
        document.querySelector('#your-blackjack-result').style.color='#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color='#ffffff';
        document.querySelector('#blackjack-result').textContent="Let's play";
        document.querySelector('#blackjack-result').style.color='black';
        blackjackgame['turnsover']=true;
    }
}

function updatescore(card,activeplayer){
    if(card==='A'){
        if(activeplayer['score']+blackjackgame['cardsmap'][card][1]<=21){
            activeplayer['score']+=blackjackgame['cardsmap'][card][1];
        }
        else{
            activeplayer['score']+=blackjackgame['cardsmap'][card][0];
        }
    }
    else{
        activeplayer['score']+=blackjackgame['cardsmap'][card];
    }
}

function showscore(activeplayer){
    if(activeplayer['score']>21){
        document.querySelector(activeplayer['scorespan']).textContent='Bust!';
        document.querySelector(activeplayer['scorespan']).style.color='red';
    }
    else{
        document.querySelector(activeplayer['scorespan']).textcontent=activeplayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

async function dealerlogic(){
    blackjackgame['isstand']=true;
    while(Dealer['score']<16 && blackjackgame['isstand']===true){
        let card=randomcard();
        showcard(card,Dealer);
        updatescore(card,Dealer);
        showscore(Dealer);
        await sleep(1000);
    }
    blackjackgame['turnsover']=true;
    let winner=computewinner();
    showresult(winner);
}

function computewinner(){
    let winner;
    if(You['score']<=21){
        if(You['score']>Dealer['score']||(Dealer['score']>21)){
            blackjackgame['wins']++ ;
            winner=You;
        }
        else if(You['score']<Dealer['score']){
            blackjackgame['losses']++;
            winner=Dealer;
        }
        else if(You['score']===Dealer['score']){
            blackjackgame['draws']++;
        }
    }
    else if(You['score']>21 && Dealer['score']<=21){
        blackjackgame['losses']++;
        winner=Dealer;
    }
    else if(You['score']>21 && Dealer['score']>21){
        blackjackgame['draws']++;
    }
    console.log(blackjackgame);
    return winner;
}

function showresult(winner){
    let message,messagecolor;
    if(blackjackgame['turnsover']===true){
        if(winner===You){
            document.querySelector('#wins').textContent=blackjackgame['wins'];
            message='YOU WON!';
            messagecolor='green';
            winsound.play();
        }
        else if(winner===Dealer){
            document.querySelector('#losses').textContent=blackjackgame['losses'];
            message='YOU LOST!';
            messagecolor='red';
            losssound.play();
        }
        else{
            document.querySelector('#draws').textContent=blackjackgame['draws'];
            message='YOU DREW!';
            messagecolor='black';
           
        }
        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messagecolor;

    }
}
