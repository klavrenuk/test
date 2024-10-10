<template>
  <div class="auth flex items-center justify-center">
    <div class="auth__container flex flex-col gap-6">
      <h3 class="auth__container__title text-center">Авторизация</h3>

      <form class="auth__form flex flex-col gap-2" @submit.prevent="onLogin">
        <div class="form-group flex flex-col gap-4">
          <input type="email" class="auth__input" v-model="user.email" placeholder="Email" />
          <span class="error-pass-message" v-if="errorEmailMessage">{{ errorEmailMessage }}</span>
        </div>
        <div class="form-group flex flex-col gap-4 relative">
          <input type="password" class="auth__input auth__input--pass" v-model="user.pass" placeholder="Пароль" />
          <button @click.prevent="toggleShowPass" class="btn-toggle-pass">
            <EyeOutlined v-if="isShowPass" />
            <EyeInvisibleOutlined v-else />
          </button>

          <span class="error-pass-message" v-if="errorPassMessage">{{ errorPassMessage }}</span>
        </div>

        <div class="form-group">
          <button type="submit" class="auth__submit w-full text-center" :class="{'valid': isValidSubmit}">Войти</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {reactive, computed, ref} from 'vue';
import {useRouter} from "vue-router";
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons-vue";

const user = reactive({
  email: null,
  pass: null
});
const requiredOptions = ['email', 'pass'];
const router = useRouter();
const errorPassMessage = ref(null);
const isShowPass = ref(false);
const errorEmailMessage = ref(null);

const isValidSubmit = computed(() => {
  if(user.email) {
    const validEmail = validateEmail(user.email);
    if(!validEmail.valid) {
      errorEmailMessage.value = validEmail.message || '';
    } else {
      errorEmailMessage.value = '';
    }
  }

  if(user.pass) {
    const validPass = validatePassword(user.pass)

    if(!validPass.valid) {
      errorPassMessage.value = validPass.message || '';
      return false;
    }

    errorPassMessage.value = null;
  }

  if(isValid()) return true;

  return false;
})

const toggleShowPass = () => isShowPass.value = !isShowPass.value;

const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return {
      valid: false,
      message: `Пароль должен содержать не менее ${minLength} символов.`
    };
  }
  if (!hasUpperCase) {
    return {
      valid: false,
      message: 'Пароль должен содержать хотя бы одну заглавную букву.'
    };
  }
  if (!hasLowerCase) {
    return {
      valid: false,
      message: 'Пароль должен содержать хотя бы одну строчную букву.'
    };
  }
  if (!hasNumber) {
    return {
      valid: false,
      message: 'Пароль должен содержать хотя бы одну цифру.'
    };
  }
  if (!hasSpecialChar) {
    return {
      valid: false,
      message: 'Пароль должен содержать хотя бы один специальный символ.'
    };
  }

  return {
    valid: true,
    message: 'Пароль валиден.'
  };
}

const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailPattern.test(email)) {
    return {
      valid: true,
      message: 'Email валиден.'
    };
  } else {
    return {
      valid: false,
      message: 'Введите корректный адрес электронной почты.'
    };
  }
}

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

.error-pass-message {
  position: relative;
  top: -10px;
  color: red;
  font-size: 12px;
}

.btn-toggle-pass {
  position: absolute;
  top: 6px;
  right: 10px;
}
</style>
