<template>
    <el-tabs type="border-card">
        <el-tab-pane label="普通用户">
            <el-table size="large" scrollbar-always-on="true" :data="mUser" style="width: 100%">
                <el-table-column prop="username" label="登录名" width="120" />
                <el-table-column prop="nickname" label="昵称" width="120" />
                <el-table-column label="头像" width="150" >
                    <template  #default="scope" >
                        <el-upload
                                class="avatar-uploader"
                                action="http://localhost:8086/mUser/updateMUserAvatar"
                                :data="{'id':scope.row.id}"
                                :headers="this.myHeaders"
                                :with-credentials="false"
                                method='post'
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="scope.row.avatar" :src="scope.row.avatar" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                        </el-upload>
                    </template>
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width="200" />
                <el-table-column prop="created" label="创建时间" width="200" />
                <el-table-column prop="lastLogin" label="最后一次登录" width="200" />
                <el-table-column fixed="right" label="操作" width="120">
                    <template  #default="scope" >
                        <el-button type="primary"  icon="Edit" circle  @click="updateMUser(scope.row)"/>
                        <el-button type="danger"  icon="Delete" circle @click="postDeleteMUser(scope.row.id)"/>
                    </template>
                </el-table-column>
            </el-table>
            <div style="float: left;">
                <el-button type="primary" icon="Plus" circle @click="mUserAddDialogVisible=true" />
            </div>
        </el-tab-pane>
        <el-tab-pane label="系统用户">

            <el-table size="large" scrollbar-always-on="true" :data="user" style="width: 100%">
                <el-table-column prop="loginName" label="登录名" width="100" />
                <el-table-column prop="realName" label="真实姓名" width="100" />
                <el-table-column prop="nickName" label="昵称" width="120" />
                <el-table-column prop="sex" label="性别" width="50" />
                <el-table-column prop="address" label="地址" width="200" />
                <el-table-column prop="mobil" label="电话" width="120" />
                <el-table-column prop="email" label="邮箱" width="190" />
                <el-table-column prop="duties" label="职位" width="100" />
                <el-table-column label="操作" width="120"  fixed="right">
                    <template  #default="scope" >
                        <el-button type="primary"  icon="Edit" circle  @click="updateUser(scope.row)"/>
                        <el-button type="danger"  icon="Delete" circle @click="postDeleteUser(scope.row.id)"/>
                    </template>
                </el-table-column>
                <el-table-column label="是否禁用" width="120" fixed="right" >
                    <template  #default="scope">
                        <el-switch v-model="scope.row.enable" @change="PostUserEnableFlag(scope.row)" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
                    </template>
                </el-table-column>

                <el-table-column  label="拥有权限">
                    <el-button></el-button>
                </el-table-column>
                <el-table-column label="分配权限" width="120" >
                    <template  #default="scope" >
                        <el-button />
                    </template>
                </el-table-column>
            </el-table>
            <div style="float: left;"><el-button type="primary" icon="Plus" circle @click="userAddDialogVisible=true" /></div>
            
        </el-tab-pane>

    </el-tabs>
    <!-- 添加用户user   -->
    <el-dialog
            v-model="mUserAddDialogVisible"
            title="添加普通用户"
            width="30%"
    >
        <template #footer>
             <span>
                 <el-form
                         label-width="100px"
                         align-center
                         center
                 >
                    <el-form-item label="登录名">
                      <el-input v-model="mUserAddModel.username" />
                    </el-form-item>
                    <el-form-item label="密码">
                      <el-input v-model="mUserAddModel.password" />
                    </el-form-item>
                    <el-form-item label="昵称">
                      <el-input v-model="mUserAddModel.nickname" />
                    </el-form-item>
                    <el-form-item label="邮箱">
                      <el-input v-model="mUserAddModel.email" />
                    </el-form-item>
                  </el-form>
                <el-button @click="postAddMUser()">添加</el-button>
                <el-button type="primary" @click="mUserAddDialogVisible = false"
                >取消</el-button
                >
            </span>
        </template>
    </el-dialog>
    <!-- 修改用户user   -->
    <el-dialog
            v-model="mUserUpdateDialogVisible"
            title="修改用户"
            width="30%"
    >
        <template #footer>
             <span>
                 <el-form
                         label-width="100px"
                         align-center
                         center
                 >
                    <el-form-item label="登录名">
                      <el-input v-model="mUserUpdateModel.username" disabled/>
                    </el-form-item>
                    <el-form-item label="密码">
                      <el-input v-model="mUserUpdateModel.password" />
                    </el-form-item>
                    <el-form-item label="昵称">
                      <el-input v-model="mUserUpdateModel.nickname" />
                    </el-form-item>
                    <el-form-item label="邮箱">
                      <el-input v-model="mUserUpdateModel.email" />
                    </el-form-item>
                  </el-form>
                <el-button @click="postUpdateMUser()">修改</el-button>
                <el-button type="primary" @click="userUpdateDialogVisible = false"
                >取消</el-button
                >
            </span>
        </template>
    </el-dialog>
    <!-- 添加系统用户user   -->
    <el-dialog
            v-model="userAddDialogVisible"
            title="添加系统用户"
            width="30%"
    >
        <template #footer>
             <span>
                 <el-form
                         label-width="100px"
                         align-center
                         center
                 >
                    <el-form-item label="登录名">
                      <el-input v-model="userAddModel.loginName" />
                    </el-form-item>
                    <el-form-item label="密码">
                      <el-input v-model="userAddModel.passWord" />
                    </el-form-item>
                    <el-form-item label="真实姓名">
                      <el-input v-model="userAddModel.realName" />
                    </el-form-item>
                    <el-form-item label="昵称">
                      <el-input v-model="userAddModel.nickName" />
                    </el-form-item>
                     <el-form-item label="性别">
                      <el-input v-model="userAddModel.sex" />
                    </el-form-item>
                     <el-form-item label="地址">
                      <el-input v-model="userAddModel.address" />
                    </el-form-item>
                    <el-form-item label="电话">
                      <el-input v-model="userAddModel.mobil" />
                    </el-form-item>
                    <el-form-item label="邮箱">
                      <el-input v-model="userAddModel.email" />
                    </el-form-item>
                     <el-form-item label="职位">
                      <el-input v-model="userAddModel.duties" />
                    </el-form-item>

                  </el-form>
                <el-button @click="postAddUser()">添加</el-button>
                <el-button type="primary" @click="userAddDialogVisible = false"
                >取消</el-button
                >
            </span>
        </template>
    </el-dialog>
    <!-- 修改系统用户user   -->
    <el-dialog
            v-model="userUpdateDialogVisible"
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
                    <el-form-item label="登录名">
                      <el-input v-model="userUpdateModel.loginName" disabled/>
                    </el-form-item>
                    <el-form-item label="密码">
                      <el-input v-model="userUpdateModel.passWord" />
                    </el-form-item>
                    <el-form-item label="真实姓名">
                      <el-input v-model="userUpdateModel.realName" disabled/>
                    </el-form-item>
                    <el-form-item label="昵称">
                      <el-input v-model="userUpdateModel.nickName" />
                    </el-form-item>
                     <el-form-item label="性别">
                      <el-input v-model="userUpdateModel.sex" />
                    </el-form-item>
                     <el-form-item label="地址">
                      <el-input v-model="userUpdateModel.address" />
                    </el-form-item>
                    <el-form-item label="电话">
                      <el-input v-model="userUpdateModel.mobil" />
                    </el-form-item>
                    <el-form-item label="邮箱">
                      <el-input v-model="userUpdateModel.email" />
                    </el-form-item>
                     <el-form-item label="职位">
                      <el-input v-model="userUpdateModel.duties" />
                    </el-form-item>
                  </el-form>
                <el-button @click="postUpdateUser()">修改</el-button>
                <el-button type="primary" @click="userUpdateDialogVisible = false"
                >取消</el-button
                >
            </span>
        </template>
    </el-dialog>

</template>

<script>
    import UserApi from "../../api/userApi"
    import MUserApi from "../../api/m/mUserApi"
    export default {
        name: "User.vue",
        data() {
            return {
                user:[],
                userUpdateDialogVisible :false,
                userAddDialogVisible :false,
                userUpdateModel:[],
                userAddModel:{},
                mUser:[],
                mUserUpdateDialogVisible :false,
                mUserAddDialogVisible :false,
                mUserUpdateModel:[],
                mUserAddModel:{},
                myHeaders:{Authorization:window.sessionStorage.getItem('token')},
            }
        },
        created() {
            this.getUser();
            this.getMUser();
        },
        methods: {
            //系统用户
            async getUser(){
                const res =await UserApi.getUser()
                this.user=res.data
                for (let i=0;i<=this.user.length-1;i++){
                    if (this.user[i].enableFlag==1){
                        this.user[i].enable=true
                    }else{
                        this.user[i].enable=false
                    }
                }
            },
            updateUser(userDate){
                this.userUpdateModel=userDate;
                this.userUpdateDialogVisible=true
            },
            async postAddUser(){
                const res=await UserApi.postAddUser(this.userAddModel);
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                await this.getUser();
            },
            async postUpdateUser(){
                const res=await UserApi.postUpdateUser(this.userUpdateModel);
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                this.userUpdateDialogVisible=false
            },
            async postDeleteUser(id){
                const res=await UserApi.postDeleteUser({"id":id});
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                await this.getUser();
            },
            async PostUserEnableFlag(row){
                if(row.enable){
                    row.enableFlag="1"
                }else{
                    row.enableFlag="-1"
                }
                const res=await UserApi.postUpdateEnableFlag({"id":row.id,"enableFlag":row.enableFlag});
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
            },
            //用户
            async getMUser(){
                const res =await MUserApi.getMUser()
                this.mUser=res.data
            },
            updateMUser(mUserDate){
                this.mUserUpdateModel=mUserDate;
                this.mUserUpdateDialogVisible=true
            },
            async postAddMUser(){
                const res=await MUserApi.postAddMUser(this.mUserAddModel);
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                await this.getMUser();
            },
            async postUpdateMUser(){
                const res=await MUserApi.postUpdateMUser(this.mUserUpdateModel);
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                this.mUserUpdateDialogVisible=false
            },
            async postDeleteMUser(id){
                const res=await MUserApi.postDeleteMUser({"id":id});
                if (res.success==false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                await this.getMUser();
            },
            handleAvatarSuccess(res, file){
                if (res.success === false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                this.getMUser();
            },
            beforeAvatarUpload(file){
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 10MB!');
                }
                return isJPG && isLt2M;
            },
        },
    }
</script>

<style scoped>
.avatar{
    width: 50px;
    height: 50px;
}
</style>
http://127.0.0.1:1080
plugins.jetbrains.com