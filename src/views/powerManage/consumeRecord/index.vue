<template>
  <div class="account">
      <el-row :gutter="20" style="padding: 20px;">
    <el-col :span="6">
        <div style="display: inline-block;width:30%;">姓名：</div>
        <el-input style="width: 70%" v-model="searchusername" @change="getTableData()" autocomplete="off"></el-input>
    </el-col>
    <el-col :span="6">
        <div style="display: inline-block;width:30%;">手机号：</div>
        <el-input style="width: 70%" v-model="searchphone" @change="getTableData()" autocomplete="off"></el-input>
    </el-col>
    <el-col :span="6">
        <div style="display: inline-block;width:30%;">消费时间：</div>
        <el-date-picker
        v-model="searchdate"
        @change="getTableData()"
        type="date"
        style="width: 70%"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        placeholder="选择日期时间">
        </el-date-picker>
    </el-col>
    <el-col :span="6">
        <el-button type="primary" @click="getTableData()">搜 索</el-button>
        <el-button type="primary" @click="goList()">会员列表</el-button>
    </el-col>
    </el-row>
    <div style="padding: 0 20px">
        <el-table
    :data="tableData"
    border
    fixed
    style="width: 100%;border-radius: 10px;">
    <el-table-column
      prop="no"
      width="100"
      label="会员编号">
    </el-table-column>
    <el-table-column
      prop="name"
      width="100"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="phone"
      width="100"
      label="手机号">
    </el-table-column>
    <el-table-column
      prop="oldBalance"
      width="100"
      label="消费前余额">
    </el-table-column>
    <el-table-column
      prop="oldOtherBalance"
      width="150"
      label="消费前其他优惠">
    </el-table-column>
    <el-table-column
      prop="inventory"
      label="购买商品明细">
    </el-table-column>
    <el-table-column
      prop="subTotal"
      width="100"
      label="小计">
    </el-table-column>
    <el-table-column
      prop="reduceBalance"
      width="100"
      label="优惠">
    </el-table-column>
    <el-table-column
      prop="buckleBalance"
      width="100"
      label="余额抵扣">
    </el-table-column>
    <el-table-column
      prop="buckleOtherBalance"
      width="150"
      label="其他优惠抵扣">
    </el-table-column>
    <el-table-column
      prop="shouldBalance"
      width="100"
      label="实付金额">
    </el-table-column>
    <el-table-column
      prop="newBalance"
      width="100"
      label="账户余额">
    </el-table-column>
    <el-table-column
      prop="newOtherBalance"
      width="100"
      label="其他优惠">
    </el-table-column>
    <el-table-column
      prop="date"
      width="100"
      label="消费时间">
    </el-table-column>
    <el-table-column
      prop="remarks"
      width="200"
      label="备注">
    </el-table-column>
    <el-table-column
      prop="operator"
      width="70"
      label="操作人">
    </el-table-column>
    <el-table-column
    width="50"
      label="操作">
      <template slot-scope="scope">
        <el-button  @click="printFun(scope.row)" type="text" size="small">打印</el-button>
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
  </div>
</template>

<script>
import { consumeRecordList } from "@/api/consumeCheck";


export default {
  name: 'Login',
  data() {
    return {
        searchusername:'',
        searchphone:'',
        searchrolename:'',
        searchdate:'',
        currentPage: 1,
      totalPage: 0,
      pageSize: 10,
      dialogAccountVisible: false,
      form: {
        account: '',
        name: '',
        phone: '',
        role: ''
      },
      message_: null,
      message1_:null,
      roleList: {},
      titleForm:'',
      rights_list: {},
      rulesAccount: {
        name: [
            { required: true, message: '请填写名字', trigger: 'blur' }
        ],
        phone: [
            { required: true, message: '请填写电话', trigger: 'blur' }
        ]
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
    goList(){
      if(this.$route.query.phone !== undefined){
          this.$router.push({
                path:'/customerManage/customerManage',
                query:{phone: this.$route.query.phone}
        });
      }else{
        this.$router.push({
                path:'/customerManage/customerManage'
        });
      }
    },
    printFun(data){
        let arr = JSON.parse(data.inventoryList)
        let totalNum = 0;
        arr.map(item=>{
            totalNum = Number(item.num) + totalNum
        })
        data.totalNum = totalNum
        sessionStorage.setItem('printData',JSON.stringify(data))
        this.$router.push({
                            path:'/print'
                });
    },
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
      this.titleForm = '查看用户'
      this.accountId = data.id
      this.getuserbind()
    },
    editAccountButt(data) {
      this.accountId = data.id
      this.titleForm = '编辑用户'
      this.getuserbind()
    },
    addAccountButt(formName) {
      this.accountId = '';
      this.titleForm = '添加用户'
      this.dialogAccountVisible = true
    },
    cancelSubmit() {
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
      userAdd({
              "name": this.form.name,
              "phone": this.form.phone,
              "uid": sessionStorage.getItem('uid')})
            .then(r => {
              this.loadingAccount = false
              this.dialogAccountVisible = false
              this.word = r.info
              this.account = this.form.account
              this.$refs[formName1].resetFields();
              // this.wordVisible = true
              console.log('123')
              this.getTableData()
              this.openHTML(r.info)
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
      useredit({
              "name": this.form.name,
              "id": this.accountId,
              "phone": this.form.phone,
              "uid": sessionStorage.getItem('uid')})
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
    resetAccount(data) {
        passwordreset({
            "id": data.id,
            "uid": sessionStorage.getItem('uid')})
            .then(r => {
              console.log(r)
              this.word = r.info
              this.account = data.username
              this.openHTML(r.info)
              // this.wordVisible = true
            })
            .catch(() => {
            });      
    },
    accountDel(data) {
      userdel({
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
      consumeRecordList({"name": this.searchusername,
        "phone": this.searchphone,
        "date": this.searchdate == null?'':this.searchdate,
        "uid": sessionStorage.getItem('uid'),
        "pages":this.currentPage,
        "pagesize":this.pageSize
        })
      .then(r => {
            this.tableData = r.data.data_list;
            this.totalPage = r.data.datacount
        }).catch(() => {});
    },
    getuserbind() {
      userbind({
        "id": this.accountId,
        "uid": sessionStorage.getItem('uid')})
      .then(r => {
        console.log(r.data)
      this.form.phone = r.data.phone;
      this.form.name = r.data.name;
      this.dialogAccountVisible = true

        }).catch(() => {});
    },
    openHTML(word) {
        
    },
    wordSubmit(){
        let that = this
        let text = `账号：${that.account}，密码：${that.word}`
        let save = function (e) {
                //设置需要复制模板的内容账号：123，密码：rxw10m
                e.clipboardData.setData('text/plain',text);
                //阻止默认行为
                e.preventDefault();
            }
            // h5监听copy事件，调用save函数保存到模板中
            document.addEventListener('copy',save);
            // 调用右键复制功能
            document.execCommand('copy');
            //移除copy事件
            document.removeEventListener('copy',save);
            this.message1_ = this.$message({
                message: '复制成功！',
                type: 'success'
                });
    },
    wordAccount(){
        this.wordVisible = false
    },
  },
  beforeDestroy(){
      this.message1_.close()
  },
//   message_
  mounted: function() {
    if(this.$route.query.phone !== undefined){
          this.searchphone = this.$route.query.phone;
          this.getTableData();
          return
      }
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
