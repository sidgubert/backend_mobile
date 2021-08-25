class RuaService:
    
    def __init__(self, con):
        self.con = con

    def getAll(self):
        cur = self.con.cursor()
        cur.execute("select * from rua")
        return cur.fetchall()

    def getById(self, id: int):
        cur = self.con.cursor()
        cur.execute("select * from rua where id = :id", {"id": id})
        return cur.fetchone()

    def getAllGalpoes(self):
        cur = self.con.cursor()
        cur.execute("select A.*, B.nome as galpao, B.descricao as descricao from rua A, galpao B where A.id = B.rua_id")
        return cur.fetchall()

    def getGalpoesById(self, id: int):
        cur = self.con.cursor()
        cur.execute("select A.*, B.nome as galpao, B.descricao as descricao from rua A, galpao B where A.id = B.rua_id and A.id = :id", {"id": id})
        return cur.fetchall()

