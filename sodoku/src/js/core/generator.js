// generate sodoku solution
const Toolkit = require("./toolkit");

module.exports = class Generator {

    generate(){
        while (!this.internalGenerate()){
            console.log("try again");
        }
    }

    internalGenerate() {
        this.matrix = Toolkit.matrix.makeMatrix();
        // get a random but ordered matrix
        this.orders = Toolkit.matrix.makeMatrix()
            .map(row => row.map((v,i) => i))
            .map(row => Toolkit.matrix.shuffle(row));
        
        for (let n = 1; n <= 9; n++) {
            if(!this.fillNumber(n)){
                return false;
            }
        }

        return true;
    }

    fillNumber(n) {
        return this.fillRow(n, 0);
    }

    fillRow(n, rowIndex) {
        if (rowIndex > 8) {
            return true;
        }
        const row = this.matrix[rowIndex];
        // random row
        const orders = this.orders[rowIndex];
        for (let i = 0; i < 9; i++) {
            const colIndex = orders[i];
            // if the position has number, then continue
            if (row[colIndex]) {
                continue;
            }

            // check whether n can be put in the position
            if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                continue;
            }

            // if put n success, recurse
            // if fail, go to next position
            row[colIndex] = n;
            if (!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0;
                continue;
            }

            return true;
        }
        return false;
    }
};

// for testing
// const generator = new Generator();
// generator.generate();
// console.log(generator.matrix);