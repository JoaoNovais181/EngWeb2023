import json

with open("mapa.json") as jsonFile:
    mapa = json.load(jsonFile)
    
cidades = mapa['cidades']
ligacoes = {}

for l in mapa['ligações']:
    origem = l['origem']
    if origem not in ligacoes.keys():
        ligacoes[origem] = []
    ligacoes[origem].append((l['destino'],l['distância']))


cidades.sort(key=lambda c : c['nome'])

distritos = {}
nomes = {}
for c in cidades:
    d = c['distrito']
    if d not in distritos.keys():
        distritos[d] = []
    distritos[d].append(c)
    nomes[c['id']] = c['nome']

indexHTML = f"""
<!DOCTYPE html>
<html>
	<head>
		<title>TPC2 - Índice</title>
		<meta charset="utf-8"/>
	</head>
	<body>
		<h1>Índice</h1>
		<ol>
"""

dis = list(distritos.keys())
dis.sort()
for d in dis:
    cid = distritos[d]
    indexHTML += f"""
                <li>{d}</li>
                    <ul>
    """

    for c in cid:
        indexHTML += f"                    <li><a href='/{c['id']}'>{c['nome']}</a></li>\n"

    indexHTML += "                </ul>\n               </li>"

indexHTML += """
        </ol>
	</body>
</html>
"""

with open("Paginas/index.html", "w") as ficheiroHTML:
    ficheiroHTML.write(indexHTML)

for c in cidades:
    pagHTML = f"""
    <!DOCTYPE html>
    <html>
        <head>
            <title>TPC2 - {c['nome']}</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h1>{c['nome']}</h1>
            <p><b>Distrito:</b> {c['distrito']}</p>
            <p><b>População:</b> {c['população']}</p>
            <p><b>Descrição:</b> {c['descrição']}</p>
            <p><b>Ligações:</b></p>
            <ul>
    """
    if c['id'] in ligacoes.keys():
        for v,d in ligacoes[c['id']]:
            pagHTML += f"               <li><a href='/{v}'>{nomes[v]}</a>:{d}</li>"

            """
            </ul>
        </body>
    </html>
    """

    with open(f"Paginas/{c['id']}.html", "w") as ficheiroHTML:
        ficheiroHTML.write(pagHTML)
