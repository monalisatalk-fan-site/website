<template lang="pug">
  .admin-sidebar
    img.logo(src="//placehold.jp/320x120.png?text=★")
    .nav
      .account-info
        .avatar
          FontAwesomeIcon(icon="user")
        .email {{ maskedEmail }}{{ maskedEmail }}{{ maskedEmail }}
      p(v-for="n in 100") sidebar.
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useTypedStore } from '@/helpers';

export default defineComponent({
  name: 'AdminSidebar',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const store = useTypedStore();
    const user = computed(() => store.state.auth.user);
    const maskedEmail = computed(() => {
      if (!user.value) {
        return;
      }

      const { email } = user.value;

      if (!email) {
        return;
      }

      const matches = email.match(/^([^@]+)@(.+)\.(.+)$/);

      if (!matches) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, userName, domain, rootDomain] = matches;

      return `${userName.replace(/(.)./g, '$1*')}@${domain.replace(
        /(.)./g,
        '$1*'
      )}.${rootDomain}`;
    });

    return {
      maskedEmail,
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
    overflow-y: auto;
  }
}

.account-info {
  display: flex;
  align-items: center;
  padding: 0 16px;

  & > .avatar {
    display: grid;
    flex-shrink: 0;
    place-items: center;
    width: 24px;
    height: 24px;
    margin-right: 16px;
    background: #ccc;
    border-radius: 100%;
  }

  & > .email {
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 2;
    white-space: nowrap;
    flex-grow: 1;
  }
}
</style>
