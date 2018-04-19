require('./Ticket.js');
require('./Logger.js');

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
