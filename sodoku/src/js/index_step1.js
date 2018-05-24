function makeRow (v = 0){
    const array = new Array (9);
    array.fill (v);
    return array;
}

function makeMatrix (v = 0){
    return Array.from ({length : 9}, () => makeRow (v));

    // following method is less effective
    // return Array.from ({length : 9})
    //     .map (() => makeRow (v));

    // following method has error becuase fill will copy the whole row and change value will change the whole row 
    // const array = new Array (9);
    // array.fill (makeRow (v));
    // return array;
}

/**
 * Fisher-Yates algorithm
 * @param array
 */
function shuffle(array){
    const endIndex = array.length - 2;
    for (let i = 0; i <= endIndex; i++) {
        const j = i +  Math.floor(Math.random() * (array.length - 1));
        // swipe tow item
        [array[i], array[j]] = [array[j], array[i]];
        return array;
    }
}

const a = Array.from({length: 9 }, (v,i)=>i);
console.log(a);
console.log(shuffle(a));

// following for testing
// const a  = makeMatrix ();
// a[0][1] = 2;
// console.log (a);