$(function() {

  var activeSystem = undefined;

  $('#inputs div input').on('keyup', function() {
    var system = findActiveSystem($(this));
    validateNumberSystem(system);
    if(activeSystem === undefined) {
      setActiveSystem();
      calculateNumberInAnotherSystems($('#' + activeSystem + '').val());
    }
    else {
      calculateNumberInAnotherSystems($('#' + activeSystem + '').val());
    }
  });

  function findActiveSystem(a) {
    console.log(a.attr('id'));
    return a.attr('id');
  }

  function setActiveSystem() {
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

      var hexadecimal = convertDecimalToHexadecimal(num);
      $('#hexadecimal').val(hexadecimal);
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

    else if(activeSystem === 'hexadecimal') {
      var decimalResult = convertHexadecimalToDecimal(num);
      $("#decimal").val(decimalResult);
      var binaryResult = convertDecimalToBinary(decimalResult);
      $('#binary').val(binaryResult);
      var octalResult = convertDecimalToOctal(decimalResult);
      $('#octal').val(octalResult);
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

  function convertDecimalToHexadecimal(number) {
    var currentNumber = number;
    var hexadecimal = [];
    do {
      var remainder = currentNumber % 16;
      if(remainder === 10 ) {
        remainder = 'A';
      }
      else if(remainder === 11) {
        remainder = 'B';
      }
      else if(remainder === 12) {
        remainder = 'C';
      }
      else if(remainder === 13) {
        remainder = 'D';
      }
      else if(remainder === 14) {
        remainder = 'E';
      }
      else if(remainder === 15) {
        remainder = 'F';
      }
      hexadecimal.push(remainder);
      var currentNumber = parseInt(currentNumber / 16);
      console.log(remainder);
    }
    while (currentNumber != 0);

    hexadecimal.reverse();
    var result = showArrayOnScreen(hexadecimal);
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

  function convertHexadecimalToDecimal(number) {
    var hexArrayString = number.split('');
    var hexArray = hexArrayString.map(function(num) {
      return parseFloat(num);
    });
    hexArray.reverse();
    console.log(hexArray);

    var result = 0;
    for(var i = 0; i < hexArray.length; i++) {
      result = result + hexArray[i] * Math.pow(16, i);
    }
    return result;
  }

  function showArrayOnScreen(array) {
    console.log(array);
    var result = array.join('');
    console.log(result);
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

  // validation
  function validateNumberSystem(system) {
    if(system === 'decimal') {
      var re = /\d/;
      var ok = re.exec($('#decimal').val());
      if(!ok) {
        alert("This field requires a number");
      }
    }
    else if(system === 'binary') {
      var re = /[0-1]/;
      var ok = re.exec($('#binary').val());
      if(!ok) {
        alert("This field requires numbers 0 and 1");
      }
    }
    else if(system === 'octal') {
      var re = /[0-7]/;
      var ok = re.exec($('#octal').val());
      if(!ok) {
        alert("This field requires numbers from 0 to 7");
      }
    }
  }

});