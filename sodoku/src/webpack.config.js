module.exports = {
    entry : {
        index : "./js/index" // app start point at index.js
    },
    output : {
        filename : "[name].js" // output as  js file with module name
    },
    devtool : "source-map",
    resolve : {
        extensions : [".js"]
    },
    module : {
        rules : [
            {
                test : /\.js$/, 
                loader : "babel-loader",
                exclude : /(node_modules)/, 
                query : {
                    presets : ["es2015"]
                }
            }
        ]
    }
};