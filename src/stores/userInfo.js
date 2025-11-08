import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useNotify } from '../utils/plugin'

const $n = useNotify()

export const useUserInfoStore = defineStore('userInfo', () => {
  const type = ref('')
  const lockers = ref([]) // 儲存櫃子列表
  const location = ref([]) // 儲存櫃子列表
  const selectedLocker = ref(null) // 目前選中的櫃子

  const qrCodeDetail = ref(null)
  const qrcodeLoading = ref(false)

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

  // 取得櫃子狀態
  const fetchLocker = async () => {
    try {
      const res = await api.post('/lockers/info', {
        location: '1',
      })
      lockers.value = res.data.data.lockerInfo
    } catch (err) {
      console.error(err)
    }
  }

  // 取得系統參數-地點
  const fetchLocation = async () => {
    try {
      const res = await api.post('/common/group/info', {
        groupName: 'LOCATION',
      })
      location.value = res.data.data
    } catch (err) {
      console.error(err)
    }
  }

  // 取得 QR Code
  const getQrcode = async () => {
    qrcodeLoading.value = true
    try {
      const response = await api.post('/lockers/qrcode')
      qrCodeDetail.value = response.data.data
    } catch (error) {
      console.error('Error get Qrcode:', error)
      const errorMessage = error.response?.data?.message || '發生未知錯誤'
      $n.error(errorMessage)
      return null
    } finally {
      qrcodeLoading.value = false
    }
  }

  // 取得 QR Code 驗證結果
  const getQrcodeValidate = async (transaction_id) => {
    try {
      const response = await api.post(`/lockers/qrcode/info`, {
        transactionId: transaction_id,
      })
      return response.data
    } catch (error) {
      console.log(error)
      const errorMessage = error.response?.data?.message || '發生未知錯誤'
      $n.error(errorMessage)
      return null
    }
  }

  const sendUserInfo = async (data) => {
    try {
      const response = await api.post(`/lockers/operation`, data)
      const responseData = response.data
      if (responseData.code !== '0000') {
        $n.error(responseData.message)
        return null
      } else {
        return responseData
      }
    } catch (error) {
      console.log(error)
      const errorMessage = error.response?.data?.message || '發生未知錯誤'
      $n.error(errorMessage)
      return null
    }
  }

  return {
    lockers,
    selectedLocker,
    selectLocker,
    clearSelection,
    branches,
    type,
    fetchLocker,
    fetchLocation,
    getQrcode,
    qrCodeDetail,
    qrcodeLoading,
    getQrcodeValidate,
    sendUserInfo,
  }
})
