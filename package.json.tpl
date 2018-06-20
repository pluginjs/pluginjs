{
	"name": "accordion-samples",
	"version": "1.0.0",
	"description": "Simple accordion example",
	"main": "index.html",
	"scripts": {
		"start": "parcel index.html --open",
		"build": "parcel build index.html"
	},
	"devDependencies": {
		"babel-core": "^6.26.3",
		"babel-preset-env": "1.7.0",
		"babel-plugin-transform-html-import-to-string": "^0.0.1",
		"parcel-bundler": "^1.6.1"
	},
	"dependencies": {
		"@pluginjs/accordion": "^0.0.1",
		"@pluginjs/dom": "^0.0.15"
	},
	"license": "UNLICENSED"
}
rc/**/*.scss --fix && eslint ./src/**/*.js --fix",
		"test": "jest"
	},
	"version": "0.0.1",
	"description": "A flexible modern accordion js plugin.",
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
	"category": ,
	"module": "dist/accordion.esm.js",
	"source": "src/main.js",
	"cjs": "dist/accordion.cjs.js",
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