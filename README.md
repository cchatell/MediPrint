# MediPrint

This project written in Javascript is a sub project of Medipep, its goal is to print a ticket after the patient consultation mentionning his name and the time of the consultation. The printer used is a SATO WS408, and this project will run on Raspberry Pi.

## Getting Started

### Prerequisites

You can download this project with git from the bitbucket of MediPep : 

```
git clone 
```

### Installing

Before launching the program you need to have npm and node installed, and the required node modules

update

```
sudo apt-get update
```

install node and npm (5.6.0)

```
sudo apt-get install nodejs npm
```

install node module winston (3.0.0)

```
sudo npm install -g winston
```

install node module node-cmd

```
sudo npm install -g node-cmd
```


## Running

To launch the app, you need to be at the root of the file, have a valid template for the ticket, and use node command : 

```
sudo node Main.js [TEMPLATE_PATH] [NEW_TICKET_PATH] [PATIENT_NAME] [PRINTER_IP_ADRESS] [PRINTER_PORT]
```

For example :

```
sudo node Main.js "medipep3.prn" "newTicket.prn" "another test" 192.168.3.86 9100
```


## Built With

* [npm](https://www.npmjs.com/package/winston) - The Logger npm module used
* [npm](https://www.npmjs.com/package/npm-cmd) - The command npm module used



## Authors

* **Corentin Chatellier**