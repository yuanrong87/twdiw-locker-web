<template>
  <!-- 主卡片 -->
  <q-card class="q-pa-lg" style="width: 100%">
    <div class="text-h4 text-teal text-bold text-center q-mb-lg">確認資料</div>

    <!-- 寄件人資訊 -->
    <q-card flat bordered class="q-pa-md q-mb-xl">
      <div class="text-h6 text-bold text-teal flex items-center q-mb-sm">
        <q-icon name="local_shipping" size="md" class="q-mr-sm" /> 寄件人資訊
      </div>
      <q-separator spaced />

      <div class="q-gutter-sm q-mt-sm">
        <div class="row items-center">
          <div class="text-h6 col-3 text-center">姓名：</div>
          <div class="text-h6 col text-dark">{{ formData.sendName }}</div>
        </div>
        <div class="row items-center">
          <div class="text-h6 col-3 text-center">手機號碼：</div>
          <div class="text-h6 col text-dark">{{ formData.sendPhone }}</div>
        </div>
      </div>
    </q-card>

    <!-- 取件人資訊 -->
    <q-card flat bordered class="q-pa-md q-mb-md">
      <div class="text-h6 text-bold text-teal flex items-center">
        <q-icon name="shopping_bag" size="md" class="q-mr-sm" /> 取件人資訊
      </div>
      <q-separator spaced />

      <div class="q-gutter-sm q-mt-sm">
        <div class="row items-center">
          <div class="text-h6 col-3 text-center">收件據點：</div>
          <div class="text-h6 col text-dark">{{ formData.location }}</div>
        </div>
        <div class="row items-center">
          <div class="text-h6 col-3 text-center">姓名：</div>
          <div class="text-h6 col text-dark">{{ formData.receiveName }}</div>
        </div>
        <div class="row items-center">
          <div class="text-h6 col-3 text-center">手機號碼：</div>
          <div class="text-h6 col text-dark">{{ formData.receivePhone }}</div>
        </div>
      </div>
    </q-card>

    <!-- 底部按鈕 -->
    <div class="flex justify-center q-gutter-lg q-mt-lg">
      <q-btn outline color="grey-6" label="上一步" size="lg" @click="toPrevious" />
      <q-btn color="teal" label="前往付款" size="lg" @click="toNextStep" />
    </div>
  </q-card>
</template>

<script setup>
// 步驟資料
const formData = defineModel('formData')
const emit = defineEmits(['next-step', 'go-previous'])

// 上一步
const toPrevious = () => {
  emit('go-previous')
}

// 下一步 ＋ 檢核
const toNextStep = async () => {
  emit('next-step')
}
</script>
