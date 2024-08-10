import './styles.css';
import { GameUI } from './game/GameUI';

document.addEventListener('DOMContentLoaded', () => {
    const gameUI = new GameUI();
    gameUI.init();
});