<script lang="ts">
</script>

<div class="global-header">
  <header class="header">
    <a class="logo" href="/">
      <img src="/images/logo.svg" alt="" class="image">
    </a>
  </header>
  <nav class="navigation">
    <ul class="global-header-menu">
      <li class="item">
        <a href="/" class="link" class:-active={true}>
          <span class="icon ion-ios-home" />
          ホーム
        </a>
      </li>
      <li class="item">
        <a href="/latest/1" class="link">
          <span class="icon ion-ios-film-outline" />
          すべての動画
        </a>
      </li>
      <li class="item">
        <a href="/latest/1" class="link">
          <span class="icon ion-ios-search" />
          動画を検索
        </a>
      </li>
    </ul>
  </nav>
</div>

<style lang="scss">
  @import '../styles/resources';

  .global-header {
    & > .header {
      display: grid;
      place-items: center;
      height: 80px;

      @include screen-lg {
        border-bottom: 1px solid #ccc;
      }
    }

    & > .header > .logo > .image {
      display: block;
      height: 36px;
    }

    & > .navigation {
      @include container;

      @include screen-sm {
        display: none;
      }
    }
  }

  .global-header-menu {
    display: flex;

    & > .item > .link {
      display: flex;
      align-items: center;
      height: 48px;
      margin-right: 24px;
      font-size: 1.6rem;
    }

    & > .item > .link.-active {
      color: #f00;
    }

    & > .item > .link > .icon {
      margin-right: 8px;
      font-size: 2rem;
    }
  }
</style>
