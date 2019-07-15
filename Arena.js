const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const fs = require('fs');
const newMove = JSON.parse(fs.readFileSync('./movelist.json', 'utf8'));

function create(msg, arguments) {
	let nameObject = {name: "", power: 0, target: "", effect: "", length: 0, MP: 0};
	nameObject.name = newMove["name"]["adjective"][Math.floor(Math.random() * (newMove["name"]["adjective"].length))] +
		" " + newMove["name"]["noun"][Math.floor(Math.random() * (newMove["name"]["noun"].length))];
	
	// Base power
	nameObject.power = newMove["base"];
	// Add effect
	for (x in newMove["attack"]) {
		let go = newMove["attack"][x][Math.floor(Math.random() * (newMove["attack"][x].length))];
		nameObject[x] = go[0];
		nameObject.power = nameObject.power + go[1];
	}
	
	if (nameObject.power < 0) {
		nameObject.MP = -1 * nameObject.power;
	}
	nameObject.MP = Math.floor(Math.random() * 10) + nameObject.MP;
	nameObject.power = nameObject.power + nameObject.MP;
	
	msg.channel.send(JSON.stringify(nameObject, null, 2))
}

function fight() {
    console.log('in admin 2 command');
    // your command code here
}

module.exports = {
    arenaCommand: function(sql, msg) {
		// Here are the arguments
		let args = msg.content.substring(3).split(' ');
		// We have the form WY!arena mainCommand [arguments]
		let mainCommand = args[1];
		let arguments = args.slice(2);
		
        switch(mainCommand) {
            case 'help':
                // set found equal to true so your index.js file knows
                //   to not try executing 'other' commands
                // execute function associated with this command
                msg.channel.send("WALUIGI")
                break;

            // your second admin command (similar setup as above)
            case 'create':
                create(msg, arguments);
                break;

            // ... more admin commands
        }
	}
}