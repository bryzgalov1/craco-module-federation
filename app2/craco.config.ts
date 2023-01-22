import webpack, { Configuration as WebpackConfig } from "webpack";
import { CracoConfig } from "@craco/types";

import packageJson from "./package.json";

const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;

const dependencies = packageJson.dependencies;

const cracoConfig: CracoConfig = {
    webpack: {
        configure: (webpackConfig) => {
            const production = webpackConfig.mode === 'production';

            const plugins = [
                ...(webpackConfig.plugins || []),
                new ModuleFederationPlugin({
                    name: 'app2',
                    filename: "remoteEntry.js",
                    library: { type: 'var', name: 'app2' },
                    exposes: {
                        "./RemoteComponent": "./src/RemoteComponent",
                    },
                    remotes: {},
                    shared: {
                        ...dependencies,
                        react: {
                            singleton: true,
                            requiredVersion: dependencies['react'],
                        },
                        "react-dom": {
                            singleton: true,
                            requiredVersion: dependencies['react-dom'],
                        },
                    }
                })
            ];

            const publicPath = production ? '/craco-module-federation/app2/' : 'auto';

            const config: WebpackConfig = {
                ...webpackConfig,
                plugins,
                output: {
                    ...webpackConfig.output,
                    publicPath,
                },
            };

            return config;
        },
    },
};

export default cracoConfig;
