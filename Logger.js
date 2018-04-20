/**
 * class representing the Logger, using winston node module
 *
 * @class      Logger
 */
export class Logger  {

    /**
     * Constructs the object.
     *
     * @method     constructor
     */
  constructor() {
    /**
     * winston module
    * @property winston 
    * @Type {Winston} 
    */
     this.winston = require('winston');
    /**
     * file system module
    * @property fs 
    * @Type {fs} 
    */
     this.fs = require('fs');
    /**
     * node environment variable
    * @property env 
    * @Type {String} 
    */
     this.env = process.env.NODE_ENV || 'development';
    /**
     * path of the directory to write the logs
    * @property logDir 
    * @Type {String} 
    */
     this.logDir = 'log';


    if (!this.fs.existsSync(this.logDir)) {
        this.fs.mkdirSync(this.logDir);
    }

    /**
     * date format for the logs
    * @property tsFormat 
    * @Type {String} 
    */
     this.tsFormat = () => (new Date()).toLocaleTimeString();


     /**
    * logger logging the activity
    * @property logger 
    * @Type {Logger} 
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
   * @method     getLogger
   * @return     {Logger}  The logger.
   */
   getLogger(){
    return this.logger;
}
}