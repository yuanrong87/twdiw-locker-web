<template>
  <q-page class="flex column items-center justify-center">
    <q-btn
      round
      dense
      icon="home"
      color="grey-8"
      class="absolute-top-right q-mr-md q-mt-md"
      size="lg"
      @click="goToHome"
    />
    <q-card class="card flex column items-center justify-between q-pa-lg"
      ><div class="card-title text-indigo-8 q-mb-md">智慧取物 - 使用說明與注意事項</div>
      <div class="card-content">
        <ul>
          <li>
            請先確認您已下載「數位憑證皮夾APP」並已持有<strong>【電信門號電子卡】</strong>。若尚未擁有該憑證，將無法完成憑證驗證。
            <a href="#">點此前往申請【電信門號電子卡】</a>
          </li>
          <li>取貨僅限本人操作，請不要替他人領取。</li>
          <li>請確認您輸入的手機號碼或憑證資訊與系統登錄一致。</li>
          <li>憑證與密碼請勿外借他人，以保障安全。</li>
          <li>遇到驗證失敗或系統問題時，請聯絡客服協助處理。</li>
        </ul>
      </div></q-card
    >
    <q-btn
      class="col-auto q-mt-xl q-px-xl q-py-md"
      color="indigo-6"
      label="我已了解，前往驗證"
      size="28px"
      @click="goToQrcode"
    ></q-btn>
  </q-page>
</template>

<script setup>
// import { ref, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push('/')
}

const goToQrcode = () => {
  router.push('/qrcode')
}
</script>

<style scoped>
.card {
  width: 70%;
  min-height: 400px;
  background-color: white;
  border-radius: 16px;
}
.card-title {
  width: auto;
  font-size: 36px;
  font-weight: 700;
  border-bottom: 4px solid #3f51b5;
}
.card-content {
  height: 100%;
  font-size: 20px;
  line-height: 2.5;
}
</style>
