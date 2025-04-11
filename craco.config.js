const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const plugins = webpackConfig.plugins.map((plugin) => {
        // We don't want to inject remoteEntry.js to the index.html
        if (plugin.constructor.name === "HtmlWebpackPlugin") {
          plugin.options.chunks = ["main"];
        }

        return plugin;
      });

      return {
        ...webpackConfig,
        plugins,
        experiments: {
          outputModule: true,
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
