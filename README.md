# What is this

Cypress needs a plugin to process or transpile TypeScript and then it read the tests from this bundle.
With TypeScript, testing is a bit more predictable.

# IMPORTANT!!!

This plugin works only with webpack and is tested with the version of webpack 4.41.5
The plugin creates a temporal folder with the name "tests_build" inside the `cypress` folder. After you close the browser the folder will be deleted.

# Instalation

`npm i typescript-cypress -D`

# Use

In the file cypres/plugins/index.js

```js
const { typescriptCypressTranspiler } = require('typescript-cypress')

const _module = {
  rules: [
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
              '@babel/preset-typescript',
              ['@babel/preset-react', { development: true }]
            ],
            plugins: [
              '@babel/plugin-transform-destructuring',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-typescript',
              '@babel/plugin-transform-parameters',
              '@babel/plugin-proposal-export-default-from',
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: 2
                }
              ]
            ]
          }
        }
      ],
      exclude: /node_modules/
    }
  ]
}

module.exports = (on, config) => {
  on('file:preprocessor', typescriptCypressTranspiler(_module))
}
```
