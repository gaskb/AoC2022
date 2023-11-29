import Utils from './utils';

class AOC {
  part1 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const inputRows = await Utils.getDataRows(inputData);

    const valves = AOC.getValves(inputRows);

    console.log('valves = ', valves);
  };

  part2 = async inputFile => {
    console.log('Still nothing to do ');
  };

  static getValves = inputRows => {
    const valves = [];
    inputRows.forEach(valveRow => {
      const valveRowArray = valveRow.split(' has flow rate=');
      console.log('valveRowArray', valveRowArray);
      const valveName = valveRowArray[0].split(' ')[1];
      const valveFlowRate = valveRowArray[1].split(';')[0];
      let valveExits;

      try {
        valveExits = valveRowArray[1].split('tunnels lead to valves ')[1].split(', ');
      } catch (e) {
        valveExits = valveRowArray[1].split('tunnel leads to valve ')[1].split(', ');
      }

      valves.push({ valveName, valveFlowRate, valveExits, visited: false, open: false });
    });
    return valves;
  };
}

export default AOC;
