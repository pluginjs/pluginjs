{
	"name": "@pluginjs/{{name}",
	"main": "dist/{{name}.umd.js",
	"css": {
		"source": "src/css/{{name}.scss",
		"main": "dist/{{name}.css",
		"min": "dist/{{name}.min.css"
	},
	"dependencies": {
		"@pluginjs/component": "^0.2.22",
		"@pluginjs/pluginjs": "^0.2.25",
		"@pluginjs/styles": "^0.2.19"
	},
	"scripts": {
		"build": "plugin build",
		"build:scss": "plugin script build-scss",
		"build:js": "plugin script build-js",
		"build:md": "plugin script build-md",
		"lint": "stylelint ./src/**/*.scss --fix && eslint ./src/**/*.js --fix",
		"test": "jest"
	},
	"version": "0.0.1",
	"description": "A flexible modern {{name}} js plugin.",
	"author": "Creation Studio Limited",
	"homepage": "https://github.com/pluginjs/plugin.js",
	"license": "GPL-3.0",
	"jest": {
		"setupTestFrameworkScriptFile": "jest-extended",
		"verbose": true,
		"testPathIgnorePatterns": [
			"fixtures"
		]
	},
	"module": "dist/{{name}}.esm.js",
	"source": "src/main.js",
	"cjs": "dist/{{name}}.cjs.js",
	"devDependencies": {
		"@babel/core": "^7.0.0-beta.47",
		"@babel/plugin-proposal-class-properties": "^7.0.0-beta.47",
		"@babel/plugin-proposal-decorators": "^7.0.0-beta.47",
		"@babel/plugin-proposal-object-rest-spread": "^7.0.0-beta.47",
		"@babel/preset-env": "^7.0.0-beta.47",
		"@pluginjs/cli": "^0.5.18",
		"babel-jest": "^23.0.1",
		"jest": "^23.1.0",
		"jest-extended": "^0.7.2",
		"rollup-plugin-babel": "^4.0.0-beta.4",
		"rollup-plugin-commonjs": "^9.1.3",
		"rollup-plugin-node-resolve": "^3.3.0",
		"rollup": "^0.59.2"
	}
}