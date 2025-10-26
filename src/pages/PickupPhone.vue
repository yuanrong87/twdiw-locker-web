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
      <div class="card-title text-teal">請輸入手機號碼</div>
      <!-- 電話號碼 輸入框 -->
      <div class="phone-container">
        <!-- 固定 0 -->
        <div class="phone-fixed">0</div>
        <!-- 固定 9 -->
        <div class="phone-fixed">9</div>
        <template v-for="(digit, index) in phone" :key="index">
          <q-input
            v-model="phone[index]"
            ref="phoneRefs"
            maxlength="1"
            dense
            type="text"
            inputmode="numeric"
            class="q-mx-xs phone-box"
            color="teal-5"
            @update:model-value="handleInput($event, index)"
            @paste="handlePaste($event, index)"
            @keydown.backspace="handleBackspace(index, $event)"
            input-style="padding-bottom: 6px;"
          />
          <!-- 第 2 和第 5 個輸入框後加 - -->
          <span v-if="index === 1 || index === 4" class="phone-dash">-</span>
        </template>
      </div>
      <div class="flex row justify-center q-gutter-xl">
        <q-btn
          class="col-auto q-px-xl q-py-md"
          color="grey"
          label="清空"
          size="28px"
          @click="clearPhone"
        ></q-btn>
        <q-btn
          class="col-auto q-px-xl q-py-md"
          color="teal"
          label="確認"
          size="28px"
          @click="clickComfirm"
        ></q-btn>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, nextTick, computed, onMounted } from 'vue'
import { useNotify } from 'src/utils/plugin'
import { useRouter } from 'vue-router'

const router = useRouter()

const $n = useNotify()

const phone = ref(['', '', '', '', '', '', '', ''])
const phoneRefs = ref([])

// 回首頁
const goToHome = () => {
  router.push('/')
}

const goToOptCheck = () => {
  router.push({
    path: '/optCheck',
    query: { phone: '09' + phoneValue.value },
  })
}

// 計算屬性
const phoneValue = computed(() => phone.value.join(''))

// 清空 電話號碼 輸入
const clearPhone = () => {
  phone.value = ['', '', '', '', '', '', '', '']
  focusInput(0)
}

// 聚焦指定輸入框
const focusInput = (index) => {
  const input = phoneRefs.value[index]?.$el?.querySelector('input')
  input?.focus()
}

// 處理貼上事件
const handlePaste = (event, index) => {
  event.preventDefault()

  const pastedData = event.clipboardData.getData('text')

  const numbers = pastedData.replace(/[^0-9]/g, '')

  if (numbers.length > 0) {
    const remainingSlots = phone.value.length - index
    const numbersToFill = numbers.slice(0, remainingSlots)

    for (let i = 0; i < numbersToFill.length; i++) {
      if (index + i < phone.value.length) {
        phone.value[index + i] = numbersToFill[i]
      }
    }

    const nextFocusIndex = Math.min(index + numbersToFill.length, phone.value.length - 1)
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
  phone.value[index] = numericValue

  if (numericValue && index < phone.value.length - 1) {
    nextTick(() => {
      focusInput(index + 1)
    })
  }
}

// Backspace 處理
const handleBackspace = (index, event) => {
  if (phone.value[index] !== '') {
    phone.value[index] = ''
  } else if (index > 0) {
    event.preventDefault()
    phone.value[index - 1] = ''
    nextTick(() => {
      focusInput(index - 1)
    })
  }
}

// 確認
const clickComfirm = () => {
  const phone = '09' + phoneValue.value

  if (phoneValue.value.length !== 8) {
    $n.error('請輸入完整手機號碼')
    return
  }

  console.log('手機號碼：', phone)
  goToOptCheck()
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

.phone-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}

.phone-box {
  width: 70px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-box :deep(input) {
  text-align: center;
  font-size: 45px;
  font-weight: 700;
  line-height: 60px;
  color: teal;
}

.phone-box :deep(.q-field__native) {
  padding-bottom: 10px; /* 底線距離數字 */
}

/* 隱藏 Chrome、Safari 的上下箭頭 */
.phone-box :deep(::-webkit-inner-spin-button),
.phone-box :deep(::-webkit-outer-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

/* 隱藏 Firefox 的上下箭頭 */
.phone-box :deep(input[type='number']) {
  -moz-appearance: textfield;
}

.phone-fixed {
  width: 70px;
  height: 70px;
  text-align: center;
  font-size: 45px;
  color: #343434;
  font-weight: 700;
  align-items: center;
  justify-content: center;
}

.phone-dash {
  font-size: 50px;
  line-height: 60px;
  margin: 0 4px;
}
</style>
