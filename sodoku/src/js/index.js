const Grid = require("./ui/grid");
const PopupNumbers = require("./ui/popupnumbers");

const grid = new Grid($("#container"));
grid.build().layout();

const popupNumbers = new  PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);

$("#check").on("click", e => {
    if(grid.check()){
        alert("success! congratulation!")
    }
});
$("#reset").on("click", e => {
    grid.reset();
});
$("#clear").on("click", e => {
    grid.clear();
});
$("#rebuild").on("click", e => {
    grid.rebuild();
});

// const a = Array.from({length: 9}, (v, i) => i);
// console.log(a);
// console.log(Toolkit.shuffle(a));

// following for testing
// const a  = makeMatrix ();
// a[0][1] = 2;
// console.log (a);