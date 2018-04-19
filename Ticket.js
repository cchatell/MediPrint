require('./MyFile.js');

module.exports = Ticket = class {

  constructor(path) {
    this.thankForVisit = null;
    this.name = null;
    this.date = null;
    this.bye = null;
    this.height = 0;
    this.width = 0;
    this.pepperImg;
    this.logo;
    this.file = new MyFile(path);
    this.file.readLines();
    this.lines=this.file.getLines();

   
  }

    toString(){
      console.log(this.width+'\n'+
                  this.height+'\n'+
                  this.thankForVisit+'\n'+
                  this.name+'\n'+
                  this.date+'\n'+
                  this.bye+'\n'+
                  this.img+'\n'+
                  this.file.path)

  }

  readTicket(){
    var line = this.lines[1];
    var myRegexp = /(\d+)/g;
    var match = myRegexp.exec(line);
    this.width = match[1];
    

    var line = this.lines[2];
    var myRegexp = /(\d+)/g;
    var match = myRegexp.exec(line);
    this.height = match[1];

    this.pepperImg = this.lines[4]

    this.logo=this.lines[6]

    var line = this.lines[7];
    var myRegexp = /FD(.+)\^/g;
    var match = myRegexp.exec(line);
    this.thankForVisit = match[1];

    var line = this.lines[8];
    var myRegexp = /FD(.+)\^/g;
    var match = myRegexp.exec(line);
    this.name = match[1];

    var line = this.lines[9];
    var myRegexp = /FD(.+)\^/g;
    var match = myRegexp.exec(line);
    this.date = match[1];

    var line = this.lines[10];
    var myRegexp = /FD(.+)\^/g;
    var match = myRegexp.exec(line);
    this.bye = match[1];
  }

  writeTicket(){
    var cursor = 0;
    cursor = cursor +1;
    this.lines[cursor]=this.lines[cursor].replace(/(\d+)/g, this.width);

    cursor = cursor +1;
    this.lines[cursor]=this.lines[cursor].replace(/(\d+)/g, this.height);

    cursor = cursor+2
    this.lines[cursor]= this.pepperImg;

    cursor = cursor+2
    this.lines[cursor]= this.logo;

    cursor = cursor +1;
    this.lines[cursor]=this.lines[cursor].replace(/(FD)(.+)(\^)/g, "$1"+this.thankForVisit+"$3");

    cursor = cursor +1;
    this.lines[cursor]=this.lines[cursor].replace( /(FD)(.+)(\^)/g, "$1"+this.name+"$3");

    var currentdate = new Date(); 
    var day = currentdate.getDate();
    var pad = day < 10 ? '0' : '';
    day = pad+day;
    var month = currentdate.getMonth();
    month = month+1;
    var pad = month < 10 ? '0' : '';
    month = pad+month;
    var year = currentdate.getYear();
    year = year-100+2000
    var hours = currentdate.getHours();
    var pad = hours < 10 ? '0' : '';
    hours = pad+hours;
    var minutes = currentdate.getMinutes();
    var pad = minutes < 10 ? '0' : '';
    minutes = pad+minutes;
    this.date=day+"/"+month+"/"+year+" \\85 "+hours+"h"+minutes

    cursor = cursor +1;
    this.lines[9]=this.lines[9].replace( /(FD)(.+)(\^)/g, "$1"+this.date+"$3");

    cursor = cursor +1;
    this.lines[10]=this.lines[10].replace( /(FD)(.+)(\^)/g, "$1"+this.bye+"$3");

    this.file.setLines(this.lines);
    this.file.writeLines();
  }

  replaceAccents(strInput) {
    var strInput = strInput.split('');
    var strOutput = new Array();
    var strInputLen = strInput.length;
    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var accentsOut =["\\B7","\\B5","\\B6","\\C7","\\8E","\\8F","\\85","\\A0","\\83","\\C6","\\84","\\86O","\\E3","\\E2","\\E5","\\E5","\\99","\\9D","\\95","\\A2","\\93","\\E4","\\94","\\9B","\\D4","\\90","\\D2","\\D3","\\8A","\\82","\\88","\\89","\\D0","\\80","\\87","\\D1I","\\D6","\\D7","\\D8","\\8D","\\A1","\\8C","\\8B","\\EB","\\E9","\\EA","\\9A","\\97","\\A3","\\96","\\81","\\A5","\\A4SsY","\\98","\\EC","\\8E","\\9E"];
    for (var y = 0; y < strInputLen; y++) {
      if (accents.indexOf(strInput[y]) != -1) {
        strOutput[y] = accentsOut[accents.indexOf(strInput[y])-1];
      } else
        strOutput[y] = strInput[y];
    }
    strOutput = strOutput.join('');
    return strOutput;
  }

}

var ticket = new Ticket(process.argv[2]);
ticket.readTicket();
ticket.name=ticket.replaceAccents(process.argv[3]);

ticket.writeTicket();

