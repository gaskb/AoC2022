import Monkey from './monkey/Monkey';
import Utils from './utils';

class AOC {
  part1 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const inputRows = await Utils.getDataRows(inputData);
    const monkeys = Monkey.createMonkeys(inputRows);

    // console.log('monkeys = ', monkeys);

    for (let round = 1; round <= 20; round++) {
      Monkey.playRound(monkeys);
    }

    const businessLevels = [];
    monkeys.forEach(monkey => {
      businessLevels.push(monkey.businessLevel);
    });

    businessLevels.sort(Utils.compareNumbersDesc);

    console.log('Result 1 = ', businessLevels[0] * businessLevels[1]);
  };

  part2 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const inputRows = await Utils.getDataRows(inputData);
    const monkeys = Monkey.createMonkeys(inputRows);

    let divisor = 1;
    monkeys.forEach(monkey => {
      divisor *= monkey.testDivision;
    });

    for (let round = 1; round <= 10000; round++) {
      Monkey.playUpdatedRound(monkeys, divisor);
    }

    const businessLevels = [];
    monkeys.forEach(monkey => {
      businessLevels.push(monkey.businessLevel);
    });

    businessLevels.sort(Utils.compareNumbersDesc);

    console.log('Result 2 = ', businessLevels[0] * businessLevels[1]);
  };
}

export default AOC;
