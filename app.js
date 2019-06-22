// Winning combos:
// square00, square01, square02
// square10, square11, square12
// square20, square21, square22
// square00, square10, square20
// square01, square11, square21
// square02, square12, square22
// square00, square11, square22
// square20, square11, square02

const filledSquares = {
    square00: '',
    square01: '',
    square02: '',
    square10: '',
    square11: '',
    square12: '',
    square20: '',
    square21: '',
    square22: ''
}

const $modal = $('#modal');
const $pStart = $('<p>').text("Click 'Close' when ready to play");
$pStart.appendTo('#modal-textbox');

const closeModal = () => {
    $modal.css('display', 'none');
}
const openModal = () => {
    $modal.css('display', 'block');
};
setTimeout(openModal, 2000);
$('#close').on('click', closeModal);

const winningCombo = function(move) {
    if ( filledSquares.square00 === move ) {
        if ( filledSquares.square01 === move  &&  filledSquares.square02 === move ) {
            return move;
        }
        if ( filledSquares.square10 === move  &&  filledSquares.square20 === move ) {
            return move;
        }
        if ( filledSquares.square11 === move  &&  filledSquares.square22 === move ) {
            return move;
        }
    }
    else if ( filledSquares.square11 === move ) {
        if ( filledSquares.square01 === move  &&  filledSquares.square21 === move ) {
            return move;
        }
        if ( filledSquares.square10 === move  &&  filledSquares.square12 === move ) {
            return move;
        }
        if ( filledSquares.square20 === move  &&  filledSquares.square02 === move ) {
            return move;
        }
    }
    else if ( filledSquares.square22 === move ) {
        if ( filledSquares.square20 === move  &&  filledSquares.square21 === move ) {
            return move;
        }
        if ( filledSquares.square02 === move  &&  filledSquares.square12 === move ) {
            return move;
        }
    }
    return false;
}

const xWins = [ 'X', 'X', 'X' ];
const oWins = [ 'O', 'O', 'O' ];

for ( i = 0; i < 3; i++ ) {
    const $row = $('<div>');
    $('#board').append($row);
    $row.addClass('row')
    for ( j = 0; j < 3; j++ ) {
        const $colDiv = $('<div>');
        $row.append($colDiv);
        const idName = `square${i}${j}`;
        $colDiv.attr('id', idName)
        $colDiv.addClass('choice');
    }
}

let x = true;
let moveCnt = 0;
const maxMoves = 9;

const noMoreMoves = function() {
    if ( moveCnt === maxMoves ) {
        return true;
    }
    else {
        return false;
    }
}

const move = function() {
    let move = '';
    const eleID = $(event.currentTarget).attr('id');
    console.log(`ElementID = ${eleID}`);

    if (x) {
        move = 'X';
        console.log(x);
        $(event.currentTarget).text(move);
        $(event.currentTarget).addClass('x-move');
        x = false;
    }
    else {
        move = 'O';
        $(event.currentTarget).text(move);
        $(event.currentTarget).addClass('o-move');
        x = true;
    }
    filledSquares[eleID] = move;
    console.log(filledSquares);
    moveCnt++
    if ( winningCombo(move) ) {
        console.log(`${move} has won`);
        $('.choice').off('click');
        let $p = $('<p>').text(`Player '${move}' has WON!`);
        $p.appendTo('#modal-textbox');
        $p = $('<p>').text('GAME OVER');
        $p.appendTo('#modal-textbox');
        $modal.css('display', 'block');
    }
    else if (noMoreMoves()) {
        console.log('No winner.  Game Over.');
        let $p = $('<p>').text("No winner - It's a draw");
        $p.appendTo('#modal-textbox');
        $p = $('<p>').text('GAME OVER');
        $p.appendTo('#modal-textbox');
        $modal.css('display', 'block');
    }
};
$('.choice').on('click', move);
