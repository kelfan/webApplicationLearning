# npm init
# npm install webpack --save-dev
# webpack hello.js hello.bundle.js
!! error: may be caused by the verion problem
!! use `webpack hello.js` instead
- hello.js: source file
- hello.bundle.js: destination file
- output
  - Asset: generated bundle file
  - Chunks: blocks of this time
  - Chunk Names: blocks names

# npm install css-loader style-loader --save-dev
# webpack hello.js hello.bundle.js --module-bind 'css=sytle-loader!css-loader'
