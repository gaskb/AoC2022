// import './appenv';
import AOC from './09';

async function startAoc() {
  const aoc = new AOC();
  const input = 'input/09_1.txt';
  const input2 = 'input/09_1.txt';
  await aoc.part1(input);
  await aoc.part2(input2);
}

startAoc();
