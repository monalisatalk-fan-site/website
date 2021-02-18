import { DirectiveOptions } from 'vue';

export const outsideDirective: DirectiveOptions = {
  bind(el, binding) {
    const handleOutsideClick = (event: MouseEvent | TouchEvent): void => {
      // HTMLから要素が消えた後の初回のクリック時にイベントリスナーを解除する
      if (!document.body.contains(el)) {
        window.removeEventListener('click', handleOutsideClick);
        window.removeEventListener('touchstart', handleOutsideClick);
      }

      // 要素外をクリックした場合
      if (event.target && event.target instanceof Element && !el.contains(event.target)) {
        binding.value();
      }
    };

    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('touchstart', handleOutsideClick);
  }
};
