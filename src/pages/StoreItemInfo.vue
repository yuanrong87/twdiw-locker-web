<template>
  <!-- 主卡片 -->
  <q-card class="q-pa-lg" style="width: 100%">
    <div class="text-h4 text-teal text-bold text-center q-mb-lg">寄物資訊填寫</div>

    <!-- 寄放或派送 -->
    <div class="row items-center justify-center q-gutter-xl q-mb-lg">
      <q-radio size="lg" v-model="method" val="1" label="寄放" class="text-h5" />
      <q-radio size="lg" v-model="method" val="2" label="派送" class="text-h5" />
    </div>
    <q-form ref="formRef" greedy>
      <!-- 寄件人資訊 -->
      <q-card flat bordered class="q-pa-md q-mb-xl">
        <div class="text-h6 text-bold text-teal flex items-center q-mb-sm">
          <q-icon name="local_shipping" size="md" class="q-mr-sm" /> 寄件人資訊
        </div>
        <q-separator spaced />

        <div class="q-gutter-sm q-mt-sm">
          <div class="row items-center">
            <div class="text-h6 col-3 text-center">姓名：</div>
            <q-input
              v-if="formData.verifyName === ''"
              class="col"
              outlined
              v-model="field.name"
              :rules="[(val) => !!val || '請輸入資料']"
            />
            <div v-else class="text-h6 col text-dark">{{ formData.verifyName }}</div>
          </div>
          <div class="row items-center">
            <div class="text-h6 col-3 text-center">手機號碼：</div>
            <q-input
              v-if="formData.verifyPhone === ''"
              class="col"
              outlined
              v-model="field.phone"
              :rules="[(val) => !!val || '請輸入資料']"
            />
            <div v-else class="text-h6 col text-dark">{{ formData.verifyPhone }}</div>
          </div>
        </div>
      </q-card>

      <!-- 取件人資訊 -->
      <q-card flat bordered class="q-pa-md q-mb-md">
        <div class="flex items-center justify-between q-mb-sm">
          <div class="text-h6 text-bold text-teal flex items-center">
            <q-icon name="shopping_bag" size="md" class="q-mr-sm" /> 取件人資訊
          </div>
          <q-checkbox v-model="sameAsSender" label="同寄件人" color="teal" class="text-h6" />
        </div>
        <q-separator spaced />

        <!-- 選擇據點 -->
        <div v-if="method === '2'" class="row items-center q-my-md q-gutter-sm">
          <div class="text-h6 col-3 text-center">選擇據點：</div>
          <q-select
            v-model="selectedBranch"
            :options="location"
            option-value="value"
            option-label="value"
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
            v-model="receiveFields[key]"
            :rules="[(val) => !!val || '請輸入資料']"
          />
        </div>
      </q-card>
    </q-form>

    <!-- 底部按鈕 -->
    <div class="flex justify-center q-gutter-lg q-mt-lg">
      <q-btn outline color="grey-6" label="重新驗證" size="lg" @click="toPrevious" />
      <q-btn outline color="grey-6" label="清空" size="lg" @click="resetForm" />
      <q-btn color="teal" label="下一步" size="lg" @click="comfirm" />
    </div>
  </q-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useNotify } from 'src/utils/plugin'
import { useUserInfoStore } from 'src/stores/userInfo'

const userInfoStore = useUserInfoStore()

const { location } = userInfoStore

const $n = useNotify()

const formRef = ref(null)
const method = ref('1')
const sameAsSender = ref(false)

const field = ref({
  name: '',
  phone: '',
})

// 步驟資料
const formData = defineModel('formData')
const emit = defineEmits(['next-step', 'go-previous'])

// 上一步
const toPrevious = () => {
  emit('go-previous')
}

// 下一步 ＋ 檢核
const toNextStep = async () => {
  console.log(selectedBranch.value)
  formData.value.item = method.value
  formData.value.location = selectedBranch.value
  formData.value.receiveName = receiveFields.value.name
  formData.value.receivePhone = receiveFields.value.phone

  emit('next-step')
}

const receiveFields = ref({
  name: '',
  phone: '',
})

const fieldLabels = {
  name: '姓名',
  phone: '手機號碼',
}

const selectedBranch = ref(null)

watch(sameAsSender, (val) => {
  const name = formData.value.verifyName ? formData.value.verifyName : field.value.name
  const phone = formData.value.verifyPhone ? formData.value.verifyPhone : field.value.phone
  receiveFields.value.name = val ? name : ''
  receiveFields.value.phone = val ? phone : ''
})

const resetForm = () => {
  sameAsSender.value = false
  selectedBranch.value = null

  // 清空欄位
  Object.keys(receiveFields.value).forEach((key) => {
    receiveFields.value[key] = ''
  })
}

const comfirm = async () => {
  const valid = await formRef.value.validate()
  if (!valid) {
    $n.error('請照規則填寫所有必填欄位!')
    return
  }
  if (formData.value.verifyName == '') {
    formData.value.verifyName = field.value.name
  }
  if (formData.value.verifyPhone == '') {
    formData.value.verifyPhone = field.value.phone
  }
  toNextStep()
}
</script>
