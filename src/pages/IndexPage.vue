<template>
  <q-page class="flex column items-center">
    <h3 class="q-my-xl text-bold text-grey-8" style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3)">
      歡迎使用 行動憑證置物櫃
    </h3>

    <div class="col row justify-center q-my-sm q-gutter-xl">
      <div class="col q-px-md">
        <q-btn
          stack
          class="btn-div bg-teal-5 column items-center justify-center"
          @click="goToPickup"
        >
          <q-icon name="shopping_bag" size="100px" color="white" />
          <div class="action-title-text q-mt-xl">取物</div></q-btn
        >
      </div>
      <div class="col q-px-md">
        <q-btn
          stack
          class="btn-div bg-indigo-6 column items-center justify-center"
          @click="goToVerify"
          ><q-icon name="verified_user" size="100px" color="white" />
          <div class="action-title-text q-mt-xl">智慧取物</div>
          <span class="action-subtitle-text q-mt-lg text-italic"
            >透過數位憑證快速、安全地領取您的物品</span
          ></q-btn
        >
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToPickup = () => {
  router.push('/pickupPhone')
}

const goToVerify = () => {
  router.push('/verifyNotice')
}
</script>

<style scoped>
.btn-div {
  width: 350px;
  max-width: 350px;
  height: 400px;
  border-radius: 6px;
}
.action-title-text {
  font-size: 40px;
  font-weight: 700;
  color: white;
}
.action-subtitle-text {
  font-size: 25px;
  color: rgb(225, 225, 225);
  line-height: 1.3;
}
</style>
