// check sodoku solution
function checkArray(array) {
    const length = array.length;
    const marks = new Array(length);
    marks.fill(true);

    for (let i = 0; i < length - 1; i++) {
        if (!marks[i]){
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

console.log(checkArray([1,2,3,4,5,6,7,8,9]));
console.log(checkArray([1,2,3,4,0,6,7,8,9]));
console.log(checkArray([1,2,3,4,5,6,2,8,9]));
console.log(checkArray([1,3,3,4,5,6,7,8,9]));
console.log(checkArray([1,2,9,4,5,6,7,8,9]));