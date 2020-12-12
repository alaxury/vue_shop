<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <tree-table
        class="topGap"
        :data="catelist"
        :expand-type="false"
        :columns="columns"
        :selection-type="false"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level===0">一级</el-tag>
          <el-tag type="success" size="mini" v-else-if="scope.row.cat_level===1">二级</el-tag>
          <el-tag type="warning" size="mini" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt" slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editCate(scope.row.cat_id)"
          >编辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeCateById(scope.row.cat_id)"
          >删除</el-button>
        </template>
      </tree-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="querInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 修改分类的对话框 -->
    <el-dialog title="修改分类" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <!-- 内容主体区域 -->
      <el-form label-width="70px">
        <el-form-item label="分类名称">
          <!-- <el-input v-model="editCateData.cat_name"></el-input> -->
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="分级父类">
          <el-cascader
              v-model="selectedKeys"
              :options="parentCateList"
              :props="parentCateProps"
              @change="parentCateChanged"
              clearable change-on-select>
          </el-cascader>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAddCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editDialogVisible: false,
      editCateData: [],
      addCateDialogVisible: false,
      selectedKeys: [],
      parentCateList: [],
      addCateForm: {
        // 将要添加的分类的名称
        cat_name: '',
        // 父级分类的Id
        cat_pid: 0,
        // 分类的等级，默认要添加的是1级分类
        cat_level: 0
      },
      parentCateProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true
      },
      querInfo: {
        // 查询条件,

        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      catelist: [],
      total: 0,
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          // prop: 'cat_deleted',  //当是template时，可以不传prop
          type: 'template',
          template: 'isok'
        },
        {
          label: '排序',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt'
        }
      ],
      addCateFormRules: {
        cat_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    // 获取商品分类
    async getCateList () {
      const { data: res } = await this.$http.get('categories', {
        params: this.querInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败')
      }
      console.log('商品分类', res)
      this.catelist = res.data.result
      this.total = res.data.total
    },
    // 监听每页条数改变
    handleSizeChange (newSize) {
      this.querInfo.pagesize = newSize
      this.getCateList()
    },
    // 监听当前页改变
    handleCurrentChange (newPageNum) {
      this.querInfo.pagenum = newPageNum
      this.getCateList()
    },
    // 获取修改对话框数据
    async editCate (CateId) {
      this.editDialogVisible = true
      const { data: res } = await this.$http.get('categories/' + CateId)
      if (res.meta.status !== 200) {
        return this.$message.error('查询商品分类失败')
      }
      console.log('修改分类', res)
      this.editCateData = res.data
    },
    // 保存修改
    async saveCate () {
      const { data: res } = await this.$http.put(
        'categories/' + this.editCateData.cat_id,
        { cat_name: this.editCateData.cat_name }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('保存失败')
      }
      this.$message.success('更新分类名称成功！')
      this.getCateList()
      this.editDialogVisible = false
    },
    // 监听修改分类对话框关闭
    editDialogClosed () {
      this.editDialogVisible = false
    },
    // 删除
    async removeCateById (id) {
      const confirmResult = await this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$http.delete('categories/' + id)
      if (res.meta.status !== 200) {
        console.log(this.editCateData.cat_id)
        return this.$message.error('删除分类失败')
      }
      this.$message.success('删除分类成功')
      this.getCateList()
    },
    // 添加
    showAddCateDialog () {
      this.addCateDialogVisible = true
      this.getParentCateList()
    },
    addCateDialogClosed () {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_pid = 0
      this.addCateForm.cat_level = 0
    },
    // 获取父级分类的数据列表
    async getParentCateList () {
      const { data: res } = await this.$http.get('categories', {
        params: { type: 2 }
      })

      if (res.meta.status !== 200) {
        return this.$message.error('获取父级分类数据失败')
      }

      console.log('父级分类', res.data)
      this.parentCateList = res.data
    },
    // 保存添加分类
    saveAddCate () {
      this.$refs.addCateFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('categories', this.addCateForm)
        if (res.meta.status !== 201) {
          return this.$message.error('添加分类失败')
        }
        this.$message.success('添加分类成功')
        this.getCateList()
        this.addCateDialogVisible = false
      })
    },
    parentCateChanged () {
      console.log(this.selectedKeys)
      if (this.selectedKeys.length > 0) {
        // 父级分类ID
        this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        // 当前分类ID
        this.addCateForm.cat_level = this.selectedKeys.length
      } else {
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
    }
  }
}
</script>

<style lang="less">
.tree-table {
  margin-top: 20px;
}
.el-cascader{
  width: 100%;
}
</style>
