console.log("working");
const selectBox = document.querySelector(".select-box");
const selectXBtn = selectBox.querySelector(".playerX");
const selectOBtn = selectBox.querySelector(".playerO");
const playBoard = document.querySelector(".play-board");
const allBox = document.querySelectorAll("section span");
const players = document.querySelector(".players");
const resultBox = document.querySelector(".result-box");
const wonText = document.querySelector(".won-text");
const replayBtn = document.querySelector(".btn") 


window.onload =()=>{    //once window loaded
    for (let i = 0; i < allBox.length; i++) {   //add onClick attribute in all available sections spans 
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
    selectXBtn.onclick = () =>{
        selectBox.classList.add("hide");    //hide the select box on playerX button clicked
        playBoard.classList.add("show");    //show the playboard section on player button clicked
    }
    selectOBtn.onclick = () =>{
        selectBox.classList.add("hide");    //hide the select box on playerO button 
        playBoard.classList.add("show");    //show the playboard section on playerO click
        players.setAttribute("class", "players active player"); //add three class in player element
    }
}
let playerXIcon = "fa-solid fa-xmark";   
let playerOIcon = "fa-solid fa-o"
let playerSign = "X";
let runBot = true;
let count = 0;  //Used for draw logic, if all moves are over and no one won, then draw
//User click Function
function clickedBox(element){
    //console.log(element);
    if(players.classList.contains("player")){
        element.innerHTML = '<i class ="fa-solid fa-o"></i>';
        players.classList.add("active");
        playerSign = "O";
        element.setAttribute("id", playerSign); 
        count++;
    }else{
        element.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        players.classList.add("active");
        playerSign = "X"
        element.setAttribute("id", playerSign);
        count++;
    }
    selectWinner(); 
    element.style.pointerEvents = "none"; //once user  select any box, that box can't be selected again
    playBoard.style,pointerEvents = "none";
    let randomDelayTime = ((Math.random()*1000) + 200).toFixed();    //random delay for bot
    //console.log(randomDelayTime);
    setTimeout(() => {
       bot(runBot);
    }, randomDelayTime);
}

//Bot click Function

function bot(){
    if(runBot){
    let array =[];
    playerSign = "O";
     //creating empty array, store unselected box index
    for(let i = 0; i<allBox.length; i++){
        if(allBox[i].childElementCount == 0){//if span has no child element
            array.push(i);
            //console.log(i+" "+"has no children");
        }
    }

    let randomBox = array[Math.floor(Math.random()*array.length)]; //getting random box from the unselected boxes
    //console.log(randomBox);
    if(array.length > 0){
        if(players.classList.contains("player")){
            allBox[randomBox].innerHTML = '<i class="fa-solid fa-xmark"></i>';
            players.classList.remove("active"); //removing to move the slider back to user
            playerSign = "X";
            allBox[randomBox].setAttribute("id", playerSign)
            count++;
        }else{
            allBox[randomBox].innerHTML = '<i class ="fa-solid fa-o"></i>';
            players.classList.remove("active");
            playerSign = "O";
            allBox[randomBox].setAttribute("id", playerSign);
            count++;
        }
        selectWinner(); 
    }
    //console.log("Count "+count);
    allBox[randomBox].style.pointerEvents = "none"; //once bot select any box, that box can't be selected again
    playBoard.style,pointerEvents = "auto";
    }
}

//Winner

function getClass(idname){  //mistakenly wrong class name, logically it should be getId
    return document.querySelector(".box" + idname).id; //id name
}

function checkClass(val1, val2, val3, sign){    //check if the 3 boxes have same sign
    if(getClass(val1) == sign && getClass(val2)==sign && getClass(val3)==sign){
        return true;
    }
}

function selectWinner(){    //These are the winning options
    if(checkClass(1, 2, 3, playerSign)||
       checkClass(4, 5, 6, playerSign)||
       checkClass(7, 8, 9, playerSign)||
       checkClass(1, 5, 9, playerSign)||
       checkClass(3, 5, 7, playerSign)||
       checkClass(1, 4, 7, playerSign)||
       checkClass(2, 5, 8, playerSign)||
       checkClass(3, 6, 9, playerSign)){
        console.log(playerSign + " is the Winner");
        runBot = false;
        playBoard.style,pointerEvents = "none";
        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);

        wonText.innerHTML =  `Player <p>${playerSign}</p> won the game!`;
    }
    else if(count == 9){
        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);
        wonText.innerHTML =  'Match is Draw'; 
    }
}

//Replay

replayBtn .onclick = () =>{
    window.location.reload();   //Refresh the page
}