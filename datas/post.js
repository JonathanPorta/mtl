// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var jefri = require('jefri'),
	runtime = new jefri.Runtime();
require("jefri-stores");
var _ = require("superscore");

var NS_MSG = "MTL"; // This is the unique message for the namespace.
var NS = _.UUID.v5(NS_MSG);

function PostCode(entities) {
	var t, storeOptions, s;
	t = new jefri.Transaction();
	t.add(entities);
	storeOptions = {
		remote: 'http://localhost:3000/',
		runtime: runtime
	};
	s = new jefri.Stores.PostStore(storeOptions);
//	console.log(s);
	s.persist(t);
}

function mine() {
	// This is an async file read
	fs.readdir('./legislators', function(err, files) {
		files.forEach(function(file) {
			//console.log("Reading: ./legislators/" + file);
			var data = fs.readFileSync("./legislators/" + file, 'utf-8');

			if (err) {
				console.log("FATAL An error occurred trying to read in the file: " + err);
				process.exit(-2);
			}
			// Make sure there's data before we post it
			if(data) {
				var data = JSON.parse(data);
				var offices = data["offices"];
				data["name"] = data["full_name"];
				data["zip"] = data["+zip"];
				data["city"] = data["+city"];
				data["address"] = data["+address"];
				delete data["full_name"];
				delete data["sources"];
				delete data["offices"];
				delete data["roles"];
				delete data["+zip"];
				delete data["+city"];
				delete data["+address"];
				var l = runtime.build("Legislator", data);
				// Override the ID, probably by hashing the name and city.
				l.legislator_id(_.UUID.v5(l.name() + l.city(), NS));

				var entities = [];
				entities.push(l)
				for(var of = 0; of < offices.length; of++)
				{
					var office = runtime.build("Office", offices[of]);
					// Override the office id.
					office.office_id(_.UUID.v5(office.address(), NS));

					l.offices(office);
					entities.push(office);
				}
				PostCode(entities);
			}
			else {
				console.log("Abort on " + x);
				console.log("No data to post");
				process.exit(-1);
			}
		});
	});
}

runtime.load("http://localhost:3000/context.json").done(mine);
