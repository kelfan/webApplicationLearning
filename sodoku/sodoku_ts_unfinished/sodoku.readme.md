# project structure 
.less -> **gulp-less** -> .css
.gulp -> gulp-less + webpack
.js(es6) -> **babel-loader** -> .js(es5) -> **webpack** -> .js(bundle)

# 1. install modules 
1. cmd in src> `yarn init`
2. src> `yarn add --dev gulp gulp-util`
3. src> `yarn add --dev gulp-less`
4. src> `yarn add --dev webpack-stream`
5. src> `yarn add --dev babel-core babel-loader babel-preset-es2015`
6. check packages in package.json

# 2. write construct src/gulpfile.js 

# 3. install gulp 
sudoku> `npm install -g gulp`
check 
sodoku\src>`gulp`

# 4. config src/webpack.config.js
bug: no file in index.js 

# 5. init matrix -> makeRow and makeMatrix function
index.js

# 6. game algorithm: Fisher-yates algorithm: random numbers -> shuffle function 
for i to size 
    swipe i with random position 

# 7.HTML pages + js 
index.html -> main.less -> toolkit.js -> index.js -> 

# 8.reconstruction 
/src/js
    index.js : entry and Events 
    core/
        toolkit.js : tools
        generator.js : build solution
        checker.js : check algorithm
        sudoku.js : Generate game 
    ui/
        grid.js : for squared up 
        popupnumbers.js : for pop up panel

# run gulp `.\node_modules\.bin\gulp && .\node_modules\.bin\gulp watch`


# check algorithm: 


# translate into typescript process 
1. add typescript config file "tsconfig.json"
```sh
\sodoku\src>yarn add --dev typescript
\sodoku\src> .\node_modules\.bin\tsc --version
\sodoku\src> .\node_modules\.bin\tsc --init 
```
2. rewrite webpack.config.js to support .ts6
3. .js -> .ts
```sh 
# change extension name into ts
\sodoku\src\js\core>ren *.js *.ts
\sodoku\src\js\ui>ren *.js *.ts
```
4. use webpack2 

# fix jQuery bug in typescript
\sodoku\src>yarn add --dev @types/jquery

# watch change in less 
add gulp task into gulpfile.js 
open cmd run `gulp && gulp watch`


# install packages webpack ts-loader
//install typescript if not installed
\sodoku\src>yarn add --dev webpack ts-loader

# delete all js files 
\sodoku\src\js>del *.js /s

# gulp webpack 
\sodoku\src> .\node_modules\.bin\gulp webpack 