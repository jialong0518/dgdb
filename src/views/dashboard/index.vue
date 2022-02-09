<template>
  <div class="dashboard-container">
    <el-row :gutter="20" style="padding: 20px;">
    <el-col :span="6">
        <div style="display: inline-block;width:30%;">开始时间：</div>
        <el-date-picker
        v-model="searchdate"
        type="date"
        style="width: 70%"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        placeholder="选择日期时间">
        </el-date-picker>
    </el-col>
     <el-col :span="6">
        <div style="display: inline-block;width:30%;">结束时间：</div>
        <el-date-picker
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { rechargeRecordList } from "@/api/customer";
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted: function() {
      if(sessionStorage.getItem('token') == null){
          this.$router.push({
                            path:'/login'
                    });
      }
  },
  methods: {
      getTableData() {
      rechargeRecordList({"name": this.searchusername,
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
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
