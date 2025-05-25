
const getElement = (selector) => {
    return document.querySelector(selector)
}
const isString = (value) =>{
    return typeof valuelue === 'string'
}

class InfoLabel{
    element = getElement('#tic-tac-toe_info')
    className = 'tic-tac-toe__cell'
  constructor() {}
    hasElement() {
        return this.element instanceof HTMLElement
    }

    setWinner(winnerName){
        if (!isString(winnerName) || !this.hasElement ())return
        this.element.innerText = `${winnerName} is winner!`
    }

    setTurn(activePlayerName){
         if (!isString(winnerName) || !this.hasElement ())return
        this.element.innerText = `${activePlayerName}' s turn!`
    }

    setDraw() {
         if (!this.hasElement())return
        this.element.innerText = `Draw!`
    }

    setNotStarted(){
         if (!this.hasElement())return
        this.element.innerText = `Not started`
    }
    
}

class Clickable {
    element = null
    activeClassName = null
    handler = null
    handlerContext = null
    handlerArgs = []
    click = null

    constructor() {
        this.click = this._click.bind(this)
    }
     _click() {
        console.log('Click')
        if (this.handler === null) return
        if (this.handlerContext === null) {
            this.handler(...this.handlerArgs)
        }
        else this.handler.call(
            this.handlerContext,
            ...this.handlerArgs
        )
        this.deactivate()
    }
    setHandler(newHandler, context, ...args) {
        if (typeof newHandler !== 'function') return
        this.handler = newHandler
        if (typeof context === 'object') this.handlerContext = context
        else this.handlerContext = null
        this.handlerArgs = args
    }
     deactivate() {
        // console.log('Cell -> deactivate()')
        if (this.element === null) return
        if (!this.element.classList.contains(this.activeClassName)) return
        // удаляем слушатель события "клик"
        this.element.removeEventListener('click', this.click)
        // удаляем класс
        this.element.classList.remove(this.activeClassName)
    }
}

class Button extends Clickable {
    hasElement(){
        return this.element instanceof HTMLElement
    }

    setStart(){
        if(!this.hasElement())return
        this.element.Text = 'Start'
        if (this.element.classList.contains(this.stopClassName)){
            
        }
    }

    setStop(){}
}

class Cell extends Clickable {
    element = null
    className = 'tic-tac-toe__cell'
    id = 'tic-tac-toe_cell'
    winClassName = 'tic-tac-toe__cell--win'
    activeClassName = 'tic-tac-toe__cell--empty'
    handler = null
    handlerContext = null
    handlerArgs = []
    click = null

    constructor() {
        super()
        this.activeClassName = 'tic-tac-toe_cell--empty'
    }

    _click() {
        console.log('Click')
        if (this.handler === null) return
        if (this.handlerContext === null) {
            this.handler(...this.handlerArgs)
        }
        else this.handler.call(
            this.handlerContext,
            ...this.handlerArgs
        )
        this.deactivate()
    }
    create() {
        this.element = document.createElement('div')
        this.element.classList.add(this.className)
    }

    activate() {
        if (this.element === null) return
        if (this.element.classList.contains(this.activeClassName)) return
        // добавляем слушатель события "клик"
        this.element.addEventListener('click', this.click)
        // добавляем класс
        this.element.classList.add(this.activeClassName)
    }


    fill(content) {
        if (this.element === null) return
        if (typeof content !== 'string') return
        this.element.innerHTML = content
    }

    free() {
        if (this.element === null) return
        this.element.innerHTML = ''
    }

    publish(container) {
        if (this.element === null) return
        if (container instanceof HTMLElement) {
            container.append(this.element)
        }
    }

    unpublish() {
        if (this.element instanceof HTMLElement) {
            this.element.remove()
        }
    }

    // дз
    addWinClass() {
        if(this.element instanceof HTMLElement){
            if(this.element.classList.contains(this.winClassName)) return
            this.element.classList.add(this.winClassName)
        }
    }

    // дз
    removeWinClass() {
           if(this.element instanceof HTMLElement){
            if(!this.element.classList.contains(this.winClassName)) return
            this.element.classList.remove(this.winClassName)
        }
    }
}

// const cell = new Cell()
// cell.create()
// cell.publish(getElement('#tic-tac-toe__field'))
// cell.setHandler(cell.fill, cell, '<h1>Hello</h1>')
// console.log(cell.handler)
// cell.activate()

// field -> Field
class Field {
    containerEl = getElement('#tic-tac-toe__field')
    cells = [[], [], [],]

    constructor(handler, context, ...args) {
        this.cells.forEach((line) => {
            for (let i = 0; i < 3; ++i) {
                const cell = new Cell()
                const newArgs = [cell, ...args]
                cell.create()
                cell.publish(this.containerEl)
                cell.setHandler(handler, context, ...newArgs)
                cell.activate()
                line.push(cell)
            }
        })
    }

    get size() {
        return this.cells.length
    }

    deactivate() {
        // console.log('Field -> deactivate()')
        this.cells.forEach((line) => {
            // console.log('For each line, line:', line)
            line.forEach((cell) => { cell.deactivate() })
        })
    }

    clear() {
        this.cells.forEach((line) => {
            line.forEach((cell) => {
                cell.free()
                cell.removeWinClass()
                cell.unpublish()
            })
        })
    }
}
class Game {
    buttonEl = getElement('#tic-tac-toe__btn')
    InfoLabel = new InfoLabel()
    isActive = false
    field = null
    activePlayerId = -1
    winCombinations = []
    players = []

    constructor() {
        this.InfoLabel.setNotStarted()
    }

    get activePlayer() {
        return this.activePlayerId !== -1
            ? this.players[this.activePlayerId]
            : null
    }

    startGame() {
        console.log("Start")
        if (this.field instanceof Field) this.field.clear() 
        this.field = new Field(this.turn, this)
        this.clearPlayers()
        this.switchPlayer()
        this.updateWinCombinations()
        this.InfoLabel.setTurn(this.activePlayer.name)
        this.isActive = true
    }
    stopGame() {
        console.log("Stop")
        this.field.deactivate()
        this.isActive = false
    }

    clearPlayers(){
       this.players.forEach((player) => { player.filled = [] })

    }
    switchPlayer() {
        console.log("Player switched")
        this.activePlayerId = (this.activePlayerId + 1) % this.players.length
        this.InfoLabel.setTurn(this.activePlayer.name)
    }
    updateWinCombinations() {
        this.winCombinations = [[], [], [], [], []]
        // заполняем колонки и диагонали
        this.field.cells.forEach((line, lineId) => {
            this.winCombinations[0].push(line[0])
            this.winCombinations[1].push(line[1])
            this.winCombinations[2].push(line[2])
            this.winCombinations[3].push(line[lineId])
            this.winCombinations[4].push(line[line.length - lineId - 1])
        })
        // заполняем строки
        this.winCombinations = [
            ...this.winCombinations,
            ...this.field.cells
        ]
    }
    getWinCombination() {
        if (this.activePlayer.filled.length < this.field.size) return false
        let combo = null
        console.log(this.winCombinations)
        this.winCombinations.forEach((combination) => {
            let matches = 0
            combination.forEach((cell) => {
                if (this.activePlayer.filled.includes(cell)) ++matches
                else return
            })
            if (matches === combination.length) {
                combo = combination
                return
            } 
        })
        return combo
    }
    // дз: добавляет победные классы клеткам комбинации
    markWinCombo(winCombo) {
        if (winCombo instanceof Array){
            winCombo.forEach((cell) => {
                if (cell instanceof Cell) cell.addWinClass()
            })
        }
    }
    turn(cell) {
        if (!this.isActive) return

        cell.fill(this.activePlayer.img)
        this.activePlayer.filled.push(cell)
        // console.log(this.activePlayer.filled)

        const winCombo = this.getWinCombination()
        if (winCombo instanceof Array) {
            this.markWinCombo()
            this.stopGame()
            this.InfoLabel.setWinner(this.activePlayer.name)
            return
        }

        if(this.activePlayer.filled.length === 5) {
            this.stopGame()
            this.InfoLabel.setDraw()
            return
        }

        this.switchPlayer()
    }
}

const game = new Game()
game.startGame()