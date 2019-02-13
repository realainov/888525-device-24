"use strict";

function formatLessInput ()
{
  var inputField = document.querySelector('#input');

  if (inputField.value.length == 0)
  {
    inputField.value = testData; // insert some test data
  }

  var input = inputField.value.split('\n');

  var output = "";

  output = inputToData (input);

  document.querySelector('#output').value = output;
}

function inputToData (input)
{
  var outputAsString = "";
  var properties = [];

  while (input.length > 0)
  {
    var line = input.shift(); // take the first element from input and set the value for 'line'

    if (line.length <= 0)
    {
      continue; // next line please because this one is empty
    }

    var trimmedLine = line.trim(); // remove whitespace from string

    //opening part
    if (trimmedLine.match(/(\s)?[\.\#a-zA-Z0-9\:\-].*[\{]/g) != null) // regex match ".frame {" or ".FRAME {" or ".FR4M3 {"
    {
      if (properties.length > 0)  // add all properties to output before next line for sub element is added
      {
        outputAsString += arrayToMultilineString (properties.sort());
      }

      if (line.indexOf(" ") != 0) // parent class or id like ".frame {" or "#frame {"
      {
        outputAsString += line + "\n";
      }
      else if (line.indexOf(" ") == 0) // any child like "    .frame-second {" or "    #frame-second {"
      {
        outputAsString += line + "\n";
        outputAsString += inputToData (input) + "\n";
      }
    }
    else if (trimmedLine.match (/(?:\.?\#?)([a-zA-Z0-9]).*(\-)([a-zA-Z0-9]).*(\(*[a-zA-Z0-9]*\))\;/g)) // regex match mixins
    {
      properties.push (line + "\n\n"); // this is a bit of a hack to get the additional line break right after the mixins
    }
    else if (trimmedLine.match (/(?:\s)?(?:\-)?(?:[a-zA-Z0-9\:\@]\S).*\;/g)) //regex match simple CSS properties
    {
      properties.push (line + "\n");
    }
    else if (trimmedLine.indexOf ('}') == 0) // match regex for closing curly bracet
    {
      if (properties.length > 0)
      {
        outputAsString += arrayToMultilineString (properties.sort());
      }

      if (line.indexOf ('}') != 0) // inner closing bracet like "    }"
      {
        outputAsString += line;
        return outputAsString;
      }

      if (line.indexOf ('}') == 0) // outer closing bracet like "}"
      {
        outputAsString += line + "\n\n";
      }
    }
  }

  return outputAsString;
}

function arrayToMultilineString (arr)
{
  var text = "";

  while (arr.length > 0)
  {
    text += arr.shift(); // this will remove the element from the array 'arr' because an array is passed by reference, not by value
  }

  return text;
}


var testData = `.frame {
    color: blue;
    background-color: white;
    .mx-hello(white);
    #framesecond {
        font-size: 12px;
        background: green;
        .mx-test(white);    
    }
}
#frame {
    color: blue;
    background-color: white;
    .mx-hello(white);
    .framesecond {
        font-size: 12px;
        background: green;
        .mx-test(white);    
    }
}

.frames {
    color: blue;
    background-color: white;
    .mx-hello(white);
}

.frames2 {
    color: blue;
    background-color: white;
    .mx-hello(white);
}`;
