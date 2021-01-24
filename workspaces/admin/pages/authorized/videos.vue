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
      <div class="row mt-4">
        <div class="col-12">
          <AppCard>
            <template #header>
              <h4>Available Videos</h4>
            </template>
            <template #body>
              <AppTable
                :headers="{
                  id: '#',
                  thumbnail: 'Thumbnail',
                  title: 'Title',
                  publishedAt: 'Published At'
                }"
                :rows="videos"
              >
                <template #id="{ item }">
                  <n-link :to="`/authorized/videos/${item.id}`" class="btn">{{item.id}}</n-link>
                </template>
                <template #thumbnail="{ item }">
                  <img :src="item.thumbnail" :alt="item.title" width="120">
                </template>
                <template #title="{ item }">
                  {{item.title}}
                  <div class="table-links">
                    <a :href="`//www.monalisatalk-fan.site/?id=${item.id}`" target="_blank" rel="noreferrer noopener">View on monalisatalk-fan.site</a>
                    <div class="bullet"></div>
                    <a :href="`//www.youtube.com/watch?v=${item.id}`" target="_blank" rel="noreferrer noopener">View on YouTube</a>
                  </div>
                </template>
              </AppTable>
            </template>
          </AppCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import type { TableRow } from '@/components/AppTable.vue';

export default defineComponent({
  name: 'AuthorizedVideosPage',
  head: {
    title: 'Videos',
  },
  components: {
    SectionHeader: () => import('@/components/SectionHeader.vue'),
    AppIcon: () => import('@/components/AppIcon.vue'),
    AppCard: () => import('@/components/AppCard.vue'),
    AppTable: () => import('@/components/AppTable.vue'),
  },
  setup() {
    const videos = computed((): TableRow[] => [
      { id: 'yysixBSc63M', thumbnail: '//i.ytimg.com/vi/yysixBSc63M/hqdefault.jpg', title: '【漫画】DQNネームの親子「かわいそうな名前ぇｗｗｗ」妹「…」→他人の名前を嘲笑う親子に特大ブーメランが…！？', publishedAt: '2020-01-01' },
      { id: 'yysixBSc63M', thumbnail: '//i.ytimg.com/vi/yysixBSc63M/hqdefault.jpg', title: '【漫画】DQNネームの親子「かわいそうな名前ぇｗｗｗ」妹「…」→他人の名前を嘲笑う親子に特大ブーメランが…！？', publishedAt: '2020-01-02' },
      { id: 'yysixBSc63M', thumbnail: '//i.ytimg.com/vi/yysixBSc63M/hqdefault.jpg', title: '【漫画】DQNネームの親子「かわいそうな名前ぇｗｗｗ」妹「…」→他人の名前を嘲笑う親子に特大ブーメランが…！？', publishedAt: '2020-01-03' },
      { id: 'yysixBSc63M', thumbnail: '//i.ytimg.com/vi/yysixBSc63M/hqdefault.jpg', title: '【漫画】DQNネームの親子「かわいそうな名前ぇｗｗｗ」妹「…」→他人の名前を嘲笑う親子に特大ブーメランが…！？', publishedAt: '2020-01-04' },
      { id: 'yysixBSc63M', thumbnail: '//i.ytimg.com/vi/yysixBSc63M/hqdefault.jpg', title: '【漫画】DQNネームの親子「かわいそうな名前ぇｗｗｗ」妹「…」→他人の名前を嘲笑う親子に特大ブーメランが…！？', publishedAt: '2020-01-05' },
      { id: 'yysixBSc63M', thumbnail: '//i.ytimg.com/vi/yysixBSc63M/hqdefault.jpg', title: '【漫画】DQNネームの親子「かわいそうな名前ぇｗｗｗ」妹「…」→他人の名前を嘲笑う親子に特大ブーメランが…！？', publishedAt: '2020-01-06' },
      { id: 'yysixBSc63M', thumbnail: '//i.ytimg.com/vi/yysixBSc63M/hqdefault.jpg', title: '【漫画】DQNネームの親子「かわいそうな名前ぇｗｗｗ」妹「…」→他人の名前を嘲笑う親子に特大ブーメランが…！？', publishedAt: '2020-01-07' },
      { id: 'yysixBSc63M', thumbnail: '//i.ytimg.com/vi/yysixBSc63M/hqdefault.jpg', title: '【漫画】DQNネームの親子「かわいそうな名前ぇｗｗｗ」妹「…」→他人の名前を嘲笑う親子に特大ブーメランが…！？', publishedAt: '2020-01-08' },
      { id: 'yysixBSc63M', thumbnail: '//i.ytimg.com/vi/yysixBSc63M/hqdefault.jpg', title: '【漫画】DQNネームの親子「かわいそうな名前ぇｗｗｗ」妹「…」→他人の名前を嘲笑う親子に特大ブーメランが…！？', publishedAt: '2020-01-09' },
      { id: 'yysixBSc63M', thumbnail: '//i.ytimg.com/vi/yysixBSc63M/hqdefault.jpg', title: '【漫画】DQNネームの親子「かわいそうな名前ぇｗｗｗ」妹「…」→他人の名前を嘲笑う親子に特大ブーメランが…！？', publishedAt: '2020-01-10' },
      { id: 'yysixBSc63M', thumbnail: '//i.ytimg.com/vi/yysixBSc63M/hqdefault.jpg', title: '【漫画】DQNネームの親子「かわいそうな名前ぇｗｗｗ」妹「…」→他人の名前を嘲笑う親子に特大ブーメランが…！？', publishedAt: '2020-01-11' },
    ]);

    return {
      videos,
    }
  },
});
</script>
