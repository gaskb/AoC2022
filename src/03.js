import Utils from './utils';

class AOC {
  part1 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const priorities = AOC.getPriorities(await Utils.getDataRows(inputData));
    const priorityValue = AOC.getPrioritiesValue(priorities);

    console.log('priorityValue = ', priorityValue);
  };

  part2 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const commonElements = AOC.getCommonElements(await Utils.getDataRows(inputData));
    const priorityValue = AOC.getPrioritiesValue(commonElements);

    console.log('priorityValue = ', priorityValue);
  };

  static getPriorities = inputDataArray => {
    const priorities = [];
    inputDataArray.forEach(row => {
      priorities.push(AOC.getPriority(row));
    });
    return priorities;
  };

  static getPriority = row => {
    for (let elCounter = 0; elCounter < row.length / 2; elCounter++) {
      const firstElement = row[elCounter];
      for (let elCounter2 = row.length / 2; elCounter2 < row.length; elCounter2++) {
        const secondElement = row[elCounter2];
        if (firstElement === secondElement) {
          return firstElement;
        }
      }
    }
    console.log('Something went wrong');
  };

  static getCommonElements = inputDataArray => {
    const commonElements = [];
    for (let backPackCounter = 0; backPackCounter < inputDataArray.length; backPackCounter++) {
      const backPackGroup = [];
      backPackGroup.push(inputDataArray[backPackCounter]);
      backPackCounter++;
      backPackGroup.push(inputDataArray[backPackCounter]);
      backPackCounter++;
      backPackGroup.push(inputDataArray[backPackCounter]);

      commonElements.push(AOC.getCommonElement(backPackGroup));
    }
    return commonElements;
  };

  static getCommonElement = backPackGroup => {
    for (let bp1Counter = 0; bp1Counter < backPackGroup[0].length; bp1Counter++) {
      const firstElement = backPackGroup[0][bp1Counter];
      for (let bp2Counter = 0; bp2Counter < backPackGroup[1].length; bp2Counter++) {
        const secondElement = backPackGroup[1][bp2Counter];
        if (firstElement === secondElement) {
          for (let bp3Counter = 0; bp3Counter < backPackGroup[2].length; bp3Counter++) {
            const thirdElement = backPackGroup[2][bp3Counter];
            if (firstElement === thirdElement) {
              return firstElement;
            }
          }
        }
      }
    }
    console.log('Something went wrong');
  };

  static getPrioritiesValue = priorities => {
    let prioritiesValue = 0;
    for (let position = 0; position < priorities.length; position++) {
      let value = priorities[position].charCodeAt(0);
      if (value >= 97) {
        value = value - 96;
      } else {
        value = value - 38;
      }
      prioritiesValue += value;
    }

    return prioritiesValue;
  };
}

export default AOC;
