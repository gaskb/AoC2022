const fs = require('fs');

class Utils {
  static getInputData = async inputFile => {
    const inputData = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
      if (err) {
        return console.log(err);
      }
    });

    return inputData;
  };

  static getDataRows = async inputdata => {
    return inputdata.split('\n');
  };
}

export default Utils;
