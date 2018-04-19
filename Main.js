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
