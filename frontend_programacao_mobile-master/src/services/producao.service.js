import axios from 'axios';

export class ProducaoService {

    axios = axios.create();

    getAll(options = {}) {
        return this.axios.get(`http://192.168.15.6:5003/api/producoes?page=${options.page || 1}&limit=${options.limit}${options.fornecedor ? `&fornecedor=${options.fornecedor}` : ''}${options.rua ? `&rua=${options.rua}` : ''}`);
    }

    getById(id) {
        return this.axios.get(`http://192.168.15.6:5003/api/producoes/${id}`);
    }

}
