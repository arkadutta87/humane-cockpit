//console.log(process.env.PATH);
console.log('Process:Env variable stringify ---- ');
//console.log(JSON.stringify(process.env));

console.log('----------SEPERATOR ----------------------');
console.log('Working directory : '+__dirname);

console.log('Hello I am inside Indexer  !!!!!! ');

var fs, configurationFile;
fs = require('fs');
var constants = require('./constants');

configurationFile  = constants.configurationFile;

console.log('Configuration File Path ---- '+configurationFile);

var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
);

console.log('Configuration Loaded --- \n' + JSON.stringify(configuration));

var fileName = configuration.log_file;
console.log('Log FileName : '+fileName);


//reading the file
var Promise = require('bluebird');
var readLine = require('readline');
//var Client = Promise.promisifyAll(require('node-rest-client').Client);

var es_index = require('./Utils').es_index;
var lineReader = require('line-reader');
var eachLine = Promise.promisify(lineReader.eachLine);

var i = 0;
var arr = [];

eachLine(fileName,function(line,last) {
    //console.log(line);
    arr.push(JSON.parse(line.trim()));
    ++i;

    /*if( i > 10){
        //es_index(arr);


        return false;
    }*/


    if (last) {
        return false;

        //return false; // stop reading
    }
}).then(function() {
    //console.log('done');
    es_index(arr);
}).catch(function(error){
    console.log(error);
});



//console.log(configuration.username);
//console.log(configuration.password);


