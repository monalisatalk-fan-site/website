<template>
  <div>
    <template v-if="isLoggedIn">
      <p>welcome.</p>
    </template>
    <template v-else>
      <section class="section">
        <div class="container mt-5">
          <div class="row">
            <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
              <div class="login-brand">
                <img src="@/assets/images/logo.svg" alt="" width="240">
              </div>
              <AppCard class="card-primary">
                <template #header>
                  <h4>Login</h4>
                </template>
                <template #body>
                  <form @submit.prevent="onSubmit" class="needs-validation">
                    <div v-show="errorMessage" class="alert alert-danger">
                      {{errorMessage}}
                    </div>
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input type="email" id="email" class="form-control" autocomplete="username" v-model="email" required />
                    </div>
                    <div class="form-group">
                      <div class="d-block">
                        <label for="password" class="control-label">Password</label>
                        <div class="float-right">
                          <n-link to="/forgot-password" class="text-small">
                            Forgot Password?
                          </n-link>
                        </div>
                      </div>
                      <input type="password" id="password" class="form-control" autocomplete="current-password" v-model="password" required />
                    </div>
                    <div class="form-group">
                      <button class="btn btn-primary btn-lg btn-block" :disabled="isLoading">Login</button>
                    </div>
                  </form>
                </template>
              </AppCard>
              <div class="simple-footer">
                <CopyrightText />
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script lang="ts">
import { useAuthState } from '@/composables';
import { computed, defineComponent, ref, useContext, watch } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'LoginPage',
  components: {
    AppCard: () => import('@/components/AppCard.vue'),
    CopyrightText: () => import('@/components/CopyrightText.vue'),
  },
  setup() {
    const { app, redirect } = useContext();
    const { user, isLoading: isLoadingUser } = useAuthState();
    const isLoading = ref(false);
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const isLoggedIn = computed(() => !!user.value || isLoadingUser.value)

    const onSubmit = async () => {
      try {
        isLoading.value = true;

        errorMessage.value = '';

        await app.$fire.auth.signInWithEmailAndPassword(email.value, password.value);
      } catch (err: unknown) {
        isLoading.value = false;

        if (err instanceof Error) {
          errorMessage.value = err.message;

          return;
        }

        errorMessage.value = 'Unknown error';
      }
    };

    watch([user, isLoadingUser], () => {
      if (user.value && !isLoadingUser.value) {
        redirect('/authorized/dashboard');
      }
    });

    return {
      isLoading,
      email,
      password,
      errorMessage,
      isLoggedIn,
      onSubmit,
    };
  },
});
</script>
