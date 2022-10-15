import http from '../../main.js'

export default {
    async getMUser() {
        let res= await http.get("/mUser/get")
        return res.data;
    },
    async postAddMUser(param){
        let res= await http.post("/mUser/add",param)
        return res.data;
    },
    async postUpdateMUser(param) {
        let res= await http.post("/mUser/update",param)
        return res.data;
    },
    async postUpdateAvatar(param){
        let res= await http.post("/mUser/updateMUserAvatar",param)
        return res.data;
    },
    async postDeleteMUser(param) {
        let res= await http.post("/mUser/delete",param)
        return res.data;
    },

}