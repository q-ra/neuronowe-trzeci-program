const utils = require('./utils')
const calculations = require('./calculations');

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
    swal('Możliwe cyfry to' + foundNumbers.join(' lub '))


}


//Nauka
exports.learn = () => {
  let weights = calculations.createWeights()
  let examples = getJSONWithExamples()
  for(let indx of examples.keys()){
    examples[indx] = [1, ...examples[indx]]
  }
  for(let indx of Array(1000){
    weights = getPerceptronLearn(examples, weights)
  }
  global.superWeights = weights
  swal('Nauczyłem się !')
}

let singlePerceptronLearn = (examples, weights) => {
  let exampleNumber =  Math.floor(Math.random() * examples.length)
  let currentExample = examples[exampleNumber]
  return calculations.fixWeights(currentExample, weights, exampleNumber)
}
