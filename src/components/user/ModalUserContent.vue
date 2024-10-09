<template>
  <div class="flex flex-col gap-4 py-6">
    <form class="flex flex-col gap-2" @submit.prevent="onSave">
      <div class="form-group flex flex-col gap-4">
        <input type="email" class="auth__input" v-model="user.email" placeholder="Email" />
      </div>
      <div class="form-group flex flex-col gap-4">
        <input type="password" class="auth__input" v-model="user.pass" placeholder="Пароль" />
      </div>

      <div class="form-group">
        <button type="submit" class="auth__submit w-full text-center" :class="{'valid': isValidSubmit}">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {computed, reactive} from 'vue';

const {userDefault} = defineProps({
  userDefault: {
    type: Object,
    required: false,
    default: {}
  }
})

console.log('userDefault', userDefault);

const requiredOptions = ['email', 'pass'];
const emit = defineEmits(["save"]);

const user = reactive({
  ...userDefault
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

const isValidSubmit = computed(() => {
  if(isValid()) return true;

  return false;
})

const onSave = () => {
  console.log('save');

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
