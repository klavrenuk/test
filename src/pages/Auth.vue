<template>
  <div class="auth flex items-center justify-center">
    <div class="auth__container flex flex-col gap-6">
      <h3 class="auth__container__title text-center">Авторизация</h3>

      <form class="auth__form flex flex-col gap-2" @submit.prevent="onLogin">
        <div class="form-group flex flex-col gap-4">
          <input type="email" class="auth__input" v-model="user.email" placeholder="Email" />
        </div>
        <div class="form-group flex flex-col gap-4">
          <input type="password" class="auth__input" v-model="user.pass" placeholder="Пароль" />
        </div>

        <div class="form-group">
          <button type="submit" class="auth__submit w-full text-center" :class="{'valid': isValidSubmit}">Войти</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {reactive, computed} from 'vue';
import {useRouter} from "vue-router";

const user = reactive({
  email: null,
  pass: null
});
const requiredOptions = ['email', 'pass'];
const router = useRouter();

const isValidSubmit = computed(() => {
  if(isValid()) return true;

  return false;
})

const isValid = () => {
  let isError = false;
  for(let option of requiredOptions) {
    if(!user[option] || !user[option].trim()) {
      isError = true;
    }
  }

  return !isError;
}

const onLogin = () => {
  try {
    if(!isValid()) {
      alert('Проверьте поля');
      return;
    }

    router.push('/');

  } catch(err) {
    console.error(err);
    alert('Ошибка');
  }

}
</script>

<style lang="scss" scoped>
.auth {
  width: 100vw;
  height: 100vh;
  background: #FAFAFB;

  &__container {
    width: 100%;
    max-width: 380px;
    border: 1px solid rgba(14, 0, 32, 0.05);
    border-radius: 8px;
    padding: 40px;
    background: #fff;

    &__title {
      color: #434343;
      font-size: 24px;
      font-weight: 500;
      line-height: 32px;
    }
  }
}

.auth__input {
  height: 40px;
  padding: 0 12px;
  color: #ABABAB;
  font-size: 14px;
  border: 1px solid #CDD0D6;
  border-radius: 4px;
}

.auth__submit {
  padding: 8px 0;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  background: #D5D5D5;

  &.valid {
    background: #597EF7;
  }
}
</style>
