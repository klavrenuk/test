<template>
  <div class="settings flex flex-col gap-8 mt-8">
    <div class="flex items-center justify-end">
      <button @click="handleAddNewUser" class="add-user">Добавить пользователя</button>
    </div>

    <ul class="flex flex-col gap-4">
      <li v-for="(user,index) in users" :key="user.id" class="flex items-center justify-between settings__user">
        <span class="settings__user__email">{{ user.email }}</span>

        <div class="flex items-center gap-2">
          <button @click="editUser(user)" class="btn-control">
            <EditOutlined />
          </button>
          <button @click="handleRemoveUser(index)" class="btn-control">
            <DeleteOutlined />
          </button>
        </div>
      </li>
    </ul>
  </div>

  <template v-if="isShowModal">
    <a-modal v-model:open="isShowModal" title="Пользователь" :footer="null">
      <ModalUserContent @save="onSaveUser" :userDefault="userForm" v-if="isShowModal" />
    </a-modal>
  </template>

  <a-modal v-model:open="isShowModalRemove" title="" cancel-text="Отмена" ok-text="Подтвердить" @ok="onRemoveUser">
    <div>
      <BodyRemoveUser />
    </div>
  </a-modal>
</template>

<script setup>
import {ref} from 'vue';
import { EditOutlined, DeleteOutlined} from "@ant-design/icons-vue";

import {MOC_LIST_USERS} from '@/constants/mocs';

import ModalUserContent from "@/components/user/ModalUserContent.vue";
import BodyRemoveUser from "@/components/modals/BodyRemoveUser.vue";

const users = ref(MOC_LIST_USERS);
const isShowModal = ref(false);
const isShowModalRemove = ref(false);
const userForm = ref({});
const removeIndex = ref(null);

const handleRemoveUser = (index) => {
  isShowModalRemove.value = true;
  removeIndex.value = index;
}

const onRemoveUser = () => {
  console.log('onRemove');
  users.value.splice(removeIndex.value, 1);
  isShowModalRemove.value = false;
}

const handleAddNewUser = () => {
  userForm.value = {};
  isShowModal.value = true;
}

const editUser = (user) => {
  userForm.value = Object.assign({}, user);
  isShowModal.value = true;
}

const onSaveUser = (user) => {
  console.log('user', user);
  debugger

  if(user.isNew) {
    users.value.push(user);
  }
  isShowModal.value = false;

  console.log('saved');
}
</script>

<style lang="scss" scoped>
.settings__title {
  color: #2D2D2D;
  font-size: 30px;
  font-weight: 500;
}

.settings__user {
  padding: .7rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}

.add-user {
  padding: 9px 20px;
  color: #fff;
  background: #597EF7;
}

.btn-control {
  color: #CCCCCC;

  &:hover, &:active {
    color: #597EF7;
  }
}
</style>
