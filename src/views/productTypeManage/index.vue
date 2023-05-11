<template>
  <div class="account">
      <el-row :gutter="20" style="padding: 20px;">
    <el-col :span="6">
        <div style="display: inline-block;width:30%;">分类名称：</div>
        <el-input style="width: 70%" v-model="searchusername" @change="getTableData()" autocomplete="off"></el-input>
    </el-col>
    <el-col :span="6">
        <el-button type="primary" @click="getTableData()">搜 索</el-button>
    </el-col>
    </el-row>
    <div style="padding: 15px;overflow: hidden;">
      <el-button type="primary"  style="float:right;" @click="addAccountButt('ruleForm')">添加分类</el-button>
    </div>
    <div style="padding: 0 20px">
        <el-table
    :data="tableData"
    border
    style="width: 100%;border-radius: 10px;">
    <el-table-column
      prop="name"
      label="分类名称">
    </el-table-column>
    <el-table-column
      prop="remarks"
      label="备注">
    </el-table-column>
    <el-table-column
      prop="date"
      label="操作时间">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button  @click="seeAccountButt(scope.row)" type="text" size="small">查看</el-button>
        <el-button  type="text" @click="editAccountButt(scope.row)" size="small">编辑</el-button>
        <el-popconfirm
            title="是否确定删除该分类？"
            @onConfirm="accountDel(scope.row)" 
        >
        <el-button style="margin: 0 10px;" slot="reference"  type="text" size="small">删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
    </div>
  <div style="text-align: center;
    margin-top: 20px;">
      <el-pagination
      background
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30]"
      :page-size="pageSize"
      layout="total,  prev, pager, next, sizes,jumper"
      :total="totalPage">
    </el-pagination>
  </div> 
  <el-dialog :close-on-click-modal="false" :title="titleForm" :show-close="false" :visible.sync="dialogAccountVisible">
  <el-form :model="form" :rules="rulesAccount" ref="ruleForm" label-width="100px">
    <el-form-item label="分类名称" prop="name">
      <el-input style="width: 300px" :disabled="titleForm.indexOf('查看')!== -1" v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remarks">
      <el-input style="width: 300px" type="textarea" :rows="4":disabled="titleForm.indexOf('查看')!== -1" v-model="form.remarks" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancelSubmit('ruleForm')">取 消</el-button>
    <el-button :disabled="titleForm.indexOf('查看')!== -1" :loading="loadingAccount" type="primary" @click="submitAccount('ruleForm')">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { producttypelist, addProductType, producttypedel, producttypeedit } from "@/api/productTypeManage";


export default {
  name: 'Login',
  data() {
    let checkamount = (rule, value, callback) => {
      let val = Number(value)
      if(value === ''){
        callback(new Error('请填写产品价格'));
        return
      }
      if(typeof val !== 'number' || value.indexOf('-')!= -1){
        callback(new Error('请填写产品价格'));
        return
      }
      if (isNaN(val)) {
        callback(new Error('请填写产品价格'));
        return
      }
       callback();
    };
    return {
        searchusername:'',
        searchno:'',
        searchrolename:'',
        currentPage: 1,
      totalPage: 0,
      pageSize: 10,
      dialogAccountVisible: false,
      form: {
        remarks: '',
        name: '',
      },
      message_: null,
      message1_:null,
      roleList: {},
      titleForm:'',
      rights_list: {},
      rulesAccount: {
        remarks: [
            { required: false}
        ],
        name: [
            { required: true, message: '请填写产品名称', trigger: 'blur' }
        ],
      },
      loadingAccount: false,
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      tableData: [],
      accountId: '',
      wordVisible: false,
      word:'',
      account:''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
      sizeChange(val){
        this.currentPage = 1;
        this.pageSize = val;
        this.getTableData()
    },
    currentChange(val){
        this.currentPage = val;
        this.getTableData()
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // this.$refs[formName].resetFields();
    seeAccountButt(data) {
      this.titleForm = '查看产品'
      this.accountId = data.id
      this.form.remarks = data.remarks
      this.form.name = data.name
      this.dialogAccountVisible = true
    },
    editAccountButt(data) {
      this.accountId = data.id
      this.titleForm = '编辑产品'
      this.form.remarks = data.remarks
      this.form.name = data.name
      this.dialogAccountVisible = true
    },
    addAccountButt(formName) {
      this.accountId = '';
      this.titleForm = '添加产品'
      this.dialogAccountVisible = true
    },
    cancelSubmit(formName) {
      this.accountId = '';
      this.dialogAccountVisible = false;
      this.$refs[formName].resetFields();
    },
    submitAccount(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.titleForm.indexOf('添加') !== -1){
              console.log(this.titleForm)
              this.addDataFun(formName)
            }else{
              console.log(this.titleForm)
              this.editDataFun(formName)
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    addDataFun(formName1){
      this.loadingAccount = true
      addProductType({
              "name": this.form.name,
              "remarks": this.form.remarks,
              "uid": sessionStorage.getItem('uid'),
              })
            .then(r => {
              this.loadingAccount = false
              this.dialogAccountVisible = false
              this.word = r.info
              this.account = this.form.account
              this.$refs[formName1].resetFields();
              // this.wordVisible = true
              this.getTableData()
              setTimeout(()=>{
                // this.wordVisible = true
                console.log('123')
              },500)
              
            })
            .catch(() => {
              this.loadingAccount = false
            });
    },
    editDataFun(formName) {
      this.loadingAccount = true
      producttypeedit({
              "name": this.form.name,
              "uid": sessionStorage.getItem('uid'),
              "remarks": this.form.remarks,
              "id": this.accountId,})
            .then(r => {
              this.loadingAccount = false
              this.dialogAccountVisible = false
              this.$refs[formName].resetFields();
              this.getTableData()
            })
            .catch(() => {
              this.loadingAccount = false
            });
    },
    accountDel(data) {
      producttypedel({
            "id": data.id,
            "uid": sessionStorage.getItem('uid')})
            .then(r => {
              console.log(r)
              this.getTableData()
              this.$message({
                message: '删除成功！',
                type: 'success'
                });
            })
            .catch(() => {
            }); 
    },
    getTableData() {
      producttypelist({"name": this.searchusername,
        "uid": sessionStorage.getItem('uid'),
        "pages":this.currentPage,
        "pagesize":this.pageSize
        })
      .then(r => {
            this.tableData = r.data.data_list;
            this.totalPage = r.data.datacount
        }).catch(() => {});
    }
  },
  beforeDestroy(){
      this.message1_.close()
  },
//   message_
  mounted: function() {
      this.getTableData()
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.role{
  height: 100%;
  background: #fff;
}
</style>
