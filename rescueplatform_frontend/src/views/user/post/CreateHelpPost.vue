<template>
  <div>
    <div class="mb-5" v-if="refresh">
      <Header></Header>
    </div>
    <div class="container context">
      <div class="columns">
        <div class="column is-full">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span><i class=" is-size-3"> 提供帮助 </i></span>
            </div>
            <div>
              <el-form
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                class="demo-ruleForm"
              >
                <el-form-item label="您的姓名" prop="name">
                  <el-input
                    v-model="ruleForm.name"
                    placeholder="请输入姓名，会公开至网站首页"
                  />
                </el-form-item>

                <el-form-item label="您的电话" prop="phone">
                  <el-input
                    v-model.number="ruleForm.phone"
                    placeholder="请输入可以联系到手机号，会公开至网站首页，以便联系"
                  />
                </el-form-item>

                <el-form-item label="可提供帮助" prop="description">
                  <el-input
                    v-model="ruleForm.description"
                    placeholder="请简要描述避难所场所情况或是可以提供的帮助，例如饮用水、食物、住宿等"
                    type="textarea"
                  />
                </el-form-item>

                <p class="md-2 level-left">输入选择当前位置</p>
                <div class = "smap">
                    <Map @addressinfo = "getaddress"></Map>
                </div>


                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')"
                    >立即创建
                  </el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Map from '@/components/map/SearchMap'

export default {
  name: "TopicPost",
  components: { Header, Footer,Map},
  data() {
    var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
              callback();
          }
        }, 500);
      };
    return {
      contentEditor: {},
      ruleForm: {
          name:'',
          phone:'',
          description:'',
          posx:'',
          posy:'',
          address:'',
      },
      sendForm:{
          name:'',
          phone:'',
          description:'',
          posx:'',
          posy:'',
          address:'',
      },
      rules: {
          name: [
            { required: true, message: '请输入您的名字', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true,validator: checkPhone, trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入帮助说明', trigger: 'blur' },
            { min: 1, max: 60, message: '长度在 1 到 60 个字符', trigger: 'blur' }
          ],
      },

      refresh: true,
    };
  },
  mounted() {
    this.refreshComp();
  },
  methods: {
    //提交
    submitForm(formName) {
        this.sendForm = this.ruleForm;
        console.log(this.sendForm)
    },
    //重置
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    //接收子组件位置信息
    async getaddress(address,location) {
        this.ruleForm.address = address
        this.ruleForm.posx = location.lng
        this.ruleForm.posy = location.lat
    },
    //解决vue页头懒加载导致组件错位的问题
    refreshComp() {
      // 移除组件
      this.refresh = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.refresh = true;
      });
    },
  },
};
</script>

<style scoped>
  .smap{
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
