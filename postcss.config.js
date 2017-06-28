const { resolve } = require('path');

module.exports = {
  plugins: [
    require('postcss-import')({
      path: [resolve(process.cwd(), 'client', 'styles')],
    }),
    require('postcss-cssnext')(),
  ],
};
