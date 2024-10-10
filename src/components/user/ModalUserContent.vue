<template>
  <div class="flex flex-col gap-4 py-6">
    <form class="flex flex-col gap-2" @submit.prevent="onSave">
      <div class="form-group flex flex-col gap-4 relative">
        <input type="email" class="auth__input" v-model="user.email" placeholder="Email" />
        <span class="error-pass-message" v-if="errorEmailMessage">{{ errorEmailMessage }}</span>
      </div>
      <div class="form-group flex flex-col gap-4 relative">
        <input :type="isShowPass ? 'text' : 'password'" class="auth__input auth__input--pass" v-model="user.pass" placeholder="Пароль" autocomplete="nope" />
        <button @click.prevent="toggleShowPass" class="btn-toggle-pass">
          <EyeOutlined v-if="isShowPass" />
          <EyeInvisibleOutlined v-else />
        </button>

        <span class="error-pass-message" v-if="errorPassMessage">{{ errorPassMessage }}</span>
      </div>

      <div class="form-group">
        <button type="submit" class="auth__submit w-full text-center" :class="{'valid': isValidSubmit}">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {computed, reactive, ref} from 'vue';
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons-vue";

const {userDefault} = defineProps({
  userDefault: {
    type: Object,
    required: false,
    default: {}
  }
})

const requiredOptions = ['email', 'pass'];
const emit = defineEmits(["save"]);
const errorPassMessage = ref(null);
const isShowPass = ref(false);
const errorEmailMessage = ref(null);

const user = reactive({
  ...userDefault
})

const toggleShowPass = () => isShowPass.value = !isShowPass.value;

const isValid = () => {
  let isError = false;
  for(let option of requiredOptions) {
    if(!user[option] || !user[option].trim()) {
      isError = true;
    }
  }

  return !isError;
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
    } else {
      errorPassMessage.value = '';
    }
  }

  if(errorEmailMessage.value || errorPassMessage.value) return false;

  if(isValid()) return true;

  return false;
})

const onSave = () => {
  if(!isValid) {
    return;
  }

  emit("save", {
    ...user,
    isNew: user.id ? false : true,
    id: user.id ? user.id : new Date().getTime(),
  });
}
</script>

<style lang="scss" scoped>
.auth__input {
  height: 40px;
  padding: 0 1rem 0 12px;
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
  margin-bottom: 5px;
}

.btn-toggle-pass {
  position: absolute;
  top: 6px;
  right: 10px;
}
</style>
