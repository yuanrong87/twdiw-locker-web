<template>
  <q-page class="flex column items-center justify-center">
    <q-card class="card flex column items-center justify-between q-pa-lg"
      ><div class="card-title text-grey-8 q-mb-md">包裹櫃位資訊</div>

      <div class="card-content col column q-px-xl q-py-md">
        <q-table class="col" :rows="rows" :columns="columns" row-key="id" flat hide-bottom />
      </div>
      <div class="text-h5 text-negative text-bold text-center">
        櫃門已開啟，請前往您的櫃位取件，並於取件完成後，將櫃門關上。
      </div></q-card
    >
    <div class="text-h6 text-center text-primary q-mt-md">
      <span class="text-bold">{{ countdown }}</span> 秒後將自動返回首頁
    </div>
    <q-btn
      class="col-auto q-mt-md q-px-xl q-py-md"
      color="indigo-6"
      label="回首頁"
      size="28px"
      @click="goToHome"
    ></q-btn>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNotify } from 'src/utils/plugin'

const router = useRouter()

const $n = useNotify()

const countdown = ref(10)
const countdownInterval = ref(null)

// 添加輪詢相關函數
const startCountdown = () => {
  // 計算剩餘秒數
  countdownInterval.value = setInterval(() => {
    countdown.value--

    if (countdown.value <= 0) {
      countdown.value = 0
      goToHome()
    }
  }, 1000)
}

const stopCountdown = () => {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value)
    countdownInterval.value = null
  }
}

const goToHome = () => {
  stopCountdown()
  router.push('/')
  $n.success('已返回首頁')
}

const columns = [
  { name: 'id', label: '單號', field: 'id', align: 'left' },
  {
    name: 'location',
    label: '櫃位',
    field: 'location',
    align: 'right',
    style: 'font-size: 24px; color: #3f51b5; font-weight: bold;',
  },
]

const rows = ref([
  { id: 'A2025102601', location: 'A-10' },
  { id: 'A2025102602', location: 'A-10' },
])

onMounted(() => {
  startCountdown()
})
</script>

<style scoped>
.card {
  width: 70%;
  min-height: 450px;
  background-color: white;
  border-radius: 16px;
}
.card-title {
  width: auto;
  font-size: 36px;
  font-weight: 700;
  border-bottom: 4px solid #797979;
}
.card-content {
  width: 100%;
  height: 100%;
  font-size: 20px;
  line-height: 2.5;
}
</style>
