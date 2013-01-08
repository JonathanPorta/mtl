require! { server: "jefri-server", express, fs, _: superscore }

server.get '/', !(req, res)->
	res.sendfile "build/index.html"

server.get '/context.json', !(req, res)->
	res.sendfile "build/mtl.json"

server.jefri.runtime.load "http://localhost:3000/context.json"

server.use '/', express.static 'build/'

server.listen 3000
