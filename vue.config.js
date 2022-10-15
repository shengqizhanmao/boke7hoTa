const {defineConfig} = require('@vue/cli-service')
module.exports ={
    devServer: {
        port: 8082,
        https: false,
        open:true,
    }
}

// module.exports = {
//     publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
//     outputDir: 'dist',
//     assetsDir: 'static'
// }
