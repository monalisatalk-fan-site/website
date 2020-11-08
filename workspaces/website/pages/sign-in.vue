<template lang="pug">
  div
    MonaLisaNoSillyTalk
    .page-container
      .title 管理画面ログイン
      form.form(@submit.prevent="signIn")
        .input.input-field
          .icon
            FontAwesomeIcon(icon="user")
          input.field(v-model="email" placeholder="Email Address")
        .input.input-field
          .icon
            FontAwesomeIcon(icon="lock")
          input.field(v-model="password" type="password" placeholder="Password")
        button.submit ログイン
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useContext,
} from '@nuxtjs/composition-api';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import MonaLisaNoSillyTalk from '@/components/MonaLisaNoSillyTalk.vue';

export default defineComponent({
  name: 'SignInPage',
  components: {
    FontAwesomeIcon,
    MonaLisaNoSillyTalk,
  },
  setup() {
    const { app, route, redirect } = useContext();
    const email = ref('');
    const password = ref('');
    const nextUrl = computed((): string => {
      const fromInQuery = route.value.query.from;
      const fromUrl = Array.isArray(fromInQuery) ? fromInQuery[0] : fromInQuery;

      return fromUrl || '/admin/dashboard';
    });

    const signIn = async () => {
      await app.$fire.auth.signInWithEmailAndPassword(
        email.value,
        password.value
      );

      redirect(nextUrl.value);
    };

    return {
      email,
      password,
      signIn,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'resources';

.page-container {
  @include container;

  max-width: 640px;
  padding: 48px 32px;
  margin-top: 64px;
  background: #fff;
  border-radius: 8px;

  & > .title {
    margin-bottom: 24px;
    font-size: 1.8em;
    text-align: center;
  }

  & > .form {
    margin-top: 32px;
  }

  & > .form > .input {
    margin-top: 16px;
  }

  & > .form > .submit {
    display: table;
    width: 240px;
    height: 48px;
    margin: 40px auto 0;
    color: #000;
    background: #44bcd6;
    border: 0;
    border-radius: 8px;
  }
}

.input-field {
  display: flex;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus-within {
    outline: -webkit-focus-ring-color auto 1px;
  }

  & > .icon {
    display: grid;
    flex-shrink: 0;
    place-items: center;
    width: 48px;
    height: 48px;
    font-size: 18px;
    color: #aaa;
  }

  & > .field {
    flex-grow: 1;
    margin-right: 16px;
    background: transparent;
    border: none;
    outline: none;
  }
}
</style>
