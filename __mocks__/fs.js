'use strict';

module.exports = exports = {};

exports.readFile = (file, cb) => {
  if( (!file) || file.match(/bad/i) ){
    cb('Invalid file');
  }else{
    // Need to check return from docs to see appropriate return
    cb(undefined, new Buffer('file contents'));
  }
};

exports.writeFile = (file, text, cb) => {
  if( (!file) || file.match(/bad/i) ){
    cb('Invalid file');
  }else{
    // on success, writeFile does not give me data
    cb(undefined, undefined);
  }
};
