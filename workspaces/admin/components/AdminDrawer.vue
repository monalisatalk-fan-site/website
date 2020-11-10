<template lang="pug">
  v-navigation-drawer(
    v-model="drawer"
    app
    dark
    inset
    mobileBreakPoint="960"
  )
    v-list(expand nav)
      v-list-item(
        v-for="(item, i) in menuItems"
        :key="i"
        link
        :to="item.to"
      )
        v-list-item-icon
          v-icon {{ item.icon }}
        v-list-item-content
          v-list-item-title {{ item.label }}
    template(v-slot:append)
      v-list-item(link @click="signOut" dark)
        v-list-item-icon
          v-icon mdi-logout
        v-list-item-content サインアウト
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  useContext,
} from '@nuxtjs/composition-api';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { url } from '@/utils';
import { useTypedStore } from '@/helpers';

export default defineComponent({
  name: 'AdminSidebar',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const { redirect, app } = useContext();
    const store = useTypedStore();
    const isSignOutProcessing = ref(false);
    const drawer = computed({
      get: () => !!store.state.ui.drawer,
      set: (drawer: boolean) => store.commit('ui/setDrawer', drawer),
    });
    const menuItems = [
      {
        to: url('DASHBOARD'),
        label: 'Dashboard',
        icon: 'mdi-view-dashboard-outline',
      },
      {
        to: url('VIDEOS'),
        label: 'Videos',
        icon: 'mdi-movie-open-outline',
      },
      {
        to: url('CHARACTERS'),
        label: 'Characters',
        icon: 'mdi-face-profile',
      },
    ];

    const signOut = async (): Promise<void> => {
      try {
        if (!window.confirm('管理者アカウントからサインアウトしますか？')) {
          return;
        }

        isSignOutProcessing.value = true;

        await app.$fire.auth.signOut();

        redirect(url('SIGN_IN'));
      } catch (err) {
        isSignOutProcessing.value = false;

        throw err;
      }
    };

    return {
      isSignOutProcessing,
      drawer,
      menuItems,
      signOut,
    };
  },
});
</script>
