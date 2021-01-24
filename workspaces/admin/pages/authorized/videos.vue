<template>
  <div>
    <SectionHeader title="Videos">
      <template #buttons>
        <div class="section-header-button">
          <button class="btn btn-primary">Update Videos</button>
        </div>
      </template>
    </SectionHeader>
    <div class="section-body">
      <h2 class="section-title">Videos</h2>
      <p class="section-lead">Available videos.</p>
      <div class="row">
        <div class="col-12">
          <AppCard class="mb-0">
            <template #body>
              <ul class="nav nav-pills">
                <li class="nav-item">
                  <n-link to="#" class="nav-link active">
                    All <span class="badge badge-white">12</span>
                  </n-link>
                </li>
                <li class="nav-item">
                  <n-link to="#" class="nav-link">
                    Draft <span class="badge badge-primary">1</span>
                  </n-link>
                </li>
              </ul>
            </template>
          </AppCard>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <AppCard>
            <template #header>
              <h4>All Posts</h4>
            </template>
            <template #body>
              <div class="float-right">
                <nav>
                  <ul class="pagination">
                    <li class="page-item disabled">
                      <n-link class="page-link" to="#">
                        <AppIcon name="chevron-back" />
                      </n-link>
                    </li>
                    <li class="page-item active">
                      <n-link class="page-link" to="#">1</n-link>
                    </li>
                    <li class="page-item">
                      <n-link class="page-link" to="#">2</n-link>
                    </li>
                    <li class="page-item">
                      <n-link class="page-link" to="#">
                        <AppIcon name="chevron-forward" />
                      </n-link>
                    </li>
                  </ul>
                </nav>
              </div>
            </template>
          </AppCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'AuthorizedVideosPage',
  head: {
    title: 'Videos',
  },
  components: {
    AppIcon: () => import('@/components/AppIcon.vue'),
    SectionHeader: () => import('@/components/SectionHeader.vue'),
    AppCard: () => import('@/components/AppCard.vue'),
  },
  setup() {},
});
</script>
