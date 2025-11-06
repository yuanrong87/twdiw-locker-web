import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { api } from 'boot/axios'
// import { useNotify } from '../utils/plugin'
import { useRouter } from 'vue-router'

// const $n = useNotify()

export const useUserInfoStore = defineStore('userInfo', () => {
  const router = useRouter()
  const type = ref('')
  const lockers = ref(['A1', 'A2', 'A3']) // 櫃子列表
  const selectedLocker = ref(null) // 目前選中的櫃子

  const selectLocker = (locker) => {
    selectedLocker.value = locker
  }

  const clearSelection = () => {
    selectedLocker.value = null
  }

  const branches = ref([
    { label: '台北', value: 'taipei' },
    { label: '高雄', value: 'kaohsiung' },
  ])

  // 回首頁
  const goToHome = () => {
    router.push('/')
  }

  const goToQrcode = () => {
    router.push('/qrcode')
  }

  return {
    lockers,
    selectedLocker,
    selectLocker,
    clearSelection,
    goToHome,
    goToQrcode,
    branches,
    type,
  }
})
