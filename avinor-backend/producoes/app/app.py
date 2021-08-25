# -*- coding: utf-8 -*-

from flask import Flask
app = Flask("Producoes");

from routes import paths
app.register_blueprint(paths, url_prefix='/api/producoes')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5003, debug=True)