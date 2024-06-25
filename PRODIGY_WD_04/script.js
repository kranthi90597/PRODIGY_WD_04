document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  const restartButton = document.getElementById('restart-button');
  const resultMessage = document.getElementById('result-message');
  const playerX = 'X';
  const playerO = 'O';
  let currentPlayer = playerX;
  let gameBoard = Array(9).fill(null);

  const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];

  function handleCellClick(event) {
      const cell = event.target;
      const cellIndex = cell.getAttribute('data-index');

      if (gameBoard[cellIndex] || checkWin()) {
          return;
      }

      gameBoard[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;

      if (checkWin()) {
          resultMessage.textContent = `${currentPlayer} wins!`;
      } else if (gameBoard.every(cell => cell)) {
          resultMessage.textContent = 'Draw!';
      } else {
          currentPlayer = currentPlayer === playerX ? playerO : playerX;
      }
  }

  function checkWin() {
      return winningCombinations.some(combination => {
          return combination.every(index => {
              return gameBoard[index] === currentPlayer;
          });
      });
  }

  function restartGame() {
      gameBoard.fill(null);
      cells.forEach(cell => {
          cell.textContent = '';
      });
      currentPlayer = playerX;
      resultMessage.textContent = '';
  }

  cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
  });

  restartButton.addEventListener('click', restartGame);
});
