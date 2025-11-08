<template>
  <div class="row justify-end">
    <q-btn
      round
      dense
      icon="home"
      color="grey-8"
      class="q-mr-md q-mt-sm"
      size="18px"
      @click="goToHome"
    />
  </div>
  <div
    :style="{
      maxWidth: '1300px',
      width: '1000px',
      height: '85vh',
      minHeight: '85vh',
      margin: '0 auto',
    }"
  >
    <q-stepper
      v-model="step"
      ref="stepper"
      active-color="teal"
      done-color="teal"
      :alternative-labels="$q.screen.sm"
      header-nav
      animated
      style="height: 100%; display: flex; flex-direction: column"
    >
      <q-step
        :name="1"
        prefix="1"
        title="選擇櫃子"
        icon="settings"
        :done="step > 1"
        :header-nav="step > 1"
      >
        <LockerSelection ref="stepRef" v-model:formData="formData" @next-step="handleNextStep" />
      </q-step>
      <q-step
        :name="2"
        prefix="2"
        title="QR Code 驗證"
        icon="settings"
        :done="step > 2"
        :header-nav="step > 2"
      >
        <ShowVPQrcode
          ref="stepRef"
          v-model:formData="formData"
          @next-step="handleNextStep"
          @go-previous="goPrevious"
        />
      </q-step>
      <q-step
        :name="3"
        prefix="3"
        title="資訊填寫"
        icon="settings"
        :done="step > 3"
        :header-nav="step > 3"
      >
        <StoreItemInfo ref="stepRef" v-model:formData="formData" @next-step="handleNextStep" />
      </q-step>
      <q-step
        :name="4"
        prefix="4"
        title="確認資料"
        icon="settings"
        :done="step > 4"
        :header-nav="step > 4"
      >
        <ComfirmInfo
          ref="stepRef"
          v-model:formData="formData"
          @next-step="handleNextStep"
          @go-previous="goPrevious"
        />
      </q-step>
      <q-step :name="5" prefix="5" title="付款" icon="settings" :header-nav="step > 5">
        <PaymentPage ref="stepRef" v-model:formData="formData" @go-previous="goPrevious" />
      </q-step>
    </q-stepper>
  </div>

  <!-- </q-card> -->
</template>

<script setup>
import { useDialogPluginComponent, useQuasar } from 'quasar'
import { ref, reactive } from 'vue'
import LockerSelection from './LockerSelection.vue'
import ShowVPQrcode from './ShowVPQrcode.vue'
import StoreItemInfo from './StoreItemInfo.vue'
import ComfirmInfo from './ComfirmInfo.vue'
import PaymentPage from './PaymentPage.vue'
import { useRouter } from 'vue-router'
import { useNotify } from 'src/utils/plugin'

const $n = useNotify()
const $q = useQuasar()
const router = useRouter()

defineEmits([...useDialogPluginComponent.emits])

// 步驟表單資料
const formData = reactive({
  item: '',
  lockerNo: '',
  sendName: '',
  sendPhone: '',
  location: '',
  receiveName: '',
  receivePhone: '',
  payment: 0,
})

// 步驟相關
const step = ref(1)
const stepper = ref(null)
const stepRef = ref(null)

const handleNextStep = async () => {
  const data = {
    ...formData,
    step: step.value,
  }

  console.log(data)
  stepper.value.next()
}

const goPrevious = () => {
  stepper.value.previous()
}

const goToHome = () => {
  $q.dialog({
    title: '確認回首頁嗎',
    message: '返回後將會重置目前輸入內容，是否確認？',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    router.push('/')
    $n.success('已返回首頁')
  })
}
</script>
