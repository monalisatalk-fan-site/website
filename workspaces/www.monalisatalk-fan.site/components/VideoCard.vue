<template>
  <div
    class="videoCard"
    @mouseover="onThumbnailMouseover"
    @mouseleave="isDetailVisible = false"
  >
    <div
      class="body videoCardBody"
      :class="{ Visible: isDetailVisible }"
    >
      <n-link
        :to="videoDetailPath"
        class="thumbnail"
      >
        <img
          class="image"
          :src="thumbnailUrl"
          :alt="video.title"
        />
      </n-link>
      <div class="body">
        <h2>{{video.title}}</h2>
        <p>{{video.description}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, useContext } from '@nuxtjs/composition-api';
import { IS_TOUCH_DEVICE } from '@/const';
import { Video } from '@/types';

export default defineComponent({
  name: 'VideoCard',
  props: {
    video: {
      type: Object as PropType<Video>,
      required: true,
    },
  },
  setup(props) {
    const { redirect } = useContext();
    const isDetailVisible = ref(false);
    const videoDetailPath = computed((): string => `/video/${props.video.id}`);
    const thumbnailUrl = computed((): string => `//img.youtube.com/vi/${props.video.id}/maxresdefault.jpg`);

    const onThumbnailMouseover = (): void => {
      if (IS_TOUCH_DEVICE) {
        return;
      }

      isDetailVisible.value = true;
    };

    return {
      isDetailVisible,
      videoDetailPath,
      thumbnailUrl,
      onThumbnailMouseover,
    };
  },
});
</script>

<style lang="postcss" scoped>
.videoCard {
  position: relative;
  width: 320px;

  &::before {
    display: block;
    width: 100%;
    padding-top: 56.25%;
    content: '';
  }
}

.videoCardBody {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  &.Visible {
    z-index: 1;
    width: calc(100% + 24px);
    background: #f00;
    box-shadow: 0 0 0 4px #00f;
    transform: translate3d(-12px, -8px, 0);
    transition:
      width 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease,
      transform 0.2s ease;
  }
  
  & > .thumbnail {
    position: relative;
    display: block;
  }
  
  & > .thumbnail::before {
    display: block;
    width: 100%;
    padding-top: 56.25%;
    content: '';
  }

  & > .thumbnail > .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & > .body {
    visibility: hidden;
    transition: padding 0.2s ease;
  }

  &.Visible > .body {
    visibility: visible;
  }

  &.Visible > .body {
    padding: 0 12px;
  }
}
</style>
