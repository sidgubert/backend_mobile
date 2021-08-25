# -*- coding: utf-8 -*-

from flask import Flask
app = Flask("Ruas");

from routes import paths
app.register_blueprint(paths, url_prefix='/api/ruas')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)