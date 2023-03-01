http = require('http')
url = require('url')
fs = require('fs')

const regex = new RegExp("/c[0-9]+$")
const porta = 12345

function log (req)
{
	var d = new Date().toISOString().substring(0,16)
	console.log(req.method + " " + req.url + " " + d)
}

http.createServer(function (req, res) {
	var pedido = url.parse(req.url, true).pathname 	
	log(req)

	if (pedido == "/")
	{
		fs.readFile("Paginas/index.html", function (err, data) {
			res.writeHead(200, {"Content-Type" : "text/html"})
			if (err) 
			{
				res.write("Erro na leitura do ficheiro")
				console.log(err)
			}
			else
			{
				res.write(data)
			}
			res.end()
		})
	}
	else if (regex.test(pedido))
	{
		fs.readFile("Paginas" + pedido + ".html", function (err, data) {
			res.writeHead(200, {"Content-Type" : "text/html"})
			if (err) 
			{
				res.write("Erro na leitura do ficheiro")
				console.log(err)
			}
			else
			{
				res.write(data)
			}
			res.end()
		})
	}
	else
	{
		console.log(pedido , regex.test(pedido))
		res.writeHead(200, {"Content-Type" : "text/html ; charset=utf-8"})
		res.write("Endereço Inválido")
		res.end()
	}
	
}).listen(porta)

console.log("Servidor à escuta na porta " + porta)
