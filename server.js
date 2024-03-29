//7/24/2013
var app = require('http').createServer(handler)
  , fs = require('fs')
  , path = require('path')
  , url = require('url')
  ,mime=require('mime')

app.listen(process.env.PORT||5000);
function handler (req, res) {
	var uri = url.parse(req.url).pathname;
	switch(uri){
		case '/':
			uri='/main.html'
			break
	}
	uri=uri.replace(/%20/g,' ')
	console.log(uri)
	var filename = path.join(/*process.cwd()*/__dirname, uri);
	fs.readFile(filename,
		function (err, data) {
		if (err) {
			res.writeHead(404);
			return res.end('Error loading file...');			  
		}
		res.setHeader('Content-type',mime.lookup(uri));
		res.writeHead(200);
		res.end(data);
	})
}
