<template>
  <!-- 主卡片 -->
  <q-card class="q-pa-lg" style="width: 100%">
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
          <div class="text-h6 col text-dark">{{ formData.sendName }}</div>
        </div>
        <div class="row items-center">
          <div class="text-h6 col-3 text-center">手機號碼：</div>
          <div class="text-h6 col text-dark">{{ formData.sendPhone }}</div>
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
      <q-form ref="formRef" greedy>
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
            :rules="[(val) => !!val || '請選擇據點']"
          />
        </div>

        <!-- 動態欄位 -->
        <div
          v-for="(label, key) in fieldLabels"
          :key="key"
          class="row items-center q-my-sm q-gutter-sm"
        >
          <div class="text-h6 col-3 text-center">{{ label }}：</div>
          <q-input
            class="col"
            outlined
            v-model="fields[key]"
            :rules="[(val) => !!val || '請輸入資料']"
          />
        </div>
      </q-form>
    </q-card>

    <!-- 底部按鈕 -->
    <div class="flex justify-center q-gutter-lg q-mt-lg">
      <q-btn outline color="grey-6" label="重置" size="lg" @click="resetForm" />
      <q-btn color="teal" label="下一步" size="lg" @click="comfirm" />
    </div>
  </q-card>
</template>

<script setup>
import { ref, watch } from 'vue'
// import { useRouter } from 'vue-router'
// import { useQuasar } from 'quasar'
import { useNotify } from 'src/utils/plugin'
import { useUserInfoStore } from 'src/stores/userInfo'

const userInfoStore = useUserInfoStore()

const { branches } = userInfoStore

const $n = useNotify()
// const $q = useQuasar()

const formRef = ref(null)
// const router = useRouter()
const method = ref('1')
const sameAsSender = ref(false)

// 步驟資料
const formData = defineModel('formData')
const emit = defineEmits(['next-step'])

// 下一步 ＋ 檢核
const toNextStep = async () => {
  formData.value.location = selectedBranch.value
  formData.value.receiveName = fields.value.name
  formData.value.receivePhone = fields.value.phone

  emit('next-step')
}

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
  fields.value.name = val ? formData.value.sendName : ''
  fields.value.phone = val ? formData.value.sendPhone : ''
})

const resetForm = () => {
  sameAsSender.value = false
  selectedBranch.value = null

  // 清空欄位
  Object.keys(fields.value).forEach((key) => {
    fields.value[key] = ''
  })
}

const comfirm = async () => {
  const valid = await formRef.value.validate()
  if (!valid) {
    $n.error('請照規則填寫所有必填欄位!')
    return
  }
  console.log(fields.value, selectedBranch.value)
  toNextStep()
}
</script>
