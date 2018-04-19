/**
 * class representing a file
 */
module.exports = MyFile = class {

  /**
   * Constructs the object.
   *
   * @param      {<type>}  path    The path of the file
   */
  constructor(path,logger) {
  	this.logger = logger;
    this.path = path;
    this.lines = new Array();	
  }
  /**
   * Reads lines from file.
   */
  readLines() {
    var fs = require("fs");
    this.logger.info("Reading file "+this.path+" synchronously with format utf-8");
    var text = fs.readFileSync(this.path, "utf-8");
    this.lines=text.split("\n")
  }
 /**
   * Writes lines into a new file
   *
   * @param      {<type>}  path    The path of the new file
   */
  writeLines(path)
  {
    var text = ""
    for(var line of this.lines){
      text = text + line +'\n'
    }
    this.logger.info("Writing file : "+path);
    var fs = require('fs');
    fs.writeFile(path, text, function(err) {
      if(err) {
          this.logger.error("Error writing file " + path + " : " + err);
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
