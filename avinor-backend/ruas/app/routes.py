# -*- coding: utf-8 -*-
import sys, os
sys.path.append(os.getcwd())

from flask import jsonify, request, Blueprint, Response

from database import conn
from providers.rua import RuaService

paths = Blueprint('ruas', __name__)
ruaService = RuaService(conn)

@paths.route("/", methods=["GET"])
def getAll():
    return jsonify(ruaService.getAll());

@paths.route("/<_id>", methods=["GET"])
def getById(_id):
    return jsonify(ruaService.getById(_id));

@paths.route("/<_id>/galpoes", methods=["GET"])
def getGalpesById(_id):
    return jsonify(ruaService.getGalpoesById(_id));

@paths.route("/galpoes", methods=["GET"])
def getAllGalpoes():
    return jsonify(ruaService.getAllGalpoes());