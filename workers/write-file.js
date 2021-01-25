const { writeFile } = require('fs');
const { resolve } = require('path');
const moment = require('moment');
const mkdirp = require('mkdirp')

const SANDBOX = '/data';

module.exports = function(opts) {
  mkdirp(SANDBOX).then(function() {
    const fullPath = resolve(SANDBOX, moment().valueOf().toString());

    writeFile(fullPath, opts.body, function(error) {
      if (error != null) {
        console.log(`Error saving ${ opts.body }`);
        console.log(error);

        return;
      }

      console.log(`Saved ${ fullPath }`);
    });
  });
};
