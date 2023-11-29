import Utils from './utils';

class AOC {
  part1 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const { treeMap, invertedTreeMap } = await AOC.readTreeMap(inputData);
    const visibleTrees = AOC.howManyTreesAreVisible(treeMap, invertedTreeMap);

    console.log('visibleTrees = ', visibleTrees);
  };

  part2 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const { treeMap, invertedTreeMap } = await AOC.readTreeMap(inputData);
    const maxScenicScore = AOC.getMaxScenicScore(treeMap, invertedTreeMap);

    console.log('maxScenicScore = ', maxScenicScore);
  };

  static readTreeMap = async inputData => {
    const rows = await Utils.getDataRows(inputData);

    const treeMap = [];
    const invertedTreeMap = [];

    for (let rowCount = 0; rowCount < rows.length; rowCount++) {
      const row = rows[rowCount];
      treeMap[rowCount] = [];
      for (let columnCount = 0; columnCount < row.length; columnCount++) {
        const treeHeight = row[columnCount];
        treeMap[rowCount][columnCount] = treeHeight;

        if (!invertedTreeMap[columnCount]) {
          invertedTreeMap[columnCount] = [];
        }

        invertedTreeMap[columnCount][rowCount] = treeHeight;
      }
    }
    return { treeMap, invertedTreeMap };
  };

  static howManyTreesAreVisible = (treeMap, invertedTreeMap) => {
    let visibleTreeCounter = 0;
    const visibilityMap = [];
    for (let rowCount = 0; rowCount < treeMap.length; rowCount++) {
      visibilityMap[rowCount] = [];
      for (let columnCount = 0; columnCount < treeMap[0].length; columnCount++) {
        visibilityMap[rowCount][columnCount] = ' ';
      }
    }
    for (let rowCount = 0; rowCount < treeMap.length; rowCount++) {
      for (let columnCount = 0; columnCount < treeMap[0].length; columnCount++) {
        let isVisible = true;
        const treeHeight = parseInt(treeMap[rowCount][columnCount]);

        const visibleFromLeft = AOC.isTreeVisibleFromLeft(treeMap, rowCount, columnCount, treeHeight);
        if (!visibleFromLeft) {
          const visibleFromRight = AOC.isTreeVisibleFromRight(treeMap, rowCount, columnCount, treeHeight);
          if (!visibleFromRight) {
            const visibleFromTop = AOC.isTreeVisibleFromLeft(invertedTreeMap, columnCount, rowCount, treeHeight);
            if (!visibleFromTop) {
              const visibleFromBottom = AOC.isTreeVisibleFromRight(invertedTreeMap, columnCount, rowCount, treeHeight);
              if (!visibleFromBottom) {
                isVisible = false;
              }
            }
          }
        }
        if (isVisible) {
          visibilityMap[rowCount][columnCount] = 'X';
          visibleTreeCounter++;
        }
      }
    }

    // console.log(visibilityMap);
    return visibleTreeCounter;
  };

  static isTreeVisibleFromLeft = (treeMap, rowIndex, columnIndex, treeHeight) => {
    const row = treeMap[rowIndex];
    let maxTreeHeight = 0;

    if (columnIndex === 0) {
      return true;
    }

    for (let columnCounter = 0; columnCounter < columnIndex; columnCounter++) {
      const tmpTreeHeight = row[columnCounter];

      if (maxTreeHeight >= treeHeight || tmpTreeHeight >= treeHeight) {
        return false;
      }

      if (tmpTreeHeight > maxTreeHeight) {
        maxTreeHeight = tmpTreeHeight;
      }
    }
    return true;
  };

  static isTreeVisibleFromRight = (treeMap, rowIndex, columnIndex, treeHeight) => {
    if (columnIndex === treeMap[0].length - 1) {
      // console.log('first return true');
      return true;
    }
    const row = treeMap[rowIndex];
    let maxTreeHeight = 0;

    // console.log('row = ', row);

    for (let columnCounter = row.length - 1; columnCounter > columnIndex; columnCounter--) {
      const tmpTreeHeight = row[columnCounter];
      // console.log('rowIndex ', rowIndex);
      // console.log('columnCounter ', columnCounter);
      // console.log('tmpTreeHeight ', tmpTreeHeight);
      // console.log('maxTreeHeight ', maxTreeHeight);

      if (maxTreeHeight >= treeHeight || tmpTreeHeight >= treeHeight) {
        return false;
      }

      if (tmpTreeHeight > maxTreeHeight) {
        maxTreeHeight = tmpTreeHeight;
      }
    }
    return true;
  };

  static getMaxScenicScore = (treeMap, invertedTreeMap) => {
    let maxScenicScore = 0;
    for (let rowCount = 0; rowCount < treeMap.length; rowCount++) {
      for (let columnCount = 0; columnCount < treeMap[0].length; columnCount++) {
        const scenicScore = AOC.getScenicScoreForTree(treeMap, invertedTreeMap, rowCount, columnCount);
        if (scenicScore > maxScenicScore) {
          maxScenicScore = scenicScore;
        }
      }
    }

    return maxScenicScore;
  };

  static getScenicScoreForTree = (treeMap, invertedTreeMap, rowIndex, columnIndex) => {
    const leftScenicScore = AOC.getLeftScenicScoreForTree(treeMap, rowIndex, columnIndex);
    const rightScenicScore = AOC.getRightScenicScoreForTree(treeMap, rowIndex, columnIndex);
    const upScenicScore = AOC.getUpScenicScoreForTree(invertedTreeMap, rowIndex, columnIndex);
    const downScenicScore = AOC.getDownScenicScoreForTree(invertedTreeMap, rowIndex, columnIndex);

    const scenicScore = leftScenicScore * rightScenicScore * upScenicScore * downScenicScore;

    return scenicScore;
  };

  static getLeftScenicScoreForTree = (treeMap, rowIndex, columnIndex) => {
    const treeHeight = treeMap[rowIndex][columnIndex];

    if (columnIndex === 0) {
      return 0;
    }

    let treeCounter = 0;

    for (let columnCounter = columnIndex - 1; columnCounter >= 0; columnCounter--) {
      treeCounter++;
      const tmpTreeHeight = treeMap[rowIndex][columnCounter];

      if (tmpTreeHeight >= treeHeight) {
        break;
      }
    }
    return treeCounter;
  };

  static getRightScenicScoreForTree = (treeMap, rowIndex, columnIndex) => {
    const treeHeight = treeMap[rowIndex][columnIndex];

    if (columnIndex === treeMap.length - 1) {
      return 0;
    }

    let treeCounter = 0;

    for (let columnCounter = columnIndex + 1; columnCounter < treeMap[rowIndex].length; columnCounter++) {
      treeCounter++;
      const tmpTreeHeight = treeMap[rowIndex][columnCounter];

      if (tmpTreeHeight >= treeHeight) {
        break;
      }
    }
    return treeCounter;
  };

  static getUpScenicScoreForTree = (invertedTreeMap, rowIndex, columnIndex) => {
    // use invertedMap: call getLeftScenicScoreForTree with inverted x and Y
    return AOC.getLeftScenicScoreForTree(invertedTreeMap, columnIndex, rowIndex);
  };

  static getDownScenicScoreForTree = (invertedTreeMap, rowIndex, columnIndex) => {
    // use invertedMap: call getLeftScenicScoreForTree with inverted x and Y
    return AOC.getRightScenicScoreForTree(invertedTreeMap, columnIndex, rowIndex);
  };
}

export default AOC;
