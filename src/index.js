import "./styles.css";
import Player from "./scripts/player";
import Display from "./scripts/display";

const BattleshipGame = (function() {
    function init() {
        const player = new Player("human");
        const computer = new Player("computer");
        const display = new Display(player, computer);

        display.startingScreen();
    }

    return {
        init: init
    };
})();

document.addEventListener('DOMContentLoaded', BattleshipGame.init);