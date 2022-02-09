<template>
  <div class="account">
    <div class="title">多果多贝</div>
    <div class="date">下单日期：{{printData.date}}</div>
    <div v-if="printData.name !=='散客'" class='num'>会员编号：{{printData.phone}}</div>
    <div class='crow'><div>消费项目</div><div>数量</div><div>单价</div><div>金额</div></div>
    
    <div class='crow' :key="index" v-for="(item, index) in list"><div>{{item.productname}}</div><div>{{item.num}}</div><div>{{item.price}}</div><div>{{item.totalPrice}}</div></div>
    <div class='xrow'><div>小计金额</div><div>{{printData.subTotal}}</div></div>
    <div class='xrow'><div>优惠</div><div><span v-show="printData.reduceBalance !==''&&printData.reduceBalance !==0">-</span>{{printData.reduceBalance}}</div></div>
    <div  v-if="printData.name !=='散客'" class='xrow'><div>其他优惠抵扣</div><div><span v-show="printData.buckleOtherBalance !==''&&printData.buckleOtherBalance !==0">-</span>{{printData.buckleOtherBalance}}</div></div>
    <div  v-if="printData.name !=='散客'" class='xrow'><div>会员卡抵扣</div><span v-show="printData.buckleBalance !==''&&printData.buckleBalance !==0">-</span><div>{{printData.buckleBalance}}</div></div>
    <div class='hrow'><div>合计</div><div>{{printData.totalNum}}</div><div>{{printData.shouldBalance}}</div></div>
    <div v-if="printData.name !=='散客'" class='hyrow'><div>会员卡余额</div><div>{{printData.newBalance}}</div></div>
    <div class='num'>联系电话：18513671999</div>
    <div class='er'><img :src="er"/></div>
    <div class='remarks'><div>备注</div>{{printData.remarks}}</div>
    <el-button class='pintbut' type="primary" @click="pint">打印</el-button>
    <el-button class='pintbut' type="danger" style="margin-left: 30px" @click="goBack">返回</el-button>
    <!-- ,"remarks":"地址：\r\n电话：1391" -->
  </div>
</template>

<script>
import er from "./er.jpg"
const moment = require('moment');


export default {
  name: 'Login',
  data() {
    return {
        er: er,
        date: moment().format("YYYY-MM-DD"),
        time: moment().format("HH:mm"),
        printData:JSON.parse(sessionStorage.getItem('printData')),
        list: JSON.parse(JSON.parse(sessionStorage.getItem('printData')).inventoryList)
    }
  },
  watch: {
  },
  methods: {
      pint(){window.print({silent: false, printBackground: false})},
      goBack(){
          sessionStorage.removeItem('printData')
          this.$router.go(-1)
      }
  },
  beforeDestroy(){
  },
//   message_
  mounted: function() {
      console.log(this.printData)
      console.log(moment().format("YYYY-MM-DD"))
      console.log(moment().format("HH:mm"))
    //   window.print()
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
@page {
    margin: 0;
    padding: 0;
 }
@media print {
     html {margin:0}
    body {margin: 0;}
    .pintbut{display: none;}
    .account{margin-top: 20mm; margin-bottom: 20mm;position: relative;right: 5px;}
}
.remarks {
    white-space: pre-line;
    font-size: 20px;
}
.account {margin:0 8px}
.title {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 40px;
}

.dtrow {}

.date {
    font-size: 14px;
    margin-bottom: 5px;
}

.time {
    font-size: 14px;
    margin-bottom: 5px;
}

.num {
    font-size: 14px;
    margin-bottom: 5px;
}

.crow {
    margin-bottom: 5px;
}

.crow div {
    font-size: 12px;
    text-align: left;
}

.crow div:nth-child(1) {
    width: 30%;
}
.crow div:nth-child(2) {
    width: 20%;
    text-align: center;
}
.crow div:nth-child(3) {
    width: 25%;
    text-align: center;
}
.crow div:nth-child(4) {
    width: 25%;
    text-align: right;
}

.crow div {
    display: inline-block;
}

.xrow {
    margin-bottom: 5px;
    overflow: hidden;
}

.xrow div {
    display: inline-block;
    font-size: 12px;
}
.xrow div:nth-child(1) {
    float: left;
}
.xrow div:nth-child(2) {
    float: right;
}

.hrow {}

.hrow div {
    display: inline-block;
    text-align: left;
    font-size: 12px;
}

.hrow div:nth-child(1) {
    width: 30%;
}

.hrow div:nth-child(2) {
    width: 30%;
}

.hrow div:nth-child(3) {
    text-align: right;
    width: 40%;
}

.hyrow {
   
}

.hyrow div {
    font-size: 14px;
    display: inline-block;
    margin-bottom: 5px;
}
.hyrow div:nth-child(1) {
    width: 50%;
    text-align: left;
}

.hyrow div:nth-child(2) {
    width: 50%;
    text-align: right;
}
.er {
    margin-top: 20px;
}
.er img {
    height: 130px;
    margin: 0 auto;
    display: block;
}
</style>
