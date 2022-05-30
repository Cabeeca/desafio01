const myMiddlerware = (req, res, next) => {
  console.log('Julio')
  next();
}

module.exports = myMiddlerware