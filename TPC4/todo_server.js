const http = require('http')
const axios = require('axios')
const my_pages = require('./my_pages')
const { parse } = require('querystring')

// aux functions

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}


var servidor = http.createServer((req, res) => {
	var date = new Date().toISOString().substring(0,16)
	console.log(req.url, req.method, date)
	
	switch(req.method)
	{
		case "GET":
			if (req.url == "/")
			{
				axios.get("http://localhost:3000/tasks")
					.then((resp) => {
						let tasks = resp.data

						res.writeHead(200,  {'Content-Type':'text/html ; charset="utf-8"'})
						res.end(my_pages.genPage(tasks))
						})
					.catch((error) => {
						res.writeHead(200,  {'Content-Type':'text/html ; charset="utf-8"'})
						res.end('<p>Erro no acesso à base de dados ' + error + '</p>')
					})
			}
			else if (req.url.match(/\/edit\/t\d+/))
			{
				let idTask = req.url.split("/")[2]

				axios.get("http://localhost:3000/tasks")
					.then((resp) => {
						let tasks = resp.data
						let task = null

						for (let i=0 ; i<tasks.length ; i++)
						{
							if (tasks[i].id == idTask)
								task = tasks[i]
						}

						res.writeHead(200,  {'Content-Type':'text/html ; charset="utf-8"'})
						res.end(my_pages.genPage(tasks, task))
						})
					.catch((error) => {
						res.writeHead(200,  {'Content-Type':'text/html ; charset="utf-8"'})
						res.end('<p>Erro no acesso à base de dados ' + error + '</p>')
					})
			}
			else if (req.url.match(/\/done\/t\d+/))
			{
				let idTask = req.url.split("/")[2]

				axios.get("http://localhost:3000/tasks")
					.then((resp) => {
						let tasks = resp.data
						let task = null

						for (let i=0 ; i<tasks.length ; i++)
						{
							if (tasks[i].id == idTask)
								task = tasks[i]
						}

						task.state = "done"


						axios.put('http://localhost:3000/tasks/'+task.id, task)
							.then(resp => {
								res.writeHead(301, {Location:"http://localhost:7777/"})
								res.end()
							})
							.catch(error => {
								res.writeHead(201,  {'Content-Type':'text/html ; charset="utf-8"'})
								res.end(`<p>Error: ${error}`)
							})
					})
					.catch(error => {
						res.writeHead(200,  {'Content-Type':'text/html ; charset="utf-8"'})
						res.end('<p>Erro no acesso à base de dados ' + error + '</p>')
					})
			}
			break
		case "POST":
			if (req.url == "/")
			{
				collectRequestBodyData(req, result => {
					if (result)
					{
						result.state = "due"
						axios.post('http://localhost:3000/tasks', result)
							.then(resp => {
								res.writeHead(301, {Location:"http://localhost:7777/"})
								res.end()
							})
							.catch(error => {
								res.writeHead(201,  {'Content-Type':'text/html ; charset="utf-8"'})
								res.end(`<p>Error: ${error}`)
							})
					}
					else
					{
						res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
						res.end("<p>Unable to collect data from body...</p>")
					}
				})
			}
			else if (req.url.match(/\/edit\/t\d+/))
			{
				collectRequestBodyData(req, result => {
					if (result)
					{
						result.state = "due"
						axios.put('http://localhost:3000/tasks/'+result.id, result)
							.then(resp => {
								res.writeHead(301, {Location:"http://localhost:7777/"})
								res.end()
							})
							.catch(error => {
								res.writeHead(201,  {'Content-Type':'text/html ; charset="utf-8"'})
								res.end(`<p>Error: ${error}`)
							})
					}
					else
					{
						res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
						res.end("<p>Unable to collect data from body...</p>")
					}
				})

			}
	}
})


servidor.listen(7777, () => {
	console.log("Servidor à escuta na porta 7777")
})
