/**
* class representing the Logger, using winston node module
*/
module.exports = Logger = class  {

  constructor() {
    /**
     * winston module
     */
     this.winston = require('winston');
    /**
     * file system module
     */
     this.fs = require('fs');
    /**
     * environment variable
     */
     this.env = process.env.NODE_ENV || 'development';
    /**
     * path of the directory to write the logs
     */
     this.logDir = 'log';

    // Create the log directory if it does not exist
    if (!this.fs.existsSync(this.logDir)) {
        this.fs.mkdirSync(this.logDir);
    }

    /**
     * date format for the logs
     */
     this.tsFormat = () => (new Date()).toLocaleTimeString();

    /**
     * Logger
     */
     this.logger = new (this.winston.Logger)({
        transports: [
            // colorize the output to the console
            new (this.winston.transports.Console)({
                timestamp: this.tsFormat,
                colorize: true,
                level: 'info'
            }),
            new (this.winston.transports.File)({
                filename: `${this.logDir}/MediPrint.log`,
                timestamp: this.tsFormat,
                level: this.env === 'development' ? 'debug' : 'info'
            })
        ]
    });
 }

  /**
   * Gets the logger.
   *
   * @return     {<Logger>}  The logger.
   */
   getLogger(){
    return this.logger;
}
}