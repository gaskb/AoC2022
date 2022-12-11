const fs = require('fs/promises');
class Cpu {
  constructor() {
    this.program = [];
    this.log = [];
    this.cpuClock = 0;
    this.programRowCounter = 0;
    this.register = 1;
  }

  executeProgram = () => {
    this.program.forEach(() => {
      this.executeInstruction();
      this.programRowCounter++;
    });
  };

  executeInstruction = () => {
    const { verb, noun } = this.program[this.programRowCounter];

    // console.log('verb = ', verb);
    // console.log('noun = ', noun);
    // console.log('register = ', this.register);

    switch (verb) {
      case 'noop':
        this.cpuClock++;
        this.log[this.cpuClock] = { counter: this.cpuClock, register: this.register, verb, noun };
        break;

      case 'addx':
        this.cpuClock++;
        this.log[this.cpuClock] = { counter: this.cpuClock, register: this.register, verb, noun };
        this.cpuClock++;
        this.register = this.register + parseInt(noun);
        this.log[this.cpuClock] = { counter: this.cpuClock, register: this.register, verb, noun };
        break;

      default:
        break;
    }
  };

  loadProgram = inputArray => {
    inputArray.forEach(row => {
      const rowArray = row.split(' ');
      const verb = rowArray[0];
      const noun = rowArray[1];

      const programRow = { verb, noun };

      this.program.push(programRow);
    });

    return this.program;
  };

  printScreenOnDisk = display => {
    fs.writeFile('display.txt', display.join('\n'), { flag: 'a+' });
  };
}

export default Cpu;
