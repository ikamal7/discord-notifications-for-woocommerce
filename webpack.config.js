const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaultConfig,
	entry: {
		admin: path.resolve(process.cwd(), 'src', 'index.js'),
	},
	output: {
		path: path.resolve(process.cwd(), 'assets', 'admin'),
		filename: '[name].js',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'assets/admin'),
        },
        hot: true,
    },
};