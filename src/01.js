import Utils from './utils';

class AOC {
  part1 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const caloriesArray = AOC.getElvesCalories(await Utils.getDataRows(inputData));

    caloriesArray.sort(Utils.compareNumbersDesc);

    console.log('Max Calories = ', caloriesArray[0]);
  };

  part2 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const caloriesArray = AOC.getElvesCalories(await Utils.getDataRows(inputData));

    caloriesArray.sort(Utils.compareNumbersDesc);

    console.log('sum = ', caloriesArray[0] + caloriesArray[1] + caloriesArray[2]);
  };

  static getElvesCalories = inputDataArray => {
    const elvesCaloriesArray = [];
    elvesCaloriesArray[0] = 0;
    let elvesCounter = 0;
    inputDataArray.forEach(fruitCalories => {
      if (isNaN(parseInt(fruitCalories))) {
        elvesCounter++;
        elvesCaloriesArray[elvesCounter] = 0;
      } else {
        elvesCaloriesArray[elvesCounter] += parseInt(fruitCalories);
      }
    });
    return elvesCaloriesArray;
  };
}

export default AOC;
