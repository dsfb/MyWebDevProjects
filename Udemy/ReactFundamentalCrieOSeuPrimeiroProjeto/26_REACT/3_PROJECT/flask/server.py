#!/usr/bin/python
# coding: utf-8
import os, sys
from flask import Flask, Response, json, url_for, redirect, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # This will enable CORS for all routes


def get_json():
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "../todo/data", "db.json")
    data = json.load(open(json_url))
    return data


def set_json(data):
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "../todo/data", "db.json")
    with open(json_url, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


@app.route('/todos',methods = ['POST', 'GET'])
def todos():
    if request.method == 'POST':
        todo = request.json
        data = get_json()
        data['todos'].append(todo)
        set_json(data)
        data = {'message': 'Done', 'code': 'SUCCESS'}
        return data, 200
    elif request.method == 'GET':
        data = get_json()
        return Response(json.dumps(data['todos']),  mimetype='application/json')


@app.route('/todos/<todo_id>',methods = ['DELETE', 'PUT'])
def new_todos(todo_id):
    if request.method == 'DELETE':
        data = get_json()
        for idx in range(len(data['todos'])):
            todo = data['todos'][idx]
            if str(todo['id']) == todo_id:
                data['todos'].pop(idx)
                set_json(data)
                break
        data = {'message': 'Done', 'code': 'SUCCESS'}
        return data, 200
    elif request.method == 'PUT':
        content = request.json
        todo = content
        data = get_json()
        # print('Debugging id = ' + id, file=sys.stderr)
        for idx in range(len(data['todos'])):
            todo = data['todos'][idx]
            if str(todo['id']) == todo_id:
                data['todos'][idx]['done'] = not todo['done']
                break
        set_json(data)
        data = {'message': 'Done', 'code': 'SUCCESS'}
        return data, 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
