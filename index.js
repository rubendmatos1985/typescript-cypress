const path = require('path')
const webpack = require('webpack')

const typescriptCypressTranspiler = _module => file => {
  function buildConfigObject({ entry, output, filename }) {
    return {
      mode: 'development',
      entry,
      output: {
        path: output,
        filename
      },
      module: _module
    }
  }

  function compilerSetup(file) {
    const buildFileName = () =>
      `${path.basename(file.outputPath).split('.')[0]}.js`

    const buildOutputPath = () =>
      path.join(`${path.resolve('cypress/tests_build')}`, buildFileName())

    return (ifSuccess, ifFail) => {
      const compiler = webpack(
        buildConfigObject({
          entry: path.resolve(file.filePath),
          output: path.dirname(buildOutputPath()),
          filename: buildFileName()
        })
      )
      return compiler.run((err, stats) => {
        if (err) {
          ifFail(new Error(err || stats.hasError))
          return new Error(err || stats.hasError)
        }
        if (stats.hasError) {
          ifFail(new Error(err || stats.hasError))
          return new Error(err || stats.hasError)
        }
        return ifSuccess(buildOutputPath(), file)
      })
    }
  }

  const outputFolderName = 'tests_build'
  const compilerRunner = compilerSetup(file)

  const fileWatcher = fs.watch(file.filePath, () => {
    compilerRunner((_, fileFromCompiler) => fileFromCompiler.emit('rerun'), log)
  })

  file.on('close', () => {
    fileWatcher.close()
    rimraf(path.resolve(`cypress/${outputFolderName}`), err =>
      err
        ? console.log(err)
        : console.log(`${outputFolderName} successfully removed`)
    )
  })

  return new Promise(compilerRunner)
}

module.exports.typescriptCypressTranspiler = typescriptCypressTranspiler
