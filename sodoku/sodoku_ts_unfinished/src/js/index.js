"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = __importDefault(require("./ui/grid"));
const popupnumbers_1 = __importDefault(require("./ui/popupnumbers"));
const grid = new grid_1.default($("#container"));
grid.build().layout();
const popupNumbers = new popupnumbers_1.default($("#popupNumbers"));
grid.bindPopup(popupNumbers);
$("#check").on("click", e => {
    if (grid.check()) {
        alert("success! congratulation!");
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
