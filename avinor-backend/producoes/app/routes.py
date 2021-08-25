# -*- coding: utf-8 -*-
import sys, os
sys.path.append(os.getcwd())

from flask import jsonify, request, Blueprint, Response

from database import conn
from providers.producao import ProducaoService

paths = Blueprint('producao', __name__)
producaoService = ProducaoService(conn)

@paths.route("/", methods=["GET"])
def getAll():
    print(request.args.get('fornecedor'))
    return jsonify(producaoService.getAll(request.args.get('rua'), request.args.get('fornecedor')));

@paths.route("/<_id>", methods=["GET"])
def getById(_id):
    return jsonify(producaoService.getById(_id));