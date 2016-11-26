fs = require('fs')
let parseToJSON = () => JSON.parse(fs.readFileSync('examples.json', 'utf-8'))

exports.getJSONWithExamples = () => parseToJSON()

exports.appendToJSON = (E, P) => {
  //E -- przykład, P -- perceptron dla którego dla E T == 1
  currentJSON = parseToJSON()
  for(let indx of currentJSON.keys()){
    if (indx == P)
      currentJSON[indx].push({"E":E, "T":true})
    else {
      currentJSON[indx].push({"E":E, "T":false})
    }
  }
  fs.writeFileSync('examples.json', JSON.stringify(currentJSON))
}
