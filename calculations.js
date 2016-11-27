exports.activatingFunction = (arr0, arr1) => {
  let summed = 0
  console.log(arr0.length)
  for(let indx of Array(arr0.length).keys()){
    summed += (arr0[indx] * arr1[indx])
  }
  return summed
}


exports.fixWeights = (inputArr, weights, exampleNumber) => {
  let new_weights = []
  output = exports.activatingFunction(inputArr[exampleNumber], weights)
  for(let indx of weights.keys()){
    new_weights[indx] = weights[indx] + 0.01 * //0.1 -- stała uczenia
      (exampleNumber - output) * inputArr[exampleNumber][indx]
  }
  return new_weights
}

let getRandomWeights = function(sizeOfArray){
  return Array.from({length: sizeOfArray}, () => {
    let multiplicator = Math.random() >= 0.5 ? 1 : -1
    return parseFloat(Math.random().toFixed(2)) * multiplicator
  })
}

exports.createWeights = () => {
  return getRandomWeights(85)
}
