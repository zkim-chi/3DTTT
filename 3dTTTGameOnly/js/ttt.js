var win;
var currentPlayer;

var movesP1, movesP2; ///////////////
var time; ///////////////////////////

addDiagonals();


//~~~~~~~ Game ~~~~~~~//
function reset() {
    currentPlayer = 1;

//////////////////////
    movesP1 = 0;
    movesP2 = 0;
    $("#playerMoves").html('Moves: 0');
//////////////////////

    $("#playerNum").html(currentPlayer);
    $("#playerTitle").html('Player:');
    $(".result").remove();

    $("td.square").html('');
    $("td.square").removeClass("x");
    $("td.square").removeClass("o");
    $("td.square").addClass("none");
    win = null;
};


$(document).ready(function(){

  time = new Date();
  console.log(time);

    reset();

    $("tr").on("click", "td", function() {
        console.log("clicked square");
        if ($(this).hasClass('none') && (win == null)) {
            $(this).removeClass('none');

            if (currentPlayer==1) {
                $(this).addClass('x');
                $(this).html('X');

                movesP1++; ///////////////////////////////////
            } else {
                $(this).addClass('o');
                $(this).html('O');

                movesP2++; ///////////////////////////////////
            };

            win = checkForWin();
            if (win != null) {
              winnerFound(win);
            } else if (noMoreMoves()) {
              tie();
            } else {
                currentPlayer = (currentPlayer % 2) + 1;

                ////////////////////////////////////////////////
                $("#playerNum").html(currentPlayer);
                if (currentPlayer == 1) {
                    $("#playerMoves").html('Moves: ' + movesP1);
                } else {
                    $("#playerMoves").html('Moves: ' + movesP2);
                }
                /////////////////////////////////////////////////

            }

        }
    });
    // console.log("hi");

    $("button").click(function() {
      // console.log("hi");
        reset();
    });

});

function noMoreMoves() {
    if ($('.none').length > 0) {
      return false;
    }
    return true;
}


function checkForWin() {
    var testWinState = {
        1: [['.r1','.r2','.r3'], ['.b1','.b2','.b3']],
        2: [['.c1','.c2','.c3'], ['.b1','.b2','.b3']],
        3: [['.c1','.c2','.c3'], ['.r1','.r2','.r3']],
        4: [['.rd1','.rd2'], ['.r1','.r2','.r3']],
        5: [['.cd1','.cd2'], ['.c1','.c2','.c3']],
        6: [['.bd1','.bd2'], ['.b1','.b2','.b3']],
        7: [['.gd1','.gd2','.gd3','.gd4'], ['td']]
    };

    for (var i = 1; i <= 7; i++) {
        check = checkForWinState(testWinState[i][0],testWinState[i][1]);
        if (check != null) {
            return check;
        }
    }
    return null;
}


function checkForWinState(varr, constt) {
    for (i in constt) {
        for (j in varr) {
            el = constt[i] + varr[j];
            console.log("win location: " + el);
            if (($(el + '.x').length == 3) || ($(el + '.o').length == 3)) {
              return el; // return win location
            }
        }
    }
    return null;
}

function winnerFound(win) {
    $(win).promise().done(function(){


        ////////////////////////////////////////////////////
        if (currentPlayer == 1) {
            $("h1").after("<h2 class='result'>Player " + currentPlayer + " Wins</h2><h3 class='result'> Moves: " + movesP1 +"</h3><h3 class='result'> Time game started: " + time + "</h3>").delay(1000);
        } else {
            $("h1").after("<h2 class='result'>Player " + currentPlayer + " Wins</h2><h3 class='result'> Moves: " + movesP2 +"</h3>").delay(1000);
        }
        $("#playerMoves").fadeOut(10);
        ////////////////////////////////////////////////////


        $(".result").fadeIn(2000);
        console.log(time);

    });
}

function tie() {
        $("h1").after("<h2 class='result'>a Tie!</h2>").delay(1000);
        $(".result").fadeIn(2000);
}

// learn what this does
function addDiagonals() {
    var rows = ['.r1','.r2','.r3'];
    var cols = ['.c1','.c2','.c3'];
    var boards = ['.b1','.b2','.b3'];

    addDiagForEachDim(rows, cols, boards);
    addDiagForEachDim(cols, rows, boards);
    addDiagForEachDim(boards, cols, rows);

    // add the general diagonals
    for (var i = 0; i < 3; i++) {
        el1 = "td" + rows[i] + cols[i] + boards[i];
        el2 = "td" + rows[i] + cols[i] + boards[2-i];
        el3 = "td" + rows[i] + cols[2-i] + boards[i];
        el4 = "td" + rows[2-i] + cols[i] + boards[i];

        $(el1).addClass('gd1');
        $(el2).addClass('gd2');
        $(el3).addClass('gd3');
        $(el4).addClass('gd4');
    }
}

// learn what this does
function addDiagForEachDim(constant, var1, var2) {
    dimension = constant[0][1];

    for (c in constant) {
        for (var i = 0; i < 3; i++) {
            el1 = "td" + constant[c] + var1[i] + var2[i];
            el2 = "td" + constant[c] + var1[i] + var2[2-i];
            $(el1).addClass(dimension + 'd1');
            $(el2).addClass(dimension + 'd2');
        }
    }
}
