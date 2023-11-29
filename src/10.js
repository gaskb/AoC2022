import Utils from './utils';
import Cpu from './cpu/Cpu';

class AOC {
  part1 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const cpu = new Cpu();
    cpu.loadProgram(await Utils.getDataRows(inputData));
    // console.log('program = ', cpu.program);
    cpu.executeProgram();

    // console.log('log = ', cpu.log);
    const signalStrength = [];
    signalStrength.push(parseInt(cpu.log[19].register) * 20);
    signalStrength.push(parseInt(cpu.log[59].register) * 60);
    signalStrength.push(parseInt(cpu.log[99].register) * 100);
    signalStrength.push(parseInt(cpu.log[139].register) * 140);
    signalStrength.push(parseInt(cpu.log[179].register) * 180);
    signalStrength.push(parseInt(cpu.log[219].register) * 220);

    const sum =
      signalStrength[0] +
      signalStrength[1] +
      signalStrength[2] +
      signalStrength[3] +
      signalStrength[4] +
      signalStrength[5];

    console.log('sum = ', sum);
  };

  part2 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const cpu = new Cpu();
    cpu.loadProgram(await Utils.getDataRows(inputData));
    // console.log('program = ', cpu.program);
    cpu.executeProgram();

    const displayRows = 6;
    const displayColumns = 40;

    const display = [];

    // init display
    for (let rowCounter = 0; rowCounter < displayRows; rowCounter++) {
      display[rowCounter] = [];
      for (let columnCounter = 0; columnCounter < displayColumns; columnCounter++) {
        display[rowCounter][columnCounter] = ' ';
      }
    }

    let drawingRow = 0;
    let drawingColumn = 0;

    const spriteRow = 0;
    let spriteColumn = 0;

    for (let logCounter = 0; logCounter < cpu.log.length; logCounter++) {
      const register = cpu.log[logCounter]?.register ? cpu.log[logCounter].register : 0;

      // spriteRow = Math.floor(register / 40);
      spriteColumn = register % 40;

      console.log('logCounter', logCounter, ' ', register);
      console.log(
        'drawingColumn = ',
        drawingColumn,
        ' - spriteColumn = ',
        spriteColumn,
        ' - diff = ',
        Math.abs(spriteColumn - drawingColumn)
      );

      console.log('drawingRow = ', drawingRow, ' - spriteRow = ', spriteRow);

      if (Math.abs(spriteColumn - drawingColumn) < 2) {
        display[drawingRow][drawingColumn] = 'X';
      }

      drawingColumn++;
      if (drawingColumn >= 40) {
        drawingColumn = 0;
        drawingRow++;
      }
      console.log('');
    }

    console.log('display ', display);
    cpu.printScreenOnDisk(display);
  };
}

export default AOC;
