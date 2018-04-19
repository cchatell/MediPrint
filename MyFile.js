module.exports = MyFile = class {

  constructor(path) {
    this.path = path;
    this.lines = new Array();
  }

  readLines() {
    var fs = require("fs");
    var text = fs.readFileSync(this.path, "utf-8");
    this.lines=text.split("\r\n")
  }

  writeLines()
  {
    var text = ""
    for(var line of this.lines){
      text = text + line +'\r\n'
    }
    var fs = require('fs');
    fs.writeFile("newTicket.prn", text, function(err) {
      if(err) {
          return console.log(err);
      }
    }); 
  }

  getLines(){
    return this.lines
  }

  setLines(lines){
    this.lines = lines;
  }
}
/*
var f = new MyFile("medipep3.prn");
f.readLines();
f.writeLines();
*/
