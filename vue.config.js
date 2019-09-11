const path = require("path");
// const sourceMap = process.env.NODE_ENV === "development";
const sourceMap = false;
// const vConsolePlugin = require('vconsole-webpack-plugin'); // 引入 移动端模拟开发者工具 
const CompressionPlugin = require('compression-webpack-plugin'); //Gzip
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //Webpack包文件分析器
module.exports = {
  publicPath: "/",
  outputDir: "dist", //构建输出目录
  assetsDir: "static", //静态资源目录
  lintOnSave: true, //是否开启eslint保存检测，有效值：true || false || 'error'
  chainWebpack: () => { },
  configureWebpack: config => {
    //生产and测试环境
    let pluginsPro = [
      new CompressionPlugin({ //文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
        threshold: 8192,
        minRatio: 0.8,
      }),
      //	Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
      new BundleAnalyzerPlugin(),
    ];
    //开发环境
    let pluginsDev = [
      //移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
      // new vConsolePlugin({
      //   filter: [], // 需要过滤的入口文件
      //   enable: true // 发布代码前记得改回 false
      // }),
    ];
    if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
      config.plugins = [...config.plugins, ...pluginsPro];
    } else {
      // 为开发环境修改配置...
      config.plugins = [...config.plugins, ...pluginsDev];
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: [".js", ".vue", ".json", "jsx"],
        alias: {
          vue$: "vue/dist/vue.js",
          "@": path.resolve(__dirname, "./src")
        }
      }
    });
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: sourceMap,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  parallel: require("os").cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  devServer: {
    open: false,
    hotOnly: true, // 热更新
    proxy: {
      "/api": {
        target: "http://192.168.1.50:8089/api",
        // target: "http://localhost:8089/api",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/test": {
        target: "http://localhost:8089/api",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/dev": {
        target: "http://res.com",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/group1": {
        // 映射为图片服务器.
        target: "http://192.168.1.71:8888", // 后端接口的地址.
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true //是否跨域
      }
    },
    before: app => { }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}