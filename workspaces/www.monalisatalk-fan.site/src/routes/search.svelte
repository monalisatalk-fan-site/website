<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '@sapper/app';
  import qs from 'qs';
  import algoliasearch from 'algoliasearch';
  import VideoCardList from '../components/VideoCardList.svelte';
  import PaginationList from '../components/PaginationList.svelte';
  import { resources } from '../constants';
  import type { Video } from '../types';
  import { isClient } from '../utils/toolbox';
  import { url } from '../utils/url';

  const client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID || '', process.env.ALGOLIA_SEARCH_ONLY_API_KEY || '');
  const index = client.initIndex('monalisatalk-fan.site');

  let keyword = '';
  let keywordInput: HTMLInputElement | null = null;

  const removeFocusEvent = (inputElement: HTMLInputElement | null) => {
    console.log('run remove focus event');

    if (inputElement) {
      inputElement.blur = () => {};
    }
  }

  const onChangeKeyword = async (keyword: string) => {
    await goto(url({
      path: '/search',
      query: {
        keyword,
      },
    }), { replaceState: true });
  };

  $: removeFocusEvent(keywordInput);

  $: onChangeKeyword(keyword);
</script>

<input type="text" bind:value={keyword} bind:this={keywordInput}>
