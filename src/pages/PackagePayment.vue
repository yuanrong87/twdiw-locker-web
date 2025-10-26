<template>
  <q-page class="flex column items-center justify-center">
    <q-card class="card flex column items-center justify-between q-pa-lg"
      ><div class="card-title text-grey-8 q-mb-md">包裹確認與付款資訊</div>
      <div class="card-content col column q-px-xl q-py-md">
        <q-table class="col" :rows="rows" :columns="columns" row-key="id" flat hide-bottom />

        <div class="col-auto text-right text-h5 text-bold q-mt-md">
          需繳款金額：<span class="text-primary">{{ totalAmount.toLocaleString() }}</span>
        </div>
      </div></q-card
    >

    <div class="flex row q-gutter-lg">
      <q-btn
        class="col-auto q-mt-xl q-px-xl q-py-md"
        color="grey"
        label="取消"
        size="28px"
        @click="goToHome"
      ></q-btn>
      <q-btn
        class="col-auto q-mt-xl q-px-xl q-py-md"
        color="indigo-6"
        label="確認"
        size="28px"
        @click="goToPackageInfo"
      ></q-btn>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useNotify } from 'src/utils/plugin'

const router = useRouter()

const $n = useNotify()
const $q = useQuasar()

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

const goToPackageInfo = () => {
  router.push('/packageInfo')
}

const columns = [
  { name: 'id', label: '單號', field: 'id', align: 'left' },
  { name: 'amount', label: '金額', field: 'amount', align: 'right' },
]

const rows = ref([
  { id: 'A2025102601', amount: 0 },
  { id: 'A2025102602', amount: 0 },
])

const totalAmount = computed(() => rows.value.reduce((sum, r) => sum + r.amount, 0))
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
