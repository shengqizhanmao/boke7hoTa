<template>
    <el-tabs type="border-card">
        <el-tab-pane label="用户菜单">

            <el-table size="large" scrollbar-always-on="true" :data="mMenu" style="width: 100%">
                <el-table-column prop="title" label="菜单名" width="120" />
                <el-table-column prop="path" label="菜单路径" width="120" />
                <el-table-column prop="icons" label="图标" width="150" />
                <el-table-column prop="effect" label="作用" width="200" />
                <el-table-column fixed="right" label="操作" width="120">
                    <template  #default="scope" >
                        <el-button type="primary"  icon="Edit" circle  @click="updateMMenu(scope.row)"/>
                        <el-button type="danger"  icon="Delete" circle @click="postDeleteMMenu(scope.row.id)"/>
                    </template>
                </el-table-column>
            </el-table>
            <div  style="float: left;">
                <el-button type="primary" icon="Plus" circle @click="mMenuAddDialogVisible=true" />
            </div>
        </el-tab-pane>
        <el-tab-pane label="系统菜单">
            <el-table size="large" scrollbar-always-on="true" :data="menu" style="width: 100%">
                <el-table-column prop="title" label="菜单名" width="120" />
                <el-table-column prop="path" label="菜单路径" width="120" />
                <el-table-column prop="icon" label="图标" width="150" />
                <el-table-column prop="effect" label="作用" width="200" />
                <el-table-column fixed="right" label="操作" width="120">
                    <template  #default="scope" >
                        <el-button type="primary"  icon="Edit" circle  @click="updateMenu(scope.row)"/>
                        <el-button type="danger"  icon="Delete" circle @click="postDeleteMenu(scope.row.id)"/>
                    </template>
                </el-table-column>
            </el-table>
            <div style="float: left;">
                <el-button type="primary" icon="Plus" circle @click="menuAddDialogVisible=true" />
            </div>
        </el-tab-pane>
    </el-tabs>
<!-- 修改系统菜单menu   -->
    <el-dialog
            v-model="menuUpdateDialogVisible"
            title="修改菜单"
            width="30%">
        <template #footer>
             <span>
                 <el-form
                         label-width="100px"
                         align-center
                         center>
                    <el-form-item label="菜单名">
                      <el-input v-model="menuUpdateModel.title" />
                    </el-form-item>
                    <el-form-item label="菜单路径">
                      <el-input v-model="menuUpdateModel.path" />
                    </el-form-item>
                    <el-form-item label="图标">
                      <el-input v-model="menuUpdateModel.icon" />
                    </el-form-item>
                     <el-form-item label="作用">
                      <el-input v-model="menuUpdateModel.effect" />
                    </el-form-item>
                  </el-form>
                <el-button @click="postUpdateMenu()">修改</el-button>
                <el-button type="primary" @click="menuUpdateDialogVisible = false"
                >取消</el-button
                >
            </span>
        </template>
    </el-dialog>
    <!-- 添加系统菜单menu   -->
    <el-dialog
            v-model="menuAddDialogVisible"
            title="添加菜单"
            width="30%"
    >
        <template #footer>
             <span>
                 <el-form
                         label-width="100px"
                         align-center
                         center
                 >
                    <el-form-item label="菜单名">
                      <el-input v-model="menuAddModel.title" />
                    </el-form-item>
                    <el-form-item label="菜单路径">
                      <el-input v-model="menuAddModel.path" />
                    </el-form-item>
                    <el-form-item label="图标">
                      <el-input v-model="menuAddModel.icon" />
                    </el-form-item>
                     <el-form-item label="作用">
                      <el-input v-model="menuAddModel.effect" />
                    </el-form-item>
                  </el-form>
                <el-button @click="postAddMenu()">添加</el-button>
                <el-button type="primary" @click="menuAddDialogVisible = false"
                >取消</el-button
                >
            </span>
        </template>
    </el-dialog>
    <!-- 修改用户菜单mMenu   -->
    <el-dialog
            v-model="mMenuUpdateDialogVisible"
            title="修改菜单"
            width="30%">
        <template #footer>
             <span>
                 <el-form
                         label-width="100px"
                         align-center
                         center>
                    <el-form-item label="菜单名">
                      <el-input v-model="mMenuUpdateModel.title" />
                    </el-form-item>
                    <el-form-item label="菜单路径">
                      <el-input v-model="mMenuUpdateModel.path" />
                    </el-form-item>
                    <el-form-item label="图标">
                      <el-input v-model="mMenuUpdateModel.icons" />
                    </el-form-item>
                     <el-form-item label="作用">
                      <el-input v-model="mMenuUpdateModel.effect" />
                    </el-form-item>
                  </el-form>
                <el-button @click="postUpdateMMenu()">修改</el-button>
                <el-button type="primary" @click="mMenuUpdateDialogVisible = false"
                >取消</el-button
                >
            </span>
        </template>
    </el-dialog>
    <!-- 添加用户菜单mMenu   -->
    <el-dialog
            v-model="mMenuAddDialogVisible"
            title="添加菜单"
            width="30%"
    >
        <template #footer>
             <span>
                 <el-form
                         label-width="100px"
                         align-center
                         center
                 >
                    <el-form-item label="菜单名">
                      <el-input v-model="mMenuAddModel.title" />
                    </el-form-item>
                    <el-form-item label="菜单路径">
                      <el-input v-model="mMenuAddModel.path" />
                    </el-form-item>
                    <el-form-item label="图标">
                      <el-input v-model="mMenuAddModel.icons" />
                    </el-form-item>
                     <el-form-item label="作用">
                      <el-input v-model="mMenuAddModel.effect" />
                    </el-form-item>
                  </el-form>
                <el-button @click="postAddMMenu()">添加</el-button>
                <el-button type="primary" @click="mMenuAddDialogVisible = false"
                >取消</el-button
                >
            </span>
        </template>
    </el-dialog>
</template>

<script>
    import MMenuApi from "../../api/m/mMenuApi"
    import MenuApi from "../../api/menuApi";
    export default {
        name: "Menu.vue",
        data() {
            return {
                menu:[],
                menuUpdateDialogVisible :false,
                menuAddDialogVisible :false,
                menuUpdateModel:[],
                menuAddModel:{},
                mMenu:[],
                mMenuUpdateDialogVisible :false,
                mMenuAddDialogVisible :false,
                mMenuUpdateModel:[],
                mMenuAddModel:{},
            }
        },
        created() {
            this.getMenu();
            this.getMMenu();
        },
        methods: {
            //系统菜单
            async getMenu(){
                const res =await MenuApi.getMenu()
                this.menu=res.data
            },
            updateMenu(menuDate){
                this.menuUpdateModel=menuDate;
                this.menuUpdateDialogVisible=true
            },
            async postAddMenu(){
                const res=await MenuApi.postAddMenu(this.menuAddModel);
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                await this.getMenu();
            },
            async postUpdateMenu(){
                // console.log(this.menuUpdateModel)
                const res=await MenuApi.postUpdateMenu(this.menuUpdateModel);
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                this.menuUpdateDialogVisible=false
            },
            async postDeleteMenu(id){
                const res=await MenuApi.postDeleteMenu({"id":id});
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                await this.getMenu();
            },
            //用户菜单
            async getMMenu(){
                const res =await MMenuApi.getMMenu()
                this.mMenu=res.data
            },
            updateMMenu(mMenuDate){
                this.mMenuUpdateModel=mMenuDate;
                this.mMenuUpdateDialogVisible=true
            },
            async postAddMMenu(){
                const res=await MMenuApi.postAddMMenu(this.mMenuAddModel);
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                await this.getMMenu();
            },
            async postUpdateMMenu(){
                // console.log(this.menuUpdateModel)
                const res=await MMenuApi.postUpdateMMenu(this.mMenuUpdateModel);
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                this.menuUpdateDialogVisible=false
            },
            async postDeleteMMenu(id){
                const res=await MMenuApi.postDeleteMMenu({"id":id});
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                await this.getMMenu();
            },

        },
    }

</script>

<style scoped>

</style>