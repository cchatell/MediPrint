module.exports = Logger = class {
	
constructor() {
    this.winston = require('winston');
    this.fs = require('fs');
    this.env = process.env.NODE_ENV || 'development';
    this.logDir = 'log';
    
// Create the log directory if it does not exist
if (!this.fs.existsSync(this.logDir)) {
  this.fs.mkdirSync(this.logDir);
}
this.tsFormat = () => (new Date()).toLocaleTimeString();
this.logger = new (this.winston.Logger)({
  transports: [
    // colorize the output to the console
    new (this.winston.transports.Console)({
      timestamp: this.tsFormat,
      colorize: true,
      level: 'info'
    }),
    new (this.winston.transports.File)({
      filename: `${this.logDir}/results.log`,
      timestamp: this.tsFormat,
      level: this.env === 'development' ? 'debug' : 'info'
    })
  ]
});
  }
  
  getLogger(){
		return this.logger;
  	}
}