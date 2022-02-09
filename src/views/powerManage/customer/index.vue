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
        <div style="display: inline-block;width:30%;">录入时间：</div>
        <el-date-picker
        @change="getTableData()"
        v-model="searchdate"
        type="date"
        style="width: 70%"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        placeholder="选择日期时间">
        </el-date-picker>
    </el-col>
    <el-col :span="6">
        <el-button type="primary" @click="getTableData()">搜 索</el-button>
    </el-col>
    </el-row>
    <div style="padding: 15px;overflow: hidden;">
      <span>累计充值金额：</span><span style="margin-right: 20px;">{{sum.sumrechargeAmount}}元</span>
      <span>累计赠送金额：</span><span style="margin-right: 20px;">{{sum.sumgiveAmount}}元</span>
      <span>累计会员余额：</span><span style="margin-right: 20px;">{{sum.sumbalance}}元</span>
      <el-button type="primary"  style="float:right;" @click="addAccountButt('ruleForm')">添加会员</el-button>
    </div>
    <div style="padding: 0 10px">
        <el-table
    :data="tableData"
    style="width: 100%;border-radius: 10px;"
    border>
    <el-table-column
      prop="no"
      label="编号">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号">
    </el-table-column>
    <el-table-column
      prop="date"
      label="录入时间">
    </el-table-column>
    <el-table-column
      prop="birthday"
      label="生日">
    </el-table-column>
    <el-table-column
      prop="balance"
      label="账户余额">
    </el-table-column>
    <el-table-column
      prop="otherBalance"
      label="其他优惠">
    </el-table-column>
    <el-table-column
      prop="source"
      label="获客渠道">
    </el-table-column>
    <el-table-column
      prop="adds"
      label="地址">
    </el-table-column>
    <el-table-column
      prop="remarks"
      label="备注">
    </el-table-column>
    <el-table-column
     width="200"
      label="操作">
      <template slot-scope="scope">
        <el-button  @click="seeAccountButt(scope.row)" type="text" size="small">查看</el-button>
        <el-button  type="text" @click="editAccountButt(scope.row)" size="small">编辑</el-button>
        <el-button  type="text" @click="rechargeFunButt(scope.row)" size="small">充值</el-button>
        <el-button  type="text" @click="consume(scope.row)" size="small">消费</el-button>
        <el-button  type="text" @click="goRechargeList(scope.row)" size="small">充值记录</el-button>
        <el-button  type="text" @click="goConsumeList(scope.row)" size="small">消费记录</el-button>
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
  <el-dialog :title="titleForm" :close-on-click-modal="false" :show-close="false" :visible.sync="dialogAccountVisible">
  <el-form :model="form" :rules="rulesAccount" ref="ruleForm" label-width="100px">
    <el-form-item label="会员编码" v-show="titleForm.indexOf('查看')!== -1">
      <el-input style="width: 300px" :disabled="true" v-model="form.no" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input style="width: 300px" :disabled="titleForm.indexOf('查看')!== -1" v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input style="width: 300px" :disabled="titleForm.indexOf('查看')!== -1" v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="生日" prop="birthday">
        <el-date-picker
      v-model="form.birthday"
      type="date"
      style="width: 300px"
      :disabled="titleForm.indexOf('查看')!== -1"
      value-format="yyyy-MM-dd"
      format="yyyy-MM-dd"
      placeholder="选择日期时间">
    </el-date-picker>
      <!-- <el-input style="width: 300px" :disabled="titleForm.indexOf('查看')!== -1" v-model="form.name" autocomplete="off"></el-input> -->
    </el-form-item>
    <el-form-item label="获客渠道" prop="source">
      <el-input style="width: 300px" :disabled="titleForm.indexOf('查看')!== -1" v-model="form.source" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="地址" prop="adds">
      <el-input style="width: 300px" :disabled="titleForm.indexOf('查看')!== -1" v-model="form.adds" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remarks">
      <el-input style="width: 300px" :disabled="titleForm.indexOf('查看')!== -1" v-model="form.remarks" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="新建时间" v-if="userName === 'admin'" prop="cTime">
        <el-date-picker
        v-model="form.cTime"
        type="date"
        style="width: 300px"
        :disabled="titleForm.indexOf('查看')!== -1"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        placeholder="选择日期时间">
        </el-date-picker>
      <!-- <el-input style="width: 300px" :disabled="titleForm.indexOf('查看')!== -1" v-model="form.name" autocomplete="off"></el-input> -->
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancelSubmit('ruleForm')">取 消</el-button>
    <el-button :disabled="titleForm.indexOf('查看')!== -1" :loading="loadingAccount" type="primary" @click="submitAccount('ruleForm')">确 定</el-button>
  </div>
</el-dialog>
<el-dialog title="密码提示" :show-close="false" width="400px" :visible.sync="wordVisible">
  <div style="font-size: 18px;">账号：<span style="font-size: 18px;font-weight:600;">{{account}}</span></div>  
  <div style="font-size: 18px;">密码：<span style="font-size: 18px;font-weight:600;">{{word}}</span></div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="wordSubmit()">复制账号密码</el-button>
    <el-button  type="primary" @click="wordAccount()">关闭</el-button>
  </div>
</el-dialog>
<el-dialog title="账户充值" :show-close="false" :close-on-click-modal="false" :visible.sync="rechargeVisible">
  <el-form :model="rechargeForm" :rules="rechargeAccount" ref="rechargeref" label-width="100px">
    <el-form-item label="会员编码" >
      <el-input style="width: 300px" :disabled="true" v-model="rechargeForm.no"  autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input style="width: 300px" :disabled="true" v-model="rechargeForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input style="width: 300px" :disabled="true" v-model="rechargeForm.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="现有金额">
      <el-input style="width: 300px" :disabled="true" v-model="rechargeForm.exisAmount" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="充值金额" prop="rechargeAmount">
      <el-input style="width: 300px"  v-model="rechargeForm.rechargeAmount" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="赠送金额" prop="giveAmount">
      <el-input style="width: 300px"  v-model="rechargeForm.giveAmount" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="其他优惠" prop="otherAmount">
      <el-input style="width: 300px"  v-model="rechargeForm.otherAmount" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="账户余额" prop="accountBalance">
      <el-input style="width: 300px"  v-model="rechargeForm.accountBalance" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="充值时间" v-if="userName === 'admin'" prop="cTime">
        <el-date-picker
        v-model="rechargeForm.cTime"
        type="date"
        style="width: 300px"
        :disabled="titleForm.indexOf('查看')!== -1"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        placeholder="选择日期时间">
        </el-date-picker>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancelSubmit('rechargeref')">取 消</el-button>
    <el-button :loading="loadingAccount" type="primary" @click="submitRecharge('rechargeref')">充 值</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { customerlist, customerAdd, customerdel, customeredit, customerbind, customerRecharge } from "@/api/customer";


export default {
  name: 'Login',
  data() {
    let checkamount = (rule, value, callback) => {
      let val = Number(value)
      // rechargeForm.exisAmount。 rechargeForm.rechargeAmount  rechargeForm.accountBalance
      if(rule.field === 'rechargeAmount' && (val === '' || val === 0 || value.indexOf('-')!= -1)) {
        callback(new Error('请输入金额'));
        return
      }
      if(typeof val !== 'number'){
        callback(new Error('请输入金额'));
        return
      }
      if (isNaN(val)) {
        callback(new Error('请输入金额'));
        return
      }
       callback();
    };
    let validatePhone = (rule, value, callback) => {
          console.log(rule, value)
          let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!myreg.test(value)) {
            callback(new Error('手机号格式不正确'));
            return;
        }
        callback();
      };
    return {
        searchusername:'',
        searchphone:'',
        searchrolename:'',
        searchdate: '',
        currentPage: 1,
      totalPage: 0,
      pageSize: 10,
      dialogAccountVisible: false,
      rechargeVisible: false,
      form: {
        name: '',
        phone: '',
        birthday: '',
        source: '',
        adds: '',
        remarks: '',
        no:'',
        cTime: '',
      },
      rechargeForm: {
        name: '',
        phone: '',
        exisAmount: '',
        rechargeAmount: '',
        otherAmount: '',
        accountBalance: '',
        no: '',
        giveAmount: '',
        cTime: ''
      },
      message_: null,
      message1_:null,
      roleList: {},
      titleForm:'',
      rights_list: {},
      rechargeAccount: {
        rechargeAmount: [
            { required: true, validator: checkamount, trigger: 'blur' }
        ],
        otherAmount: [
            { validator: checkamount, trigger: 'blur' }
        ],
        accountBalance: [
            { validator: checkamount, trigger: 'blur' }
        ],
        giveAmount: [
            { validator: checkamount, trigger: 'blur' }
        ],
        cTime: [
            { required: false }
        ]
      },
      rulesAccount: {
        name: [
            { required: true, message: '请填写名字', trigger: 'blur' }
        ],
        phone: [
            { required: true, validator:validatePhone, trigger: 'blur' }
        ],
        birthday: [
            { required: false }
        ],
        source: [
            { required: false }
        ],
        adds: [
            { required: false }
        ],
        remarks: [
            { required: false }
        ],
        cTime: [
            { required: false }
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
      account:'',
      userName: sessionStorage.getItem('name'),
      sum: {
          sumbalance: 0,
          sumgiveAmount: 0,
          sumrechargeAmount: 0,
      },
      oldOtherAmount:'',
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },
    // rechargeForm : {
    //   handler: function(data) {
    //     console.log(this.rechargeForm.rechargeAmount)
    //   },
    //   immediate: true
    // },
    'rechargeForm.rechargeAmount'(newValue, oldValue) {
      if(newValue === '')return
      console.log(newValue)
      this.rechargeForm.accountBalance = (Number(newValue) + Number(this.rechargeForm.exisAmount) + Number(this.rechargeForm.giveAmount)).toFixed(2)
    },
    'rechargeForm.giveAmount' (newValue, oldValue) {
      if(newValue === '')return
      console.log(newValue)
      this.rechargeForm.accountBalance = (Number(newValue) + Number(this.rechargeForm.exisAmount) + Number(this.rechargeForm.rechargeAmount)).toFixed(2)
    }
  },
  methods: {
    goRechargeList(data){
      this.$router.push({
                path:'/rechargeRecordManage/rechargeRecordManage',
                query:{phone: data.phone}
        });
    },
    goConsumeList(data){
      this.$router.push({
                path:'/consumeRecord/consumeRecord',
                query:{phone: data.phone}
        });
    },
    consume(data){
        this.$router.push({
                path:'/consumeCheck/consumeCheck',
                query:{phone: data.phone}
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
      this.titleForm = '查看会员'
      this.accountId = data.id
      this.getuserbind()
      this.dialogAccountVisible = true
    },
    editAccountButt(data) {
      this.accountId = data.id
      this.titleForm = '编辑会员'
      this.getuserbind()
      this.dialogAccountVisible = true
    },
    rechargeFunButt(data) {
      this.accountId = data.id
      this.getuserbind()
      this.rechargeVisible = true
    },
    addAccountButt(formName) {
      this.accountId = '';
      this.titleForm = '添加会员';
      this.dialogAccountVisible = true
      this.$refs[formName].resetFields();
    },
    cancelSubmit(formName) {
      this.accountId = '';
      this.dialogAccountVisible = false;
      this.rechargeVisible = false;
      this.$refs[formName].resetFields();
    },
    submitAccount(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.titleForm.indexOf('添加') !== -1){
              this.addDataFun(formName)
            }else{
              this.editDataFun(formName)
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    submitRecharge(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
              this.rechargeFun(formName)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    rechargeFun(formName){
         this.loadingAccount = true
      customerRecharge({
              "name": this.rechargeForm.name,
              "phone": this.rechargeForm.phone,
              "uid": sessionStorage.getItem('uid'),
              "oldBalance": this.rechargeForm.exisAmount,
              "newBalance": this.rechargeForm.accountBalance,
              "no": this.rechargeForm.no,
              "rechargeAmount": this.rechargeForm.rechargeAmount,
              "otherAmount": this.rechargeForm.otherAmount,
              "oldOtherAmount": this.oldOtherAmount,
              "id": this.accountId,
              "operator": sessionStorage.getItem('name'),
              "giveAmount": this.rechargeForm.giveAmount,
              "cTime": this.rechargeForm.cTime,
      }).then(r => {
              this.$refs[formName].resetFields();
              this.rechargeVisible = false;
              this.loadingAccount = false
              this.getTableData()
            })
            .catch(() => {
              this.loadingAccount = false
            });
      
    },
    addDataFun(formName1){
      this.loadingAccount = true
      customerAdd({
              "name": this.form.name,
              "phone": this.form.phone,
              "uid": sessionStorage.getItem('uid'),
              "birthday": this.form.birthday,
              "source": this.form.source,
              "adds": this.form.adds,
              "remarks": this.form.remarks,
              "cTime": this.form.cTime,
              })
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
      customeredit({
              "name": this.form.name,
              "id": this.accountId,
              "phone": this.form.phone,
              "uid": sessionStorage.getItem('uid'),
              "birthday": this.form.birthday,
              "source": this.form.source,
              "adds": this.form.adds,
              "remarks": this.form.remarks,
              "cTime": this.form.cTime,
      }).then(r => {
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
      customerdel({
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
      customerlist({"name": this.searchusername,
        "phone": this.searchphone,
        "date": this.searchdate == null?'':this.searchdate,
        "uid": sessionStorage.getItem('uid'),
        "pages":this.currentPage,
        "pagesize":this.pageSize
        })
      .then(r => {
            this.tableData = r.data.data_list;
            this.totalPage = r.data.datacount;
            this.sum = r.data.sum
        }).catch(() => {});
    },
    getuserbind() {
      customerbind({
        "id": this.accountId,
        "uid": sessionStorage.getItem('uid')})
      .then(r => {
        console.log(r.data)
      this.form.phone = r.data.phone;
      this.form.name = r.data.name;
      this.form.birthday = r.data.birthday;
      this.form.source = r.data.source;
      this.form.adds = r.data.adds;
      this.form.remarks = r.data.remarks;
      this.form.no = r.data.no;
      //////////
      this.rechargeForm.name = r.data.name;
      this.rechargeForm.phone = r.data.phone;
      this.rechargeForm.exisAmount = r.data.balance === '' ? 0 : r.data.balance;
      this.oldOtherAmount =  r.data.otherBalance;
    //   this.rechargeForm.otherAmount = r.data.otherBalance;
      this.rechargeForm.no = r.data.no;
      
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
