<template>
    <el-tabs type="border-card">
        <el-tab-pane label="角色">
            <el-table size="large" scrollbar-always-on="true" border :data="role" style="width: 100%" >
                <el-table-column prop="roleName" label="角色名称" width="120" />
                <el-table-column prop="label" label="级别" width="120" />
                <el-table-column prop="description" label="作用" width="150" />
                <el-table-column prop="sortNo" label="顺序" width="150" />
                <el-table-column label="拥有的资源权限">
                    <template  #default="scope" >
                        <el-button type="primary" lable="查看"  icon="View" circle  @click="findResource(scope.row)"/>
                    </template>
                </el-table-column>
                <el-table-column label="是否禁用" width="120" fixed="right" >
                        <template  #default="scope">
                            <el-switch  v-model="scope.row.enableFlag" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
                        </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                     <template  #default="scope" >
                         <el-button type="primary"  icon="Edit" circle  @click="updateRole(scope.row)"/>
                         <el-button type="danger"  icon="Delete" circle @click="postDeleteRole(scope.row.id)"/>
                     </template>
                </el-table-column>
            </el-table>
            <div style="float: left;"><el-button type="primary" icon="Plus" circle @click="roleAddDialogVisible=true" /></div>
        </el-tab-pane>

        <el-tab-pane label="资源">
            <el-tabs type="border-card" >
                <el-tab-pane v-for="item in resource" :label="item.resourceName">
                    <el-table size="large" scrollbar-always-on="true" :data="item.listResourceLeaf" border style="width: 100%" >
                        <el-table-column prop="resourceName" label="资源名称" width="120" />
                        <el-table-column prop="requestPath" label="资源路径" width="120" />
                        <el-table-column prop="lavel" label="权限" width="150" />
                        <el-table-column prop="resourceType" label="类型" width="150" />
                        <el-table-column prop="description" label="作用" width="150" />
                        <el-table-column prop="sortNo" label="顺序" width="50" />
                        <el-table-column fixed="right" label="操作" width="120">
                            <template  #default="scope" >
                                <el-button type="primary"  icon="Edit" circle  @click="updateResource(scope.row)"/>
                                <el-button type="danger"  icon="Delete" circle @click="postDeleteResource(scope.row.id)"/>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="float: left;"><el-button type="primary" icon="Plus" circle @click="resourceAddDialogVisible=true" /></div>
                </el-tab-pane>
            </el-tabs>
        </el-tab-pane>
    </el-tabs>

    <!-- 资源添加   -->
    <el-dialog
            v-model="resourceAddDialogVisible"
            title="添加菜单"
            width="30%"
    >
        <template #footer>
             <span>
                 <el-form
                         label-width="150px"
                         align-center
                         center>
                    <el-form-item label="角色名称">
                      <el-input v-model="resourceAddModel.resourceName" />
                    </el-form-item>
                    <el-form-item label="资源路径">
                      <el-input v-model="resourceAddModel.requestPath" />
                    </el-form-item>
                    <el-form-item label="权限">
                      <el-input v-model="resourceAddModel.lavel" />
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="resourceAddModel.resourceType">
                            <el-option label="资源" value="资源" />
                            <el-option label="目录" value="目录" />
                        </el-select>
                    </el-form-item>
                     <el-form-item v-if="resourceAddModel.resourceType=='资源'" label="选择资源所在的目录">
                        <el-select v-model="resourceAddModel.parentId" filterable >
                            <el-option  v-for="item in resource" :value="item.id"  :label="item.resourceName"/>
                        </el-select>
                    </el-form-item>
                     <el-form-item  label="顺序">
                         <el-input v-model="resourceAddModel.sortNo" />
                     </el-form-item>
                     <el-form-item label="作用">
                      <el-input v-model="resourceAddModel.description" />
                    </el-form-item>
                  </el-form>
                <el-button @click="postAddResource()">添加</el-button>
                <el-button type="primary" @click="resourceAddDialogVisible = false">取消</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 资源修改  -->
    <el-dialog
            v-model="resourceUpdateDialogVisible"
            title="修改资源"
            width="30%"
    >
        <template #footer>
             <span>
                 <el-form
                         label-width="150px"
                         align-center
                         center
                 >
                    <el-form-item label="角色名称">
                      <el-input v-model="resourceUpdateModel.resourceName" />
                    </el-form-item>
                    <el-form-item label="资源路径">
                      <el-input v-model="resourceUpdateModel.requestPath" />
                    </el-form-item>
                    <el-form-item label="权限">
                      <el-input v-model="resourceUpdateModel.lavel" />
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="resourceUpdateModel.resourceType">
                            <el-option label="资源" value="资源" />
                            <el-option label="目录" value="目录" />
                        </el-select>
                    </el-form-item>
                     <el-form-item v-if="resourceUpdateModel.resourceType=='资源'" label="选择资源所在的目录">
                        <el-select v-model="resourceUpdateModel.parentId" >
                            <el-option  v-for="item in resource" :value="item.id" :label="item.resourceName"/>
                        </el-select>
                    </el-form-item>
                     <el-form-item  label="顺序">
                         <el-input v-model="resourceUpdateModel.sortNo" />
                     </el-form-item>
                     <el-form-item label="作用">
                      <el-input v-model="resourceUpdateModel.description" />
                    </el-form-item>

                  </el-form>
                <el-button @click="postUpdateResource()">修改</el-button>
                <el-button type="primary" @click="userUpdateDialogVisible = false">取消</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 角色添加   -->
    <el-dialog
            v-model="roleAddDialogVisible"
            title="添加角色"
            width="30%"
    >
        <template #footer>
             <span>
                 <el-form
                         label-width="150px"
                         align-center
                         center>
                    <el-form-item label="角色名称">
                      <el-input v-model="roleAddModel.roleName" />
                    </el-form-item>
                    <el-form-item label="级别">
                      <el-input v-model="roleAddModel.label" />
                    </el-form-item>
                     <el-form-item  label="顺序">
                         <el-input v-model="roleAddModel.sortNo" />
                     </el-form-item>
                     <el-form-item label="作用">
                      <el-input v-model="roleAddModel.description" />
                    </el-form-item>
                  </el-form>
                <el-button @click="postAddRole()">添加</el-button>
                <el-button type="primary" @click="roleAddDialogVisible = false">取消</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 角色修改   -->
    <el-dialog
            v-model="roleUpdateDialogVisible"
            title="修改角色"
            width="30%"
    >
        <template #footer>
             <span>
                 <el-form
                         label-width="150px"
                         align-center
                         center

                 >
                    <el-form-item label="角色名称">
                      <el-input v-model="roleUpdateModel.roleName" />
                    </el-form-item>
                    <el-form-item label="级别">
                      <el-input v-model="roleUpdateModel.label" />
                    </el-form-item>
                     <el-form-item  label="顺序">
                         <el-input v-model="roleUpdateModel.sortNo" />
                     </el-form-item>
                     <el-form-item label="作用">
                      <el-input v-model="roleUpdateModel.description" />
                    </el-form-item>
                  </el-form>
                <el-button @click="postUpdateRole()">修改</el-button>
                <el-button type="primary" @click="userUpdateDialogVisible = false">取消</el-button>
            </span>
        </template>
    </el-dialog>
    <!--角色查看权限-->
    <el-dialog
            v-model="roleAndResourceDialogVisible"
            title="查看权限"
            width="60%"
    >
        <template #footer>
             <span>
                <el-table size="large" border scrollbar-always-on="true" :data="roleAndResourceModel.listResourceName" style="width: 100%" >
                    <el-table-column prop="resourceName" label="角色名称" width="120" />
                    <el-table-column prop="requestPath" label="资源路径" width="120" />
                    <el-table-column prop="lavel" label="权限" width="150" />
                    <el-table-column prop="resourceType" label="类型" width="150" />
                    <el-table-column prop="description" label="作用" width="150" />
                    <el-table-column prop="sortNo" label="顺序" width="50" />
                    <el-table-column fixed="right" label="操作" width="120">
                        <template  #default="scope" >
                            <el-button type="danger"  icon="Delete" circle @click="postDeleteRoleResource(scope.row.id,roleAndResourceModel.roleId)"/>
                        </template>
                    </el-table-column>
                </el-table>
                 <el-button @click="roleAndResourceAddDialogVisible=true">添加</el-button>
                <el-button type="primary" @click="roleAndResourceDialogVisible = false">关闭</el-button>
            </span>
        </template>
    </el-dialog>
    <!--角色添加资源    -->
    <el-dialog
            v-model="roleAndResourceAddDialogVisible"
            title="角色添加资源"
            width="60%"

    >
        <template #footer>
             <span >
                 <span style="clear:both;float: left">
                      选择目录权限:<el-select v-model="value1" multiple placeholder="Select" style="width: 240px;">
                          <el-option v-for="item in resource" :key="item.id" :label="item.resourceName" :value="item.id"/>
                     </el-select><br>
                 </span >
                 <span style="clear:both;float: left">
                 选择资源权限:<el-select v-model="value2" multiple placeholder="Select" style="width: 240px">
                    <el-option v-for="item in listResourceByTypeResources" :key="item.id" :label="item.resourceName" :value="item.id"/>
                 </el-select><br>
                 </span>
                 <div style="height: 400px"></div>
                 <el-button  @click="postAddRoleResource()">添加</el-button>
                <el-button type="primary" @click="roleAndResourceAddDialogVisible = false">关闭</el-button>
            </span>
            <span style="clear:both;"></span>
        </template>
    </el-dialog>
</template>

<script>
    import ResourceApi from "../../api/resourceApi";
    import RoleApi from "../../api/roleApi";
    export default {
        name: "resource.vue",
        data() {
            return {
                resource:[],
                resourceUpdateDialogVisible :false,
                resourceAddDialogVisible :false,
                resourceUpdateModel:[],
                resourceAddModel:{
                    "description":"",
                    "resourceType":"目录",
                    "requestPath":"",
                    "lavel":"",
                    "parentId":"",
                    "resourceName":"",
                    "sortNo":0
                },
                role:[],
                roleUpdateDialogVisible :false,
                roleAddDialogVisible :false,
                roleUpdateModel:[],
                roleAddModel:{
                    "roleName":"",
                    "label":"",
                    "description":"",
                    "enableFlag":"",
                    "sortNo":0
                },
                roleAndResourceDialogVisible:false,
                roleAndResourceModel:[],
                roleAndResourceAddDialogVisible:false,
                checkAll:true,
                value1:[],
                value2:[],
                value3:[],
                listResourceByTypeResources:[],

            }
        },
        created() {
            this.getResource();
            this.getRole();
            this.getListResourceByTypeResources();
        },
        methods: {
            //资源
            async getResource(){
                const res =await ResourceApi.get();
                this.resource=res.data
            },
            updateResource(resourceDate){
                this.resourceUpdateModel=resourceDate;
                this.resourceUpdateDialogVisible=true
            },
            async postAddResource(){
                const res=await ResourceApi.add(this.resourceAddModel);
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                this.resourceAddModel={"description":"", "resourceType":"目录", "requestPath":"", "lavel":"", "parentId":"", "resourceName":"","sortNo":0}
                await this.getResource();
            },
            async postUpdateResource(){
                const res=await ResourceApi.update(this.resourceUpdateModel);
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                this.resourceUpdateDialogVisible=false
            },
            async postDeleteResource(id){
                const res=await ResourceApi.delete({"id":id});
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                await this.getResource();
            },
            //角色
            async getRole(){
                const res =await RoleApi.get();
                this.role=res.data
            },
            updateRole(roleUpdateDate){
                this.roleUpdateModel=roleUpdateDate;
                this.roleUpdateDialogVisible=true
            },
            async postAddRole(){
                const res=await RoleApi.add(this.roleAddModel);
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                this.roleAddModel={"roleName":"",
                    "label":"",
                    "description":"",
                    "enableFlag":"",
                    "sortNo":0}
                await this.getRole();
            },
            async postUpdateRole(){
                const res=await RoleApi.update({"id":this.roleUpdateModel.id,
                    "description":this.roleUpdateModel.description,
                    "label":this.roleUpdateModel.label,
                    "roleName":this.roleUpdateModel.roleName,
                    "sortNo":this.roleUpdateModel.sortNo});
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                this.roleUpdateDialogVisible=false
            },
            async postDeleteRole(id){
                const res=await RoleApi.delete({"id":id});
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                await this.getRole();
            },
            findResource(listResource){
                this.roleAndResourceModel.listResourceName=listResource.listResourceName;
                this.roleAndResourceModel.roleId=listResource.id;
                this.roleAndResourceDialogVisible=true
            },
            async postDeleteRoleResource(id,roleId){
                const res=await RoleApi.deleteRoleResource({"roleId": roleId, "resourceId": id})
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                await this.getRole();
                this.roleAndResourceDialogVisible=false
            },
            async getListResourceByTypeResources(){
                const res=await ResourceApi.getListResourceByTypeResources();
                if (res.success==false) return this.$message.error(res.msg)
                this.listResourceByTypeResources=res.data;
            },
            async postAddRoleResource(){
                for (let i in this.value1){
                    this.value3.push(this.value1[i])
                }
                for (let i in this.value2){
                    this.value3.push(this.value2[i])
                }
                console.log(this.value3)
                const res= await RoleApi.addRoleAndResource({"roleId":this.roleAndResourceModel.roleId,"listResourceId":this.value3})
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                this.value1=[]
                this.value2=[]
                this.value3=[]
                await this.getRole()
                this.roleAndResourceAddDialogVisible=false
                this.roleAndResourceDialogVisible=false
            }
        },
    }
</script>

<style scoped>

</style>