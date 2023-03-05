const http = require('http')
const url = require('url')
const axios = require('axios')
const my_pages = require('./my_pages')
const querystring = require('querystring')

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
	else if (pedido == "/pessoas" || pedido == "/pessoas/")
	{
		axios.get('http://localhost:3000/pessoas/')
			.then( (resp) => {
				var pessoas = resp.data

				res.writeHead(200,{'Content-Type':'text/html ; charset="utf-8"'})
				res.end(my_pages.genListPage(pessoas, false))
			})
			.catch( (error) => {
				res.writeHead(404, {'Contet-Type': 'text/html; charset=utf-8'})
				res.end("<p>ERRO: Não foi possível aceder à Base de Dados</p>")
			})
	}
	else if (pedido == "/pessoas/ord")
	{
		axios.get('http://localhost:3000/pessoas/')
			.then( (resp) => {
				var pessoas = resp.data

				res.writeHead(200,{'Content-Type':'text/html ; charset="utf-8"'})
				res.end(my_pages.genListPage(pessoas, true))
			})
			.catch( (error) => {
				res.writeHead(404, {'Contet-Type': 'text/html; charset="utf-8"'})
				res.end("<p>ERRO: Não foi possível aceder à Base de Dados</p>")
			})
	}
	else if (pedido == "/pessoas/distSexo")
	{
		axios.get('http://localhost:3000/pessoas/')
			.then( (resp) => {
				var pessoas = resp.data

				res.writeHead(200,{'Content-Type':'text/html ; charset="utf-8"'})
				res.end(my_pages.genListByGender(pessoas))
			})
			.catch( (error) => {
				res.writeHead(404, {'Contet-Type': 'text/html; charset=utf-8'})
				res.end("<p>ERRO: Não foi possível aceder à Base de Dados</p>")
			})
	}
	else if (pedido == "/pessoas/distDesporto")
	{
		axios.get('http://localhost:3000/pessoas')
			.then( (resp) => {
				var pessoas = resp.data

				res.writeHead(200, {'Content-Type':'text/html ; charset="utf-8"'})
				res.end(my_pages.genSportsPage(pessoas))
			})
	}
	else if (pedido.match(/\/pessoas\?(\w+=\w+)+/))
	{
		var query = url.parse(req.url, true).query
		var qs = querystring.stringify(query)

		axios.get('http://localhost:3000/pessoas?' + qs)
			.then( (resp) => {
				var pessoas = resp.data
				
				res.writeHead(200, {'Content-Type':'text/html ; charset="utf-8"'})
				res.end(my_pages.genListPage(pessoas))
			})
			.catch( (error) => {
				res.writeHead(200, {'Content-Type':'text/html ; charset="utf-8"'})
				res.end(my_pages.genListPage(pessoas))
				res.end("<p>ERRO: Não foi possível aceder à Base de Dados</p>")
			})
	}
	else
	{
		res.writeHead(200, {'Content-Type':'text/html ; charset="utf-8"'})
		res.end("<p>ERRO: Operação não suportada</p>")
	}
}).listen(port)

console.log("Servidor à escuta na porta " + port)
