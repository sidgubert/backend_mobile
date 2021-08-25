class ProducaoService:
    
    def __init__(self, con):
        self.con = con

    def getAll(self, rua=None, fornecedor=None):
        cur = self.con.cursor()
        
        sql =  "select DISTINCT A.galpao_id, A.*, " 
        sql += "B.nome as galpao, B.id as galpao_id, B.responsavel, B.descricao, ";
        sql += "C.nome as fornecedor, C.id as fornecedor_id, ";
        sql += "D.nome as rua, D.id as rua_id ";
        sql += "from producao A, galpao B, fornecedor C, rua D ";
        sql += "WHERE A.galpao_id = B.id AND A.fornecedor_id = C.id AND B.rua_id = D.id ";
        params = {};
        
        if(rua): 
            sql += "AND D.nome = :rua"
            params['rua'] = rua
        
        if(fornecedor): 
            sql += "AND C.nome = :fornecedor"
            params['fornecedor'] = fornecedor

        print(sql)
        
        sql += " order by inicio_em"

        cur.execute(sql, params)
        return cur.fetchall()

    def getById(self, id: int):
        cur = self.con.cursor()
        cur.execute("select * from producao A, galpao B where A.id = B.galpao_id where id = :id", {"id": id})
        return cur.fetchone()

    def getGalpesById(self, id: int):
        cur = self.con.cursor()
        cur.execute("select * from producao A, galpao B where A.id = B.galpao_id and A.id = :id", {"id": id})
        return cur.fetchall()

