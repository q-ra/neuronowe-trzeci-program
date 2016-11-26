logic = require('./logic')

// funkcja generujaca przyciski
var createButtons = () => {
  let indx = 0
  $('.table-div').append('<table />')
  for (tr_ind of Array(7).keys()){
    _tr = $('<tr/>').appendTo('table')
    for (td_ind of Array(6).keys()) {
      _tr.append(`<td id="td-${indx}" class="normal-td"> </td>`)
      indx += 1
    }
  }
}

var createDigitControls = () => {
  for (digit of Array(10).keys()){
    $('.digit-buttons').append(`<button class="digit-${digit}"> ${digit}</button>`)
  }
}

var saveCurrentInstance = () => {
  console.log($('td', '.table-div'))
}



$(() => {
  var pressed = false
  createButtons()
  createDigitControls()

  $('body').on('mousedown', (e) => {
    pressed = true
  })
  $('body').on('mouseup', (e) => {
    pressed = false
  })
  $('td').on('click', (e) => {
    let clickedTd = $(e.target)
    if(clickedTd.hasClass('normal-td'))
      clickedTd.removeClass('normal-td').addClass('keyed')
    else {
      clickedTd.removeClass('keyed').addClass('normal-td')
    }
  })
  $('td').on('mouseenter', (e) => {
    let clickedTd = $(e.target)
    if(pressed){
      if(clickedTd.hasClass('normal-td'))
        clickedTd.removeClass('normal-td').addClass('keyed')
      else {
        clickedTd.removeClass('keyed').addClass('normal-td')
      }
    }
  })
  $('.digit-buttons > button').on('click', function(e) {
    if ($(this).hasClass('selected-digit'))
      $(this).removeClass('selected-digit')
    else
      $(this).addClass('selected-digit')
  })
  $('.add-current-example').on('click', (e) => {
    logic.updateFile()
  })
  $('.learn').on('click', (e) => {
    logic.learn()
  })
  $('.show-next-example').on('click', (e) => {
    logic.nextExample()
  })
  $('.delete-example').on('click', (e) => {
    logic.deleteExample()
  })
  $('.recognize').on('click', (e)=>{
    logic.getNumber()
  })

})
