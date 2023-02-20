# Aula 1

## Vamos definir um formato para o manifesto



## Formatos

### CSV - Comma Separated Values

Dá pra apresentar informação tabular e cada linha respresenta um registo. Por omissão o separador é ','.

Exemplo... :

Queremos guardar um registo de publicações.

RAH86 - id
"Como plantar batatas" - título
"JCR","PRH","JJ" - autores

**CSV não é ideal para datasets com mais de 2D**

JSON e XML suportam +2D

### JSON - JavaScript Object Notation

Objeto em JS é dicionário em Python

diferença entre 

{
	"type":"improceedings",
	..
}

e

{
	type:"improceedings",
	...
}

é que a primeira é sintaxe JSON e o segundo é sintace Objeto de JavaScript

### XML - eXtented Markup Language

É uma metalinguagem

```xml
<?xml version="1.0"?> //  Linha especial necessária em todos os ficheiros XML
// inicio da estrutura do documento
<aluno>  // tag de abertuda
	<id>A333333</id>  // tag de fecho (a segunda)
	<nome>Zequinha</nome>
	<foto path="imagem.jpg"/> // elemento vazio com atributo path -> atributo tem nome, igual ('=') e um valor entre aspas
	<link>http://myrepo.com</link>
</aluno>
```


## TPC1 

Criar uma página Web, com a sofisticação que entenderem, sobre um dos temas:

1. Iguana
2. Iogurte
3. Itália
4. Íris

Está na pagina https://epl.di.uminho.pt/~jcr/AULAS/EngWeb2023/index.html

##  HTML

Estrutura principal

ASCII

* A-65
* a-97
* 0-48
* ' ' - 32decimal - 0x20

```html
<html>
	<head>
		<title> A minha primeira pagina </title>
		<!-- pode aparecer <meta charset="UTF-8"/> <!-- UTF-8 é um encoding, quando se clica numa tecla é usado um encoding para saber qual tecla foi -->
		<link rev="made"
			  href="mailto:jcr@di.uminho.pt"/>
	</head>
	<body>
		<!-- ... aqui aparece conteúdo -->
	</body>
</html>
```

Há 6 bíveis de cabeçalhos de secção

### Listas

3 tipos de listas

* numeradas: \<OL\>, \<LI\>
* descritivas: \<DL\>, \<DT\>, \<DD\>
* normais: \<UL\>, \<LI\>

#### Listas Numeradas

```html
<html>
	...
	<body>
	<dl>
		<dt>

```

### Links

Apontador para algum recurso disponível na web.

A anotação é designada por âncora (anchor): <a...>

O destino especificador deverá ser um URL.

URL - Universal Resource Location

URI - Universal Resource Identifier -> Cartão de Cidadão, ISBN (livros)

É importante que as vezes os URL sejam URI

repositoriUM -> guarda todos os artigos cientificos da UM -> guarda registos, que devem ser URL persistentes, ou seja, que trabalham como URI

Fornecedor de URL Persistentes -> purl, handle

http://www.di.uminho.pt:3072/aulas/pl2023.html

http:// -> protocolo
www.di.uminho.pt -> servidor
:3027 -> port
/aulas/pl2023.html -> caminho para o recurso

podemos aceder a bookmarks com #bookmark no fim do recurso 

podemos fazer queries usando uma queryString no final ("/users?nome=jcr")

#### Link Externo

O texto que ficará associado ao link deverá ser anotado da seguinte forma:

```html
<a href="tipo://host/dir/subdir/filename">texto</a>
```

#### Link Interno

Usamos 

```html
<h1><a name="cap1">Capítulo 1</a></h1>
```

#### Elementos Block e Inline

Block: sao tratados como um todo -> paragrafo, table, div

Inline: Pode aparecer livremente no meio do conteúdo -> link, bold, italico, span

#### Div

```html
<div class="definicao">
	Exemplo deste elemento
</div>

<div style="color:red">
	Exemplo deste elemento
</div>
```

## NODEJS (pra semana)
