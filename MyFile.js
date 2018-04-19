/**
 * class representing a file
 */
module.exports = MyFile = class {

  /**
   * Constructs the object.
   *
   * @param      {<type>}  path    The path of the file
   */
  constructor(path) {
    this.path = path;
    this.lines = new Array();
  }
  /**
   * Reads lines from file.
   */
  readLines() {
    var fs = require("fs");
    var text = fs.readFileSync(this.path, "utf-8");
    this.lines=text.split("\r\n")
  }
  /**
   * Writes lines to a new file.
   */
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
  /**
   * Gets the lines.
   *
   * @return     {Array|String}  The lines.
   */
  getLines(){
    return this.lines
  }
  /**
   * Sets the lines.
   *
   * @param      {Array|String}  lines   The lines
   */
  setLines(lines){
    this.lines = lines;
  }
}
