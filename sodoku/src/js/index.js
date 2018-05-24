const toolkit = require("./toolkit");

const matrix = toolkit.makeMatrix();

// console.log(matrix);

class Grid {
    constructor(container) {
        this._$container = container;
    }

    build() {
        const matrix = toolkit.makeMatrix();

        const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
        const colGroupClasses = ["col_g_lef", "col_g_center", "col_g_right"];

        const $cells = matrix.map(rowValues => rowValues
            .map((cellValue, colIndex) => {
                return $("<span>")
                    .addClass(colGroupClasses[colIndex % 3])
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

    layout(){
        const width = $("span:first", this._$container).width();
        $("span", this._$container)
            .height(width)
            .css({
                "line-height": `${width}px`,
                "font-size": width < 32 ? `${width /2}px` : "" // change width into half if it is small screen, otherwise no change
            });
    }
}

const grid = new Grid($("#container")).build().layout();

const a = Array.from({length: 9}, (v, i) => i);
console.log(a);
console.log(toolkit.shuffle(a));

// following for testing
// const a  = makeMatrix ();
// a[0][1] = 2;
// console.log (a);