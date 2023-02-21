import os

pagHTML = """
<!DOCTYPE html>
<html>
	<head>
		<title>TPC1 - Iguanas</title>
		<meta charset="utf-8"/> 
		<link rel="stylesheet" href="../css/style.css"/>
        <link rel="stylesheet" href="../css/galeria.css"/>
	</head>
	<body>
		<div class="topbar">
			<a href="https://www.flaticon.com/br/icone-gratis/iguana_2417560">
				<img src="https://cdn-icons-png.flaticon.com/512/2417/2417539.png" height="40px"/>
			</a>
			<a>
				<p>Iguanas</p>
			</a>
		</div>
		<div class="leftbar">
			<a href="index.html">Início</a>
			<a href="factos.html">Factos sobre Iguanas-Verdes</a>
			<a class="active" href="galeria.html">Galeria de Fotos</a>
		</div>
		<div class="content">
			<h1>Galeria</h1>
			<div class="imagens">
"""

imagens = os.listdir("Iguana")

for imagem in imagens:
    pagHTML += f'''
				<div class="caixa">
					<img src="../Iguana/{imagem}"/>
				</div>
    '''


pagHTML += """
			</div>

			<hr>
			<p>
				Imagens retiradas do seguinte 
				<a href="https://www.kaggle.com/datasets/vencerlanz09/reptiles-and-amphibians-image-dataset?resource=download">website</a>
			</p>
			
			
		</div>
	</body>
</html>
"""

print(pagHTML)
