// import './appenv';
import AOC from './14';

async function startAoc() {
  const aoc = new AOC();
  const input = 'input/14_1.txt';
  const input2 = 'input/14_2.txt';
  await aoc.part1(input);
  await aoc.part2(input2);
}

startAoc();
