import Utils from './utils';

class AOC {
  part1 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const inputRows = await Utils.getDataRows(inputData);
    AOC.compareAllElements(inputRows);
  };

  part2 = async inputFile => {
    console.log('Still nothing to do ');
  };

  static compareAllElements = inputRows => {
    for (let index = 0; index < inputRows.length; index++) {
      const leftElement = JSON.parse(inputRows[index]);
      index++;
      const rightElement = JSON.parse(inputRows[index]);
      index++;

      if (AOC.compareElements(leftElement, rightElement)) {
        console.log('OK');
      } else {
        console.log('KO');
      }
    }
  };

  static compareElements = (leftElement, rightElement) => {
    if (Array.isArray(leftElement) && Array.isArray(rightElement)) {
      for (let index = 0; index < leftElement.length; index++) {
        if (!rightElement[index]) {
          console.log('return true');
          return true;
        }
        console.log('index', index);
        console.log('leftElement[index]', leftElement[index]);
        console.log('rightElement[index]', rightElement[index]);
        if (leftElement[index] > rightElement[index]) {
          console.log('return false');
          return false;
        }
      }
      console.log('return true');
      return true;
    }
  };
}

export default AOC;
