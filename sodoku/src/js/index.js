const Grid = require("./ui/grid");
const PopupNumbers = require("./ui/popupnumbers");

const grid = new Grid($("#container"));
grid.build().layout();

const popupNumbers = new  PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);

// const a = Array.from({length: 9}, (v, i) => i);
// console.log(a);
// console.log(Toolkit.shuffle(a));

// following for testing
// const a  = makeMatrix ();
// a[0][1] = 2;
// console.log (a);