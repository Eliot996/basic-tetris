document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.getElementById('score');
    let score = 0;
    const startButton = document.getElementById('start-button');
    const width = 10;

    // the tetrominoes
    const lTetromino = [
        [1,     width+1, width*2+1, 2],
        [width, width+1, width+2,   width*2+2],
        [1,     width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ];
    const skewTetromino = [
        [width+1, width+2, width*2, width*2+1],
        [0,       width,   width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0,       width,   width+1, width*2+1]
    ];
    const tTetromino = [
        [1,     width,   width+1, width+2],
        [1,     width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1,     width,   width+1, width*2+1]
    ];
    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ];
    const straightTetromino = [
        [1,     width+1, width*2+1, width*3+1],
        [width, width+1, width+2,   width+3],
        [1,     width+1, width*2+1, width*3+1],
        [width, width+1, width+2,   width+3],

    ];
    const theTetrominoes = [lTetromino, skewTetromino, tTetromino, oTetromino, straightTetromino];

    let currentPosition = 4;
    let currentRotation = 0;

    // get random tetromino and its first rotation
    let random = Math.floor(Math.random()*theTetrominoes.length)
    let nextRandom
    let current = theTetrominoes[random][currentRotation];

    //draw the tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        })
    }

    //undraw the tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        })
    }
    //timer
    let timerId //= setInterval(moveDown, 1000)

    // assign functions to handle key presses
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keydown', control)


    function moveDown() {
        freeze()
        undraw()
        currentPosition += width
        draw()
    }

    // freeze function using some
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            // start a new tetromino falling
            random = nextRandom
            nextRandom = Math.floor(Math.random()*theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayTetromino()
            addScore()
            gameOver()
        }
    }

    // make the left movement and stop at edge and other tetrominoes
    function moveLeft() {
        undraw()

        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        const isBlocked = current.some(index => squares[currentPosition + index - 1].classList.contains('taken'))

        if(!(isAtLeftEdge || isBlocked)) currentPosition -=1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            console.log('hit')
            currentPosition +=1
        }

        draw()
    }

    // make the right movement and stop at edge and other tetrominoes
    function moveRight() {
        const isAtEdge = current.some(index => (currentPosition + index) % width === width - 1)
        const isBlocked = current.some(index => squares[currentPosition + index + 1].classList.contains('taken'))

        if(!(isAtEdge || isBlocked)){
            undraw()

            currentPosition += 1;

            draw()
        }
    }

    // rotate the tetromino
    function rotate() {
        undraw()

        currentRotation++

        if (theTetrominoes[random].length === currentRotation) {
            currentRotation = 0;
        }

        current = theTetrominoes[random][currentRotation]

        draw()
    }

    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0

    // the tetrominoes for display
    const displayTetrominoes = [
        [1,              displayWidth+1, displayWidth*2+1, 2                ],
        [displayWidth+1, displayWidth+2, displayWidth*2,   displayWidth*2+1 ],
        [1,              displayWidth,   displayWidth+1,   displayWidth+2   ],
        [0,              1,              displayWidth,     displayWidth+1   ],
        [1,              displayWidth+1, displayWidth*2+1, displayWidth*3+1 ]
    ]

    function displayTetromino() {
        displaySquares.forEach(square => square.classList.remove('tetromino'))

        displayTetrominoes[nextRandom].forEach(square => displaySquares[square + displayIndex].classList.add('tetromino'))
    }

    startButton.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random()*theTetrominoes.length)
            displayTetromino()
        }
    })

    //add score
  function addScore() {
    console.log('squares: ' + squares.length)
        for (let i = 0; i < squares.length - 11; i += width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if(row.every(index => squares[index].classList.contains('taken'))) {
            score += 10
            ScoreDisplay.innerHTML = score
            row.forEach(index => {
                  squares[index].classList.remove('taken')
                  squares[index].classList.remove('tetromino')
                  squares[index].style.backgroundColor = ''
            })
            const squaresRemoved = squares.splice(i, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            clearInterval(timerId)
            ScoreDisplay.innerHTML = "game over - final score: " + score
      }
  }

})