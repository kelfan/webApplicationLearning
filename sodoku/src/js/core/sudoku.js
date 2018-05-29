// generate sodoku game
// 1. generate finished solution: Generator
// 2. random remove part of data: by ratio

const Generator = require("./generator");

module.exports = class Sudoku {
    constructor(){
        // generate complete solution
        const generator = new Generator();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }

    make(level = 5){
        // const shouldRid = Math.random()*9 < level;
        // generate puzzle
        // this.solutionMatrix.map(row => row.map(cell => {
        //     return Math.random() * 9 < level ? 0 : cell;
        // }));
        this.puzzleMatrix = this.solutionMatrix.map(row => {
            return row.map(cell => Math.random() * 9 < level ? 0 : cell);
        });


    }
}