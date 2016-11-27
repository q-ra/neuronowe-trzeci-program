exports.activatingFunction = (arr0, arr1) => {
  let summed = 0
  // console.log(arr0.length)
  // for(let indx of Array(arr0.length).keys()){
  for(let indx of Array(65).keys()){
    summed += (arr0[indx] * arr1[indx])
  }
  return summed
}

errorVal = (output, exampleNumber) => {
  let summed = 0
  for(let indx of Array(65).keys()){
    summed += ((output - exampleNumber) ** 2)
  }
  return summed
}

exports.fixWeights = (inputArr, weights, exampleNumber, wantToLearn) => {
  let new_weights = []
  let c = wantToLearn == exampleNumber ? 1 : -1
  // console.log(c)
  output = exports.activatingFunction(inputArr[exampleNumber], weights)
  // console.log(inputArr, weights, exampleNumber)
  let err = errorVal(output, c)
  for(let indx of Array(65).keys()){
    new_weights[indx] = weights[indx] + 0.001 *
      (c - output) * inputArr[exampleNumber][indx]
      // debugger
  }
  return [new_weights, err]
}

let getRandomWeights = function(sizeOfArray){
  return Array.from({length: sizeOfArray}, () => {
    // let multiplicator = Math.random() >= 0.5 ? 1 : -1
    return parseFloat(Math.random() / 1000) //* multiplicator
  })
}

exports.createWeights = () => {
  return Array(10).fill(1).map( (x) => getRandomWeights(65))
}
