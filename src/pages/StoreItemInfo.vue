<template>
  <q-page class="flex column items-center bg-grey-2">
    <!-- 回首頁 -->
    <q-btn
      round
      dense
      icon="home"
      color="grey-8"
      class="absolute-top-right q-mr-md q-mt-md"
      size="lg"
      @click="goToHome"
    />

    <!-- 主卡片 -->
    <q-card class="q-pa-xl q-mt-xl" style="width: 85%; max-width: 900px">
      <div class="text-h4 text-teal text-bold text-center q-mb-lg">寄物資訊填寫</div>

      <!-- 寄放或派送 -->
      <div class="row items-center justify-center q-gutter-xl q-mb-lg">
        <q-radio size="lg" v-model="method" val="1" label="寄放" class="text-h5" />
        <q-radio size="lg" v-model="method" val="2" label="派送" class="text-h5" />
      </div>

      <!-- 寄貨人資訊 -->
      <q-card flat bordered class="q-pa-md q-mb-xl">
        <div class="text-h6 text-bold text-teal flex items-center q-mb-sm">
          <q-icon name="local_shipping" size="md" class="q-mr-sm" /> 寄貨人資訊
        </div>
        <q-separator spaced />

        <div class="q-gutter-sm q-mt-sm">
          <div class="row items-center">
            <div class="text-h6 col-3 text-center">姓名：</div>
            <div class="text-h6 col text-dark">{{ senderInfo.name }}</div>
          </div>
          <div class="row items-center">
            <div class="text-h6 col-3 text-center">手機號碼：</div>
            <div class="text-h6 col text-dark">{{ senderInfo.phone }}</div>
          </div>
        </div>
      </q-card>

      <!-- 取貨人資訊 -->
      <q-card flat bordered class="q-pa-md q-mb-md">
        <div class="flex items-center justify-between q-mb-sm">
          <div class="text-h6 text-bold text-teal flex items-center">
            <q-icon name="shopping_bag" size="md" class="q-mr-sm" /> 取貨人資訊
          </div>
          <q-checkbox v-model="sameAsSender" label="同寄貨人" color="teal" class="text-h6" />
        </div>
        <q-separator spaced />

        <!-- 選擇據點 -->
        <div v-if="method === '2'" class="row items-center q-my-md q-gutter-sm">
          <div class="text-h6 col-3 text-center">選擇據點：</div>
          <q-select
            v-model="selectedBranch"
            :options="branches"
            outlined
            clearable
            emit-value
            map-options
            class="col"
          />
        </div>

        <!-- 動態欄位 -->
        <div
          v-for="(label, key) in fieldLabels"
          :key="key"
          class="row items-center q-my-md q-gutter-sm"
        >
          <div class="text-h6 col-3 text-center">{{ label }}：</div>
          <q-input class="col" outlined v-model="fields[key]" />
        </div>
      </q-card>

      <!-- 底部按鈕 -->
      <div class="flex justify-center q-gutter-lg q-mt-lg">
        <q-btn outline color="grey-6" label="重置" size="lg" @click="resetForm" />
        <q-btn color="teal" label="下一步" size="lg" @click="readData" />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useNotify } from 'src/utils/plugin'
import { useUserInfoStore } from 'src/stores/userInfo'

const userInfoStore = useUserInfoStore()

const { branches } = userInfoStore

const $n = useNotify()
const $q = useQuasar()

const router = useRouter()
const method = ref('1')
const sameAsSender = ref(false)

const senderInfo = ref({
  name: '王小明',
  phone: '0912345678',
})

const fields = ref({
  name: '',
  phone: '',
})

const fieldLabels = {
  name: '姓名',
  phone: '手機號碼',
}

const selectedBranch = ref(null)

watch(sameAsSender, (val) => {
  fields.value.name = val ? senderInfo.value.name : ''
  fields.value.phone = val ? senderInfo.value.phone : ''
})

const readData = () => {
  console.log(fields.value, selectedBranch.value)
}

const resetForm = () => {
  sameAsSender.value = false
  selectedBranch.value = null

  // 清空欄位
  Object.keys(fields.value).forEach((key) => {
    fields.value[key] = ''
  })
}

const goToHome = () => {
  $q.dialog({
    title: '確認回首頁嗎',
    message: '返回後將會重置目前輸入內容，是否確認？',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    router.push('/')
    $n.success('已返回首頁')
  })
}
</script>
