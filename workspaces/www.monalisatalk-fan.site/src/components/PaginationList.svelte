<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let total: number;
  export let perPage: number;
  export let current: number;

  const dispatch = createEventDispatcher();

  const range = (from: number, to: number) => Array.from({ length: to - from }).fill(null).map((_, i) => from + i);

  let pages: number[] = [];

  $: totalPages = Math.ceil(total / perPage + 0.5);

  $: if (totalPages <= 9) {
    pages = range(1, totalPages);
  } else if (current <= 4) {
    pages = range(1, 9);
  } else if (totalPages - current <= 4) {
    pages = range(totalPages - 9, totalPages);
  } else {
    pages = range(current - 4, current + 5);
  }

  const handleItemClick = (page: number) => {
    dispatch('click', page);
  };

  $: isOmittedBefore = current > 5;
  $: isOmittedAfter = totalPages - current > 5;
</script>

<ol class="paginationList">
  {#if isOmittedBefore}
    <li>
      <button on:click={() => handleItemClick(1)}>1</button>
    </li>
    <li>...</li>
    {/if}
    {#each pages as page}
    <li class="item" class:Current={page === current}>
      <button on:click={() => handleItemClick(page)}>{page}</button>
    </li>
  {/each}
  {#if isOmittedAfter}
    <li>...</li>
    <li>
      <button on:click={() => handleItemClick(totalPages - 1)}>{totalPages - 1}</button>
    </li>
  {/if}
</ol>

<style lang="scss">
  .paginationList {
    display: flex;

    & > .item {
      padding: 0 8px;
    }

    & > .item.Current {
      font-weight: bold;
    }
  }
</style>
