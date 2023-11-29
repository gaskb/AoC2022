const fs = require('fs');
const fsp = require('fs/promises');
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

  static initMap = (min, max, defaultVal = '.') => {
    const myMap = [];
    for (let y = min.y; y <= max.y; y++) {
      myMap[y] = [];
      for (let x = min.x; x <= max.x; x++) {
        myMap[y][x] = defaultVal;
      }
    }

    return myMap;
  };

  static printMapOnFile = (myMap, filename = 'map.txt') => {
    fsp.writeFile(
      filename,
      myMap
        .map(function (v) {
          return v.join(' ');
        })
        .join('\n'),
      { flag: 'w' }
    );
  };

  static deepCopyObj = obj => {
    return JSON.parse(JSON.stringify(obj));
  };
}

export default Utils;
