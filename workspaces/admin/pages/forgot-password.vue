<template>
  <section class="section">
    <div class="container mt-5">
      <div class="row">
        <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
          <div class="login-brand">
            <img src="@/assets/images/logo.svg" alt="" width="240">
          </div>
          <AppCard class="card-primary">
            <template #header>
              <h4>Forgot Password</h4>
            </template>
            <template #body>
              <p class="text-muted">We will send a link to reset your password.</p>
              <div v-show="errorMessage" class="alert alert-danger">
                {{errorMessage}}
              </div>
              <div v-show="isSent" class="alert alert-success">
                再設定メールを送信しました
              </div>
              <form @submit.prevent="sendPasswordResetEmail" class="needs-validation">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" class="form-control" v-model="email" required />
                </div>
                <div class="form-group">
                  <button class="btn btn-primary btn-lg btn-block" :disabled="isLoading || isSent">Send password reset email</button>
                </div>
              </form>
            </template>
          </AppCard>
          <div class="simple-footer">
            Copyright &copy; MONA LISA TALK - FAN!! 2021
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'ForgotPasswordPage',
  components: {
    AppCard: () => import('@/components/AppCard.vue'),
  },
  setup() {
    const { app } = useContext();
    const isLoading = ref(false);
    const isSent = ref(false);
    const email = ref('');
    const errorMessage = ref('');

    const sendPasswordResetEmail = async () => {
      try {
        errorMessage.value = '';
        isLoading.value = true;

        await app.$fire.auth.sendPasswordResetEmail(email.value);

        isSent.value = true;
      } catch (err: unknown) {
        isLoading.value = false;

        if (err instanceof Error) {
          errorMessage.value = err.message;

          return;
        }

        errorMessage.value = 'Unknown error';
      }
    };

    return {
      isLoading,
      isSent,
      email,
      errorMessage,
      sendPasswordResetEmail,
    }
  },
});
</script>
