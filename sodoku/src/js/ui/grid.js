"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// generate square up
// import Toolkit from "../core/toolkit";
// import Generator from "../core/generator";
const sudoku_1 = __importDefault(require("../core/sudoku"));
const checker_1 = __importDefault(require("../core/checker"));
class Grid {
    constructor(container) {
        this._$container = container;
    }
    build() {
        const sudoku = new sudoku_1.default();
        sudoku.make();
        const matrix = sudoku.puzzleMatrix;
        // const generator = new Generator();
        // generator.generate();
        // const matrix = generator.matrix;
        // const matrix = Toolkit.matrix.makeMatrix();
        const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
        const colGroupClasses = ["col_g_lef", "col_g_center", "col_g_right"];
        const $cells = matrix.map((rowValues) => rowValues
            .map((cellValue, colIndex) => {
            return $("<span>")
                .addClass(colGroupClasses[colIndex % 3])
                .addClass(cellValue ? "fixed" : "empty") // add fixed class if have value, else add empty class
                .text(cellValue);
        }));
        const $divArray = $cells.map(($spanArray, rowIndex) => {
            return $("<div>")
                .addClass("row")
                .addClass(rowGroupClasses[rowIndex % 3])
                .append($spanArray);
        });
        this._$container.append($divArray);
        return this;
    }
    layout() {
        const width = $("span:first", this._$container).width();
        $("span", this._$container)
            .height(width)
            .css({
            "line-height": `${width}px`,
            "font-size": width < 32 ? `${width / 2}px` : "" // change width into half if it is small screen, otherwise no change
        });
    }
    bindPopup(popupNumbers) {
        this._$container.on("click", "span", (e) => {
            const $cell = $(e.target);
            if ($cell.is(".fixed")) {
                return;
            }
            popupNumbers.popup($cell);
        });
    }
    /**
     * start a new game
     */
    rebuild() {
        this._$container.empty();
        this.build().layout();
    }
    /**
     * check user answer's result
     */
    check() {
        // get data from interface
        // const $rows = this._$container.children();
        const data = this._$container.children()
            .map((rowIndex, div) => {
            return $(div).children().map((colIndex, span) => parseInt($(span).text()) || 0);
        }).toArray()
            .map(($data) => $data.toArray());
        // console.log(data);
        const checker = new checker_1.default(data);
        if (checker.check()) {
            return true;
        }
        // if fail, add mark
        const marks = checker.matrixMarks;
        this._$container.children()
            .each((rowIndex, div) => {
            $(div).children().each((colIndex, span) => {
                const $span = $(span);
                if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
                    $span.removeClass("error");
                }
                else {
                    $(span).addClass("error");
                }
            });
        });
    }
    /**
     * reset to initial status
     */
    reset() {
        this._$container.find("span:not(.fixed)")
            .removeClass("error mark1 mark2")
            .addClass("empty")
            .text(0);
    }
    /**
     * clear wrong mark
     */
    clear() {
        this._$container.find("span.error")
            .removeClass("error");
    }
}
exports.Grid = Grid;
exports.default = Grid;
