<template>
  <header class="globalHeader">
    <div class="header">
      <n-link class="logo" to="/">
        <img class="image" src="@/assets/images/logo.svg" alt="MONA LISA TALK - FAN!! のロゴ">
      </n-link>
    </div>
    <div class="navigation">
      <div class="container">
        <nav class="globalHeaderNavigation">
          <ul class="menu">
            <li class="item">
              <n-link class="link Active" to="/">ホーム</n-link>
            </li>
            <li class="item">
              <n-link class="link" to="/">ビデオ</n-link>
            </li>
          </ul>
        </nav>
        <div v-if="user">
          {{user.displayName}}
        </div>
        <div v-else class="signIn signInButton">
          <button class="button" title="Google アカウントでサインイン" @click.prevent="signInWithGoogle">
            <AppIcon class="icon" name="logo-google" />
            サインイン
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { useAuth } from '@/composables/useAuth';
import { defineComponent, useContext } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'GlobalHader',
  components: {
    AppIcon: () => import('@/components/AppIcon.vue'),
  },
  setup() {
    const { app } = useContext();
    const [user] = useAuth();

    const signInWithGoogle = async () => {
      const provider = new app.$fireModule.auth.GoogleAuthProvider();

      provider.addScope('https://www.googleapis.com/auth/youtube');
      
      try {
        await app.$fire.auth.signInWithPopup(provider);
      } catch (err) {
        console.error(err);
      }
    };

    return {
      user,
      signInWithGoogle,
    };
  },
});
</script>

<style lang="postcss" scoped>
@import '@/assets/styles/resources.pcss';

.globalHeader {
  & > .header {
    display: grid;
    place-items: center;
    width: 100%;
    background: var(--color-white);
  }

  & > .header > .logo {
    display: block;
    width: auto;
    box-sizing: border-box;

    @media (--sm) {
      height: 48px;
      padding: 8px 0;
    }

    @media (--md) {
      height: 80px;
      padding: 20px 0;
    }
  }

  & > .header > .logo > .image {
    display: block;
    height: 100%;
  }

  & > .navigation {
    width: 100%;
    background: var(--color-white);

    @media (--sm) {
      display: none;
    }
  }

  & > .navigation > .container {
    display: flex;
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    max-width: calc(var(--container-max-width) + var(--container-vertical-margin) * 2);
    padding: 0 var(--container-vertical-margin);
    margin: 0 auto;
  }

  & > .navigation > .container > .signIn {
    margin-left: auto;
  }
}

.globalHeaderNavigation {
  & > .menu {
    display: flex;
  }

  & > .menu > .item > .link {
    display: grid;
    place-items: center;
    height: 40px;
    padding: 0 24px;
    font-size: 1.4rem;
    color: var(--color-text-secondary);
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
  }

  & > .menu > .item > .link.Active {
    border-bottom-color: var(--color-text-secondary);
  }
}

.signInButton {
  height: 100%;

  & > .button {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 1.4rem;
    cursor: pointer;
  }

  & > .button > .icon {
    margin-right: 4px;
    font-size: 2rem;
  }

  & > .button:hover {
    background: #eee;
  }
}
</style>
