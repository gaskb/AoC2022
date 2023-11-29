import Utils from './utils';

class AOC {
  part1 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const inputDataArray = await Utils.getDataRows(inputData);
    const [stacks, procedure] = await AOC.getStacksAndProcedure(inputDataArray);

    AOC.moveStacks(stacks, procedure);

    console.log(AOC.getLastElementsFromStacks(stacks));
  };

  part2 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const inputDataArray = await Utils.getDataRows(inputData);
    const [stacks, procedure] = await AOC.getStacksAndProcedure(inputDataArray);

    AOC.moveStacks9001(stacks, procedure);
    console.log(AOC.getLastElementsFromStacks(stacks));
  };

  static getStacksAndProcedure = inputDataArray => {
    const rawStacks = [];
    const procedure = [];
    let stacksEnd = false;
    inputDataArray.forEach(row => {
      if (row === ' \n' || row[0] === ' ') {
        stacksEnd = true;
      } else {
        if (!stacksEnd) {
          rawStacks.push(row);
        } else {
          procedure.push(row);
        }
      }
    });

    const stacks = AOC.getStacks(rawStacks);

    return [stacks, procedure];
  };

  static getStacks = rawStacks => {
    const stacks = [];
    let rowIndex = 0;
    for (let rawRow = rawStacks.length - 1; rawRow >= 0; rawRow--) {
      const stackRow = rawStacks[rawRow];

      stacks[rowIndex] = [];
      for (let column = 1; column < stackRow.length; column += 4) {
        const element = stackRow.charAt(column);
        stacks[rowIndex].push(element);
      }
      rowIndex++;
    }
    const stacksByColumn = AOC.getStacksByColumn(stacks);
    return stacksByColumn;
  };

  static getStacksByColumn = stacks => {
    const stacksByColumn = [];
    for (let x = 0; x < stacks.length; x++) {
      for (let y = 0; y < stacks[x].length; y++) {
        const element = stacks[x][y];

        if (!stacksByColumn[y]) {
          stacksByColumn[y] = [];
        }
        if (element !== ' ') {
          stacksByColumn[y].push(element);
        }
      }
    }

    return stacksByColumn;
  };

  static moveStacks = (stacks, procedures) => {
    procedures.forEach(procedure => {
      if (procedure !== '') {
        const iterations = procedure.split(' from ')[0].split(' ')[1];
        const startPosition = parseInt(procedure.split(' from ')[1].split(' to ')[0]) - 1;
        const finalPosition = parseInt(procedure.split(' from ')[1].split(' to ')[1]) - 1;

        for (let counter = 0; counter < iterations; counter++) {
          const elementToMove = stacks[startPosition].pop();
          stacks[finalPosition].push(elementToMove);
        }
      }
    });
  };

  static moveStacks9001 = (stacks, procedures) => {
    procedures.forEach(procedure => {
      if (procedure !== '') {
        const iterations = procedure.split(' from ')[0].split(' ')[1];
        const startPosition = parseInt(procedure.split(' from ')[1].split(' to ')[0]) - 1;
        const finalPosition = parseInt(procedure.split(' from ')[1].split(' to ')[1]) - 1;

        const elementsToMove = [];
        for (let counter = 0; counter < iterations; counter++) {
          elementsToMove[iterations - 1 - counter] = stacks[startPosition].pop();
        }

        stacks[finalPosition] = stacks[finalPosition].concat(elementsToMove);
      }
    });
  };

  static getLastElementsFromStacks = stacks => {
    let result = '';
    stacks.forEach(stack => {
      result += stack[stack.length - 1];
    });

    return result;
  };
}

export default AOC;
