<template>
  <div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th
              v-for="(label, key) in headers"
              :key="key"
            >
              {{label}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="index"
          >
            <td
              v-for="(value, key) in headers"
              :key="key"
            >
              <slot :name="key" :item="item">
                {{item[key]}}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="float-right">
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: isFirstPageLinkDisable }">
            <n-link :to="firstPageLink" class="page-link">
              <AppIcon name="play-skip-back" />
            </n-link>
          </li>
          <li
            v-for="pageNumber in pages"
            :key="pageNumber"
            class="page-item"
            :class="{ active: pageNumber === currentPage }"
          >
            <n-link :to="getPageLink(pageNumber)" class="page-link">
              {{pageNumber}}
            </n-link>
          </li>
          <li class="page-item" :class="{ disabled: isLastPageLinkDisable }">
            <n-link :to="lastPageLink" class="page-link">
              <AppIcon name="play-skip-forward" />
            </n-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, useContext } from '@nuxtjs/composition-api';
import { RawLocation } from 'vue-router';
import { clamp, range } from 'lodash-es';

export type TableRow<Cell = unknown> = Record<string, Cell>;

export default defineComponent({
  name: 'AppTable',
  props: {
    headers: {
      type: Object as PropType<TableRow<string>>,
      required: true,
    },
    rows: {
      type: Array as PropType<TableRow[]>,
      default: () => [],
    },
    rowsPerPage: {
      type: Number,
      default: 25,
    },
  },
  components: {
    AppIcon: () => import('@/components/AppIcon.vue'),
  },
  setup(props) {
    const { route } = useContext();
    const maxPage = computed(() => props.rows.length === 0 ? 1 : Math.ceil(props.rows.length / props.rowsPerPage));
    const currentPage = computed((): number => {
      const { page } = route.value.query;

      if (typeof page !== 'string') {
        return 1;
      }

      const pageNumber = +page;

      if (Number.isNaN(page)) {
        return 1;
      }

      return clamp(pageNumber, 1, maxPage.value);
    });
    const items = computed(() => props.rows.slice().splice(props.rowsPerPage * (currentPage.value - 1), props.rowsPerPage));
    const pages = computed(() =>  range(0, 7).map((index) => currentPage.value + index - 3).filter((page) => page > 0 && page <= maxPage.value));
    const getPageLink = (page: number): RawLocation => ({
      path: route.value.path,
      hash: route.value.hash,
      query: {
        ...route.value.query,
        page: `${clamp(page, 1, maxPage.value)}`,
      },
    });
    const isFirstPageLinkDisable = computed(() => currentPage.value === 1);
    const firstPageLink = computed(() => getPageLink(1));
    const isLastPageLinkDisable = computed(() => currentPage.value === maxPage.value);
    const lastPageLink = computed(() => getPageLink(maxPage.value));

    return {
      items,
      currentPage,
      maxPage,
      pages,
      getPageLink,
      isFirstPageLinkDisable,
      firstPageLink,
      isLastPageLinkDisable,
      lastPageLink,
    };
  },
});
</script>
