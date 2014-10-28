$(function() {

  var activeSystem = undefined;

  $('#inputs div input').on('keyup', function() {
    if(activeSystem === undefined) {
      findActiveSystem();
      calculateNumberInAnotherSystems($('#' + activeSystem + '').val());
    }
    else {
      calculateNumberInAnotherSystems($('#' + activeSystem + '').val());
    }
  });

  function findActiveSystem() {
    var inputList = $('#inputs div input');
    for(var i = 0; i < inputList.length; i++) {
      if($(inputList[i]).val()) {
        activeSystem = $(inputList[i]).attr('id');
      }
    }
  }

  function calculateNumberInAnotherSystems(num) {
    if(activeSystem === 'decimal') {
      var binaryResult = convertDecimalToBinary(num);
      $('#binary').val(binaryResult);

      var octalResult = convertDecimalToOctal(num);
      $('#octal').val(octalResult);
    }

    else if(activeSystem === 'binary') {
      var decimalResult = convertBinaryToDecimal(num);
      $("#decimal").val(decimalResult);

      var octalResult = convertDecimalToOctal(decimalResult);
      $('#octal').val(octalResult);
    }

    else if(activeSystem === 'octal') {
      var decimalResult = convertOctalToDecimal(num);
      $("#decimal").val(decimalResult);
      var binaryResult = convertDecimalToBinary(decimalResult);
      $('#binary').val(binaryResult);
    }

    else {
      console.log("Error");
    }
  }

  function convertDecimalToBinary(number) {
    var currentNumber = number;
    var binaryNumber = [];
    do {
      var remainder = currentNumber % 2;
      if(remainder === 0) {
        var halfCurrentNumber = currentNumber / 2;
        binaryNumber.unshift(0);
        currentNumber = halfCurrentNumber;
      }
      else {
        var halfCurrentNumber = (currentNumber - 1) / 2;
        binaryNumber.unshift(1);
        currentNumber = halfCurrentNumber;
      }
    }
    while (currentNumber != 0);
    
    var result = showArrayOnScreen(binaryNumber);
    return result;
  } 

  function convertDecimalToOctal(number) {
    var currentNumber = number;
    var octalNumber = [];
    do {
      var remainder = currentNumber % 8;
      octalNumber.push(remainder);
      var currentNumber = parseInt(currentNumber / 8);
    }
    while (currentNumber != 0);

    octalNumber.reverse();
    var result = showArrayOnScreen(octalNumber);
    return result;
  } 

  function convertBinaryToDecimal(number) {
    var array = splitNumberAndUNshiftToArray(number);
    array.reverse();

    var result = 0;
    for(var i = 0; i < array.length; i++) {
     if(array[i] === 1) {
      result = result + Math.pow(2, i);
     }
    }
    return result;
  }

  function convertOctalToDecimal(number) {
    var octalArrayString = number.split('');
    var octalArray = octalArrayString.map(function(num) {
      return parseFloat(num);
    });
    octalArray.reverse();

    var result = 0;
    for(var i = 0; i < octalArray.length; i++) {
      result = result + octalArray[i] * Math.pow(8, i);
    }
    return result;
  }

  function showArrayOnScreen(array) {
    var result = parseFloat(array.join(''));
    return result;
  }

  function splitNumberAndUNshiftToArray(number) {
    var numberToString = number.toString();
    var numberArray = [];

    for(var i = 0; i < numberToString.length; i++) {
      var currentNum = numberToString.charAt(i);
      numberArray.push(parseInt(currentNum));
    }
    return numberArray;
  }

});