const http = require('http')
const url = require('url')
const axios = require('axios')
const my_pages = require('./my_pages')


const port = 12345

http.createServer( (req, res) => {
	var d = new Date().toISOString().substring(0,16)
	console.log(req.method + " " + req.url + " " + d)

	var pedido = url.parse(req.url, true).path

	if (pedido == "/") 
	{
		res.writeHead(200, {'Content-Type':'text/html; charset="utf-8"'})

		res.end(my_pages.genMainPage())
	}
	else if (pedido.match( /\/pessoas/ ))
	{
		axios.get('http://localhost:3000/pessoas/')
			.then( (resp) => {
				var pessoas = resp.data

				if (pedido.match( /\/pessoas(\/(ord|distSexo|distDesp|topProf|p\d+))?/ ))
				{
					res.writeHead(200,{'Content-Type':'text/html ; charset="utf-8"'})
					res.end("<h1>Ola</h1>")
				}
				else
				{
					res.writeHead(404, {'Contet-Type': 'text/html; charset=utf-8'})
					res.end("<p>ERRO: Operação não suportada</p>")
				}
			})
	}
	else
	{
		res.writeHead(404, {'Contet-Type': 'text/html; charset=utf-8'})
		res.end("<p>ERRO: Operação não suportada</p>")
	}
}).listen(port)

console.log("Servidor à escuta na porta " + port)
