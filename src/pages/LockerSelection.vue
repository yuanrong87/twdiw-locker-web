<template>
  <div class="card-title text-teal">請選擇櫃子</div>
  <div class="locker-buttons col row justify-center items-center q-gutter-lg">
    <q-btn
      v-for="locker in lockers"
      :key="locker.lockerNo"
      :label="locker.lockerNo"
      :color="selectedLocker === locker ? 'teal' : locker.isActive ? 'red' : 'grey-5'"
      size="28px"
      class="locker-btn"
      :disable="locker.isActive"
      @click="selectLocker(locker)"
    />
  </div>

  <div class="flex row justify-center">
    <q-btn
      class="col-auto q-px-xl q-py-md q-mr-xl"
      color="grey"
      label="重選"
      size="24px"
      @click="clearSelection"
    ></q-btn>
    <q-btn
      class="col-auto q-px-xl q-py-md"
      color="teal"
      label="下一步"
      size="24px"
      @click="toNextStep"
    ></q-btn>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

import { storeToRefs } from 'pinia'
import { useNotify } from 'src/utils/plugin'
import { useUserInfoStore } from 'src/stores/userInfo'

const userInfoStore = useUserInfoStore()

const { lockers, selectedLocker } = storeToRefs(userInfoStore)
const { selectLocker, clearSelection, fetchLocker } = userInfoStore

const $n = useNotify()

// 步驟資料
const formData = defineModel('formData')
const emit = defineEmits(['next-step'])

// 下一步 ＋ 檢核
const toNextStep = async () => {
  if (!selectedLocker.value) {
    $n.error('請先選擇櫃子')
    return
  }

  formData.value.locker = selectedLocker.value.lockerNo
  emit('next-step')
}

onMounted(() => {
  selectedLocker.value = null
  fetchLocker()
})

defineExpose({ toNextStep })
</script>

<style scoped>
.card-title {
  font-size: 32px;
  font-weight: 700;
  border-bottom: 4px solid rgb(2, 169, 169);
}
.locker-buttons {
  min-height: 400px;
}

.locker-buttons button {
  padding: 12px 24px;
  width: 200px;
  height: 250px;
}
</style>
