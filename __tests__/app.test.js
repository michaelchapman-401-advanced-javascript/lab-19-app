'use strict';

let app = require('../app.js');

jest.mock('fs');

// We want to spy on the emi function from socket.io-client
// When you call the emit function on the socket.io-client library, console.log 'foobar'
// Whenever a socket emits it runs this code

describe('app', () => {
  describe('readFileWrapper()', () => {
    it('Should return file data', () => {
      // arrange
      let file = 'file.txt';

      // act
      return app.readFileWrapper(file)
        .then(data => {
          // assert
          expect(data).toBeTruthy();
        });      
    });

    it('Should return error if given a bad file', () => {
      // arrange
      let file = 'bad.txt';

      // act
      return app.readFileWrapper(file)
        .then(data => {
          // assert
          expect(data).toBeUndefined();
        })
        .catch(err => {
          expect(err).toBeTruthy();
        });
    });
  });

  describe('writeFileWrapper()', () => {
    it('Should resolve file', () => {
      // arrange
      let str = 'string';
      let buffer = Buffer.from(str);

      // act
      return app.writeFileWrapper('foo.txt', buffer)
        .then(data => {
          // assert
          console.log(data);
          expect(data).toBeTruthy();
        })
        .catch(err => {
          expect(err).toBeUndefined();
        });      
    });
  });

  it('Should reject the error if given bad file name', () => {
    // arrange
    let file = 'bad.txt';
    let str = 'string';
    let buffer = Buffer.from(str);

    // act
    app.writeFileWrapper(file, buffer)
      .then(data => {
        expect(data).toBeUndefined();
      })
      .catch(err => {
        // assert
        expect(err).toBeDefined();
      });
  });

  describe('caps()', () => {
    it('Should take data and return that data all caps', () => {
      // arrange
      let data = 'abcd';
      
      // act
      let result = app.caps(data);

      // assert
      expect(result).toEqual('ABCD');
    });
  });
});