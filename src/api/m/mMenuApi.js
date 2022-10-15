import http from '../../main.js'

export default {
    async getMMenu() {
        let res= await http.get("/mMenu/get")
        return res.data;
    },
    async postUpdateMMenu(param) {
        let res= await http.post("/mMenu/update",param)
        return res.data;
    },
    async postDeleteMMenu(param) {
        let res= await http.post("/mMenu/delete",param)
        return res.data;
    },
    async postAddMMenu(param){
        let res= await http.post("/mMenu/add",param)
        return res.data;
    },
}