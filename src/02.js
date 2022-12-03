import Utils from './utils';

class AOC {
  part1 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const matchScore = AOC.getMatchScore(await Utils.getDataRows(inputData));

    console.log('matchScore = ', matchScore);
  };

  part2 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const matchScore = AOC.getRoundMoves(await Utils.getDataRows(inputData));

    console.log('matchScore = ', matchScore);
  };

  static getMatchScore = inputDataArray => {
    let matchScore = 0;
    inputDataArray.forEach(round => {
      matchScore += AOC.getRoundScore(round);
    });
    return matchScore;
  };

  static getRoundScore = round => {
    let roundScore = 0;

    const roundMoves = round.split(' ');
    switch (roundMoves[0]) {
      case 'A':
        // rock
        switch (roundMoves[1]) {
          case 'X':
            // rock
            roundScore += 1;
            roundScore += 3;

            break;
          case 'Y':
            roundScore += 2;
            roundScore += 6;
            // paper
            break;
          case 'Z':
            roundScore += 3;
            roundScore += 0;
            // scissor
            break;

          default:
            break;
        }
        break;
      case 'B':
        // paper
        switch (roundMoves[1]) {
          case 'X':
            // rock
            roundScore += 1;
            roundScore += 0;

            break;
          case 'Y':
            roundScore += 2;
            roundScore += 3;
            // paper
            break;
          case 'Z':
            roundScore += 3;
            roundScore += 6;
            // scissor
            break;

          default:
            break;
        }
        break;
      case 'C':
        // scissor
        switch (roundMoves[1]) {
          case 'X':
            // rock
            roundScore += 1;
            roundScore += 6;
            break;
          case 'Y':
            roundScore += 2;
            roundScore += 0;
            // paper
            break;
          case 'Z':
            roundScore += 3;
            roundScore += 3;
            // scissor
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }

    return roundScore;
  };

  static getRoundMoves = inputDataArray => {
    let matchScore = 0;
    inputDataArray.forEach(round => {
      matchScore += AOC.getRoundMove(round);
    });
    return matchScore;
  };

  static getRoundMove = round => {
    let roundScore = 0;

    const roundMoves = round.split(' ');
    switch (roundMoves[0]) {
      case 'A':
        // rock
        switch (roundMoves[1]) {
          case 'X':
            // lose
            roundScore += 0;
            // use scissor
            roundScore += 3;
            break;
          case 'Y':
            // draw
            roundScore += 3;
            // use rock
            roundScore += 1;

            break;
          case 'Z':
            // win
            roundScore += 6;
            // use paper
            roundScore += 2;
            break;

          default:
            break;
        }
        break;
      case 'B':
        // paper
        switch (roundMoves[1]) {
          case 'X':
            // lose
            roundScore += 0;
            // use rock
            roundScore += 1;

            break;
          case 'Y':
            // draw
            roundScore += 3;
            // use paper
            roundScore += 2;
            break;
          case 'Z':
            // win
            roundScore += 6;
            // use scissor
            roundScore += 3;

            break;

          default:
            break;
        }
        break;
      case 'C':
        // scissor
        switch (roundMoves[1]) {
          case 'X':
            // lose
            roundScore += 0;
            // use paper
            roundScore += 2;

            break;
          case 'Y':
            // draw
            roundScore += 3;
            // use scissor
            roundScore += 3;

            break;
          case 'Z':
            // win
            roundScore += 6;
            // use rock
            roundScore += 1;

            break;

          default:
            break;
        }
        break;

      default:
        break;
    }

    return roundScore;
  };
}

export default AOC;
