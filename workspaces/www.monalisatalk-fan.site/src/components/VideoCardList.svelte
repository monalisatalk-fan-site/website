<script lang="ts">
  import VideoCard from './VideoCard.svelte';
  import type { Video } from '../types';

  export let videos: Video[];

  export let layout: boolean = false;
</script>

<ul
  class="videoCardList"
  class:Layout={layout}
>
  {#each videos as video (video.id)}
    <li class="item">
      <VideoCard {video} />
    </li>
  {/each}
</ul>

<style lang="scss">
  .videoCardList {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 16px;

    @media screen and (max-width: 560px) {
      grid-template-columns: repeat(1, 1fr);
    }

    @media screen and (min-width: 561px) and (max-width: 860px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 861px) and (max-width: 1100px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (min-width: 1101px) and (max-width: 1300px) {
      grid-template-columns: repeat(4, 1fr);
    }

    &.Layout {
      width: 100%;
      box-sizing: border-box;
      max-width: 1600px;
      padding: 0 16px;
      margin: 0 auto;
    }
  }
</style>
