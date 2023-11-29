import Utils from './utils';
const fs = require('fs/promises');

class AOC {
  part1 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const inputDataArray = await Utils.getDataRows(inputData);

    const ropeHeadPositions = [];
    const ropeTailPositions = [];

    ropeHeadPositions.push([0, 0]);
    ropeTailPositions.push([0, 0]);

    let counter = 0;
    inputDataArray.forEach(instruction => {
      const direction = instruction.split(' ')[0];
      const steps = instruction.split(' ')[1];
      for (let step = 0; step < steps; step++) {
        const ropeHeadPosition = ropeHeadPositions[counter];
        const newRopeHeadPosition = AOC.moveRopeHead(ropeHeadPosition, direction);
        ropeHeadPositions.push(newRopeHeadPosition);
        const ropeTailPosition = ropeTailPositions[counter];
        const newRopeTailPosition = AOC.moveRopeNode(ropeTailPosition, newRopeHeadPosition);
        ropeTailPositions.push(newRopeTailPosition);
        counter++;
      }
    });

    const distinctPosition = AOC.countTailPositions(ropeTailPositions);
    console.log('distinctPosition = ', distinctPosition);
  };

  part2 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const inputDataArray = await Utils.getDataRows(inputData);

    const rope = [];
    const ropeSize = 10;

    const ropeMap = [];
    const mapSize = { x: 420, y: 210 };

    const coordLimits = { minX: 1000, maxX: 0, minY: 1000, maxY: 0 };

    for (let ropeCount = 0; ropeCount < ropeSize; ropeCount++) {
      rope[ropeCount] = [];
      rope[ropeCount].push([80, 200]);

      ropeMap[ropeCount] = [];

      for (let xCount = 0; xCount < mapSize.x; xCount++) {
        ropeMap[ropeCount][xCount] = [];

        for (let yCount = 0; yCount < mapSize.y; yCount++) {
          ropeMap[ropeCount][xCount][yCount] = ' ';
        }
      }
    }

    let counter = 0;
    inputDataArray.forEach(instruction => {
      const direction = instruction.split(' ')[0];
      const steps = instruction.split(' ')[1];
      for (let step = 0; step < steps; step++) {
        const ropeHeadPosition = rope[0][counter];
        const newRopeHeadPosition = AOC.moveRopeHead(ropeHeadPosition, direction);
        rope[0].push(newRopeHeadPosition);
        AOC.makeMapForRope(ropeMap[0], newRopeHeadPosition);
        AOC.findMinAndMaxCoordinates(newRopeHeadPosition, coordLimits);

        for (let ropeCount = 1; ropeCount < ropeSize; ropeCount++) {
          const previousNodePosition = rope[ropeCount - 1][counter + 1];
          const ropePosition = rope[ropeCount][counter];
          const newRopeNodePosition = AOC.moveRopeNode(ropePosition, previousNodePosition);
          rope[ropeCount].push(newRopeNodePosition);

          AOC.makeMapForRope(ropeMap[ropeCount], newRopeNodePosition);
        }

        counter++;
      }
    });

    for (let ropeCount = 0; ropeCount < ropeSize; ropeCount++) {
      AOC.writeMapOnFile(ropeMap[ropeCount], 'ropeMap['.concat(ropeCount, '].txt'));
    }

    const distinctPosition = AOC.countTailPositions(rope[9]);
    console.log('distinctPosition = ', distinctPosition);

    console.log('coord limits = ', coordLimits);
  };

  static countTailPositions = ropeTailPositions => {
    const distinctTailPositions = [];

    ropeTailPositions.forEach(position => {
      const positionString = position.join(',');
      if (!distinctTailPositions.includes(positionString)) {
        distinctTailPositions.push(positionString);
      }
    });

    return distinctTailPositions.length;
  };

  static moveRopeHead = (startPosition, direction) => {
    const finalPosition = JSON.parse(JSON.stringify(startPosition));

    switch (direction) {
      case 'R':
        finalPosition[1]++;
        break;
      case 'U':
        finalPosition[0]++;
        break;
      case 'L':
        finalPosition[1]--;
        break;
      case 'D':
        finalPosition[0]--;
        break;

      default:
        break;
    }

    return finalPosition;
  };

  static moveRopeNode = (startNodePosition, previousNodePosition) => {
    const nodePosition = JSON.parse(JSON.stringify(startNodePosition));
    if (
      Math.abs(startNodePosition[0] - previousNodePosition[0]) > 1 ||
      Math.abs(startNodePosition[1] - previousNodePosition[1]) > 1
    ) {
      if (startNodePosition[0] - previousNodePosition[0] > 0) {
        nodePosition[0]--;
      }
      if (startNodePosition[0] - previousNodePosition[0] < 0) {
        nodePosition[0]++;
      }
      if (startNodePosition[1] - previousNodePosition[1] > 0) {
        nodePosition[1]--;
      }
      if (startNodePosition[1] - previousNodePosition[1] < 0) {
        nodePosition[1]++;
      }
    }

    return nodePosition;
  };

  static writeMapOnFile = (ropeNodeMap, filename) => {
    fs.writeFile(
      filename,
      ropeNodeMap
        .map(function (v) {
          return v.join(',');
        })
        .join('\n'),
      { flag: 'a+' }
    );
  };

  static makeMapForRope = (ropeMap, newPosition) => {
    try {
      ropeMap[newPosition[0]][newPosition[1]] = 'X';
    } catch (e) {
      console.log('e - ', e.message);
      console.log('newPosition[0] = ', newPosition[0]);
      console.log('newPosition[1] = ', newPosition[1]);
    }
  };

  static findMinAndMaxCoordinates = (position, limits) => {
    if (position[0] > limits.maxX) {
      limits.maxX = position[0];
    }
    if (position[0] < limits.minX) {
      limits.minX = position[0];
    }
    if (position[1] > limits.maxY) {
      limits.maxY = position[1];
    }
    if (position[1] < limits.minY) {
      limits.minY = position[1];
    }
  };
}

export default AOC;
