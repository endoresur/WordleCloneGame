const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container');

const wordle = 'SUPER';

const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A',
              'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z',
              'X', 'C', 'V', 'B', 'N', 'M', '«'
];

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((guessRow, rowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'guessRow-' + rowIndex);
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div');
        tileElement.setAttribute('id', 'guessRow-' + rowIndex + '-tile-' + guessIndex);
        tileElement.classList.add('tile');
        rowElement.append(tileElement);
    });
    tileDisplay.append(rowElement);
})

keys.forEach(key => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', () => handleClick(key));
    keyboard.append(buttonElement);
})

const handleClick = (key) => {
    if (key === '«') {
        deleteLetter(key);
        return;
    }
    if (key === 'ENTER') {
        checkRow();
        return;
    }
    addLetter(key);
}

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = letter;
        guessRows[currentRow][currentTile] = letter;
        tile.setAttribute('data', letter);
        currentTile++;
    }
}

const deleteLetter = (letter) => {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = '';
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute('data', '');
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('');

    if (currentTile > 4) {
        console.log('guess is ' + guess + ', wordle is ' + wordle);
        flipTile();
        if (guess === wordle) {
            showMessage('Great!');
            isGameOver = true;
            return;
        }
        else {
            if (currentRow >= 5) {
                isGameOver = true;
                showMessage('Game Over')
                return;
            }
            if (currentRow < 5) {
                currentRow++;
                currentTile = 0;
            }
        }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(() => messageElement.removeChild(messageElement), 2000);
    
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes;
    rowTiles.forEach((tile, index) => {
        const dataLetter = tile.getAttribute('data');

        setTimeout(() => {
            tile.classList.add('flip');
            if (dataLetter === wordle[index]) {
                tile.classList.add('green-overlay');
                addColorToKey(dataLetter, 'green-overlay');
            } 
            else if (wordle.includes(dataLetter)) {
                addColorToKey(dataLetter, 'yellow-overlay');
                tile.classList.add('yellow-overlay');
            }
            else {
                addColorToKey(dataLetter, 'grey-overlay');
                tile.classList.add('grey-overlay');
            }
        }, 500 * index);
    })
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter);
    key.classList.add(color);
}