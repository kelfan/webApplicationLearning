"use strict";
// generate sodoku game
// 1. generate finished solution: Generator
// 2. random remove part of data: by ratio
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const Generator = require("./generator");
const generator_1 = __importDefault(require("./generator"));
class Sudoku {
    constructor() {
        // generate complete solution
        const generator = new generator_1.default();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }
    make(level = 5) {
        // const shouldRid = Math.random()*9 < level;
        // generate puzzle
        // this.solutionMatrix.map(row => row.map(cell => {
        //     return Math.random() * 9 < level ? 0 : cell;
        // }));
        this.puzzleMatrix = this.solutionMatrix.map((row) => {
            return row.map((cell) => Math.random() * 9 < level ? 0 : cell);
        });
    }
}
exports.Sudoku = Sudoku;
exports.default = Sudoku;
