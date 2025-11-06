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
    <q-card class="card flex column items-center justify-between q-pa-xl"
      ><div class="card-title text-indigo-8 q-mb-lg">請使用 數位憑證皮夾 APP 掃描 QR Code</div>
      <div class="card-content">
        <div class="text-h5 text-negative text-bold text-center" style="line-height: 1.2">
          請注意 QR Code 只能使用一次，如發生 QR Code 失效或倒數結束，請點選『重新產生 QR
          CODE』，再掃描 QR Code 完成流程。
        </div>
        <div class="qrcode-section">
          <q-img :src="qrcodeImg" height="100%" fit="contain"></q-img>
        </div>
        <p class="text-h5 text-center">
          驗證倒數：<span class="text-grey-7">
            {{ `0${Math.floor(countdown / 60)}` }}:{{ String(countdown % 60).padStart(2, '0') }}
          </span>
        </p>
      </div>
    </q-card>
    <div class="flex row q-gutter-lg">
      <q-btn
        class="col-auto q-mt-xl q-px-xl q-py-md"
        color="grey"
        label="取消"
        size="24px"
        @click="goToHome"
      ></q-btn>
      <q-btn
        class="col-auto q-mt-xl q-px-xl q-py-md"
        color="indigo-6"
        label="重新產生 QR CODE"
        size="24px"
      ></q-btn>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserInfoStore } from 'src/stores/userInfo'

const userInfoStore = useUserInfoStore()

const { type } = storeToRefs(userInfoStore)
import qrcodeImg from 'src/assets/qrcode-example.png'

const router = useRouter()

const isVerify = ref(false)
const countdown = ref(300)
const countdownInterval = ref(null)

// 添加輪詢相關函數
const startCountdown = () => {
  // 計算剩餘秒數
  countdownInterval.value = setInterval(() => {
    countdown.value--

    if (countdown.value === 295) {
      isVerify.value = true
      goNextPage()
    }

    if (countdown.value <= 0) {
      countdown.value = 0
      stopCountdown()
    }
  }, 1000)
}

const stopCountdown = () => {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value)
    countdownInterval.value = null
  }
}

// 回首頁
const goToHome = () => {
  router.push('/')
}

const goNextPage = () => {
  if (type.value == '1') {
    router.push('/storeItemInfo')
  } else {
    router.push('/packagePayment')
  }
}

onMounted(() => {
  startCountdown()
})
</script>

<style scoped>
.card {
  width: 60%;
  min-height: 400px;
  background-color: white;
  border-radius: 16px;
}
.card-title {
  width: auto;
  font-size: 36px;
  font-weight: 700;
  border-bottom: 4px solid #3f51b5;
}
.card-content {
  height: 100%;
  font-size: 20px;
  line-height: 2.5;
}
.qrcode-section {
  width: 100%;
  height: 250px;
  margin: 30px 0;
}
</style>
