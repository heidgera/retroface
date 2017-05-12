if (!customElements.get('gal-lery')) {
  obtain(['µ/utilities.js'], function(utils) {

    class Gallery extends HTMLElement {
      constructor() {
        super();

        var _this = this;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = '<style> @import "css/programs/gallery.css"; </style>';

        this.controls = µ('+div', this.shadowRoot);
        this.controls.className = 'controls';

        this.prevArrow = µ('+div', this.controls);
        this.prevArrow.id = 'prev';
        this.prevArrow.className = 'arrow';

        this.nextArrow = µ('+div', this.controls);
        this.nextArrow.id = 'next';
        this.nextArrow.className = 'arrow';

        this.dots = µ('+div', this.controls);
        this.dots.className = 'dots';

        this.carousel = µ('+div', this.shadowRoot);
        this.carousel.className = 'carousel';

        this.spinner = µ('+div', this.shadowRoot);
        this.spinner.className = 'spin';

        if (µ('|>src', this)) {
          var src = µ('|>src', this);
          if (src.includes('driveFolderID=')) {
            _this.mainDir = '';

            src = 'https://www.googleapis.com/drive/v3/files?q="' + src.replace('driveFolderID=', '') + '"+in+parents&fields=files(description%2Cid)&key=AIzaSyDCpQOXsgrW5sTHCLS3ufsm4HaKjGmK9wQ';
            console.log(src);

            var req = get(src, { type: 'application/json', credentials: true }).then((res)=> {
              _this.imgList = JSON.parse(res.responseText).files;
              for (var i = 0; i < _this.imgList.length; i++) {
                _this.imgList[i].src = 'https://drive.google.com/uc?export=view&id=' + _this.imgList[i].id;
                _this.imgList[i].desc = 'https://drive.google.com/uc?export=view&id=' + _this.imgList[i].description;
              }

              _this.loadImages();
            });

            //https://www.googleapis.com/drive/v3/files?q='0B1F7mIkYmh6nVEdVVUZ6OUpWTmc'+in+parents&key=AIzaSyDCpQOXsgrW5sTHCLS3ufsm4HaKjGmK9wQ

          } else get(src + '/index.json').then((req)=> {
            _this.mainDir = src + '/';
            this.imgList = JSON.parse(req.responseText).images;
            _this.loadImages();
          });
        }
      }

      //https://drive.google.com/drive/folders/1RiOWwvX05tBRob6Hmgz2141IrQsbow
      //https://drive.google.com/uc?export=view&id=
      //a-u-xb-j a-Wa-ka

      loadImages() {
        var _this = this;
        this.carousel.innerHTML = '';
        this.dots.innerHTML = '';
        var imgs = _this.imgList;
        for (let i = 0; i < imgs.length; i++) {
          let temp = µ('+img', _this.carousel);
          temp.src = _this.mainDir + imgs[i].src;
          temp.desc = imgs[i].desc;
          let dot = µ('+div', _this.dots);
          dot.className = 'dot';
          temp.onclick = ()=> {
            window.open(µ('|>src', this) + '/' + imgs[i].src);
          };

          if (!i) {
            if (temp.complete) _this.setAttribute('loaded', '');
            else temp.onload = ()=> {
              _this.setAttribute('loaded', '');
              console.log('loaded');
            };
          }

          temp.onload;

          dot.onclick = ()=> {
            _this.displayed = i;
          };
        }

        _this.displayed = 0;
      }

      set displayed(val) {
        var _this = this;
        if (val < 0) val = _this.carousel.children.length - 1;
        val = val % _this.carousel.children.length;
        µ('[selected]', _this.shadowRoot).forEach(function(ind, item) {
          item.removeAttribute('selected');
        });

        _this.carousel.children[val].setAttribute('selected', '');
        _this.dots.children[val].setAttribute('selected', '');
      }

      get displayed() {
        var _this = this;
        var dots = _this.dots.children;
        for (var i = 0; i < dots.length; i++) {
          if (typeof dots[i].getAttribute('selected') === 'string') return i;
        }

        return -1;
      }

      nextImage() {
        if (this.displayed >= 0) this.displayed = this.displayed + 1;
        else this.displayed = 0;
      }

      prevImage() {
        if (this.displayed >= 0) this.displayed = this.displayed - 1;
        else this.displayed = 0;
      }

      connectedCallback() {
        var _this = this;
        _this.nextArrow.onclick = (e)=> {
          e.preventDefault();
          _this.nextImage();
        };

        _this.prevArrow.onclick = (e)=> {
          e.preventDefault();
          _this.prevImage();
        };
      }

    }

    customElements.define('gal-lery', Gallery);

    provide(exports);
  });
} else {
  provide(exports);
}
