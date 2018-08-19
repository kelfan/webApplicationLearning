# npm init
```json
{
  "name": "react-music-player",
  "version": "1.0.0",
  "description": "music player built by react",
  "main": "app/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "webpack",
    "react",
    "music-player"
  ],
  "author": "kelfan",
  "license": "MIT"
}
```

# npm install react --save
--save means to save dependencies into the package.json file
test react verions is '^1.5.4'

# npm install
after change of package.json to add dependencies
```json
{
  "name": "react-music-player",
  "version": "1.0.0",
  "description": "music player built by react",
  "main": "app/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "webpack",
    "react",
    "music-player"
  ],
  "author": "kelfan",
  "license": "MIT",
  "dependencies": {
    "pubsub-js": "^1.5.4",
    "react": "^15.0.2",
    "react-dom": "^15.0.2",
    "react-hot-loader": "^3.0.0-beta.2",
    "react-router": "2.0.0"
  },
  "devDependencies":{
    "autoprefixer": "^6.3.6",
    "babel-core": "^6.5.2",
    "babel-loader": "^6.2.2",
    "babel-plugin-react-transform": "^2.0.0",
    "babel-preset-es2015": "^6.5.0",
    "babel-preset-react": "^6.5.0",
    "css-loader": "^0.23.1",
    "extract-text-webpack-plugin": "^1.0.1",
    "html-webpack-plugin": "^2.16.1",
    "json-loader": "^0.5.4",
    "less": "^2.6.0",
    "less-loader": "^2.2.2",
    "style-loader": "^0.13.1",
    "webpack": "1.13.0",
    "webpack-dev-server": "^1.14.1"
  }
}
```

# webpack.config.js
bug_fix:
```sh
npm install -g webpack@3.1.0
```
```js
module.exports = {
  entry: './app/index.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  }
}
```

# index.html
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>My first webpack</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/javascript" src="dist/bundle.js">

    </script>
  </body>
</html>
```

# webpack.config.js
```js
module.exports = {
  entry: './app/index.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        // all js file will be handled by babel-loader
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query:
          {
            presets: ['react', 'es2015']
          }
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  }
}
```
# webpack.config.js + index.tpl.html + server.js + index.js + hello.js + hello.less -> node server
