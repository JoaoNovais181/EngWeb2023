

exports.genMainPage = function () {
	pagHTML = `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>TPC3 - Índice</title>
			<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
		</head>
		<body>
			<div class="w3-card">
				<header class="w3-container w3-blue-grey w3-xlarge">
					<p>Índice</p>
				</header>	

				<ul class="w3-ul w3-large w3-hoverable">
					<li class="w3-padding-medium">
						Lista de Pessoas 
					</li>
					<li class="w3-padding-medium"> 
						Lista de Pessoas Ordenadas
					</li>
					<li class="w3-padding-medium">
						Distribuição por Sexo
					</li>
					<li class="w3-padding-medium">
						Distribuição por Desporto
					</li>
					<li class="w3-padding-medium">
						Top 10 Profissões
					</li>
				</ul>
			</div>
		</body>
	</html>
	`

	return pagHTML
}

exports.genListPage = function (lista, sort) {
	pagHTML = `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>TPC3 - Índice</title>
			<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
		</head>
		<body>
			<div class="w3-card">
				<header class="w3-container w3-blue-grey w3-xlarge">
					<p>Lista de Pessoas${(sort) ?" Ordenada" :""}</p>
				</header>	

				<ul class="w3-ul w3-large w3-hoverable">`

	if (sort) {
		lista.sort( (p1, p2) => (p1.nome < p2.nome) ?-1 :1)
	}

	for (let i=0 ; i<lista.length ; i++)
	{
		let pessoa = lista[i]

		pagHTML += `
						<li>
		`
	}

	pagHTML += `
				</ul>
			</div>
		</body>
	</html>
	`
}
