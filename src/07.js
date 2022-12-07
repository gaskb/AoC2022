import Utils from './utils';

class AOC {
  part1 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const rows = await Utils.getDataRows(inputData);
    const duResult = AOC.parseCommandAndResults(rows);
    const maxSize = 100000;
    const sum = AOC.getSumOfFolderSmallerThan(duResult, maxSize);

    console.log('sum = ', sum);
  };

  part2 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const rows = await Utils.getDataRows(inputData);
    const duResult = AOC.parseCommandAndResults(rows);
    const minSize = 30000000 - (70000000 - duResult['/']);
    const folderSize = AOC.getSmallestFolderBiggerThan(duResult, minSize);

    console.log('folderSize = ', folderSize);
  };

  static getSumOfFolderSmallerThan = (duResult, maxSize) => {
    let sum = 0;
    for (const key in duResult) {
      const folderSize = duResult[key];
      if (folderSize < maxSize) {
        sum += folderSize;
      }
    }

    return sum;
  };

  static getSmallestFolderBiggerThan = (duResult, minSize) => {
    let result = 0;
    for (const key in duResult) {
      const folderSize = duResult[key];
      if (folderSize > minSize) {
        if (result === 0 || result > folderSize) {
          result = folderSize;
        }
      }
    }
    return result;
  };

  static parseCommandAndResults = rows => {
    const duResult = {};
    const currentPath = [];

    rows.forEach(row => {
      const rowArray = row.split(' ');

      if (AOC.isRowACommand(row)) {
        if (!AOC.isCommandAnLs(rowArray)) {
          // is a "cd"
          const newPath = rowArray[2];
          if (AOC.isCdMoveOut(rowArray)) {
            currentPath.pop();
          } else {
            // is move in
            AOC.addDirToDuResultArray(duResult, currentPath, newPath);

            currentPath.push(newPath);
          }
        }
      } else {
        // row is part of a list
        if (!AOC.isRowADir(rowArray)) {
          AOC.addCurrentSizeToDuResultArray(duResult, currentPath, rowArray[0]);
        }
      }
    });

    return duResult;
  };

  static addDirToDuResultArray = (duResult, currentPath, newPath) => {
    let currentPathString = '';
    currentPath.forEach(path => {
      if (path !== '/') {
        currentPathString = currentPathString.concat('/', path);
      }
    });
    if (newPath === '/') {
      currentPathString = '/';
    } else {
      currentPathString = currentPathString.concat('/', newPath);
    }
    duResult[currentPathString] = 0;
  };

  static addCurrentSizeToDuResultArray = (duResult, currentPath, currentFileSize) => {
    currentFileSize = parseInt(currentFileSize);
    duResult['/'] += currentFileSize;
    let currentPathString = '';
    currentPath.forEach(path => {
      if (path !== '/') {
        currentPathString = currentPathString.concat('/', path);
      }
      if (currentPathString !== '') {
        duResult[currentPathString] += currentFileSize;
      }
    });
  };

  // first try: unused but interesting
  static addDirToDuResultObject = (duResult, currentPath, newPath) => {
    let tmpPath = duResult;
    currentPath.forEach(path => {
      tmpPath = tmpPath[path];
    });
    tmpPath[newPath] = {};
  };

  // first try: unused but interesting
  static addCurrentSizeToDuResultObject = (duResult, currentPath, currentFileSize) => {
    currentFileSize = parseInt(currentFileSize);
    let tmpPath = duResult;
    if (!tmpPath.size) {
      tmpPath.size = currentFileSize;
    } else {
      tmpPath.size = tmpPath.size + currentFileSize;
    }
    currentPath.forEach(path => {
      tmpPath = tmpPath[path];
      if (!tmpPath.size) {
        tmpPath.size = 0;
      }
      tmpPath.size = tmpPath.size + currentFileSize;
    });
  };

  static isRowADir = rowArray => {
    if (rowArray[0] === 'dir') {
      return true;
    }
    return false;
  };

  static isRowACommand = row => {
    if (row[0] === '$') {
      return true;
    }
    return false;
  };

  static isCommandAnLs = rowArray => {
    if (rowArray[1] === 'ls') {
      return true;
    }
    return false;
  };

  static isRowADirectory = rowArray => {
    if (rowArray[0] === 'dir') {
      return true;
    }
    return false;
  };

  static isCdMoveOut = rowArray => {
    if (rowArray[2] === '..') {
      return true;
    }
    return false;
  };
}

export default AOC;
