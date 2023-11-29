import Utils from './utils';

class AOC {
  part1 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const inputRows = await Utils.getDataRows(inputData);

    let emptyLocations = [];
    const min = { x: -10, y: -10 };
    const max = { x: 20, y: 20 };
    const myMap = Utils.initMap(min, max);

    const interestingRow = 10;
    inputRows.forEach(row => {
      const sensorCoord = AOC.getSensorCoordinatesFromRow(row);
      const beaconCoord = AOC.getBeaconCoordinatesFromRow(row);

      const newLocations = AOC.getEmptyCoordinatesForSensorForGivenY(sensorCoord, beaconCoord, interestingRow);
      emptyLocations = [...new Set([...emptyLocations, ...newLocations])];
    });

    inputRows.forEach(row => {
      const beaconCoord = AOC.getBeaconCoordinatesFromRow(row);
      // console.log('beaconCoord', beaconCoord);
      if (beaconCoord.y === interestingRow) {
        if (emptyLocations.includes(beaconCoord.x)) {
          const position = emptyLocations.indexOf(beaconCoord.x);
          console.log('position', position);
          emptyLocations.splice(position, 1);
        }
      }
    });

    console.log('emptyLocations =', emptyLocations);
    console.log('emptyLocations.length', emptyLocations.length);

    // Utils.printMapOnFile(myMap, 'final_map');

    // 4468985 too low
    // 4573065 too low
    // 5476560 too high
    // 5374697 wrong
  };

  part2 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const inputRows = await Utils.getDataRows(inputData);
    // const { sensorLimits, beaconLimits } = AOC.getMinMaxCoordinates(inputRows);

    // console.log('sensorLimits', sensorLimits);
    // console.log('beaconLimits', beaconLimits);

    // const min = { x: 0, y: 0 };
    // const max = { x: 20, y: 20 };
    // const myMap = Utils.initMap(min, max);

    // Utils.printMapOnFile(myMap, 'start_map');

    // AOC.getEmptyCoordinatesForSensor(myMap, { x: 10, y: 10 }, { x: 6, y: 6 });

    // Utils.printMapOnFile(myMap, 'final_map');
    // console.log(coords);
  };

  static getEmptyCoordinatesForSensor = (myMap, sensorCoord, beaconCoord) => {
    const manhattanDistance = AOC.getManhattanDistanceBetweenSensorAndBeacon(sensorCoord, beaconCoord);

    for (let x = sensorCoord.x - manhattanDistance; x <= sensorCoord.x + manhattanDistance; x++) {
      const distanceAvailableForY = manhattanDistance - Math.abs(sensorCoord.x - x);
      console.log('distanceAvailableForY = ', distanceAvailableForY);
      for (let y = sensorCoord.y - distanceAvailableForY; y <= sensorCoord.y + distanceAvailableForY; y++) {
        myMap[y][x] = 'X';
      }
      console.log('');
    }
  };

  static getEmptyCoordinatesForSensorForGivenY = (sensorCoord, beaconCoord, rowY) => {
    const manhattanDistance = AOC.getManhattanDistanceBetweenSensorAndBeacon(sensorCoord, beaconCoord);
    console.log('manhattanDistance = ', manhattanDistance);

    console.log('sensorCoord.y = ', sensorCoord.y);
    console.log('rowY = ', rowY);

    const emptyX = [];

    if (
      (sensorCoord.y < rowY && sensorCoord.y + manhattanDistance > rowY) ||
      (sensorCoord.y > rowY && sensorCoord.y - manhattanDistance < rowY) ||
      sensorCoord.y === rowY
    ) {
      const distanceAvailableForX = manhattanDistance - Math.abs(sensorCoord.y - rowY);
      // console.log('distanceAvailableForX = ', distanceAvailableForX);
      let counter = 0;
      for (let x = sensorCoord.x - distanceAvailableForX; x <= sensorCoord.x + distanceAvailableForX; x++) {
        if (counter > 2 * manhattanDistance + 10) {
          console.log('error');
          break;
        }
        counter++;
        if (counter % 10000 === 0) {
          // console.log('counter = ', counter);
        }

        // console.log('adding ', x);
        emptyX.push(x);
      }
    }
    console.log('');
    return emptyX;
  };

  static getManhattanDistanceBetweenSensorAndBeacon = (sensorCoord, beaconCoord) => {
    const manhattanDistance = Math.abs(sensorCoord.x - beaconCoord.x) + Math.abs(sensorCoord.y - beaconCoord.y);

    return manhattanDistance;
  };

  static getSensorCoordinatesFromRow = row => {
    const rowArray = row.split(': closest beacon is at x=');

    const sensorRawArray = rowArray[0].split('Sensor at ')[1].split(', y=');
    const sensorX = parseInt(sensorRawArray[0].split('x=')[1]);
    const sensorY = parseInt(sensorRawArray[1]);

    return { x: sensorX, y: sensorY };
  };

  static getBeaconCoordinatesFromRow = row => {
    const rowArray = row.split(': closest beacon is at x=');

    const beaconRawArray = rowArray[1].split(', y=');
    const beaconX = parseInt(beaconRawArray[0]);
    const beaconY = parseInt(beaconRawArray[1]);

    return { x: beaconX, y: beaconY };
  };

  static getMinMaxCoordinates = inputRows => {
    const sensorLimits = { min: { x: 100000, y: 10000 }, max: { x: 0, y: 0 } };
    const beaconLimits = { min: { x: 100000, y: 10000 }, max: { x: 0, y: 0 } };

    inputRows.forEach(row => {
      const rowArray = row.split(': closest beacon is at x=');

      const sensorRawArray = rowArray[0].split('Sensor at ')[1].split(', y=');
      const sensorX = parseInt(sensorRawArray[0].split('x=')[1]);
      const sensorY = parseInt(sensorRawArray[1]);

      const beaconRawArray = rowArray[1].split(', y=');
      const beaconX = parseInt(beaconRawArray[0]);
      const beaconY = parseInt(beaconRawArray[1]);

      if (sensorY > sensorLimits.max.y) {
        sensorLimits.max.y = sensorY;
      }
      if (sensorY < sensorLimits.min.y) {
        sensorLimits.min.y = sensorY;
      }
      if (sensorX > sensorLimits.max.x) {
        sensorLimits.max.x = sensorX;
      }
      if (sensorX < sensorLimits.min.x) {
        sensorLimits.min.x = sensorX;
      }

      if (beaconY > beaconLimits.max.y) {
        beaconLimits.max.y = beaconY;
      }
      if (beaconY < beaconLimits.min.y) {
        beaconLimits.min.y = beaconY;
      }
      if (beaconX > beaconLimits.max.x) {
        beaconLimits.max.x = beaconX;
      }
      if (beaconX < beaconLimits.min.x) {
        beaconLimits.min.x = beaconX;
      }
    });

    return { sensorLimits, beaconLimits };
  };
}

export default AOC;
