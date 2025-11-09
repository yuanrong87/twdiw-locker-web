import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useNotify } from '../utils/plugin'

const $n = useNotify()

export const useUserInfoStore = defineStore('userInfo', () => {
  const lockers = ref([]) // 儲存櫃子列表
  const location = ref([]) // 儲存地點列表
  const selectedLocker = ref(null) // 目前選中的櫃子

  const qrCodeDetail = ref(null)
  const qrcodeLoading = ref(false)

  const selectLocker = (locker) => {
    selectedLocker.value = locker
  }

  // 重選櫃子
  const clearSelection = () => {
    selectedLocker.value = null
  }

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
      location.value = res.data.data.map((item) => ({ key: item.key, value: item.value }))
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

  // 送出寄貨資料
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

  // 送出取貨資料
  const pickdUserInfo = async (data) => {
    try {
      const response = await api.post(`/lockers/pickup`, data)
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
    fetchLocker,
    fetchLocation,
    location,
    getQrcode,
    qrCodeDetail,
    qrcodeLoading,
    getQrcodeValidate,
    sendUserInfo,
    pickdUserInfo,
  }
})
