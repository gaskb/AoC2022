import Utils from './utils';

class AOC {
  part1 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const startPosition = await AOC.getStartMessagePositionBySize(inputData, 4);

    console.log('startPosition = ', startPosition);
  };

  part2 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const startPosition = await AOC.getStartMessagePositionBySize(inputData, 14);

    console.log('startPosition = ', startPosition);
  };

  static getStartMessagePositionBySize = (signal, size) => {
    for (let position = 0; position < signal.length; position++) {
      const constEndPosition = position + size;
      const packet = signal.substring(position, constEndPosition);
      if (AOC.charInPacketAreAllDifferent(packet)) {
        return constEndPosition;
      }
    }
  };

  static charInPacketAreAllDifferent = packet => {
    for (let position = 0; position < packet.length; position++) {
      const char = packet[position];
      const re = new RegExp(char, 'g');

      if (packet.match(re).length > 1) {
        return false;
      }
    }
    return true;
  };
}

export default AOC;
