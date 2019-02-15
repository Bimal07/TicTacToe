/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}




function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }

}
function playByComputer(){
    var gridx = generateRandomValue();
    var gridy = generateRandomValue();
    
    while(true){
        if( grid[gridx][gridy] <=0){
            grid[gridx][gridy] = 2;
            break;
        }
        gridx = generateRandomValue();
        gridy = generateRandomValue();

    }
}

function generateRandomValue(){
    return Math.ceil(Math.random()*(GRID_LENGTH-1));
}

function checkWinner(){
    var leftDiagonal=0,rightDiagonal=0,ldCount=0,rdCount=0;
    for(var x=0;x<GRID_LENGTH;x++){
        
        var horizontalcheck=0,rowValueSum=0,verticalcheck=0,colValueSum=0;
        for(y=0;y<GRID_LENGTH;y++){
            if(grid[x][y]!=0){
                if((x+y)==(GRID_LENGTH-1)){
                    ++rdCount;
                    rightDiagonal+=grid[x][y];
                    if(rightDiagonal % 3==0 && rdCount == 3){
                    return  winnerName(rightDiagonal);
                    }
                }
                if(x==y)
                {
                    ++ldCount;
                    leftDiagonal+=grid[x][y];
                    if(leftDiagonal % 3==0 && ldCount == 3){
                    return  winnerName(leftDiagonal);
                    }
                }
                ++horizontalcheck;
                rowValueSum+=grid[x][y];
                if(horizontalcheck==3 && rowValueSum%3==0){
                    return  winnerName(rowValueSum);
                }

               

            }
            if(grid[y][x]!=0){
            ++verticalcheck;
            colValueSum+=grid[y][x];
            if(verticalcheck==3 && colValueSum%3==0){
                return  winnerName(colValueSum);
            }
        }
        }

    }
    
   return 0; 

}
function winnerName(a){
    if(a%6==0)
        return 2;
    else
        return 1;

}
var x = function callMe()
{
    alert("func called....");
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
   // setTimeout(renderMainGrid,300);
    var winner = checkWinner();
    if(winner==0)
    {
        addClickHandlers();
    }
    else if(winner==1)
    {
        alert("Player 1 is Winner");
        initializeGrid();
        renderMainGrid();
        addClickHandlers();
    }
    else if(winner==2)
    {
        alert("Player 2 is Winner");
        initializeGrid();
        renderMainGrid();
        addClickHandlers();
    }
    if(winner==0){
        playByComputer();
        renderMainGrid();
        winner = checkWinner();
        if(winner==0)
        {
            addClickHandlers();
        }
        else if(winner==1)
        {
            alert("Player 1 is Winner");
            initializeGrid();
            renderMainGrid();
            addClickHandlers();
        }
        else if(winner==2)
        {
            alert("Player 2 is Winner");
            initializeGrid();
            renderMainGrid();
            addClickHandlers();
        }
    }
}


initializeGrid();
renderMainGrid();
addClickHandlers();


