import http from '../main.js'

export default {
    async getUserByToken() {
        const res  =await http.get('/user/getUserByToken')
        return res.data;
    },
    async getUser() {
        const res  =await http.get('/user/get')
        return res.data;
    },
    async postAddUser(param) {
        const res  =await http.post('/user/add',param)
        return res.data;
    },
    async postUpdateUser(param) {
        const res  =await http.post('/user/update',param)
        return res.data;
    },
    async postUpdateEnableFlag(param) {
        const res  =await http.post('/user/updateEnableFlag',param)
        return res.data;
    },
    async postDeleteUser(param) {
        const res  =await http.post('/user/delete',param)
        return res.data;
    },

}