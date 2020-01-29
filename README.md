# What is this

Cypress needs a plugin to process or transpile typescript and then it reads the tests from this bundle.
With typescript testing is a bit more predictable.

# IMPORTANT!!!

This plugin works only with webpack and is tested with the version fo webpack 4.41.5
The plugin create a temporal folder with name "tests_build" inside cypress folder. After close the browser the folder will be deleted

# Instalation

`npm i typescript-cypress -D`

# Use

In the file cypres/plugins/index.js

```
    const typescriptCypressTranspiler = require('typescript-cypress')

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

    module.exports = (on, config)=>{
        on('file:preprocessor', typescriptCypressTranspiler(_module))
    }
```
