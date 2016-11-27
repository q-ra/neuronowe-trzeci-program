exports.activatingFunction = (arr0, arr1) => {
  let summed = 0
  // console.log(arr0.length)
  // for(let indx of Array(arr0.length).keys()){
  for(let indx of Array(129).keys()){
    summed += (arr0[indx] * arr1[indx])
  }
  return summed
}

errorVal = (output, exampleNumber) => {
  let summed = 0
  for(let indx of Array(129).keys()){
    summed += (output - exampleNumber) ** 2
  }
  return summed
}

exports.fixWeights = (inputArr, weights, exampleNumber) => {
  let new_weights = []
  output = exports.activatingFunction(inputArr[exampleNumber], weights)
  let err = errorVal(output, exampleNumber)
  console.log('Błąd to', err)
  for(let indx of Array(129).keys()){
    new_weights[indx] = weights[indx] + 0.0001 * //0.1 -- stała uczenia
      (exampleNumber - output) * inputArr[exampleNumber][indx]
  }
  return [new_weights, err]
}

let getRandomWeights = function(sizeOfArray){
  return Array.from({length: sizeOfArray}, () => {
    let multiplicator = Math.random() >= 0.5 ? 1 : -1
    return parseFloat(Math.random() / 1000) * multiplicator
  })
}

exports.createWeights = () => {
  return getRandomWeights(129)
}
