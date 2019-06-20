'use strict';

require('dotenv').config();

const fs = require('fs');
const Q = require('@nmq/q/client');

const alterFile = (file) => {
  readFileWrapper(file)
    .then(data => {
      writeFileWrapper(file, caps(data));
    })
    .then(() => {
      let message = {
        name: 'save',
        message: `File saved!`,
      };

      emitFileSave(message);
    })
    .catch(() => {
      let error = {
        name: 'error',
        message: 'ERROR: something went wrong',
      };
      Q.publish('files', 'error', JSON.stringify(error));
    });
};

let readFileWrapper = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile( file, (err, data) => {
      if(err) { 
        reject(err); 
      } else {
        resolve(data.toString());
      }
    });
  });
};

let caps = (data) => {
  return data.toUpperCase();
};

let emitFileSave = (payload) => {
  Q.publish('files', 'save', JSON.stringify(payload));
};

let writeFileWrapper = (file, text) => {
  return new Promise((resolve, reject) => {
    fs.writeFile( file, Buffer.from(text), (err) => {
      if(err) {
        reject(err); 
      } else {
        resolve(file);
      }
    });
  });
};

let file = process.argv.slice(2).shift();
alterFile(file);

module.exports = exports = {readFileWrapper, caps, writeFileWrapper};


