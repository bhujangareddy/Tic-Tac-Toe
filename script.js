let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");

let turnO = true;
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

let resetgame = ()=> {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
}


boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        if(turnO) {
            box.innerText = "O";
            box.style.color = "red";
            turnO = false;
            count++;
        } else {
            box.innerText = "X";
            box.style.color = "black"; 
            turnO = true;
            count++;
        }
        box.disabled = true; // this does not allow to click the already clicked button
        // console.log(count);
        checkWinner();
    })
})

let disableBoxes = ()=>{
    for (let box of boxes) {
        box.disabled = true;
    }
}

let enableBoxes = ()=>{
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = ""
    }
}

let showWinner = (winner)=> {
    msg.innerText = `Congratulations, The Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
let showTie = ()=> {
    msg.innerText = `The Match is Tied`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    count = 0;
}

let checkWinner = ()=>{
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != "") {
            if(pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
            } else {
                if(count === 9){
                    showTie();
                }
            }
        }
    }
}

newbtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
