class Monkey {
  constructor(operation, operand, testDivision, testTrueDestination, testFalseDestination) {
    this.items = [];
    this.operation = operation;
    this.operand = operand;
    this.testDivision = testDivision;
    this.testTrueDestination = testTrueDestination;
    this.testFalseDestination = testFalseDestination;
    this.businessLevel = 0;
  }

  static createMonkeys = inputRows => {
    const monkeys = [];

    inputRows.forEach(row => {
      if (row.startsWith('Monkey')) {
        monkeys.push(new Monkey());
      }

      if (row.includes('Starting items')) {
        const items = [];
        const itemsString = row.split('items: ')[1];
        itemsString.split(', ').forEach(item => {
          items.push(parseInt(item));
        });
        monkeys[monkeys.length - 1].items = items;
      }

      if (row.includes('Operation')) {
        const operation = row.split(' = ')[1].split(' ')[1];
        const operand = row.split(' = ')[1].split(' ')[2];
        monkeys[monkeys.length - 1].operation = operation;
        monkeys[monkeys.length - 1].operand = operand;
      }

      if (row.includes('Test')) {
        const testDivision = parseInt(row.split(' by ')[1]);
        monkeys[monkeys.length - 1].testDivision = testDivision;
      }

      if (row.includes('If true')) {
        const testTrueDestination = parseInt(row.split(' monkey ')[1]);
        monkeys[monkeys.length - 1].testTrueDestination = testTrueDestination;
      }

      if (row.includes('If false')) {
        const testFalseDestination = parseInt(row.split(' monkey ')[1]);
        monkeys[monkeys.length - 1].testFalseDestination = testFalseDestination;
      }
    });

    return monkeys;
  };

  static playRound = monkeys => {
    for (let monkeyId = 0; monkeyId < monkeys.length; monkeyId++) {
      const monkey = monkeys[monkeyId];
      const items = monkey.items;

      while (items.length > 0) {
        let item = items.pop();
        let operand;
        if (isNaN(parseInt(monkey.operand))) {
          operand = item;
        } else {
          operand = parseInt(monkey.operand);
        }

        if (monkey.operation === '+') {
          item = item + operand;
        } else {
          item = item * operand;
        }

        const boredItem = Math.floor(item / 3);

        if (boredItem % monkey.testDivision === 0) {
          monkeys[monkey.testTrueDestination].items.unshift(boredItem);
        } else {
          monkeys[monkey.testFalseDestination].items.unshift(boredItem);
        }

        monkey.businessLevel++;
      }
    }
  };

  static playUpdatedRound = (monkeys, divisor) => {
    for (let monkeyId = 0; monkeyId < monkeys.length; monkeyId++) {
      const monkey = monkeys[monkeyId];
      const items = monkey.items;

      while (items.length > 0) {
        let item = items.pop();
        let operand;
        if (isNaN(parseInt(monkey.operand))) {
          operand = item;
        } else {
          operand = parseInt(monkey.operand);
        }

        if (monkey.operation === '+') {
          item = item + operand;
        } else {
          item = item * operand;
        }

        item = item % divisor;

        if (item % monkey.testDivision === 0) {
          monkeys[monkey.testTrueDestination].items.push(item);
        } else {
          monkeys[monkey.testFalseDestination].items.push(item);
        }

        monkey.businessLevel++;
      }
    }
  };
}

export default Monkey;
