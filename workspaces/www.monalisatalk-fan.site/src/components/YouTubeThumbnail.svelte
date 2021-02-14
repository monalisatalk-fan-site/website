<script context="module" lang="ts">
  let cache: Record<string, HTMLImageElement | undefined> = {};
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  /** ビデオのID */
  export let videoId: string;

  /** クオリティ */
  export let size: 'default' | 'hqdefault' | 'maxresdefault' = 'hqdefault';

  let src: string;
  let canvasElement: HTMLCanvasElement | null;

  onMount(() => {
    const imageSource = `//img.youtube.com/vi/${videoId}/${size}.jpg`;
    const cachedImage = cache[imageSource];

    /** サムネイルを Canvas に描画する */
    const drawThumbnail = (img: HTMLImageElement) => {
      if (!canvasElement) {
        src = imageSource;

        return;
      }

      const ctx = canvasElement.getContext('2d');

      if (!ctx) {
        src = imageSource;

        return;
      }

      canvasElement.width = img.naturalWidth;
      canvasElement.height = img.naturalHeight;

      ctx.drawImage(img, 0, 0);
    };

    if (cachedImage) {
      drawThumbnail(cachedImage);

      return;
    }

    const img = new Image();

    img.onload = () => {
      drawThumbnail(img);

      cache = {
        ...cache,
        [imageSource]: img,
      };
    };

    img.onerror = () => {
      src = imageSource;
    };

    img.src = imageSource;
  });
</script>

<div class="youtubeThumbnail">
  {#if src}
    <img class="image" {src} alt="" />
  {:else}
    <canvas class="image" bind:this={canvasElement} />
  {/if}
</div>

<style lang="scss">
  .youtubeThumbnail {
    position: relative;

    &::before {
      display: block;
      width: 100%;
      padding-top: 56.25%;
      content: '';
    }

    & > .image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
</style>
