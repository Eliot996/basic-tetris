document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.getElementById('score');
    const ScoreButton = document.getElementById('start-button');
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
    let nextRandom = Math.floor(Math.random()*theTetrominoes.length)
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

    draw()

    //timer
    let timerId = setInterval(moveDown, 1000)

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
        undraw()
        currentPosition += 10
        draw()
        freeze()
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

    displayTetromino()

})