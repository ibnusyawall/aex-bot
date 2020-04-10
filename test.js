var crypto = require('crypto');

const arr = []
//function code taken from http://blog.tompawlak.org/how-to-generate-random-values-nodejs-javascript
function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len).toUpperCase();   // return required number of characters
}

var string = randomValueHex(4)+"-"+randomValueHex(4)+"-"+randomValueHex(4);

for (a=1; a <= 1;  a++){
  for (b=1; b <= 2; b++) {
//    arr.push(string)
  }
  arr.push(string)
}
console.log(arr);
