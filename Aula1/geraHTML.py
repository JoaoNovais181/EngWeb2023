import json

def ordCidade(cidade):
    return cidade['nome']

f = open("mapa.json", encoding="utf-8")
mapa = json.load(f)

cidades = mapa['cidades']
cidades.sort(key=ordCidade)
# ou cidades.sort(key=lambda cidade : cidade['nome'])

nomes = {}
for cidade in cidades:
    nomes[cidade['id']] = cidade['nome']


  #  "ligações": [
    #  {
      #  "id": "l1-c60-c95",
      #  "origem": "c60",
      #  "destino": "c95",
      #  "distância": 383.661
    #  },

ligacoes = {}
for cidade in cidades:
    ligacoes[cidade['id']] = []

for ligacao in mapa['ligações']:
    ligacoes[ligacao['origem']].append(ligacao)
    ligacoes[ligacao['origem']].sort(key=lambda l : l['distância'])

pagHTML = """
<!DOCTYPE html>
<html>
	<head>
		<title>Mapa Virtual</title>
		<meta charset="utf-8"/> 
	</head>
	<body>
		<h1>Mapa Virtual</h1>
        <h2>Falta adicionar para cada cidade adicionar ligacoes, em que cada ligacao diz cidade:distancia, o nome da cidade é link para a cidade
		<table>
			<tr>
				<!-- coluna do indice -->
				<td width="30%" valign="top">
                    <a name="indice"/>
					<h3>Índice</h3>
					<ol>
"""

for c in cidades:
    pagHTML += f"   					    <li><a href='#{c['id']}'>{c['nome']}<a/></li>\n"

pagHTML +="""
                </ol>
				<!-- coluna do conteúdo -->
				<td width="70%">
"""

for c in cidades:
    pagHTML+= f"""
					<a name="{c['id']}"/>
					<h3>{c['nome']}</h3>
					<p><b>Distrito:</b> {c['distrito']}</p>
					<p><b>População:</b> {c['população']}</p>
					<p><b>Descrição:</b> {c['descrição']}</p>
                    <p><b>Ligações:</b></p>
                    <ul>
    """
    
    for ligacao in ligacoes[c['id']]:
        pagHTML += f'''
                            <li><a href="#{ligacao['destino']}">{nomes[ligacao['destino']]}</a>:{ligacao['distância']}Km</li>
        '''

    pagHTML += """
                    </ul>
                    <adress>[<a href="#indice">Voltar ao Índice</a>]</adress>
					<center>
						<hr width="80%"\>
					</center>
    """
				
pagHTML +="""
                </td>
			</tr>
		</table>
	</body>
</html>
"""

print(pagHTML)

f.close()
