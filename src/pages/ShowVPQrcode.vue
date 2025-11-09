<template>
  <div class="card-title text-indigo-8 q-mb-lg">請使用 數位憑證皮夾 APP 掃描 QR Code</div>
  <div class="card-content">
    <div class="text-h6 text-negative text-bold text-center" style="line-height: 1.2">
      請注意 QR Code 只能使用一次，如發生 QR Code 失效或倒數結束，請點選『重新產生 QR CODE』，再掃描
      QR Code 完成流程。
    </div>
    <div class="qrcode-section">
      <!-- QR Code Loading -->
      <div class="col full-width column justify-start items-center">
        <div
          v-if="qrcodeLoading"
          style="width: 200px; height: 200px"
          class="row justify-center items-center q-mb-xs"
        >
          <q-spinner-ios class="col text-grey items-center" size="lg" />
        </div>
      </div>
      <!-- QR Code -->
      <q-img
        v-if="qrCodeDetail && qrCodeDetail.qrcodeImage && !qrcodeLoading"
        :src="qrCodeDetail.qrcodeImage"
        height="100%"
        fit="contain"
      ></q-img>
    </div>
    <p class="text-h5 text-center">
      驗證倒數：<span class="text-grey-7">
        {{ `0${Math.floor(countdown / 60)}` }}:{{ String(countdown % 60).padStart(2, '0') }}
      </span>
    </p>
  </div>
  <div class="flex row justify-center">
    <q-btn
      outline
      class="col-auto q-mr-xl"
      color="grey"
      label="上一步"
      size="lg"
      @click="toPrevious"
    ></q-btn>
    <q-btn
      class="col-auto q-py-md"
      color="indigo-6"
      label="重新產生 QR CODE"
      size="lg"
      @click="regenerateQRCode"
    ></q-btn>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserInfoStore } from 'src/stores/userInfo'
import { useNotify } from '../utils/plugin'

const $n = useNotify()

const userInfoStore = useUserInfoStore()

const { getQrcode, getQrcodeValidate } = userInfoStore
const { qrCodeDetail, qrcodeLoading } = storeToRefs(userInfoStore)

// QR Code 相關
const initCountdownVal = 300 // 驗證倒數（單位：秒）
const countdown = ref(300) // 初始驗證倒數，方便重置
const countdownInterval = ref(null)
const pollTimer = ref(null) // 儲存輪詢的 timer

// 資料相關
const claimsData = ref([])

// 步驟資料
const formData = defineModel('formData')
const emit = defineEmits(['next-step', 'go-previous'])

// 建立輪詢函數
const startPolling = () => {
  // 啟動前先確保停止舊的
  stopPolling()

  const hasRequiredData = qrCodeDetail.value?.qrcodeImage
  if (!hasRequiredData) {
    console.log('缺少必要參數')
    return
  }

  startCountdown()

  // 每 2 秒輪詢一次
  pollTimer.value = setInterval(async () => {
    try {
      const result = await getQrcodeValidate(qrCodeDetail.value.transactionId)

      const res = result?.data

      if (!res) {
        console.error('輪詢驗證結果失敗')
        return
      }

      if (res) {
        // 驗證成功
        claimsData.value = result?.data

        const idCard = claimsData.value.data?.find(
          (item) =>
            item.credentialType === '00000000_id_card' ||
            item.credentialType === '00000000_nhi_card' ||
            item.credentialType === '00000000_driving_license_test',
        )

        const telCard = claimsData.value.data?.find(
          (item) => item.credentialType === '00000000_uni_tel_card',
        )

        formData.value.verifyName = idCard?.claims.find((c) => c.ename === 'name')?.value || ''

        formData.value.verifyPhone =
          telCard?.claims.find((c) => c.ename === 'universal_telecom_card')?.value || ''

        stopPolling()
        stopCountdown()
        toNextStep()
      } else {
        // 驗證失敗
        stopPolling()
        stopCountdown()
      }
    } catch (error) {
      console.error('輪詢驗證結果失敗:', error)
      stopPolling()
      stopCountdown()
    }
  }, 2000)
}

// 添加輪詢相關函數
const startCountdown = () => {
  // 啟動前先確保停止舊的
  stopCountdown()

  // 重置倒數時間
  countdown.value = initCountdownVal

  // 計算剩餘秒數
  countdownInterval.value = setInterval(() => {
    countdown.value--

    if (countdown.value === 0) {
      stopCountdown()
      stopPolling()
    }
  }, 1000)
}

const stopCountdown = () => {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value)
    countdownInterval.value = null
  }
}

// 停止輪詢相關函數
const stopPolling = () => {
  if (pollTimer.value) {
    clearInterval(pollTimer.value)
    pollTimer.value = null
  }
}

// 重新產生 QR Code
const regenerateQRCode = async () => {
  await getQrcode()
  startPolling()
}

// 上一步
const toPrevious = () => {
  stopCountdown()
  stopPolling()
  emit('go-previous')
}

// 下一步 ＋ 檢核
const toNextStep = async () => {
  $n.success('驗證成功')
  emit('next-step')
}

onMounted(async () => {
  await getQrcode()
  startPolling()
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
  font-size: 32px;
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
  margin: 10px 0;
}
</style>
