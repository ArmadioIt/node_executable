const sleep = require('sleep-promise');
var fs = require('fs');

// Checks for --custom and if it has a value
const customIndex = process.argv.indexOf('--seconds');
let customValue = "";

if (customIndex > -1) {
  // Retrieve the value after --custom
  customValue = process.argv[customIndex + 1];
  console.log(customValue)
}

async function wait(time){
	console.log("Hello World.");
	await sleep(time * 1000);
	console.log("Will be printed after " + time + " seconds.");	
}

async function create_file(){
    fs.writeFile('test.txt', 'Some test values', function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });
}

if (customValue == ""){
	wait(20)
    create_file()
} else {
	wait(customValue)	
    create_file()
}
