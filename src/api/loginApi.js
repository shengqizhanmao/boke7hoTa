import http from '../main.js'

export default {
    async login(param) {
        let res = await http.post('/login',param)
        return res.data;
    },
    async logout() {
        let res = await http.get('/login/logout')
        return res.data;
    }
}