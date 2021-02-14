<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { expoIn } from 'svelte/easing';
  import YouTubeThumbnail from '../components/YouTubeThumbnail.svelte';
  import { isTouchDevice } from '../helpers/touch-device';
  import type { Video } from '../types';

  export let video: Video;

  let isDetailVisible = false;

  const { id, title, description, statistics, publishedAt } = video;
  const isoDatetime = new Date(publishedAt).toISOString();
  const date = new Intl.DateTimeFormat('ja').format(new Date(publishedAt));

  const viewCount = statistics.viewCount < 5000
    ? new Intl.NumberFormat('ja').format(statistics.viewCount)
    : `${new Intl.NumberFormat('ja').format(Math.round(statistics.viewCount / 1000) / 10)}万`;

  const handleMouseover = () => {
    isDetailVisible = !$isTouchDevice;
  }
</script>

<section
  class="videoCard"
  on:mouseover={handleMouseover}
  on:mouseleave={() => isDetailVisible = false}
>
  <div
    class="content"
    class:Visible={isDetailVisible}
    class:TouchDevice={$isTouchDevice}
  >
    <a href="/video/{id}" class="thumbnail">
      <YouTubeThumbnail videoId={id} />
      {#if Date.now() - publishedAt < 3 * 24 * 60 * 60 * 1000}
        <div class="tag">NEW!!</div>
      {/if}
    </a>
    {#if isDetailVisible}
      <div class="body" in:fly="{{ y: -16, duration: 120, easing: expoIn }}">
        <h1 class="title" {title}>{title}</h1>
        <p class="description">{description}</p>
        <p>{viewCount}回再生</p>
        <time datetime={isoDatetime}>{date}に公開</time>
        <a
          href="https://www.youtube.com/watch?v={id}"
          target="_blank"
          rel="noopener noreferrer"
          on:click={() => isDetailVisible = false}
        >YouTubeで見る</a>
      </div>
    {/if}
  </div>
</section>

<style lang="scss">
  .videoCard {
    position: relative;
    width: 100%;

    &::before {
      display: block;
      width: 100%;
      padding-top: 56.25%;
      content: '';
    }

    & > .content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }

    & > .content > .thumbnail {
      position: relative;
      display: block;
      overflow: hidden;
    }

    & > .content > .thumbnail > .tag {
      position: absolute;
      top: -4px;
      left: -4px;
      padding: 0 16px 0 8px;
      border: 4px solid #fff;
      border-top-right-radius: 100px;
      border-bottom-right-radius: 100px;
      background: #A5E8FF;
      font-size: 1.2rem;
      line-height: 1.8;
      color: #454545;
    }

    & > .content > .body {
      padding: 16px;
    }

    & > .content > .body > .title {
      display: -webkit-box;
      font-size: 1.8rem;
      line-height: 1.5;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    & > .content > .body > .description {
      display: -webkit-box;
      margin-top: 8px;
      font-size: 1.2rem;
      line-height: 1.4;
      overflow: hidden;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    & > .content:not(.TouchDevice).Visible,
    & > .content:not(.TouchDevice):focus-within {
      z-index: 1;
      width: calc(100% + 32px);
      background: #fff;
      box-shadow:
        0 0 0 16px #fff,
        0 5px 32px 8px rgba(#000, 0.2);
      transform: translate3d(-16px, -8px, 0);
      transition:
        width 0.12s ease,
        box-shadow 0.12s ease,
        background 0.12s ease,
        transform 0.12s ease;

      & > .thumbnail > .tag {
        opacity: 0;
        transition: opacity 0.12s 1s ease;
      }
    }
  }
</style>
