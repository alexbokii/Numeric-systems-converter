$(function() {

  $('#inputs div input').on('keyup', receiveNumberAndIdentifySystem);

  // 1. Receive data from input and check what system is belongs
  function receiveNumberAndIdentifySystem() {
    var inputList = $('#inputs div input');
  
    for(var i = 0; i < inputList.length; i++) {
      if($(inputList[i]).val()) {
        var number = $(inputList[i]).val();
        var system = $(inputList[i]).attr('id');
        
        calculateNumberInAnotherSystems(number, system);
      }
    }
  }

  function calculateNumberInAnotherSystems(number, system) {
    console.log(number.length);
    if(system == 'decimal') {
      var splitedNumbers = splitNumberIntoDigits(number);
      console.log(splitedNumbers);
      var splitedNumbersPowerTen = convertNumbersToBaseTen(splitedNumbers);
      console.log(splitedNumbersPowerTen);
    }
  }

  function convertDecimalToBinary(number) {

  }

  function convertDecimalToOctal(number) {

  }

  function splitNumberIntoDigits(number) {
    var numbersArray = [];
    var NewNumber = number.toString();
    for(var i = 0; i < NewNumber.length; i++) {
      numbersArray.push(parseInt(NewNumber.charAt(i)));
    }
    return numbersArray;
  }

  function convertNumbersToBaseTen(array) {
    //all numbers can be written as they are based on 10

    var maxIndex = array.length;
    var newArray = [];

    for(var i = 0; i < array.length; i++) {
      var index = findPoverOfTen(maxIndex);
      newArray.push(array[i] * index);
      maxIndex--;
    }

    return newArray;
  }

  function findPoverOfTen(number) {
    console.log("findPoverOfTen");
    if(number === 1) {
      base = 1;
    }
    else if(number === 2) {
      base = 10;
    }
    else if(number === 3) {
      base = 10 * 10;
    }
    else if(number === 4) {
      base = 10 * 10 * 10;
    }
    else if(number === 5) {
      base = 10 * 10 * 10 * 10;
    }
    return base;
  }

});