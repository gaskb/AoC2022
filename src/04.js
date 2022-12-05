import Utils from './utils';

class AOC {
  part1 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);

    const rows = await Utils.getDataRows(inputData);
    let includedRanges = 0;
    rows.forEach(row => {
      const firstRange = Utils.rangeInit(
        parseInt(row.split(',')[0].split('-')[0]),
        parseInt(row.split(',')[0].split('-')[1])
      );
      const secondRange = Utils.rangeInit(
        parseInt(row.split(',')[1].split('-')[0]),
        parseInt(row.split(',')[1].split('-')[1])
      );

      if (AOC.isRangeIncluded(firstRange, secondRange) || AOC.isRangeIncluded(secondRange, firstRange)) {
        includedRanges++;
      }
    });

    console.log('includedRanges = ', includedRanges);
  };

  part2 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);

    const rows = await Utils.getDataRows(inputData);
    let overlappingRanges = 0;
    rows.forEach(row => {
      const firstRange = Utils.rangeInit(
        parseInt(row.split(',')[0].split('-')[0]),
        parseInt(row.split(',')[0].split('-')[1])
      );
      const secondRange = Utils.rangeInit(
        parseInt(row.split(',')[1].split('-')[0]),
        parseInt(row.split(',')[1].split('-')[1])
      );

      if (AOC.areRangeOverlapping(firstRange, secondRange)) {
        overlappingRanges++;
      }
    });

    console.log('overlappingRanges = ', overlappingRanges);
  };

  static isRangeIncluded = (firstRange, secondRange) => {
    let included = true;
    firstRange.forEach(element => {
      if (!secondRange.includes(element)) {
        included = false;
      }
    });
    if (included) {
      return true;
    }
    return false;
  };

  static areRangeOverlapping = (firstRange, secondRange) => {
    let overlapping = false;
    firstRange.forEach(element => {
      if (secondRange.includes(element)) {
        overlapping = true;
      }
    });
    if (overlapping) {
      return true;
    }
    return false;
  };
}

export default AOC;
