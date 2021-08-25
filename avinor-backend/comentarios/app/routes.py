# -*- coding: utf-8 -*-
import sys, os
sys.path.append(os.getcwd())

import json
from flask import jsonify, request, Blueprint, Response

from database import conn
from providers.comentario import ComentarioService

paths = Blueprint('producao', __name__)
comentarioService = ComentarioService(conn)

@paths.route("/<_id>/comentarios", methods=["GET"])
def getAll(_id):
    return jsonify(comentarioService.getById(_id));

@paths.route("/<_id>/comentarios", methods=["POST"])
def save(_id):
    content = request.json
    uid = comentarioService.save(_id, content['autor'], content['mensagem'])
    return Response("OK", 200);