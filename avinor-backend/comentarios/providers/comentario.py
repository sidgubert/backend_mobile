class ComentarioService:
    
    def __init__(self, con):
        self.con = con

    def getById(self, id: int, page=None, limit=None):
        cur = self.con.cursor()
        sql = "select * from comentario_producao A, producao B where B.id = A.producao_id and B.id = :id";
        
        if(page and limit):
            sql += " "

        cur.execute(sql, {"id": id})
        return cur.fetchall()

    def save(self, id: int, autor: str, mensagem: str):
        cur = self.con.cursor()
        sql = "insert into comentario_producao (autor, mensagem, producao_id, criado_em) VALUES (:autor, :mensagem, :id, DateTime('now'))";
        cursor = cur.execute(sql, {"id": id, "autor": autor, "mensagem": mensagem});
        self.con.commit();
        return cursor.lastrowid
