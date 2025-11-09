<template>
  <!-- 寄物模式 -->
  <q-card v-if="formData.type == '1'" class="q-pa-lg" style="width: 100%">
    <div class="text-h4 text-teal text-bold text-center q-mb-lg">確認資料</div>

    <!-- 寄件人資訊 -->
    <q-card flat bordered class="q-pa-md q-mb-xl">
      <div class="text-h6 text-bold text-teal flex items-center q-mb-sm">
        <q-icon name="local_shipping" size="md" class="q-mr-sm" /> 寄件人資訊
      </div>
      <q-separator spaced />

      <div class="q-gutter-sm q-mt-sm">
        <div class="row items-center">
          <div class="text-h6 col-3 text-center">姓名：</div>
          <div class="text-h6 col text-dark">{{ formData.verifyName }}</div>
        </div>
        <div class="row items-center">
          <div class="text-h6 col-3 text-center">手機號碼：</div>
          <div class="text-h6 col text-dark">{{ formData.verifyPhone }}</div>
        </div>
      </div>
    </q-card>

    <!-- 取件人資訊 -->
    <q-card flat bordered class="q-pa-md q-mb-md">
      <div class="text-h6 text-bold text-teal flex items-center">
        <q-icon name="shopping_bag" size="md" class="q-mr-sm" /> 取件人資訊
      </div>
      <q-separator spaced />

      <div class="q-gutter-sm q-mt-sm">
        <div v-if="formData.item == '2'" class="row items-center">
          <div class="text-h6 col-3 text-center">收件據點：</div>
          <div class="text-h6 col text-dark">{{ formData.location.value }}</div>
        </div>
        <div class="row items-center">
          <div class="text-h6 col-3 text-center">姓名：</div>
          <div class="text-h6 col text-dark">{{ formData.receiveName }}</div>
        </div>
        <div class="row items-center">
          <div class="text-h6 col-3 text-center">手機號碼：</div>
          <div class="text-h6 col text-dark">{{ formData.receivePhone }}</div>
        </div>
      </div>
    </q-card>

    <!-- 底部按鈕 -->
    <div class="flex justify-center q-gutter-lg q-mt-lg">
      <q-btn outline color="grey-6" label="上一步" size="lg" @click="toPrevious" />
      <q-btn color="teal" label="前往付款" size="lg" @click="toNextStep" />
    </div>
  </q-card>

  <!-- 取物模式 -->
  <q-card v-else class="q-pa-lg" style="width: 100%">
    <div class="text-h4 text-teal text-bold text-center q-mb-lg">確認資料與付款</div>

    <!-- 取件人資訊 -->
    <q-card flat bordered class="q-pa-md q-mb-md">
      <div class="text-h6 text-bold text-teal flex items-center">
        <q-icon name="shopping_bag" size="md" class="q-mr-sm" /> 取件人資訊
      </div>
      <q-separator spaced />
      <q-form ref="formRef" greedy>
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
      </q-form>
    </q-card>

    <!-- 物品資訊 -->
    <q-card flat bordered class="q-pa-md q-mb-md">
      <div class="text-h6 text-bold text-teal flex items-center">
        <q-icon name="shopping_bag" size="md" class="q-mr-sm" /> 付款資訊
      </div>
      <q-separator spaced />

      <div class="q-gutter-sm q-mt-sm">
        <div class="row items-center">
          <div class="text-h6 col-3 text-center">金額：</div>
          <div class="text-h5 text-bold col text-dark text-red">{{ formData.payment }}</div>
        </div>
        <div class="text-caption q-mt-md text-grey">支援信用卡 / 行動支付 / 超商付款</div>
      </div>
    </q-card>
    <!-- 底部按鈕 -->
    <div class="flex justify-center q-gutter-lg q-mt-lg">
      <q-btn outline color="grey-6" label="重新驗證" size="lg" @click="toPrevious" />
      <q-btn color="teal" label="前往付款" size="lg" @click="comfirm" />
    </div>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { useNotify } from 'src/utils/plugin'
import { useUserInfoStore } from 'src/stores/userInfo'

const userInfoStore = useUserInfoStore()
const $n = useNotify()

const formRef = ref(null)

// 步驟資料
const formData = defineModel('formData')
const emit = defineEmits(['next-step', 'go-previous'])

const field = ref({
  name: '',
  phone: '',
})

// 上一步
const toPrevious = () => {
  emit('go-previous')
}

// 下一步 ＋ 檢核
const toNextStep = async () => {
  emit('next-step')
}

const payFee = async () => {
  const data = {
    location: formData.value.location,
    payment: formData.value.payment,
    receiveName: formData.value.verifyName,
    receivePhone: formData.value.verifyPhone,
  }
  const result = await userInfoStore.pickdUserInfo(data)
  if (result) {
    formData.value.lockerNo = result.data.lockerNo.join(', ')
    toNextStep()
  }
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
  payFee()
}
</script>
