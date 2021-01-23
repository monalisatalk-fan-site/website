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
              <h4>Login</h4>
            </template>
            <template #body>
              <form @submit.prevent class="needs-validation">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" class="form-control" required />
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
                  <input type="password" id="password" class="form-control" required />
                </div>
                <div class="form-group">
                  <button class="btn btn-primary btn-lg btn-block">Send a reset link</button>
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
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'LoginPage',
  setup() {},
});
</script>
