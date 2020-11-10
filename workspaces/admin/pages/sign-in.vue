<template lang="pug">
  v-container.pt-10.pb-16
    v-row(justify="center")
      v-col(lg="4" md="6" sm="8" xs="12")
        v-card
          v-toolbar(color="grey darken-4" dark flat)
            v-toolbar-title LOGIN
          v-container
            v-form(@submit.prevent="signIn")
              v-text-field(
                v-model="email"
                type="email"
                label="Email Address"
                prepend-icon="mdi-email-outline"
                :loading="isLoading"
              )
              v-text-field(
                v-model="password"
                type="password"
                label="Password"
                prepend-icon="mdi-lock-outline"
                :loading="isLoading"
              )
              v-card-text.pink--text(v-if="errorMessage") {{ errorMessage }}
              v-col.text-right
                v-btn(
                  type="submit"
                  color="grey darken-4"
                  dark
                  :loading="isLoading"
                ) LOGIN
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api';
import { useTypedStore } from '@/helpers';
import { url } from '@/utils';

export default defineComponent({
  name: 'SignInPage',
  setup() {
    const { app, redirect } = useContext();
    const store = useTypedStore();
    const isLoading = ref(false);
    const email = ref('');
    const password = ref('');
    const errorMessage = ref<string | null>(null);
    const isInitialized = computed(() => store.state.auth.isInitialized);
    const isSignedIn = computed(() => store.getters['auth/isSignedIn']);
    const signIn = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = null;

        await app.$fire.auth.signInWithEmailAndPassword(
          email.value,
          password.value
        );

        redirect(url('DASHBOARD'));
      } catch (err) {
        isLoading.value = false;
        errorMessage.value = err.message;
      }
    };

    watch(
      [isInitialized, isSignedIn],
      () => {
        if (isLoading.value) {
          return;
        }

        if (isInitialized.value && isSignedIn.value) {
          redirect(url('DASHBOARD'));
        }
      },
      { immediate: true }
    );

    return {
      isLoading,
      email,
      password,
      errorMessage,
      signIn,
    };
  },
});
</script>
