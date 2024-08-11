import "./reset.css";
import "./styles.css";
import Player from "./scripts/player";
import Display from "./scripts/display";

const player = new Player("player");
const computer = new Player("computer");
const display = new Display(player, computer);

display.startingScreen();