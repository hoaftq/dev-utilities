const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return {
        ...webpackConfig,
        plugins: excludeRemoteEntry(webpackConfig.plugins), // We don't want to inject remoteEntry.js to the index.html
        experiments: {
          outputModule: true,
        },
        output: {
          ...webpackConfig.output,
          publicPath: process.env.PUBLIC_PATH,
        },
      };
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "dev_utilities",
        library: { type: "module" },
        filename: "remoteEntry.js",
        exposes: {
          "./dev-utilities": "./src/mfe/AppMfe",
        },
        shared: {
          react: {
            singleton: true,
            eager: true,
          },
          "react-dom": {
            singleton: true,
            eager: true,
          },
        },
      }),
    ],
  },
};

function excludeRemoteEntry(plugins) {
  return plugins.map((plugin) => {
    if (plugin.constructor.name === "HtmlWebpackPlugin") {
      plugin.options.chunks = ["main"];
    }

    return plugin;
  });
}
