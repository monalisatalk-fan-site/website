<template>
  <div>
    <SectionHeader title="Video Detail Editor" />
    <template v-if="isLoading">
      <div class="loading">
        <img src="@/assets/images/spinner-tail.svg" alt="">
      </div>
    </template>
    <template v-else>
      <div class="section-body">
        <h2 class="section-title">{{videoDetail.title}}</h2>
      </div>
      <div v-show="isCompleted" class="alert alert-success">Video detail saved successfully.</div>
      <div class="row">
        <div class="col-sm-4">
          <AppCard>
            <template #header>
              <h4>Player</h4>
            </template>
            <template #body>
              <div class="youtube-player">
                <iframe
                  class="iframe"
                  :src="`https://www.youtube.com/embed/${videoDetail.id}`"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </template>
          </AppCard>
        </div>
        <div class="col-md-8">
          <form @submit.prevent="saveChanges">
            <AppCard>
              <template #header>
                <h4>Video Details</h4>
              </template>
              <template #body>
                <div class="form-group row align-items-center">
                  <label for="title" class="form-control-label col-sm-3 text-md-right">Title</label>
                  <div class="col-sm-6 col-md-9">
                    <input id="title" class="form-control" v-model="title" />
                  </div>
                </div>
                <div class="form-group row align-items-center">
                  <label for="originalTitle" class="form-control-label col-sm-3 text-md-right">Title (Original)</label>
                  <div class="col-sm-6 col-md-9">
                    <div class="input-group">
                      <input id="originalTitle" class="form-control" v-model="videoDetail.original.title" readonly />
                      <div class="input-group-append">
                        <button type="button" class="btn btn-light" :disabled="isLoading" @click.prevent="pasteTitle">Paste</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group row align-items-center">
                  <label for="description" class="form-control-label col-sm-3 text-md-right">Description</label>
                  <div class="col-sm-6 col-md-9">
                    <textarea id="description" class="form-control h-auto" v-model="description" rows="4"></textarea>
                  </div>
                </div>
                <div class="form-group row align-items-center">
                  <label for="originalDescription" class="form-control-label col-sm-3 text-md-right">Description (Original)</label>
                  <div class="col-sm-6 col-md-9">
                    <div class="input-group">
                      <textarea id="originalDescription" class="form-control h-auto" v-model="videoDetail.original.description" rows="4" readonly></textarea>
                      <div class="input-group-append">
                        <button type="button" class="btn btn-light" :disabled="isLoading" @click.prevent="pasteDescription">Paste</button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template #footer>
                <div class="text-right">
                  <button class="btn btn-primary" :class="{ 'btn-progress': isUpdating }">Save changes</button>
                </div>
              </template>
            </AppCard>
          </form>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, useContext, watch } from '@nuxtjs/composition-api';
import { useVideoDetail, useDatabase } from '@/composables';

export default defineComponent({
  name: 'VideoDetailPage',
  components: {
    SectionHeader: () => import('@/components/SectionHeader.vue'),
    AppCard: () => import('@/components/AppCard.vue'),
  },
  setup() {
    const { route } = useContext();
    const database = useDatabase();
    const title = ref('');
    const description = ref('');
    const isUpdating = ref(false);
    const isCompleted = ref(false);
    const videoId = computed(() => route.value.params.videoId);
    const [videoDetail, isLoading] = useVideoDetail(videoId.value);

    const pasteTitle = () => {
      title.value = videoDetail.value?.original.title || '';
    };

    const pasteDescription = () => {
      description.value = videoDetail.value?.original.description || '';
    };

    const saveChanges = async () => {
      try {
        isUpdating.value = true;
        isCompleted.value = false;

        await Promise.all([
          database.ref('videos').child('basic').child(videoId.value).update({ title: title.value }),
          database.ref('videos').child('additional').child(videoId.value).update({ description: description.value }),
        ]);

        isCompleted.value = true;
      } finally {
        isUpdating.value = false;
      }
    };

    watch(videoDetail, () => {
      title.value = videoDetail.value?.title || '';
      description.value = videoDetail.value?.description || '';
    }, { immediate: true });

    return {
      title,
      description,
      isUpdating,
      isCompleted,
      videoDetail,
      isLoading,
      pasteTitle,
      pasteDescription,
      saveChanges,
    };
  },
});
</script>

<style scoped>
.loading {
  display: grid;
  place-items: center;
  width: 100%;
  height: 240px;
}

.youtube-player {
  position: relative;
  width: calc(100% + 50px);
  margin-left: -25px;
}

.youtube-player::before {
  display: block;
  padding-top: 56.25%;
  content: '';
}

.youtube-player > .iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
