<template>
  <div class="account">
      <el-row :gutter="20" style="padding: 20px;">
    <el-col :span="6">
        <div style="display: inline-block;width:30%;">产品名称：</div>
        <el-input style="width: 70%" v-model="searchusername" @change="getTableData(1)" autocomplete="off"></el-input>
    </el-col>
    <el-col :span="6">
        <div style="display: inline-block;width:30%;">产品编码：</div>
        <el-input style="width: 70%" v-model="searchno" @change="getTableData(1)" autocomplete="off"></el-input>
    </el-col>
    <el-col :span="6">
        <div style="display: inline-block;width:30%;">产品分类：</div>
        <el-select v-model="searchType" style="width: 70%" @change="getTableData(1)" clearable  placeholder="请选择产品分类">
          <el-option
            v-for="item in productTypeData"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
    </el-col>
    
    <el-col :span="6">
        <el-button type="primary" @click="getTableData(1)">搜 索</el-button>
    </el-col>
    </el-row>
    <div style="padding: 15px;overflow: hidden;">
      <el-button type="primary"  style="float:right;" @click="addAccountButt('ruleForm')">添加产品</el-button>
    </div>
    <div style="padding: 0 20px">
        <el-table
    :data="tableData"
    border
    style="width: 100%;border-radius: 10px;">
    <el-table-column
      prop="no"
      label="产品编码">
    </el-table-column>
    <el-table-column
      prop="name"
      label="产品名称">
    </el-table-column>
    <el-table-column
      prop="type"
      label="产品分类">
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格">
    </el-table-column>
    <el-table-column
      prop="date"
      label="录入时间">
    </el-table-column>
    <el-table-column
      prop="editDate"
      label="修改日期">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button  @click="seeAccountButt(scope.row)" type="text" size="small">查看</el-button>
        <el-button  type="text" @click="editAccountButt(scope.row)" size="small">编辑</el-button>
        <el-popconfirm
            title="是否确定删除该产品？"
            @onConfirm="accountDel(scope.row)" 
        >
        <el-button style="margin: 0 10px;" slot="reference"  type="text" size="small">删除</el-button>
        </el-popconfirm>
        <el-button  type="text" @click="topFun(scope.row)" size="small">置顶</el-button>
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
    <el-form-item label="产品编码" v-show="titleForm.indexOf('添加')=== -1" prop="no">
      <el-input style="width: 300px" :disabled="true" v-model="form.no" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="产品名称" prop="name">
      <el-input style="width: 300px" :disabled="titleForm.indexOf('查看')!== -1" v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="产品分类" prop="type">
      <el-select style="width: 300px" :disabled="titleForm.indexOf('查看')!== -1" v-model="form.type" placeholder="请选择产品分类">
          <el-option
            v-for="item in productTypeData"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="价格" prop="price">
      <el-input style="width: 300px" :disabled="titleForm.indexOf('查看')!== -1" v-model="form.price" autocomplete="off"></el-input>
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
import { productlist, addProduct, productbind, productdel, productedit, productTop } from "@/api/productManage";
import { producttypelist } from "@/api/productTypeManage";

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
        searchType: '',
        currentPage: 1,
      totalPage: 0,
      pageSize: 10,
      dialogAccountVisible: false,
      form: {
        no: '',
        name: '',
        price: '',
        type: ''
      },
      message_: null,
      message1_:null,
      roleList: {},
      titleForm:'',
      rights_list: {},
      rulesAccount: {
        no: [
            { required: false}
        ],
        name: [
            { required: true, message: '请填写产品名称', trigger: 'blur' }
        ],
        price: [
            { required: true, validator: checkamount, trigger: 'blur' }
        ],
        type: [
            { required: true, message: '请选择产品分类', trigger: 'blur' }
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
      productTypeData: [],
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
      this.getuserbind()
    },
    editAccountButt(data) {
      this.accountId = data.id
      this.titleForm = '编辑产品'
      this.getuserbind()
    },
    addAccountButt(formName) {
      this.accountId = '';
      this.form.no = '';
      this.form.name = '';
      this.form.price = '';
      this.form.type = '';
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
      addProduct({
              "name": this.form.name,
              // "no": this.form.no,
              "uid": sessionStorage.getItem('uid'),
              "price": this.form.price,
              "type": this.form.type
              })
            .then(r => {
              this.loadingAccount = false
              this.dialogAccountVisible = false
              this.word = r.info
              this.account = this.form.account
              this.$refs[formName1].resetFields();
              this.currentPage = 1;
              this.getTableData()
            })
            .catch(() => {
              this.loadingAccount = false
            });
    },
    editDataFun(formName) {
      this.loadingAccount = true
      productedit({
              "name": this.form.name,
              // "no": this.form.no,
              "uid": sessionStorage.getItem('uid'),
              "price": this.form.price,
              "type": this.form.type,
              "id": this.accountId,})
            .then(r => {
              this.loadingAccount = false
              this.dialogAccountVisible = false
              this.$refs[formName].resetFields();
              this.currentPage = 1;
              this.getTableData()
            })
            .catch(() => {
              this.loadingAccount = false
            });
    },
    topFun(data) {
      this.loadingAccount = true
      productTop({
              "uid": sessionStorage.getItem('uid'),
              "id": data.id})
            .then(r => {
              this.currentPage = 1;
              this.getTableData()
            })
            .catch(() => {
              this.loadingAccount = false
            });
    },
    accountDel(data) {
      productdel({
            "id": data.id,
            "uid": sessionStorage.getItem('uid')})
            .then(r => {
              console.log(r)
              this.currentPage = 1;
              this.getTableData()
              this.$message({
                message: '删除成功！',
                type: 'success'
                });
            })
            .catch(() => {
            }); 
    },
    getTableData(data) {
      if(data) {
        this.currentPage = 1;
      }
      productlist({"name": this.searchusername,
        "no": this.searchno,
        "type": this.searchType,
        "uid": sessionStorage.getItem('uid'),
        "pages":this.currentPage,
        "pagesize":this.pageSize
        })
      .then(r => {
            this.tableData = r.data.data_list;
            this.totalPage = r.data.datacount
        }).catch(() => {});
    },
    getproducttypelist() {
      producttypelist({"name": '',
        "uid": sessionStorage.getItem('uid'),
        "pages": 1,
        "pagesize": 1000
        })
      .then(r => {
            this.productTypeData = r.data.data_list;
        }).catch(() => {});
    },
    
    getuserbind() {
      productbind({
        "id": this.accountId,
        "uid": sessionStorage.getItem('uid')})
      .then(r => {
        console.log(r.data)
      this.form.no = r.data.no;
      this.form.name = r.data.name;
      this.form.price = r.data.price;
      this.form.type = r.data.type;
      this.dialogAccountVisible = true

        }).catch(() => {});
    },
  },
  beforeDestroy(){
      this.message1_.close()
  },
//   message_
  mounted: function() {
      this.getTableData()
      this.getproducttypelist()
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
