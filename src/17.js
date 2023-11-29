import Utils from './utils';

class AOC {
  part1 = async inputFile => {
    const inputData = await Utils.getInputData(inputFile);
    const movements = (await Utils.getDataRows(inputData))[0].split('');

    const inputShapes = await Utils.getInputData('input/17_shapes.txt');
    const inputShapesRows = await Utils.getDataRows(inputShapes);

    const shapes = AOC.getShapes(inputShapesRows);
    console.log('movements', movements);
    console.log('shapes', shapes);
    const tetrisMap = [];
    for (let index = 0; index < 10; index++) {
      AOC.addBlockToTetrisMap(tetrisMap, movements, shapes);
    }
  };

  part2 = async inputFile => {
    console.log('Still nothing to do ');
  };

  static addBlockToTetrisMap = (tetrisMap, movements, shapes) => {
    const usedRows = 0;

    for (let index = 0; index < movements.length - usedRows; index++) {
      let horizontalPosition = 10;
      const movement = movements[index];
      if (movement === '>') {
        horizontalPosition++;
      } else {
        horizontalPosition--;
      }

      const shape = Utils.deepCopyObj(shapes[index % 5]);
      for (let shapeRow = 0; shapeRow < shape.length; shapeRow++) {
        shape[shapeRow] = ' '.repeat(horizontalPosition) + shape[shapeRow];
      }

      console.log('shape = ', shape);
    }
  };

  static getShapes = inputShapesRows => {
    console.log('inputShapesRows', inputShapesRows);
    const shapes = [];
    let newShape = [];
    inputShapesRows.forEach(row => {
      if (row === '') {
        shapes.push(Utils.deepCopyObj(newShape));
        newShape = [];
      } else {
        newShape.push(row);
      }
    });

    shapes.push(Utils.deepCopyObj(newShape));

    return shapes;
  };
}

export default AOC;
