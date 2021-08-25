import axios from 'axios';

export class ComentarioService {

    axios = axios.create();

    getByIdProducao(id, page = 1, limit = 3) {
        console.log(`http://192.168.15.6:5001/api/producao/${id}/comentarios?page=${page}&limit=${limit}`)
        return this.axios.get(`http://192.168.15.6:5001/api/producao/${id}/comentarios?page=${page}&limit=${limit}`);
    }

    publicarByIdProducao(id, autor, mensagem) {
        return this.axios.post(`http://192.168.15.6:5001/api/producao/${id}/comentarios`, {autor: autor, mensagem: mensagem});
    }

}
