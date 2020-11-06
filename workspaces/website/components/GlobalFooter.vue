<template lang="pug">
.global-footer
  .container
    .official-links
      .title モナ・リザの戯言 公式
      .item
        a.link(href="//www.youtube.com/channel/UCSSkv6tmPpi8d1IrWegypsA" target="_blank")
          FontAwesomeIcon.icon.-youtube(:icon="['fab', 'youtube']" fixedWidth)
          span.label YouTube
      .item
        a.link(href="//twitter.com/monalisatalk" target="_blank")
          FontAwesomeIcon.icon.-twitter(:icon="['fab', 'twitter']" fixedWidth)
          span.lable Twitter
    .copyright &copy; 2020 モナ・リザの戯言 ファンサイト
    .note 本サイトは非公式に運営されているファンサイトです。掲載の内容には注意しておりますが、誤りがありましたら運営Twitterアカウントまでお問い合わせください。
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default defineComponent({
  name: 'GlobalFooter',
  components: {
    FontAwesomeIcon,
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
@import 'resources';

.global-footer {
  padding: 48px 0 24px;
  color: #ccc;
  background: #000;

  & > .container {
    @include container;
  }

  & > .container > .copyright {
    margin: 32px 0 8px;
    font-size: 1.2rem;
    text-align: center;
  }

  & > .container > .note {
    font-size: 1rem;
    color: #888;
    text-align: center;
  }
}

.official-links {
  & > .title {
    margin-bottom: 24px;
    font-size: 1.2rem;
    font-weight: bold;
  }

  & > .item > .link {
    display: inline-flex;
    align-items: center;
    margin: 0 0 16px 1em;
    color: #eee;
  }

  & > .item > .link:hover {
    text-decoration: none;
  }

  & > .item > .link > .icon {
    margin-right: 0.8em;
    font-size: 1.2em;
  }

  & > .item > .link > .icon.-youtube {
    color: #da1725;
  }

  & > .item > .link > .icon.-twitter {
    color: #1da1f2;
  }
}
</style>
