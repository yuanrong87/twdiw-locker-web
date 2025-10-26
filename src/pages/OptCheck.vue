<template>
  <q-page class="flex column items-center justify-center">
    <q-btn
      round
      dense
      icon="home"
      color="grey-8"
      class="absolute-top-right q-mr-md q-mt-md"
      size="lg"
      @click="goToHome"
    />
    <q-card class="card flex column items-center justify-between q-pa-lg">
      <div class="card-title text-teal">請輸入驗證碼</div>
      <div class="subtitle col flex column items-center justify-between q-mt-xl">
        <div class="text-pink-7">輸入的電話號碼：{{ phone ?? '' }}</div>
        <!-- 電話號碼 輸入框 -->
        <div class="otp-container">
          <template v-for="(digit, index) in otp" :key="index">
            <q-input
              v-model="otp[index]"
              ref="otpRefs"
              maxlength="1"
              dense
              type="text"
              inputmode="numeric"
              class="q-mx-xs otp-box"
              color="teal-5"
              @update:model-value="handleInput($event, index)"
              @paste="handlePaste($event, index)"
              @keydown.backspace="handleBackspace(index, $event)"
              input-style="padding-bottom: 6px;"
            />
          </template>
        </div>
        <div class="flex row justify-center q-gutter-xl">
          <q-btn
            class="col-auto q-px-xl q-py-md"
            color="pink-7"
            label="上一步"
            size="28px"
            @click="goToPickup"
          ></q-btn>
          <q-btn
            class="col-auto q-px-xl q-py-md"
            color="grey"
            label="清空"
            size="28px"
            @click="clearOtp"
          ></q-btn>
          <q-btn
            class="col-auto q-px-xl q-py-md"
            color="teal"
            label="確認"
            size="28px"
            @click="clickComfirm"
          ></q-btn>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, nextTick, computed, onMounted } from 'vue'
import { useNotify } from 'src/utils/plugin'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const route = useRoute()

const router = useRouter()
const phone = route.query.phone

const $n = useNotify()
const $q = useQuasar()

const otp = ref(['', '', '', '', '', ''])
const otpRefs = ref([])

// 回首頁
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

const goToPickup = () => {
  router.push('/pickupPhone')
}

const goToPackage = () => {
  router.push('/packagePayment')
}

// 計算屬性
const otpValue = computed(() => otp.value.join(''))

// 清空 電話號碼 輸入
const clearOtp = () => {
  otp.value = ['', '', '', '', '', '']
  focusInput(0)
}

// 聚焦指定輸入框
const focusInput = (index) => {
  const input = otpRefs.value[index]?.$el?.querySelector('input')
  input?.focus()
}

// 處理貼上事件
const handlePaste = (event, index) => {
  event.preventDefault()

  const pastedData = event.clipboardData.getData('text')

  const numbers = pastedData.replace(/[^0-9]/g, '')

  if (numbers.length > 0) {
    const remainingSlots = otp.value.length - index
    const numbersToFill = numbers.slice(0, remainingSlots)

    for (let i = 0; i < numbersToFill.length; i++) {
      if (index + i < otp.value.length) {
        otp.value[index + i] = numbersToFill[i]
      }
    }

    const nextFocusIndex = Math.min(index + numbersToFill.length, otp.value.length - 1)
    nextTick(() => {
      focusInput(nextFocusIndex)
    })
  }
}

// 電話號碼 輸入處理
const handleInput = (val, index) => {
  const numericValue = String(val || '')
    .replace(/[^0-9]/g, '')
    .slice(0, 1)
  otp.value[index] = numericValue

  if (numericValue && index < otp.value.length - 1) {
    nextTick(() => {
      focusInput(index + 1)
    })
  }
}

// Backspace 處理
const handleBackspace = (index, event) => {
  if (otp.value[index] !== '') {
    otp.value[index] = ''
  } else if (index > 0) {
    event.preventDefault()
    otp.value[index - 1] = ''
    nextTick(() => {
      focusInput(index - 1)
    })
  }
}

const clickComfirm = () => {
  if (otpValue.value.length !== 6) {
    $n.error('請輸入完整驗證碼')
    return
  }

  console.log('驗證碼：', otpValue.value)
  goToPackage()
}

onMounted(() => {
  focusInput(0)
})
</script>

<style scoped>
.card {
  height: 600px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 36px;
  font-weight: 700;
  border-bottom: 4px solid rgb(2, 169, 169);
}

.subtitle {
  font-size: 28px;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(190, 41, 41, 0.3);
}

.otp-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}

.otp-box {
  width: 70px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.otp-box :deep(input) {
  text-align: center;
  font-size: 45px;
  font-weight: 700;
  line-height: 60px;
  color: teal;
}

.otp-box :deep(.q-field__native) {
  padding-bottom: 10px; /* 底線距離數字 */
}

/* 隱藏 Chrome、Safari 的上下箭頭 */
.otp-box :deep(::-webkit-inner-spin-button),
.otp-box :deep(::-webkit-outer-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

/* 隱藏 Firefox 的上下箭頭 */
.otp-box :deep(input[type='number']) {
  -moz-appearance: textfield;
}
</style>
