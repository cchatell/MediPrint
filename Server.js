
// Load the TCP Library
net = require('net');

// Keep track of the chat clients
var clients = [];

// Start a TCP Server
net.createServer(function (socket) {

	// Identify this client
	socket.name = socket.remoteAddress + ":" + socket.remotePort 

	// Put this new client in the list
	clients.push(socket);

	// Send a nice welcome message and announce
	socket.write("Welcome " + socket.name + "\n");
	broadcast(socket.name + " joined the MediPrint server.\n", socket);

	// Handle incoming messages from clients.
	socket.on('data', function (data) {
		
		var cmd=require('node-cmd');
  		var promise= require('bluebird');
		const getAsync = promise.promisify(cmd.get, { multiArgs: true, context: cmd })
		var toPrint = data
		getAsync('node Main.js medipep3.prn newTicket.prn '+data+" 192.168.3.86 9100 ").then(data => {
	  
		}).catch(err => {
	  		console.log('cmd err', err)
		})
    
  	});

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    broadcast(socket.name + " left the MediPrint server.\n");
  });
  
  // Send a message to all clients
  function broadcast(message, sender) {
    clients.forEach(function (client) {
      client.write(message);
    });
    // Log it to the server output too
    process.stdout.write(message)
  }

}).listen(5000, '0.0.0.0');

// Put a friendly message on the terminal of the server.
console.log("MediPrint server running at port 5000\n");
