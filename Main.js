require('./Ticket.js');
 /**
  * create new Ticket with the first argument as path to the file template
  *
  * @type       {Ticket}
  */
var ticket = new Ticket(process.argv[2]);

/**
 * import parameters from template
 */
ticket.readTicket();
/**
 * change ticket's name
 */
ticket.name=ticket.replaceAccents(process.argv[3]);*

/**
 * export ticket
 */
ticket.writeTicket();


/**
 * send the file to the printer
 */
var cmd=require('node-cmd');
cmd.get(
	'cat ./newTicket.prn | netcat -w 1 192.168.3.86 9100', 
		function(err, data, stderr){
			broadcast(socket.name + " is printing \'" + toPrint+"\'. \n", socket);
		}
);