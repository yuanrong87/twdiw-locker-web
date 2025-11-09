<template>
  <!-- 寄物模式 -->
  <q-card v-if="formData.type == '1'" class="q-pa-lg" style="width: 100%">
    <div class="text-h4 text-teal text-bold text-center q-mb-lg">付款</div>

    <q-card flat bordered class="q-pa-md q-mb-xl">
      <!-- 金額提示 -->
      <div class="row items-center q-mt-md q-mb-xl">
        <div class="text-h6 q-mr-sm">寄件費用：</div>
        <span class="text-h4 text-red">NT$ {{ formData.payment }}</span>
      </div>
      <!-- 付款按鈕 -->
      <q-btn color="teal" label="確認付款" size="lg" @click="payFee" class="full-width" />

      <div class="text-caption q-mt-md text-grey">支援信用卡 / 行動支付 / 超商付款</div>
    </q-card>

    <!-- 底部按鈕 -->
    <div class="flex justify-center q-gutter-lg">
      <q-btn outline color="grey-6" label="取消" size="lg" @click="cancel" />
    </div>
  </q-card>

  <!-- 取物模式 -->
  <q-card v-else class="q-pa-lg" style="width: 100%">
    <div class="text-h4 text-teal text-bold text-center q-mb-lg">領取物品</div>

    <q-card flat bordered class="q-pa-md">
      <!-- 櫃子提示 -->
      <div class="row justify-center items-center q-mt-md q-mb-xl">
        <div class="text-h6 q-mr-sm">櫃子號碼：</div>
        <span class="text-h4 text-red">{{ formData.lockerNo ? formData.lockerNo : '001' }}</span>
      </div>
      <div class="text-h5 text-center q-mb-lg">
        請至指定櫃號取出物品，並於完成後關閉櫃門，謝謝。
      </div>

      <!-- 付款按鈕 -->
      <div class="flex justify-center q-gutter-lg">
        <q-btn color="teal" label="回首頁" size="lg" @click="goToHome" />
      </div>
    </q-card>
  </q-card>
</template>

<script setup>
// import { ref } from 'vue'
// import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useNotify } from 'src/utils/plugin'
import { useUserInfoStore } from 'src/stores/userInfo'

const $n = useNotify()
const $q = useQuasar()

const router = useRouter()
const userInfoStore = useUserInfoStore()

// 步驟資料
const formData = defineModel('formData')

const payFee = async () => {
  formData.value.payment = 30
  if (!formData.value.location) formData.value.location = '1'

  const data = {
    item: formData.value.item,
    location: formData.value.item == '1' ? formData.value.location : formData.value.location.key,
    lockerNo: formData.value.lockerNo,
    sendName: formData.value.verifyName,
    sendPhone: formData.value.verifyPhone,
    payment: formData.value.payment,
    receiveName: formData.value.receiveName,
    receivePhone: formData.value.receivePhone,
  }
  const result = await userInfoStore.sendUserInfo(data)
  if (result) {
    $q.dialog({
      title: '交易成功',
      message: `請至 ${formData.value.lockerNo} 櫃放入物品，並於放置完成後關閉櫃門，謝謝。`,
      persistent: true,
    }).onOk(() => {
      router.push('/')
    })
  }
}

const cancel = () => {
  $q.dialog({
    title: '交易取消',
    message: '返回後將會重置目前輸入內容，並返回首頁，是否確認？',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    router.push('/')
    $n.success('已返回首頁')
  })
}

const goToHome = () => {
  router.push('/')
  $n.success('已返回首頁')
}
</script>
