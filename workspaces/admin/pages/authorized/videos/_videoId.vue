<template>
  <div>
    <SectionHeader title="Video Detail Editor" />
    <div class="section-body" v-if="video">
      <h2 class="section-title">{{title}}</h2>
    </div>
    <div class="alert alert-success">Video detail saved successfully.</div>
    <div class="row" v-if="video">
      <div class="col-sm-4">
        <AppCard>
          <template #header>
            <h4>Player</h4>
          </template>
          <template #body>
            <div class="youtube-player">
              <iframe
                class="iframe"
                :src="`https://www.youtube.com/embed/${videoId}`"
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
                  <input id="title" class="form-control" v-model="titleValue" />
                </div>
              </div>
              <div class="form-group row align-items-center">
                <label for="originalTitle" class="form-control-label col-sm-3 text-md-right">Title (Original)</label>
                <div class="col-sm-6 col-md-9">
                  <div class="input-group">
                    <input id="originalTitle" class="form-control" v-model="video.original.title" readonly />
                    <div class="input-group-append">
                      <button type="button" class="btn btn-light" :disabled="isLoading" @click.prevent="pasteTitle">Paste</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row align-items-center">
                <label for="description" class="form-control-label col-sm-3 text-md-right">Description</label>
                <div class="col-sm-6 col-md-9">
                  <textarea id="description" class="form-control h-auto" v-model="descriptionValue" rows="4"></textarea>
                </div>
              </div>
              <div class="form-group row align-items-center">
                <label for="originalDescription" class="form-control-label col-sm-3 text-md-right">Description (Original)</label>
                <div class="col-sm-6 col-md-9">
                  <div class="input-group">
                    <textarea id="originalDescription" class="form-control h-auto" v-model="video.original.description" rows="4" readonly></textarea>
                    <div class="input-group-append">
                      <button type="button" class="btn btn-light" :disabled="isLoading" @click.prevent="pasteDescription">Paste</button>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #footer>
              <div class="text-right">
                <button class="btn btn-primary">Save changes</button>
              </div>
            </template>
          </AppCard>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useVideoDetail } from '@/composables';
import { computed, defineComponent, onMounted, ref, useContext, watch } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'VideoDetailPage',
  components: {
    SectionHeader: () => import('@/components/SectionHeader.vue'),
    AppCard: () => import('@/components/AppCard.vue'),
  },
  setup() {
    const { app, route } = useContext();
    const titleValue = ref('');
    const descriptionValue = ref('');
    const videoId = computed(() => route.value.params.videoId);
    const [video, isLoading] = useVideoDetail(videoId.value, true);
    const title = computed(() => video.value?.details?.title || video.value?.original.title);

    const pasteTitle = () => {
      titleValue.value = video.value?.original.title || '';
    };

    const pasteDescription = () => {
      descriptionValue.value = video.value?.original.description || '';
    };

    const saveChanges = async () => {
      const videoRef = app.$fire.firestore.collection('videos').doc(videoId.value);

      await videoRef.update({
        details: {
          title: titleValue.value,
          description: descriptionValue.value,
        },
      })
    };

    watch(video, () => {
      titleValue.value = video.value?.details?.title;
      descriptionValue.value = video.value?.details?.description;
    }, { immediate: true });

    return {
      video,
      titleValue,
      descriptionValue,
      videoId,
      isLoading,
      title,
      pasteTitle,
      pasteDescription,
      saveChanges,
    };
  },
});
</script>

<style scoped>
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
