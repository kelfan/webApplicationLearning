require('./world.js');
// use css-loader to translate style.css
require('style-loader!css-loader!./style.css');

function hello(str) {
  alert(str);
}

hello('hello world')
