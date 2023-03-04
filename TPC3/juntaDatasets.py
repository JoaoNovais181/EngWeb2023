import json

informacao = {}
aux = {}

with open("datasets/dataset.json", "r", encoding='utf-8') as ficheiroJson:

    informacao = json.load(ficheiroJson)

with open("datasets/dataset-extra1.json", "r", encoding="utf-8") as ficheiroJson:
    
    aux = json.load(ficheiroJson)

    informacao['pessoas'].extend(aux['pessoas'])

with open("datasets/dataset-extra2.json", "r", encoding="utf-8") as ficheiroJson:
    
    aux = json.load(ficheiroJson)

    informacao['pessoas'].extend(aux['pessoas'])

with open("datasets/dataset-extra3.json", "r", encoding="utf-8") as ficheiroJson:
    
    aux = json.load(ficheiroJson)

    informacao['pessoas'].extend(aux['pessoas'])

for indice, pessoa in enumerate(informacao['pessoas']):

    pessoa['id'] = "p" + str(indice)



with open("datasets/datasetExpandido.json", "w", encoding="utf-8") as ficheiroJson:
    
    json.dump(informacao, ficheiroJson)

