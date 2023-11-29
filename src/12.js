import Utils from './utils';

class AOC {
  part1 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const inputRows = await Utils.getDataRows(inputData);
  };

  part2 = async inputFile => {
    console.log('Still nothing to do ');
  };
}

export default AOC;
