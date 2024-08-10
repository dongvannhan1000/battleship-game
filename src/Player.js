import Gameboard from "./Gameboard";

class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
        this.previousMoves = new Set();
    }

    attack(opponentGameboard, coordinates) {
        opponentGameboard.receiveAttack(coordinates);
    }

    randomAttack(opponentGameboard) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (this.previousMoves.has(`${x},${y}`));
        
        this.previousMoves.add(`${x},${y}`);
        this.attack(opponentGameboard, [x, y]);
    }
}

export default Player;