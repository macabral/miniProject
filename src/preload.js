const remote = require('electron')
var ar = remote.getGlobal('global').sharedObj
console.log(ar)