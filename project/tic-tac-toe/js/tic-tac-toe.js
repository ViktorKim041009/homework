const getElement = (selector) => {
   return document.querySelector(selector)
}
const startGame = () => {
    console.log("Start")
}
const stopGame = () =>{
    console.log("Stop")
}
const switchPlayer = (firstPlayer = true) => {
    console.log("Player switched")
}



const Field = {
    containerEl: getElement(''),
    size: 3,
    cells:[[], [], []],

    setListeners: () => {
        console.log('Listeners')
    },
    fill: () => {
        console.log('Fill')
    },
    reset: () => {
        console.log('Reset')
    }
}

const Game = {
    field: Field,
    isActive: false,
    activePlayer: 0,
    players:[{
        
    }, {}],

    startGame: () => {
        console.log("Start!")
        this.isActive = true
    },

    stopGame: () => {
        console.log("Stop")
        this.isActive = false
    },
    switchPlayer: () => {
        console.log("Player Switched")
    },
    turn: (cellEl) =>{
        console.log("Player goes")
    },
}

console.log(Game)
Game.startGame()
console.log(Game)
console.log(Game)