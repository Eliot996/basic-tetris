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
        [1,     width,   width+1, width+3]
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
    let current = theTetrominoes[0][0];

    //draw
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        })
    }

    draw()
})