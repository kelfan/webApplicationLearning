"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// check sodoku solution
function checkArray(array) {
    const length = array.length;
    const marks = new Array(length);
    marks.fill(true);
    for (let i = 0; i < length - 1; i++) {
        if (!marks[i]) {
            continue;
        }
        const v = array[i];
        // check validation, 0 means not valid, 1-9 means valid
        if (!v) {
            marks[i] = false;
            continue;
        }
        // check repetition i+1 ~9 is repeat with i or not
        for (let j = i + 1; j < length; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false;
            }
        }
    }
    return marks;
}
const toolkit_1 = __importDefault(require("./toolkit"));
// input: Matrix, user's finished data, 9 x 9
// handle: check matrix's row, column and block, and fill marks
// output: success or not, marks matrix
class Checker {
    constructor(matrix) {
        this._success = false;
        this._matrix = matrix;
        this._matrixMarks = toolkit_1.default.matrix.makeMatrix(true);
    }
    get matrixMarks() {
        return this._matrixMarks;
    }
    get isSuccess() {
        return this._success;
    }
    check() {
        this.checkRows();
        this.checkCols();
        this.checkBoxes();
        // check success or not
        // Array.prototype.every(): return true if every is true, return false if anyone is false
        this._success = this._matrixMarks.every((row) => {
            return row.every((mark) => mark);
        });
        return this._success;
    }
    checkRows() {
        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            const row = this._matrix[rowIndex];
            const marks = checkArray(row);
            for (let colIndex = 0; colIndex < marks.length; colIndex++) {
                if (!marks[colIndex]) {
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }
    checkCols() {
        for (let colIndex = 0; colIndex < 9; colIndex++) {
            const cols = [];
            for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
                cols[rowIndex] = this._matrix[rowIndex][colIndex];
            }
            const marks = checkArray(cols);
            for (let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
                if (!marks[rowIndex]) {
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }
    checkBoxes() {
        for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
            const boxes = toolkit_1.default.box.getBoxCells(this._matrix, boxIndex);
            const marks = checkArray(boxes);
            for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
                if (!marks[cellIndex]) {
                    const { rowIndex, colIndex } = toolkit_1.default.box.convertFromBoxIndex(boxIndex, cellIndex);
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }
}
exports.Checker = Checker;
exports.default = Checker;
// for testing
// console.log(checkArray([1,2,3,4,5,6,7,8,9]));
// console.log(checkArray([1,2,3,4,0,6,7,8,9]));
// console.log(checkArray([1,2,3,4,5,6,2,8,9]));
// console.log(checkArray([1,3,3,4,5,6,7,8,9]));
// console.log(checkArray([1,2,9,4,5,6,7,8,9]));
// for testing checker
// const Generator = require("./generator");
// const gen = new Generator();
// gen.generate();
// const matrix = gen.matrix;
//
// const checker = new Checker(matrix);
// console.log("check result: ", checker.check());
// console.log(checker.matrixMarks);
//
// matrix[1][1] = 0;
// matrix[2][3] = matrix[3][6] = 5;
// console.log(matrix);
//
// const checker2 = new Checker(matrix);
// console.log("check result: ", checker2.check());
// console.log(checker2.matrixMarks);
