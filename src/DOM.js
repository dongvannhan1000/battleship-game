const DOM = (() => {
  function renderBoard(gameboard, elementId, showShips = false) {
      const boardElement = document.getElementById(elementId);
      boardElement.innerHTML = ''; // Clear the board
      for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
              const cell = document.createElement('div');
              cell.classList.add('cell');
              if (gameboard.getShipAt([i, j]) && showShips) {
                  cell.classList.add('ship');
              }
              if (gameboard.getMissedShots().some(([x, y]) => x === i && y === j)) {
                  cell.classList.add('miss');
              } else if (gameboard.getShipAt([i, j])?.hits > 0) {
                  cell.classList.add('hit');
              }
              cell.dataset.x = i;
              cell.dataset.y = j;
              boardElement.appendChild(cell);
          }
      }
  }

  return {
      renderBoard,
  };
})();

module.exports = DOM;
