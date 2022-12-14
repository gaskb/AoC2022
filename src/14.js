import Utils from './utils';
const fs = require('fs/promises');

class AOC {
  part1 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const inputRows = await Utils.getDataRows(inputData);
    const { min, max } = AOC.getMinMaxCoordinates(inputRows);
    const scanMap = AOC.initScan(min, max);
    // AOC.printScanMapOnFile(scanMap);

    AOC.drawStructures(scanMap, inputRows, min, max);
    AOC.drawStartPoint(scanMap, min);
    // AOC.printScanMapOnFile(scanMap, 'map2.txt');

    let allSandRest = true;
    let counter = 0;
    while (allSandRest) {
      allSandRest = AOC.dropSand(scanMap, min, max);
      counter++;
    }
    // AOC.printScanMapOnFile(scanMap, 'map3.txt');

    console.log('counter = ', counter - 1);
  };

  part2 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const inputRows = await Utils.getDataRows(inputData);
    const { min, max } = AOC.getMinMaxCoordinates(inputRows);
    const scanMap = AOC.initScan(min, max);

    AOC.printScanMapOnFile(scanMap);

    AOC.drawStructures(scanMap, inputRows, min, max);
    AOC.drawStartPoint(scanMap, min);
    // AOC.printScanMapOnFile(scanMap, 'map4.txt');

    let allSandRest = true;
    let counter = 0;
    while (allSandRest) {
      allSandRest = AOC.dropSand(scanMap, min, max);
      counter++;
    }
    // AOC.printScanMapOnFile(scanMap, 'map5.txt');

    console.log('counter = ', counter);
  };

  static dropSand = (scanMap, min, max) => {
    let sandX = 500 - min.x + 1;
    let sandY = 0;
    try {
      let sandRest = false;
      while (sandY < max.y + 1 && !sandRest) {
        if (scanMap[sandY + 1][sandX] === '.') {
          sandY++;
        } else {
          if (scanMap[sandY + 1][sandX - 1] === '.') {
            sandY++;
            sandX--;
          } else {
            if (scanMap[sandY + 1][sandX + 1] === '.') {
              sandY++;
              sandX++;
            } else {
              if (scanMap[sandY][sandX] === '.') {
                scanMap[sandY][sandX] = 'O';
                sandRest = true;
              } else {
                return false;
              }
            }
          }
        }
      }
      if (!sandRest) {
        return false;
      }

      return true;
    } catch (e) {
      console.log('sand stop : ', sandX, ' - ', sandY);
      return false;
    }
  };

  static drawStartPoint = (scanMap, min) => {
    scanMap[0][500 - min.x + 1] = '+';
  };

  static drawStructures = (scanMap, inputRows, min, max) => {
    for (let index = 0; index < inputRows.length; index++) {
      AOC.drawStructure(scanMap, inputRows[index], min, max);
    }
  };

  static drawStructure = (scanMap, structure, min, max) => {
    const structureArray = structure.split(' -> ');

    for (let index = 0; index < structureArray.length - 1; index++) {
      const point1 = structureArray[index].split(',').map(x => parseInt(x));
      const point2 = structureArray[index + 1].split(',').map(x => parseInt(x));

      point1[0] = point1[0] - min.x + 1;
      point2[0] = point2[0] - min.x + 1;

      AOC.drawRocks(scanMap, point1, point2);
    }
  };

  static drawRocks = (scanMap, point1, point2) => {
    const startPoint = {};
    const endPoint = {};

    if (point1[0] < point2[0] || point1[1] < point2[1]) {
      startPoint.x = point1[0];
      startPoint.y = point1[1];
      endPoint.x = point2[0];
      endPoint.y = point2[1];
    } else {
      startPoint.x = point2[0];
      startPoint.y = point2[1];
      endPoint.x = point1[0];
      endPoint.y = point1[1];
    }

    for (let y = startPoint.y; y <= endPoint.y; y++) {
      for (let x = startPoint.x; x <= endPoint.x; x++) {
        scanMap[y][x] = '#';
      }
    }

    scanMap[startPoint.y][startPoint.x] = '#';
    scanMap[endPoint.y][endPoint.x] = '#';

    // console.log(' ');
  };

  static initScan = (min, max) => {
    const scanMap = [];
    for (let y = 0; y < max.y + 1; y++) {
      scanMap[y] = [];
      for (let x = 0; x < max.x - min.x + 2; x++) {
        scanMap[y][x] = '.';
      }
    }

    return scanMap;
  };

  static printScanMap = scanMap => {
    scanMap.forEach(row => {
      console.log(row, 0, 3);
    });
  };

  static printScanMapOnFile = (scanMap, filename = 'map.txt') => {
    fs.writeFile(
      filename,
      scanMap
        .map(function (v) {
          return v.join(' ');
        })
        .join('\n'),
      { flag: 'w' }
    );
  };

  static getMinMaxCoordinates = inputRows => {
    let minX = 1000;
    let maxX = 0;
    let minY = 1000;
    let maxY = 0;
    inputRows.forEach(row => {
      const rowArray = row.split(' -> ');
      rowArray.forEach(dot => {
        const dotArray = dot.split(',').map(x => parseInt(x));

        if (dotArray[1] > maxY) {
          maxY = dotArray[1];
        }
        if (dotArray[1] < minY) {
          minY = dotArray[1];
        }
        if (dotArray[0] > maxX) {
          maxX = dotArray[0];
        }
        if (dotArray[0] < minX) {
          minX = dotArray[0];
        }
      });
    });

    return { min: { x: minX, y: minY }, max: { x: maxX, y: maxY } };
  };
}

export default AOC;
