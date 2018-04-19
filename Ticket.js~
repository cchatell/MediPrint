require('./MyFile.js');

/**
* Class representing a ticket
*/
module.exports = Ticket = class {

    /**
     * Constructs the object.
     *
     * @param      {<type>}  path    The path of the template to use
     */
    constructor(path) {
        /**
        * message used first to thank the patient for visiting
        */
        this.thankForVisit = null;
        /**
        * name of the patient
        */
        this.name = null;
        /**
        * date of the visit
        */
        this.date = null;
        /**
        * message to say goodbye
        */
        this.bye = null;
        /**
        * height of the ticket
        */
        this.height = 0;
        /**
        * width of the ticket
        */
        this.width = 0;
        /**
        * image of pepper
        *
        */
        this.pepperImg;
        /**
        * image of the logo of the retirment house
        *
        */
        this.logo;
        /**
        * file of the template used to generate the ticket
        */
        this.file = new MyFile(path);
        this.file.readLines();
        /**
        * lines of the file representing the ticket
        */
        this.lines=this.file.getLines();

    }

    /**
     * Returns a string representation of the object.
     */
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

    /**
     * import ticket properties from the template
     */
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

    /**
     * Wxport the current ticket to a prn file
     */
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

        /**
         * set ticket's date to current date
         *
         * @type       {Date}
         */
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

    /**
     * replace accents by zpl equivalents
     *
     * @param      {<String>}            strInput  The string input
     * @return     {(String)}  { the string with accent replaced }
     */
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


