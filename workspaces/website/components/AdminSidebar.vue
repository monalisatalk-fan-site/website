<template lang="pug">
  .admin-sidebar
    img.logo(src="//placehold.jp/320x120.png?text=★")
    .nav
      .sidebar-menu
        n-link.item(v-for="item in menuItems" :to="item.to")
          span.icon
            FontAwesomeIcon(:icon="item.icon" fixedWidth)
          span.label {{ item.label }}
      button.signout(
        type="button"
        @click.prevent="signOut"
        :disabled="isSignOutProcessing"
      ) サインアウト
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { url } from '@/utils';

export default defineComponent({
  name: 'AdminSidebar',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const { redirect, app } = useContext();
    const isSignOutProcessing = ref(false);
    const menuItems = [
      {
        to: url('ADMIN_DASHBOARD'),
        label: 'Dashboard',
        icon: 'tachometer-alt',
      },
      { to: url('ADMIN_VIDEOS'), label: 'Videos', icon: 'film' },
      { to: url('ADMIN_CHARACTERS'), label: 'Characters', icon: 'star' },
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
      menuItems,
      signOut,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'resources';

.admin-sidebar {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & > .logo {
    flex-shrink: 0;
    width: 100%;
  }

  & > .nav {
    flex-grow: 1;
    margin-top: 32px;
    overflow-y: auto;
  }

  & > .nav > .signout {
    margin: 64px 16px 0;
    border: 0;
    outline: none;
    text-decoration: underline;
    background: transparent;
    color: red;
    cursor: pointer;
  }

  & > .nav > .signout:hover {
    text-decoration: none;
  }

  & > .nav > .signout:disabled {
    color: gray;
    text-decoration: none;
  }
}

.sidebar-menu {
  & > .item {
    display: flex;
    align-items: center;
    padding: 16px;
  }

  & > .item > .icon {
    margin-right: 12px;
    font-size: 20px;
  }

  & > .item:hover {
    color: red;
    text-decoration: none;
  }
}
</style>
