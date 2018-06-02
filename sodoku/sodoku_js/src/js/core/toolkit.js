/**
 * grid and array related methods
 * @type {{makeRow(*=): *, makeMatrix(*=): *, shuffle(*): *}}
 */
const matrixToolkit = {
    makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v);
        return array;
    },

    makeMatrix(v = 0) {
        return Array.from({length: 9}, () => this.makeRow(v));

    },

    /**
     * Fisher-Yates algorithm
     * @param array
     */
    shuffle(array) {
        const endIndex = array.length - 2;
        for (let i = 0; i <= endIndex; i++) {
            const j = i + Math.floor(Math.random() * (array.length - 1));
            // swipe tow item
            [array[i], array[j]] = [array[j], array[i]];
            return array;
        }
    },

    /**
     * check whether a number can be put in a cell
     * @returns {boolean}
     */
    checkFillable(matrix, n, rowIndex, colIndex) {
        const row = matrix[rowIndex];
        const column = this.makeRow().map((v, i) => matrix[i][colIndex]);
        const {boxIndex} = boxToolkit.convertToBoxIndex(rowIndex, colIndex);
        const box = boxToolkit.getBoxCells(matrix, boxIndex);
        for (let i = 0; i < 9; i++) {
            if (row[i] === n
                || column[i] === n
                || box[i] === n) {
                return false;
            }
            continue;
        }
        return true;
    }

};

/**
 * coordinate related tools
 */
const boxToolkit = {

    getBoxCells(matrix, boxIndex) {
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = boxIndex % 3 * 3;
        const result = [];
        for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            const colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    },

    convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3), // which block
            cellIndex: rowIndex % 3 * 3 + colIndex % 3 // which cell within the block
        };
    },

    convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    }
};

// tool class
module.exports = class Toolkit {
    /**
     * matrix and grid related tools
     * @returns {{makeRow, (*=): *, makeMatrix, (*=): *, shuffle, (*): *}}
     */
    static get matrix() {
        return matrixToolkit;
    }

    /**
     * coordinate related tools
     * @returns {{makeRow, (*=): *, makeMatrix, (*=): *, shuffle, (*): *}}
     */
    static get box() {
        return boxToolkit;
    }


};


