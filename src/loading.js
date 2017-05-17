if (!customElements.get('load-ing')) {
  class Loading extends HTMLElement {
    constructor() {
      super();

      var _this = this;

      _this.root = this.attachShadow({ mode: 'open' });
      _this.root.innerHTML = '<style> @import "css/loading.css"; img{width:0}</style>';

      _this.spin = µ('+div', _this.root);
      _this.spin.className = 'spin';
    }

    set done(val) {
      if (val) this.setAttribute('done', '');
      else this.removeAttribute('done');
    }

    get done() {
      return typeof this.getAttribute('done') == 'string';
    }
  }

  customElements.define('load-ing', Loading);
}
