require('./Ticket.js');
require('./Logger.js');

/**
 * Class for creating and printing a ticket, see README file
 *
 * @class      Main
 */
module.exports = Main = class {

	/**
	 * Constructs the object.
	 *
	 * @method     constructor
	 */
	constructor(){
		/**
		* create new Ticket with the first argument as path to the file template
		*
		* @type       {Ticket}
		*/
		var logger = new Logger().getLogger();
		logger.info("Creating new ticket with template path : "+ process.argv[2]);
		var ticket = new Ticket(process.argv[2], logger);

		/**
		* import parameters from template
		*/

		logger.info("Importing template from file : "+ process.argv[2]);
		ticket.readTicket();
		/**
		* change ticket's name
		*/
		logger.info("Changing ticket's name to : "+ process.argv[4]);
		ticket.name=ticket.replaceAccents(process.argv[4]);

		/**
		* export ticket
		*/
		logger.info("Writing new ticket to : " + process.argv[3]);
		ticket.writeTicket(process.argv[3]);

var command2 = "echo \"" + process.argv[7] + "\" | netcat 127.0.0.1 6789";
		logger.info("Executing command : " + command2);
		var cmd=require('node-cmd');
		cmd.get(
			command2, 
			function(err, data, stderr){
				if(stderr!=='') logger.error("error while executing command : " + command2 + " : " + stderr	);
				else  if(err!==null) logger.error("error while executing command : " + command2+ " : " + err	);
			}
		);

		/**
		* send the file to the printer
		*/
		
		var command = "sudo cat "+ process.argv[3] + " | netcat -w 1 " + process.argv[5] + " " + process.argv[6] ;
		logger.info("Executing command : " + command);
		var cmd=require('node-cmd');
		cmd.get(
			command, 
			function(err, data, stderr){
				if(stderr!=='') logger.error("error while executing command : " + command + " : " + stderr	);
				else  if(err!==null) logger.error("error while executing command : " + command + " : " + err	);
			}
		);
		
		
		
		
	}
}

var main = new Main();