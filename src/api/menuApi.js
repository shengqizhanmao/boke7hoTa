import http from '../main.js'

export default {
    async getMenu() {
        let res= await http.get("/menu/get")
        return res.data;
    },
    async postUpdateMenu(param) {
        let res= await http.post("/menu/update",param)
        return res.data;
    },
    async postDeleteMenu(param) {
        let res= await http.post("/menu/delete",param)
        return res.data;
    },
    async postAddMenu(param){
        let res= await http.post("/menu/add",param)
        return res.data;
    },
}