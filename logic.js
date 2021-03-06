const utils = require('./utils')
const calculations = require('./calculations')
const exec = require('child_process').exec
const fs = require('fs')

exports.updateFile = () => {
  let E = $.map($('td', '.table-div'), (x) => $(x).hasClass('keyed') ? 1 : -1)
  let P = $('button.selected-digit').text()
  if(P == null || P == undefined || P == ''){
    swal('Jaka to cyfra?')
  } else {
    utils.appendToJSON(E, parseInt(P))
  }
}

global.currentlyLoadedExample = null

exports.nextExample = () => {
  let examples = utils.getJSONWithExamples()
  let examplesLength = examples.length
  if (global.currentlyLoadedExample === null ||
      global.currentlyLoadedExample == examplesLength - 1 ||
      global.currentlyLoadedExample < 0) {
    global.currentlyLoadedExample = 0
  } else {
    global.currentlyLoadedExample += 1
  }
  let currentExample = examples[global.currentlyLoadedExample]

  $('td').removeClass('keyed').addClass('normal-td')
  $('button','.digit-buttons').removeClass('selected-digit')
  $('td').each(function(indx){
      if(currentExample[indx] == 1){
        $(this).addClass('keyed')
      }
  })
  $(`.digit-${global.currentlyLoadedExample}`).addClass('selected-digit')
}

exports.deleteExample = () => {
  let examples = utils.getJSONWithExamples()
  examples.splice(global.currentlyLoadedExample, 1)
  examples.push([])
  global.currentlyLoadedExample -= 1
  fs.writeFileSync('examples.json', JSON.stringify(examples))
  exports.nextExample()
}


exports.getNumber = () => {
  if(global.superWeights == undefined){
    swal('Nie nauczyłem się jeszcze')
  }
  let tmp = $.map($('td', '.table-div'), (x) => $(x).hasClass('keyed') ? 1 : -1)
  let E = [1, ...tmp]
  fs.writeFileSync('input_vals.json', JSON.stringify(E))
  exec('python3 get_whole_example.py',(err, stdout, stderr)=>{
    if(err){}
      // console.log(stderr)
    else {
      // console.log(stdout)
      let full_example = stdout
      // console.log(global.superWeights)
      full_example = eval(stdout)
      // console.log(x)
      // console.log(global.superWeights)
      let foundNumbers = []
      for(let indx of Array(10).keys()){
        let x = calculations.activatingFunction(full_example, global.superWeights[indx])
        if(x > 0) {
          foundNumbers.push(indx)
        }
      }
      $('.digit-buttons > button').removeClass('selected-digit')

      for(let numb of foundNumbers){
        $(`.digit-${numb}`).addClass('selected-digit')
      }

      if (!foundNumbers.length)
        swal('Nie udało dopasować sie żadnej liczby')
      else if(foundNumbers.length == 1)
        swal('Cyfra to ' + foundNumbers[0])
      else
        swal('Możliwe cyfry to ' + foundNumbers.join(' lub '))


    }
  })

}


//Nauka
exports.learn = () => {
  let statistics = Array(10).fill(1).map( (x) => [])
  let weights = calculations.createWeights()
  let examples = utils.getJSONWithExamples()
  for(let indx of examples.keys()){
    examples[indx] = [1, ...examples[indx]]
  }

  for(let wantToLearn of Array(10).keys()){
    for(let indx of Array(20000).keys()){
      let exampleNumber =  Math.floor(Math.random() * examples.length)
      // let exampleNumber = 0
      tmp = getPerceptronLearn(examples, weights[wantToLearn], exampleNumber, wantToLearn)

      err = tmp[1]

      if(indx % 100){
        statistics[wantToLearn].push(err)
      }
      if(err > 0.0001){
        weights[wantToLearn] = tmp[0]
      }

    }
    global.superWeights = weights
    swal('Nauczyłem się !')
    fs.writeFileSync('statistics.json', JSON.stringify(statistics))
  }
}

let getPerceptronLearn = (examples, weights, exampleNumber, wantToLearn) => {
  return calculations.fixWeights(examples, weights, exampleNumber, wantToLearn)
}
