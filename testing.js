//console.log(process.env.PATH);
console.log('Process:Env variable stringify ---- ');
//console.log(JSON.stringify(process.env));

console.log('----------SEPERATOR ----------------------');
console.log('Working directory : '+__dirname);

console.log('Hello I am inside Tester Section !!!!!! ');

var dateFormat = require('dateformat');
var moment = require('moment');

//var dateFormatStr = "yyyymmddHH";
//Date format documentation -- https://www.npmjs.com/package/dateformat
var time_point = {date : "20161203003000"};

//var dt = new Date(time_point.date);
var dt = moment(time_point.date, "YYYYMMDDhhmmss");
console.log('Date value -- '+dt.toString());

var time = new Date().getTime();
console.log(time);
var date = new Date(time);
console.log(dateFormat(date,"yyyymmddhhMMss"));