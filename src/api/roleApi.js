import http from '../main.js'

export default {
    async get() {
        let res= await http.get("/role/get")
        return res.data;
    },
    async add(param) {
        let res= await http.post("/role/add",param)
        return res.data;
    },
    async update(param) {
        let res= await http.post("/role/update",param)
        return res.data;
    },
    async delete(param) {
        let res= await http.post("/role/delete",param)
        return res.data;
    },
    async addRoleAndResource(param){
        let res= await http.post("/role/addRoleAndResource",param)
        return res.data;
    },
    async deleteRoleResource(param){
        let res= await http.post("/role/deleteRoleAndResource",param)
        return res.data;
    },
}