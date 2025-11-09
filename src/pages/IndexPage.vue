<template>
  <q-page class="flex column items-center">
    <h3
      class="q-mt-lg q-mb-none text-bold text-grey-8"
      style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3)"
    >
      歡迎使用 行動憑證置物櫃
    </h3>
    <span class="text-h5 text-bold q-mt-md text-italic">透過數位憑證快速、安全地保管您的物品</span>

    <div class="content">
      <div class="col row justify-around q-my-md">
        <q-btn
          stack
          class="btn-div bg-teal-5 column items-center justify-center q-mx-xl"
          @click="goTo('1')"
        >
          <q-icon name="shopping_bag" size="90px" color="white" />
          <div class="action-title-text q-mt-xl">寄物</div></q-btn
        >
        <q-btn
          stack
          class="btn-div bg-indigo-6 column items-center justify-center q-mx-xl"
          @click="goTo('2')"
          ><q-icon name="unarchive" size="90px" color="white" />
          <div class="action-title-text q-mt-xl">取物</div>
        </q-btn>
      </div>
      <div class="card-content q-my-md q-py-md">
        <ul>
          <li>
            請先下載並安裝「數位憑證皮夾 APP」，並確保已持有
            <strong>【萬用電信卡】（必備）</strong>， 以及下列任一張憑證：
            <strong>【健保卡】、【身分證】、【駕照電子卡】</strong>。
            <br />
            若尚未將上述憑證載入 APP，將無法完成身分驗證。
          </li>
          <li>取貨僅限本人操作，請不要替他人領取。</li>
          <li>請確認您輸入的手機號碼或憑證資訊與系統登錄一致。</li>
          <li>憑證與密碼請勿外借他人，以保障安全。</li>
          <li>遇到驗證失敗或系統問題時，請聯絡客服協助處理。</li>
        </ul>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goTo = (btnType) => {
  if (btnType == '1') {
    goToSend()
  } else {
    goToPickup()
  }
}

const goToSend = () => {
  router.push('/send')
}

const goToPickup = () => {
  router.push('/pickup')
}
</script>

<style scoped>
.content {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-content {
  height: 100%;
  font-size: 20px;
  line-height: 1.8;
  width: 80%;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 18px rgba(20, 20, 30, 0.12);
  padding: 16px 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-div {
  width: 300px;
  max-width: 350px;
  height: 350px;
  border-radius: 10px;
}
.action-title-text {
  font-size: 40px;
  font-weight: 700;
  color: white;
}
</style>
