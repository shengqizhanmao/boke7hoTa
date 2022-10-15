import http from '../main.js'

export default {
    async get() {
        let res = await http.get("/resource/get")
        return res.data;
    },
    async add(param) {
        let res = await http.post("/resource/add",param)
        return res.data;
    },
    async update(param) {
        let res = await http.post("/resource/update",param)
        return res.data;
    },
    async delete(param) {
        let res = await http.post("/resource/delete",param)
        return res.data;
    },
    async UpdateEnableFlag(param){
        let res = await http.post("/resource/delete",param)
        return res.data;
    },
    async getListResourceByTypeResources(){
        let res = await http.get("/resource/getListResourceByTypeResources")
        return res.data;
    },

}