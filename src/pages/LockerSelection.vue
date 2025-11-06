<template>
  <q-page class="flex column items-center">
    <q-btn
      round
      dense
      icon="home"
      color="grey-8"
      class="absolute-top-right q-mr-md q-mt-md"
      size="lg"
      @click="goToHome()"
    />
    <q-card class="card flex column justify-between q-pa-lg q-mt-xl">
      <div class="card-title text-teal">請選擇櫃子</div>
      <div class="locker-buttons col row justify-center items-center q-gutter-sm">
        <q-btn
          v-for="locker in lockers"
          :key="locker"
          :label="locker"
          :color="selectedLocker === locker ? 'teal' : 'grey-5'"
          size="28px"
          class="locker-btn"
          @click="selectLocker(locker)"
        />
      </div>

      <div class="flex row justify-center q-gutter-xl">
        <q-btn
          class="col-auto q-px-xl q-py-md"
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
          @click="confirmLocker"
        ></q-btn>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useNotify } from 'src/utils/plugin'
import { useUserInfoStore } from 'src/stores/userInfo'

const userInfoStore = useUserInfoStore()

const { lockers, selectedLocker } = storeToRefs(userInfoStore)
const { selectLocker, clearSelection, goToHome, goToQrcode } = userInfoStore

const $n = useNotify()

const confirmLocker = () => {
  if (selectedLocker.value) {
    // $n.success(`已選擇櫃子: ${selectedLocker.value}`)
    goToQrcode()
  } else {
    $n.error('請先選擇櫃子')
  }
}

onMounted(() => {
  selectedLocker.value = null
})
</script>

<style scoped>
.card {
  width: 80%;
  min-height: 600px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 36px;
  font-weight: 700;
  border-bottom: 4px solid rgb(2, 169, 169);
}
.locker-buttons {
  min-height: 500px;
}

.locker-buttons button {
  padding: 12px 24px;
  width: 200px;
  height: 300px;
}
</style>
