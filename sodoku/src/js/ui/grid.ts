// generate square up
// import Toolkit from "../core/toolkit";
// import Generator from "../core/generator";
import Sudoku from "../core/sudoku";
import Checker from "../core/checker";

class Grid {
    private _$container: any;

    constructor(container: any) {
        this._$container = container;
    }

    build() {
        const sudoku = new Sudoku();
        sudoku.make();
        const matrix = sudoku.puzzleMatrix;

        // const generator = new Generator();
        // generator.generate();
        // const matrix = generator.matrix;
        // const matrix = Toolkit.matrix.makeMatrix();

        const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
        const colGroupClasses = ["col_g_lef", "col_g_center", "col_g_right"];

        const $cells = matrix.map((rowValues: any) => rowValues
            .map((cellValue: any, colIndex: any) => {
                return $("<span>")
                    .addClass(colGroupClasses[colIndex % 3])
                    .addClass(cellValue ? "fixed" : "empty") // add fixed class if have value, else add empty class
                    .text(cellValue);
            }));

        const $divArray = $cells.map(($spanArray: any, rowIndex: any) => {
            return $("<div>")
                .addClass("row")
                .addClass(rowGroupClasses[rowIndex % 3])
                .append($spanArray);
        });

        this._$container.append($divArray);
        return this;
    }

    layout() {
        const width: any = $("span:first", this._$container).width();
        $("span", this._$container)
            .height(width)
            .css({
                "line-height": `${width}px`,
                "font-size": width < 32 ? `${width / 2}px` : "" // change width into half if it is small screen, otherwise no change
            });
    }

    bindPopup(popupNumbers: any) {
        this._$container.on("click", "span", (e: any) => {
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
            .map((rowIndex: any, div: any) => {
                return $(div).children().map((colIndex: any, span: any) => parseInt($(span).text()) || 0);
            }).toArray()
            .map(($data: any) => $data.toArray());

        // console.log(data);

        const checker = new Checker(data);
        if (checker.check()) {
            return true;
        }
        // if fail, add mark
        const marks = checker.matrixMarks;
        this._$container.children()
            .each((rowIndex: any, div: any) => {
                $(div).children().each((colIndex: any, span: any) => {
                    const $span = $(span);
                    if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
                        $span.removeClass("error");
                    } else {
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


// module.exports = Grid;
export {Grid};
export default Grid;