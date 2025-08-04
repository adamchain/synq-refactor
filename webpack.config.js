/* eslint-disable node/no-unpublished-require */
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack");

const mode = process.env.NODE_ENV;

const frontendConfig = {
  mode,
  target: "web",
  entry: {
    bundle: path.resolve(__dirname, "src/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "assets/[name][ext]",
  },
  devtool: mode === "development" ? "source-map" : false,
  devServer: {
    proxy: {
      "/v1": {
        target: "http://localhost:3101",
        changeOrigin: true,
      },
    },
    // Source: https://stackoverflow.com/a/71914061/10603621 (HMR fix)
    client: {
      overlay: false,
      logging: "warn", // Want to set this to 'warn' or 'error'
    },
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

  watchOptions: {
    ignored: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "public"),
      // path.resolve(__dirname, "src/utils/scripts/db.js"),
    ],
  },
  module: {
    rules: [
      // Server
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "server"),
        use: {
          loader: "babel-loader",
          options: {
            configFile: path.resolve(__dirname, "server/babel.config.js"),
            minified: true,
          },
        },
      },

      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "src/"),
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, "src/"),
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript"
            ],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/,
        include: [
          path.resolve(__dirname, "src/assets"),
          path.resolve(__dirname, "src/components")
        ],
        type: "asset",
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/@fullcalendar/"),
          path.resolve(__dirname, "node_modules/@react-pdf-viewer/"),
          path.resolve(__dirname, "node_modules/react-phone-input-2/lib/"),
        ],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@contexts": path.resolve(__dirname, "src/contexts/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@routes": path.resolve(__dirname, "src/routes/"),
      "@screens": path.resolve(__dirname, "src/screens/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@config": path.resolve(__dirname, "config/"),
    },
    fallback: {
      // Source: (buffer polyfill) https://viglucci.io/how-to-polyfill-buffer-with-webpack-5
      buffer: require.resolve("buffer/"),
    },
  },

  plugins: [
    mode === "development" ? new ReactRefreshWebpackPlugin() : () => { },
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/public/index.html"),
    }),
    // Source: https://webpack.js.org/plugins/mini-css-extract-plugin/#hot-module-reloading-hmr (Fix for CSS reloading error on HMR)
    new MiniCssExtractPlugin({
      filename:
        mode === "development" ? "[name].css" : "[name].[contenthash].css",
      chunkFilename:
        mode === "development" ? "[id].css" : "[id].[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public/robots.txt"),
          to: path.resolve(__dirname, "dist/robots.txt"),
        },
      ],
    }),
    // Source: https://stackoverflow.com/a/66367137/10603621
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),

    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),

    // new BundleAnalyzerPlugin(),
  ],
};

const backendConfig = {
  mode,
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  entry: {
    bundle: path.resolve(__dirname, "server/index.mjs"),
  },
  output: {
    path: path.resolve(__dirname, "dist-server"),
    filename: "[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "server/assets/[name][ext]",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist-server"),
    },
    hot: true,
    compress: true,
  },
  devtool: mode === "development" ? "source-map" : false,

  watchOptions: {
    ignored: [path.resolve(__dirname, "src")],
  },
  module: {
    rules: [
      // Server
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "server"),
        use: {
          loader: "babel-loader",
          options: {
            configFile: path.resolve(__dirname, "server/babel.config.js"),
            minified: true,
          },
        },
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/,
        include: path.resolve(__dirname, "server/assets"),
        type: "asset",
      },
    ],
  },

  resolve: {
    extensions: [".js"],
    alias: {
      "@services": path.resolve(__dirname, "server/services/"),
    },
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "server/assets"),
          to: path.resolve(__dirname, "dist-server/assets"),
        },
      ],
    }),
    // new BundleAnalyzerPlugin({ analyzerPort: 8889 }),
  ],
};

// const commonConfig = {};

// module.exports = [
//   Object.assign({}, commonConfig, frontendConfig),
//   Object.assign({}, commonConfig, backendConfig),
// ];

module.exports = [
  frontendConfig,
  // backendConfig,
];
