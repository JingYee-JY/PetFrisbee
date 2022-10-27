const startButton = document.querySelector(".startButton")
const start = document.querySelector(".start")
const instruction = document.querySelector(".instruction")
const startGameButton = document.querySelector(".startGame")
const game = document.querySelector(".game")
const gameContainer = document.querySelector(".game-container");
const goal = document.querySelector(".goal")
const dog = document.querySelector(".dog")
const chances = document.querySelector(".chance")
const popUp = document.querySelector(".popUp");
const information = document.querySelector(".information");
const next = document.querySelector(".next");
const final = document.querySelector(".final");
const finalTitle = document.querySelector(".title-final");
const text = document.querySelector(".text");
const more = document.querySelector(".More");
const restart = document.querySelector(".restart");
const ready = document.querySelector(".ready");
const additional = document.querySelector(".additional");
const readyButton = document.querySelector(".readyButton");
const showScore = document.querySelector(".score");
const homeButton = document.querySelector(".home")

/*const clickSound = document.getElementById("click")
const clap = document.getElementById("clap")
const lose = document.getElementById("lose")*/

let scoreCount
let score
let border
let scoreinterval
let distance

let newBorderWidth
let offset
let yDistance
let catching

let startGame = false;
let player = {step: 3, right:9}
let right;
let total;
let chance;

var objects = [ {name: "frisbee", catchImage:"./img/fisbeeCatch.png"},
                {name: "bone", catchImage:"./img/boneCatch.png"},
                {name: "frisbee", catchImage:"./img/fisbeeCatch.png"},
                {name: "ball", catchImage:"./img/ballCatch.png"},
                {name: "frisbee", catchImage:"./img/fisbeeCatch.png"},
                {name: "cookie", catchImage:"./img/cookieCatch.png"},
                {name: "frisbee", catchImage:"./img/fisbeeCatch.png"},
                {name: "treats", catchImage:"./img/treatsCatch.png"},
                {name: "frisbee", catchImage:"./img/frisbeeCatch.png"},
                {name: "candy", catchImage:"./img/candyCatch.png"}]

startButton.addEventListener("click", () => {
    //playClickSound()
    //let delay = setTimeout(() => {
        start.classList.add("hide")
        //gameDetail()
        instruction.classList.remove("hide")
    //}, 200);
})

startGameButton.addEventListener("click", () => {
    //playClickSound()
    //let delay = setTimeout(() => {
        instruction.classList.add("hide")
        gameDetail()
        began()
        //howToPlay.classList.remove("hide")
    //}, 200);
})

/*startGameButton.addEventListener("click", () => {
    howToPlay.classList.add("hide")
    began()
})*/

next.addEventListener("click", () => {
    //playClickSound()
    //let delay = setTimeout(() => {
        popUp.classList.add("hide")
        startGame = true
        fallingObject()
    //}, 200);
})

  restart.addEventListener("click", () => {
    //playClickSound()
    //let delay = setTimeout(() => {
        final.classList.add("hide")
        start.classList.remove("hide")
        additional.classList.add("hidden")
    //}, 200);
  })
  
  function gameDetail(){
    game.classList.remove("hide")
    score = Math.floor(Math.random() * 6) + 5;
    chance = 3
    answer = "frisbee"
    catching = false
    chances.innerHTML = `
    <img class="net" src="./img/chance.png">
    <img class="net" src="./img/chance.png">
    <img class="net" src="./img/chance.png">`
    showScore.innerHTML = score
}

function began(){
    startGame = true
    scoreinterval =  setInterval(updateScore, 1)
    chance = 3
    first = true
    spawnObject()
    fallingObject()
}

function spawnObject(){
    border = gameContainer.getBoundingClientRect();
    let object = document.createElement("div");
    var index = Math.floor(Math.random() * Math.floor(objects.length))
    console.log(index)
    console.log(objects.length)
    console.log(border.width)
    object.classList.add(objects[index].name)
    if(border.width < 500){
        object.y = -300
        newBorderWidth = border.width - 240
        offset = 145
        yDistance = 150
        player.step = 3
        player.right = 9
        bottom = 100
    }
    if(border.width > 500){
        object.y = -350
        newBorderWidth = border.width - 550
        offset = 300
        player.step = 5
        player.right = 11
        yDistance = 300
        bottom = 100
    }
    if(first == true){
        object.y = -150;
        first = false
    }
    object.style.top = object.y + 'px';
    object.x = Math.floor(Math.random() * newBorderWidth) + offset
    object.style.left = object.x + 'px';
    gameContainer.appendChild(object);
    object.addEventListener("click", () => {
        console.log(catching)
        //playClickSound()
        if(catching == false){
            object.classList.add("move")
            catching = true
        }
    })
    object.addEventListener("touchstart", () => {
        //playClickSound()
        if(catching == false){
            object.classList.add("move")
            catching = true
        }
    })
}

function fallingObject(){
    if(startGame){
        moveObject()
        window.requestAnimationFrame(fallingObject);
    }
}
function moveObject(){
    let frisbee = document.querySelectorAll(".frisbee");
    let bone = document.querySelectorAll(".bone");
    let ball = document.querySelectorAll(".ball");
    let cookie = document.querySelectorAll(".cookie");
    let treats = document.querySelectorAll(".treats");
    let candy = document.querySelectorAll(".candy");

    function spawnItem(item){
        if(item.y >= -150 && item.y < -147){
            spawnObject();
        }
        if(item.y > (border.height - (border.height / 10 * 3))){
            item.classList.add("stop")
        }
        if(item.classList.contains("move")){
            if(item.x < 100){
                if(item.y > border.height - 300){
                    item.classList.remove("move")
                }
                item.y = item.y + player.right;
                item.style.top = item.y +"px";
                return
            }
            if(item.classList.contains("stop")){
                item.x = item.x - player.right;
                item.style.left = item.x +"px";
                if(item.y > (border.height - yDistance - 100)){
                    console.log("testx")
                    item.y = item.y - player.right;
                    item.style.top = item.y +"px";
                    return
                }
            }
            item.x = item.x - player.right;
            item.style.left = item.x +"px";
            item.y = item.y + player.right;
            item.style.top = item.y +"px";
        }
        if(item.y > border.height){
            catching = false
            gameContainer.removeChild(item);
        }
        if(item.y > (border.height - yDistance) && item.y < (border.height - bottom) && 
        item.x > 0 && item.x < 100){
            catching = true
            if(item.classList.contains(`${answer}`)){
                score -= 1
                dog.src = "./img/fisbeeCatch.png"
                gameContainer.removeChild(item);
            }
            if(!item.classList.contains(`${answer}`)){
                chance -=1
                if(item.classList.contains(`bone`)){
                    dog.src = "./img/boneCatch.png"
                }
                if(item.classList.contains(`ball`)){
                    dog.src = "./img/ballCatch.png"
                }
                if(item.classList.contains(`cookie`)){
                    dog.src = "./img/cookieCatch.png"
                }
                if(item.classList.contains(`treats`)){
                    dog.src = "./img/treatsCatch.png"
                }
                if(item.classList.contains(`candy`)){
                    dog.src = "./img/candyCatch.png"
                }
                gameContainer.removeChild(item);
                let delay = setTimeout(()=>{
                    let net = document.querySelector(".net")
                    net.remove()
                },800)
            }
            let delay = setTimeout(()=>{
                console.log("C")
                dog.src = "./img/dog.png"
                catching = false
                if(chance == 0){
                    startGame = false
                    remove()
                    //lose.currentTime = 0
                    //lose.play()
                    game.classList.add("hide")
                    final.classList.remove("hide")
                    final.style.backgroundImage = "url('./img/loseBackground.png')"
                    text.src = "./img/loseText.png"
                    clearInterval(scoreinterval);
                }
                if(score == 0){
                    console.log("stop")
                    let delay = setTimeout(() => {
                        //clap.currentTime = 0
                        //clap.play()
                        startGame = false
                        remove()
                        game.classList.add("hide")
                        final.classList.remove("hide")
                        additional.classList.remove("hidden")
                        final.style.backgroundImage = "url('./img/winBackground.png')"
                        text.src = "./img/winText.png"
                        clearInterval(scoreinterval);
                      }, 200);
                }
            },800)
        }
        item.y = item.y + player.step;
        item.style.top = item.y +"px";
    }
    frisbee.forEach(function(item){
        spawnItem(item);
    })
    bone.forEach(function(item){
        spawnItem(item);
    }) 
    ball.forEach(function(item){
        spawnItem(item);
    })
    cookie.forEach(function(item){
        spawnItem(item);
    })
    treats.forEach(function(item){
        spawnItem(item);
    })
    candy.forEach(function(item){
        spawnItem(item);
    })
}

function updateScore(){
    if(startGame == true){
        showScore.innerHTML = `${score}`;
    }
}

function remove(){
    let frisbee = document.querySelectorAll(".frisbee");
    let bone = document.querySelectorAll(".bone");
    let ball = document.querySelectorAll(".ball");
    let cookie = document.querySelectorAll(".cookie");
    let treats = document.querySelectorAll(".treats");
    let candy = document.querySelectorAll(".candy");
    
    frisbee.forEach(function(item){
        gameContainer.removeChild(item);
    })
    bone.forEach(function(item){
        gameContainer.removeChild(item);
    })
    ball.forEach(function(item){
        gameContainer.removeChild(item);
    })
    cookie.forEach(function(item){
        gameContainer.removeChild(item);
    })
    treats.forEach(function(item){
        gameContainer.removeChild(item);
    })
    candy.forEach(function(item){
        gameContainer.removeChild(item);
    })
}

/*function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}*/

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
event.preventDefault();
}, { passive: false });