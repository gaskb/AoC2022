const fs = require('fs');

class Utils {
  static getInputData = async inputFile => {
    const inputData = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
      if (err) {
        return console.log(err);
      }
    });

    return inputData;
  };

  static getDataRows = async inputdata => {
    return inputdata.split('\n');
  };

  static compareNumbersAsc = (a, b) => {
    return b - a;
  };

  static compareNumbersDesc = (a, b) => {
    return b - a;
  };

  static rangeInit = (firstElement, lastElement, step = 1) => {
    const rangeArray = [];

    rangeArray[0] = firstElement;
    step = step || 1;
    while (firstElement + step <= lastElement) {
      rangeArray[rangeArray.length] = firstElement += step;
    }

    return rangeArray;
  };
}

export default Utils;
