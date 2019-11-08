module.exports = (api, options) => {
  api.extendPackage({
    dependencies: {
      'unif-js': '^1.0.1',
    },
  });

  api.onCreateComplete(() => {
    const unifLines = `\nimport './plugins/unif-js.js';`;

    const fs = require('fs');
    const ext = api.hasPlugin('typescript') ? 'ts' : 'js';
    const mainPath = api.resolve(`./src/main.${ext}`);

    let contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' });
    const lines = contentMain.split(/\r?\n/g).reverse();

    const lastImportIndex = lines.findIndex(line => line.match(/^import/));
    lines[lastImportIndex] += unifLines;

    contentMain = lines.reverse().join('\n');
    fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' });
  });

  api.render('./template', {
    ...options,
  });
};
