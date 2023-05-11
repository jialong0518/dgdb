<template>
  <div class="account">
    <el-row :gutter="20" style="padding: 20px;">
        <el-card class="box-card" style="width: 100%">
            <div slot="header" class="clearfix">
                <span>会员电话：</span>
                <el-input style="width: 200px;margin-right:20px" @change="getTableData()" v-model="searchphone" @clear="clearInfor" placeholder="输入会员电话" :clearable="true" autocomplete="off"></el-input>
                <el-button type="primary" @click="getTableData()">查 找</el-button>
                <span style="margin-left:50px;">优惠：</span>
                <el-input style="width: 100px;margin-right:20px;" @change="reduceBalanceFun" v-model="reduceBalance" placeholder="" autocomplete="off"></el-input>
                <span>余额抵扣：</span>
                <el-input style="width: 100px;margin-right:20px;" @change="deductionFun" v-model="buckleBalance" placeholder="" autocomplete="off"></el-input>
                <span>其他优惠抵扣：</span>
                <el-input style="width: 100px;margin-right:20px;" @change="deductionOtherFun" v-model="buckleOtherBalance" placeholder="" autocomplete="off"></el-input>
                <span  v-if="userName === 'admin'">消費时间：</span>
                <el-date-picker
                v-model="cTime"
                type="date"
                style="width: 300px"
                v-if="userName === 'admin'"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期时间">
                </el-date-picker>
            </div>
            <div>
              <div style="margin-bottom: 20px;display: flex;">
                <div style="width:500px">
                  会员姓名：{{customerName}}
                </div>
                <div style="width:200px">
                  会员余额：{{customerBalance}}
                </div>
                <div style="width:200px">
                  其他优惠：{{customerOtherBalance}}
                </div>
                <div>
                </div>
              </div>
              <div style="margin-bottom: 20px;display: flex;">
                <div style="width:500px">
                  会员电话：{{customerPhone}}
                </div>
                <div style="width:200px">
                    余额抵扣：<span v-show="buckleBalance !==''&&buckleBalance !==0">-</span>{{buckleBalance}}
                </div>
                <div style="width:200px">
                    其他优惠抵扣：<span v-show="buckleOtherBalance !==''&&buckleOtherBalance !==0">-</span>{{buckleOtherBalance}}
                </div>
                <div style="width:200px">
                  
                </div>
              </div>
              <div style="margin-bottom: 20px;display: flex;">
                <div style="width:500px">
                    会员个数：<span>{{totalPage}}个</span><span style="color:red;margin-left: 20px" v-show="totalPage > 1">注意！！！此电话号码有多个会员同时使用！！！</span>
                </div>
                <div style="width:200px">
                   会员结余：{{newBalance}}
                </div>
                <div style="width:200px">
                  其他优惠余额：{{newOtherBalance}}
                </div>
                <div>
                  优惠：<span v-show="reduceBalance !==''&&reduceBalance !==0">-</span>{{reduceBalance}}
                </div>
              </div>
              <div style="margin-bottom: 20px;display: flex;">
                <div style="width:200px">
                </div>
                <div style="width:300px">
                </div>
                <div style="width:200px">
                  产品数量：{{totalNum}}
                </div>
                <div style="width:200px">
                  价格：{{buyPrice}}
                </div>
                <div style="width:200px">
                  实付：{{shouldBalance}}
                </div>
                <div style="width:200px">
                  <el-button type="danger" @click="payVisible = true">结 算</el-button>
                </div>
              </div>
            </div>
        </el-card>
    </el-row>
    <div style="padding: 15px;overflow: hidden;">
        <el-input
        type="textarea"
        style="width: 500px;"
        :rows="4"
        placeholder="请输入备注"
        v-model="textarea">
        </el-input>
        <div style="margin-top: 20px;
          display: inline-block;
          margin-left: 50px;">
          <el-radio-group v-model="payType" size="small">
            <div>
              <el-radio label="现金" border>现金</el-radio>
              <el-radio label="微信" border>微信</el-radio>
            </div>
            <div style="margin-top: 20px">
              <el-radio label="转账" border size="medium">转账</el-radio>
              <el-radio label="支付宝" border size="medium">支付宝</el-radio>
              <el-radio label="其他" border size="medium">其他</el-radio>
            </div>
          </el-radio-group>
        </div>
        <div style="margin-top: 20px;
          display: inline-block;
          margin-left: 50px;">
           
        </div>
       
      <el-button type="primary"  style="float:right;" @click="addAccountButt('ruleForm')">添加产品</el-button>
    </div>
    <div style="padding: 0 10px">
        <el-table
    :data="tableData"
    border
    style="width: 100%;border-radius: 10px;">
    <el-table-column
      prop="productname"
      label="消费项目">
    </el-table-column>
    <el-table-column
      prop="num"
      label="数量">
    </el-table-column>
    <el-table-column
      prop="price"
      label="单价">
    </el-table-column>
    <el-table-column
      prop="totalPrice"
      label="金额">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-popconfirm
            title="是否确定删除该产品？"
            @onConfirm="accountDel(scope.row,scope.$index)" 
        >
        <el-button style="margin: 0 10px;" slot="reference"  type="text" size="small">删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
    </div>
  <el-dialog title="添加产品" style="overflow: hidden;" :close-on-click-modal="false" :show-close="false" :visible.sync="dialogAccountVisible">
  <div style="overflow: hidden;">
    <el-form :model="form" :rules="rulesAccount" ref="ruleForm" label-width="100px" style="float:left;width:50%;">
        <el-form-item label="产品" prop="product">
        <el-select style="width: 300px" :disabled="titleForm.indexOf('查看')!== -1" @change="productSelect" v-model="form.product" placeholder="请选择产品">
            <el-option
            v-for="item in productData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="num">
        <el-input style="width: 300px" :disabled="titleForm.indexOf('查看')!== -1" v-model="form.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="price">
        <el-input style="width: 300px" :disabled="titleForm.indexOf('查看')!== -1" v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="totalPrice">
        <el-input style="width: 300px" :disabled="titleForm.indexOf('查看')!== -1" v-model="totalPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button style="margin-top:20px" type="primary" @click="submitAccount_('ruleForm')">添加产品</el-button>
        </el-form-item>
    </el-form>
    <div style="float:right;width:50%;">
        <el-table
            :data="tableData"
            border
             max-height="350"
            style="width: 100%">
            <el-table-column
            prop="productname"
            label="消费项目">
            </el-table-column>
            <el-table-column
            prop="num"
            label="数量">
            </el-table-column>
            <el-table-column
            prop="price"
            label="单价">
            </el-table-column>
            <el-table-column
            prop="totalPrice"
            label="金额">
            </el-table-column>
            <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-popconfirm
                    title="是否确定删除该产品？"
                    @onConfirm="accountDel(scope.row,scope.$index)" 
                >
                <el-button style="margin: 0 10px;" slot="reference"  type="text" size="small">删除</el-button>
                </el-popconfirm>
            </template>
            </el-table-column>
        </el-table>
    </div>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancelSubmit('ruleForm')">关 闭</el-button>
    <el-button  :loading="loadingAccount" type="primary" @click="submitAccount('ruleForm')">确 定</el-button>
  </div>
</el-dialog>
<el-dialog
  title="结算提示"
  :visible.sync="payVisible"
  :show-close="false"
  :close-on-click-modal="false"
  width="30%">
  <div style="color:red;font-size: 18px;margin-bottom: 15px;">请仔细核对，客户信息，购买信息，付款信息。</div>
  <div style="color:red;font-size: 18px;">付款后,扣费不可逆！！！</div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="PayfunC">取 消</el-button>
    <el-button type="primary" :loading="loadingAccount" @click="Payfun">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import { customerlist, productlist, consumeRecord, plainConsumeRecord } from "@/api/consumeCheck";
const moment = require('moment');


export default {
  name: 'Login',
  data() {
    let checkamount = (rule, value, callback) => {
      let val = Number(value)
      if(typeof val !== 'number' || value.indexOf('-')!= -1){
        callback(new Error('请填写价格'));
        return
      }
      if (isNaN(val)) {
        callback(new Error('请填写价格'));
        return
      }
       callback();
    };
    let checknum = (rule, value, callback) => {
      let val = Number(value)
      if(typeof val !== 'number' || value.indexOf('-')!= -1){
        callback(new Error('请填写数量'));
        return
      }
      if (isNaN(val)) {
        callback(new Error('请填写数量'));
        return
      }
       callback();
    };
    return {
      isDeduction: '2',
      isDeductionOther: '2',
        searchusername:'',
        searchphone:'',
        customerId: '',
        customerOtherBalance:'',
        customerBalance:'',
        customerName:'',
        customerPhone:'',
        newOtherBalance:'',
        newBalance:'',
        buckleBalance:'',
        buckleOtherBalance:'',
        currentPage: 1,
      totalPage: '',
      pageSize: 10,
      dialogAccountVisible: false,
      payVisible: false,
      form: {
        product: '',
        num: '',
        price: '',
        totalPrice: '',
        productname: ''
      },
      totalNum:'',
      buyPrice:'',
      reduceBalance:'',
      shouldBalance:'',
      message_: null,
      message1_:null,
      payType: '',
      roleList: {},
      titleForm:'',
      rights_list: {},
      rulesAccount: {
        product: [
            { required: true, message: '请选择产品', trigger: 'blur' }
        ],
        num: [
            { required: true, validator: checknum, trigger: 'blur' }
        ],
        price: [
            { required: true, validator: checkamount, trigger: 'blur' }
        ],
        totalPrice: [
            { required: true, validator: checkamount, trigger: 'blur' }
        ],
      },
      loadingAccount: false,
      textarea:'',
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      tableData: [],
      productData: [],
      accountId: '',
      wordVisible: false,
      word:'',
      account:'',
      inventory: '',
      customerNo: '',
      cTime: '',
      userName: sessionStorage.getItem('name')
    }
  },
  computed:{ 
    totalPrice:function(){
        return (Number(this.form.num) * Number(this.form.price)).toFixed(2)
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
    PayfunC() {
      this.loadingAccount = false 
       this.payVisible = false
    },
    Payfun(){
        if(this.tableData.length === 0)return
        this.loadingAccount = true;
        // 
        if (Number(this.shouldBalance) !== 0 && this.payType === '') {
            this.$confirm('应付金额不为0，请选择支付方式！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '关闭',
                type: 'warning'
                }).then(() => {
                    
                }).catch(() => {
                         
            });
            return
        }
        if(this.customerPhone.length === 0){
            let obj = {
                name: '散客',
                phone: '暂无',
                oldBalance: this.customerBalance,
                oldOtherBalance: this.customerOtherBalance,
                inventory: this.inventory,
                subTotal: this.buyPrice,
                reduceBalance: this.reduceBalance,
                newOtherBalance: this.newOtherBalance,
                newBalance: this.newBalance,
                buckleBalance: this.buckleBalance,
                buckleOtherBalance: this.buckleOtherBalance,
                shouldBalance: this.shouldBalance,
                date: this.cTime === '' ? moment().format("YYYY-MM-DD") : this.cTime,
                operator: sessionStorage.getItem('name'),
                inventoryList:JSON.stringify(this.tableData),
                customerId: this.customerId,
                no: this.customerNo,
                totalNum: this.totalNum,
                remarks: this.textarea,
                payType: this.payType
            }
            plainConsumeRecord(obj).then(r => {
              this.loadingAccount = false;
              this.payVisible = false;
              this.customerName = '';
              this.customerPhone = '';
              this.customerBalance = '';
              this.customerOtherBalance = '';
              this.inventory = '';
              this.buyPrice = '';
              this.reduceBalance = '';
              this.newOtherBalance = '';
              this.newBalance = '';
              this.buckleBalance = '';
              this.buckleOtherBalance = '';
              this.shouldBalance = '';
              this.tableData = [];
              this.customerId = '';
              this.customerNo = '';
              this.searchphone = '';
              this.totalNum = '';
              this.buyPrice = '';
              this.totalPage = '';
              this.date = '';
              this.textarea = '';
              this.payType = '';
             this.$confirm('购买成功！', '提示', {
                confirmButtonText: '打印小票',
                cancelButtonText: '关闭',
                type: 'warning'
                }).then(() => {
                    sessionStorage.setItem('printData',JSON.stringify(obj))
                   this.$router.push({
                            path:'/print'
                    });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '关闭'
                });          
            });
            })
            .catch(() => {
              this.loadingAccount = false
            });
        let updata ={
            name: this.customerName,
            phone: this.customerPhone,
            oldBalance: this.customerBalance,
            oldOtherBalance: this.customerOtherBalance,
            inventory: this.inventory,
            subTotal: this.buyPrice,
            reduceBalance: this.reduceBalance,
            newOtherBalance: this.newOtherBalance,
            newBalance: this.newBalance,
            buckleBalance: this.buckleBalance,
            buckleOtherBalance: this.buckleOtherBalance,
            shouldBalance: this.shouldBalance,
            date: this.cTime === '' ? moment().format("YYYY-MM-DD") : this.cTime,
            operator:'',
            inventoryList:JSON.stringify(this.tableData),
            customerId: this.customerId
        }
        }else{
            let obj = {
                name: this.customerName,
                phone: this.customerPhone,
                oldBalance: this.customerBalance,
                oldOtherBalance: this.customerOtherBalance,
                inventory: this.inventory,
                subTotal: this.buyPrice,
                reduceBalance: this.reduceBalance,
                newOtherBalance: this.newOtherBalance,
                newBalance: this.newBalance,
                buckleBalance: this.buckleBalance,
                buckleOtherBalance: this.buckleOtherBalance,
                shouldBalance: this.shouldBalance,
                date: this.cTime === '' ? moment().format("YYYY-MM-DD") : this.cTime,
                operator: sessionStorage.getItem('name'),
                inventoryList:JSON.stringify(this.tableData),
                customerId: this.customerId,
                no: this.customerNo,
                totalNum: this.totalNum,
                remarks: this.textarea,
                payType: this.payType
            }
            consumeRecord(obj).then(r => {
              this.loadingAccount = false;
              this.payVisible = false;
              this.customerName = '';
              this.customerPhone = '';
              this.customerBalance = '';
              this.customerOtherBalance = '';
              this.inventory = '';
              this.buyPrice = '';
              this.reduceBalance = '';
              this.newOtherBalance = '';
              this.newBalance = '';
              this.buckleBalance = '';
              this.buckleOtherBalance = '';
              this.shouldBalance = '';
              this.tableData = [];
              this.customerId = '';
              this.customerNo = '';
              this.searchphone = '';
              this.totalNum = '';
              this.buyPrice = '';
              this.totalPage = '';
              this.date = '';
              this.textarea = '';
              this.payType = '';
             this.$confirm('购买成功！', '提示', {
                confirmButtonText: '打印小票',
                cancelButtonText: '关闭',
                type: 'warning'
                }).then(() => {
                    sessionStorage.setItem('printData',JSON.stringify(obj))
                this.$router.push({
                            path:'/print'
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '关闭'
                });          
            });
            })
            .catch(() => {
              this.loadingAccount = false
            });
        let updata ={
            name: this.customerName,
            phone: this.customerPhone,
            oldBalance: this.customerBalance,
            oldOtherBalance: this.customerOtherBalance,
            inventory: this.inventory,
            subTotal: this.buyPrice,
            reduceBalance: this.reduceBalance,
            newOtherBalance: this.newOtherBalance,
            newBalance: this.newBalance,
            buckleBalance: this.buckleBalance,
            buckleOtherBalance: this.buckleOtherBalance,
            shouldBalance: this.shouldBalance,
            date: this.cTime === '' ? moment().format("YYYY-MM-DD") : this.cTime,
            operator:'',
            inventoryList:JSON.stringify(this.tableData),
            customerId: this.customerId
        }
        }
    },
    clearInfor(){
        this.customerOtherBalance = '';
        this.customerBalance = '';
        this.customerName = '';
        this.customerPhone = '';
        this.buckleOtherBalance = '';
        this.buckleBalance = '';
        this.customerNo = '';
        this.searchphone = '';
        this.totalPage = '';
        this.textarea = '';
        this.censusShop('0')
    },
    reduceBalanceFun(data){
        this.censusShop('0')
    },
    deductionFun(data){
        if(this.customerPhone.length === 0) {
            this.buckleBalance = ''
            return
        }
        this.censusShop('1')
    },
    deductionOtherFun(data){
        if(this.customerPhone.length === 0) {
            this.buckleOtherBalance = ''
            return
        }
        if(Number(data) > Number(this.customerOtherBalance)){
            this.buckleOtherBalance = this.customerOtherBalance
        }
        this.censusShop('0')
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
    addAccountButt(formName) {
      this.accountId = '';
      this.titleForm = '添加用户'
      this.dialogAccountVisible = true
    },
    cancelSubmit(formName) {
      this.accountId = '';
      this.dialogAccountVisible = false;
      this.$refs[formName].resetFields();
    },
    submitAccount_(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
              this.tableData.push({
                productname: this.form.productname,
                num: this.form.num,
                price: this.form.price,
                totalPrice: this.totalPrice
              })
              this.$refs[formName].resetFields();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    submitAccount(formName) {
        this.dialogAccountVisible = false;
        let buyPrice = 0;
      this.tableData.map(item=>{
        buyPrice = (Number(item.totalPrice) + Number(buyPrice)).toFixed(2);
      })
      if(this.customerPhone.length !== 0){
          this.buckleBalance = buyPrice;
      }
        this.censusShop('0');
    },
    censusShop(sign){
      let totalNum = 0;
      let buyPrice = 0;
      let inventory = '';
    //   productname: this.form.productname,
    //             num: this.form.num,
    //             price: this.form.price,
    //             totalPrice: this.totalPrice
      this.tableData.map(item=>{
        inventory += `${item.productname}*${item.num}(¥${item.totalPrice}) 、`
        buyPrice = (Number(item.totalPrice) + Number(buyPrice)).toFixed(2);
        totalNum = (Number(item.num) + Number(totalNum)).toFixed(2);
      })
      this.inventory =  inventory.substr(0, inventory.length - 1);
      this.buyPrice = buyPrice
      this.totalNum = parseInt(totalNum);
      if(sign === '1') {
        this.buckleBalance = this.buckleBalance === '' ? 0 : Number(this.buckleBalance);
      } else {
          this.buckleBalance = Number(this.buyPrice);
      }
      
      this.reduceBalance = this.reduceBalance === '' ? 0 : Number(this.reduceBalance);
      this.buckleOtherBalance = this.buckleOtherBalance === '' ? 0 : Number(this.buckleOtherBalance);
      if(this.customerPhone.length !== 0 && sign !== '1'){
        console.log(Number(this.buckleBalance),Number(this.reduceBalance),Number(this.buckleOtherBalance))
        this.buckleBalance = Number(this.buckleBalance) - Number(this.reduceBalance) - Number(this.buckleOtherBalance);
        this.buckleBalance =  this.buckleBalance < 0 ? 0 : this.buckleBalance;
       
      }
      if(Number(this.buckleBalance) > Number(this.customerBalance)){
            this.buckleBalance = this.customerBalance
             console.log(this.buckleBalance, 'this.buckleBalance')
        }
      if(this.customerPhone.length !== 0){
          if(this.buckleBalance !== ''){
              this.newBalance = (Number(this.customerBalance) - Number(this.buckleBalance)).toFixed(2);
              let yue = (Number(buyPrice) - Number(this.buckleBalance)).toFixed(2);
              this.shouldBalance = yue
          }
          else{
              this.newBalance = this.customerBalance;
              this.shouldBalance = this.buyPrice;
          }
          
      }else{
        this.newBalance = this.customerBalance;
        this.shouldBalance = buyPrice
      }
      if(this.buckleOtherBalance !== ''&&this.customerPhone.length !== 0){
          this.newOtherBalance = (Number(this.customerOtherBalance) - Number(this.buckleOtherBalance)).toFixed(2);
          let yue = (Number(this.shouldBalance) - Number(this.buckleOtherBalance)).toFixed(2);
          this.shouldBalance = yue
      }else{
        this.newOtherBalance = this.customerOtherBalance;
        this.shouldBalance = this.shouldBalance
      }
      if(this.reduceBalance !== ''){
          this.shouldBalance = (Number(this.shouldBalance) - Number(this.reduceBalance)).toFixed(2);
      }
      console.log(Number(this.shouldBalance),'this.shouldBalance')
      if (Number(this.shouldBalance) === 0) {
        this.payType = '';
      }
    },
    addDataFun(formName1){
      
    },
    editDataFun(formName) {
      this.loadingAccount = true
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
    accountDel(data,index) {
        this.tableData.splice(index,1);
    },
    getTableData() {
        if(this.searchphone === ''){
            this.customerOtherBalance = '';
                 this.customerBalance = '';
                 this.customerName = '';
                 this.customerPhone = '';
                 this.customerId = '';
                 this.customerNo = "";
                 this.totalPage = '';
            return
        }
      customerlist({"name": this.searchusername,
        "phone": this.searchphone,
        "date": '',
        "uid": sessionStorage.getItem('uid'),
        "pages":this.currentPage,
        "pagesize":this.pageSize
        })
      .then(r => {
            // this.tableData = r.data.data_list;
            this.totalPage = r.data.datacount
            if(r.data.data_list.length !== 0) {
                 this.customerOtherBalance = r.data.data_list[0].otherBalance;
                 this.customerBalance = r.data.data_list[0].balance;
                 this.customerName = r.data.data_list[0].name;
                 this.customerPhone = r.data.data_list[0].phone;
                 this.customerId = r.data.data_list[0].id;
                 this.customerNo = r.data.data_list[0].no;
                 console.log(r.data.data_list[0])
                 this.textarea = `地址：${r.data.data_list[0].adds}\r\n电话：${r.data.data_list[0].phone}`;
                 let buyPrice = 0;
                this.tableData.map(item=>{
                    buyPrice = (Number(item.totalPrice) + Number(buyPrice)).toFixed(2);
                })
                if(this.customerPhone.length !== 0){
                    this.buckleBalance = buyPrice;
                }
                 this.censusShop('0')
            } else {
                 this.customerOtherBalance = '';
                 this.customerBalance = '';
                 this.customerName = '暂无会员信息，可去会员管理页面搜索！';
                 this.customerPhone = '';
                 this.customerId = '';
                 this.customerNo = '';
                 this.totalPage = '';

            }
            
        }).catch(() => {});
    },
    getuserbind() {
      
    },
    openHTML(word) {
        
    },
    wordAccount(){
        this.wordVisible = false
    },
    getProductlist() {
      productlist({"name": '',
        "no": '',
        "type": '',
        "uid": sessionStorage.getItem('uid'),
        "pages": 1,
        "pagesize": '1000'
        })
      .then(r => {
            this.productData = r.data.data_list;
        }).catch(() => {});
    },
    productSelect(data){
        this.productData.map(item=>{
          console.log(item.id)
            if(item.id === data){
              console.log(item)
                this.form.productname = item.name;
                this.form.num = '1';
                this.form.price = item.price
            }
        })
        console.log(data)
    }
  },
  beforeDestroy() {
    this.$msgbox.close()
 },
//   message_
  mounted: function() {
      this.getProductlist()
      console.log(this.$route.query.phone)
      if(this.$route.query.phone !== undefined){
          this.searchphone = this.$route.query.phone;
          this.getTableData();
      }
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
