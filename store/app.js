import { defineStore } from 'pinia';

export const useAppStore = defineStore('main', {
    state: () => ({
        activePage: 'users'
    }),
    getters: {
      getActivePage(state) {
          return state.activePage;
      }
    },
    actions: {
        showPage(page) {
            this.activePage = page;
        }
    },
});
