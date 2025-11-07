<template>
  <!-- 主卡片 -->
  <q-card class="q-pa-lg" style="width: 100%">
    <div class="text-h4 text-teal text-bold text-center q-mb-lg">付款</div>

    <q-card flat bordered class="q-pa-md q-mb-xl">
      <!-- 金額提示 -->
      <div class="text-subtitle1 q-mb-xl">
        寄件費用：
        <span class="text-h4 text-red">NT$ 30</span>
      </div>

      <!-- 付款按鈕 -->
      <q-btn color="teal" label="確認付款" size="lg" @click="payFee" class="full-width" />

      <!-- 選擇其他付款方式 (可選) -->
      <div class="text-caption q-mt-md text-grey">支援信用卡 / 行動支付 / 超商付款</div>
    </q-card>

    <!-- 底部按鈕 -->
    <div class="flex justify-center q-gutter-lg">
      <q-btn outline color="grey-6" label="取消" size="lg" @click="cancel" />
    </div>
  </q-card>
</template>

<script setup>
// import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useNotify } from 'src/utils/plugin'

const $n = useNotify()
const $q = useQuasar()

const router = useRouter()

// 步驟資料
const formData = defineModel('formData')

const payFee = () => {
  $q.dialog({
    title: '交易成功',
    message: `請至 ${formData.value.locker} 櫃放入物品，並於放置完成後關閉櫃門，謝謝。`,
    persistent: true,
  }).onOk(() => {
    router.push('/')
  })
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
</script>
