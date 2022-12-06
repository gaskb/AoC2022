// import './appenv';
import AOC from './06';

async function startAoc() {
  const aoc = new AOC();
  const input = 'input/06_1.txt';
  const input2 = 'input/06_1.txt';
  await aoc.part1(input);
  await aoc.part2(input2);
}

startAoc();
