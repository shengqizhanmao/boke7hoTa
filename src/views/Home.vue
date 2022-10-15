<template>
    <div>
      <el-container>
        <el-header height="50px">
          <div>SQZM博客</div>
          <el-button @click="logout()">退出</el-button>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    router="true"
            >
              <el-menu-item v-for="item in menu" :key="item.id" :index="item.path">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-container>
            <el-main style="height: 900px;">
              <router-view></router-view>
            </el-main>
            <el-footer>不能再往前了哟~</el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
</template>

<script>
import MenuApi from '/src/api/menuApi.js';
import LoginApi from '/src/api/loginApi.js';
import '../assets/css/index.css'
import userApi from "../api/userApi";
// import { Location, Menu, Document, Setting, Delete, IconMenu } from '@element-plus/icons-vue';
export default {
  name: 'HomeView',
  data() {
    return {
      menu:{}
    }
  },
  // components: {
  //   Location, Menu, Document, Setting, Delete,IconMenu
  // },
  created() {
    this.getMenu();
  },
  methods: {
      async getMenu(){
        const res =await MenuApi.getMenu()
        this.menu=res.data
      },
      async logout(){
        const res=await LoginApi.logout();
        if (res.success==false) return this.$message.error(res.msg)
        this.$message.success(res.msg)
        window.sessionStorage.removeItem("token")
        window.sessionStorage.removeItem("user")
        await this.$router.push('/login')
      }
  },
}
</script>
<style scoped>
</style>
