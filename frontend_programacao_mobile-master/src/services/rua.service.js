import axios from 'axios';

export class RuaService {

    axios = axios.create();

    getAll() {
        return this.axios.get('http://192.168.15.6:5002/api/ruas');
    }

    getById(id) {
        return this.axios.get(`http://192.168.15.6:5002/api/ruas/${id}`);
    }

    getGalpesById(id) {
        return this.axios.get(`http://192.168.15.6:5002/api/ruas/${id}/galpoes`);
    }

    getAllGalpoes() {
        return this.axios.get('http://192.168.15.6:5002/api/ruas/galpoes');
    }
}
