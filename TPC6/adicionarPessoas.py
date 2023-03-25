import json, requests

URL = 'http://localhost:3000/pessoas'

with open("./datasetExpandido.json", "r", encoding="utf-8") as ficheiroJSON:
    dados = json.load(ficheiroJSON)
    
    for pessoa in dados['pessoas']:
        _id = pessoa.pop('id')
        pessoa['_id'] = _id

        if 'descrição' in pessoa.keys():
            descricao = pessoa.pop('descrição')
            pessoa['descricao'] = descricao

        resp = requests.post(URL, json=pessoa)
