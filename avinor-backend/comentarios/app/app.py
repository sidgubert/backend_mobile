# -*- coding: utf-8 -*-

from flask import Flask
app = Flask("Comentários");

from routes import paths
app.register_blueprint(paths, url_prefix='/api/producao')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)