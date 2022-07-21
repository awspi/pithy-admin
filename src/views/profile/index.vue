<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6" class="project-card">
        <project-card :features="featureData"> </project-card>
      </el-col>
      <el-col :span="18" class="">
        <el-card class="user-card">
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature :features="featureData"></feature>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter></chapter>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author></author>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProjectCard from './components/ProjectCard.vue'
import Feature from './components/Feature.vue'
import Chapter from './components/Chapter.vue'
import Author from './components/Author.vue'
import { feature as getFeature } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'
const activeName = ref('feature')
const featureData = ref([])
//获取feature
const getFeatureData = async () => {
  featureData.value = await getFeature()
}
getFeatureData()
watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>
