import json

atributos = []
model = {}

with open("datasetExpandido.json") as jsonFile:
    model = json.load(jsonFile)

    for p in model['pessoas']:
        atributos.extend(p['atributos'].keys())
        atributos = list(set(atributos))

print(atributos)
