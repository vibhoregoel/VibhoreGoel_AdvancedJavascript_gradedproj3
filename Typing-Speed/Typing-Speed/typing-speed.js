let inputArea = document.getElementById("typing-area");
let text = document.getElementById("text");
let restart = document.getElementById("restart");
let errorField = document.getElementById("error");
let timer = document.getElementById("timer");
let accuracy = document.getElementById("accuracy");

var pool = ["God is everywhere from a tiny sand to huge planet",
            "Time and tide waits for none",
            "Do whatever you want but do it with full involvement",
            "The journey of a thousand miles begin with one step",
            "Sarve santu niramayah",
            "Elevate your life by tuning your frequency to love"
];

var checkedText;

inputArea.addEventListener('focus', () => {

    inputArea.value = "";
    text.innerHTML = pool[Math.floor(Math.random()*pool.length)];
    checkedText = text.innerHTML;

    let totalSeconds = 5;
    var startTimer = setInterval(clock, 1000);
   
    function clock(){
        
        --totalSeconds;

        if(totalSeconds === 0){

            wnc(inputArea.value);
            text.innerHTML = "Click on restart to start a new game";
            stopTimer(startTimer);
        }

        document.getElementById("timer").innerHTML = totalSeconds+"s";
        
    }

    function stopTimer(){
        clearInterval(startTimer);
    }
    
});

restart.addEventListener("click", () => {

    errorField.innerHTML = 0;
    timer.innerHTML = 60+"s";
    accuracy.value = 100;
    text.innerHTML = "Click on the area below to start the game";
    inputArea.value = "";

    document.getElementById('dynamic-card').removeChild(document.getElementById('WPM-card'));
    document.getElementById('dynamic-card').removeChild(document.getElementById('CPM-card'));

});

function wnc(inputText){

    let char = inputText.split('').length;
    let word = inputText.split(" ").length;
    let wpm = 'WPM';
    let cpm = 'CPM';

    display(wpm, word);
    display(cpm, char);
    
}

function display(cardName, cardValue){

    const attr = document.getElementById('dynamic-card');
    attr.style.display = 'flex';

    const el = document.createElement('li');
    const el_name = document.createElement('section');
    const el_value = document.createElement('section');

    el.setAttribute('class', 'attribute');
    el.setAttribute('id', cardName+'-card');
    el_name.setAttribute('class', 'attribute-name');
    el_value.setAttribute('class', 'value');

    el.style.width = '70px';
    el.style.padding = '5px';
    el.style.marginLeft = '6px';
    el.style.marginRight = '6px';
    el.style.textAlign = 'center';
    el.style.backgroundColor = 'rgba(158, 158, 45, 0.9)';
    el.style.borderRadius = '8px';
    el.style.boxShadow = '5px 5px gray';

    el_name.style.fontSize = 'small';
    el_value.style.fontSize = 'xx-large';

    el_name.textContent = cardName;
    el_value.textContent = cardValue;

    el.appendChild(el_name);
    el.appendChild(el_value);

    attr.appendChild(el);
}

var count = 0;
var error = 0;
var correct = 0;

inputArea.addEventListener('keydown', () => {

    let inputText = inputArea.value;
    let char = inputText.split('').pop();
    let txt = checkedText.split('');

    if(char !== undefined){

        let op = txt[count];
        count++;

        if(char == op){
            correct++;
            accuracy.innerHTML = Math.round(correct/txt.length*100);
            console.log(count);
        }
        else{
            error++;
            errorField.innerHTML = error;
            accuracy.innerHTML = Math.round(count/txt.length*100);
        }

    }
       
});