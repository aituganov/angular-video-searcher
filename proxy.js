var express = require('express');
var http = require('http');

var server = express();

server.use(express.static('src'));

server.all('/api/*', function (req, res, next) {
	var requestOpts = {
		host: 'you_host',
		path: req.url
	}
	http.get(requestOpts, function (hostRes) {
		res.status(hostRes.statusCode);
		for (var i in hostRes.headers) {
			res.set(i, hostRes.headers[i]);
		}
		hostRes.on('data', res.write.bind(res));
		hostRes.on('end', res.end.bind(res));
	})
	.on('error', function (err) {
		console.log(err.stack);
		res.status(500).json({error: err});
	});
});

server.listen(8888);
