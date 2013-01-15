// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var server = require('jefri-server');

function PostCode(entities) {
	// Build the post string from an object
	var trans = {"attributes":{},"entities":entities};
	var post_data = JSON.stringify(trans);
//	var post_data = trans;
	console.log("Final Trans:" + post_data);

	// An object of options to indicate where to post to
	var post_options = {
		host: 'localhost',
		port: 3000,
		path: '/persist',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': post_data.length
		}
	};

	// Set up the request
	var post_req = http.request(post_options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
//			console.log('Response: ' + chunk);
		});
	});

	// post the data
//	post_req.write(post_data);
	post_req.end();

}

function mine() {
	// This is an async file read
	fs.readdir('./legislators', function(err, files) {
		files.forEach(function(file) {
			console.log("Reading: ./legislators/" + file);
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
				var l = server.jefri.runtime.build("Legislator", data);
				var entities = [];
				entities.push(l)
				for(var of = 0; of < offices.length; of++)
				{
					var office = server.jefri.runtime.build("Office", offices[of]);
//					console.log(office);
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

server.jefri.runtime.load("http://localhost:3000/context.json").done(mine);
