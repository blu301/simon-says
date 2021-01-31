let gameSeq = [];
let colorSeq = ["green", "red", "yellow", "blue"];

let level = 1;
let playing = false;
let posInSeq = 0;


let btnPress = (color) => {

    $("#" + color).addClass("pressed");
    
    setTimeout(() => {
        $("#" + color).removeClass("pressed");
    }, 50);

};

let btnHide = (color) => {

    $("#" + color).addClass('hide');
    
    setTimeout(() => {
        $("#" + color).removeClass('hide');
    }, 100);

};


let nextSeq = () => {
    return Math.floor(Math.random() * 4);
};


let getNextSeq = () => {

    let color = colorSeq[nextSeq()];
    gameSeq.push(color);

    btnHide(color);

};


let startGame = () => {
        
    playing = true;
    $("#level-title").text("Level " + level);
    getNextSeq();  

};


$(document).keypress((e) => {
    
    if (playing) {
        
        switch (e.key) {
            case '7':
                checkInput("green");    
                break;
                
            case '8':
                checkInput("red");
                break;
            
            case '4':
                checkInput("yellow");
                break;
            
            case '5':
                checkInput("blue");
                break;
        
            default:
                break;
        }
    
    } else {

        startGame();
    }

});


let playAudio = (sound) => {
    
    let audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();

};

let gameOver = () => {

    $("body").addClass("game-over");

    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 100);

};

let goodSeq = (color) => {
    
    btnPress(color);
    playAudio(color);
    
};


let endSeq = () => {

    playAudio("wrong");
    gameOver();

};


let checkInput = (input) => {    
    
    let color = gameSeq[posInSeq];

    if(input === color){
    
        goodSeq(color);

        if(posInSeq !== level - 1 ) {

            posInSeq++;
    
        } else {
        
            $("#level-title").text("Level " + ++level);
            
            setTimeout(() => {
                getNextSeq();
            }, 1000);
            
            posInSeq = 0;
    
        }
        
    } else {
        
        $("#level-title").text("Your score is: " + (level - 1) + " Press a key to restart");
        gameSeq = [];
        level = 1;
        playing = false;
        posInSeq = 0;

        endSeq();
    }
};


let btnClick = (btn) => {
    
    if (playing) {
        
        checkInput(btn.target.id);
    
    }
};

$(".btn").click(btnClick);
