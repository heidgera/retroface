
window.retroDir = 'src/libraries/retroWin/';

console.log('in app');
exports.app = {};

obtain(['µ/utilities.js', retroDir + 'desktop.js', retroDir + 'calendar.js', retroDir + 'startMenu.js'], function(utils, desk, cal, start) {
  exports.app.run = ()=> {
    console.log('run app');
    var refreshRate = 30;

    function timeString() {
      var time = new Date();

      var h = utils.zeroPad(time.getHours(), 2);
      var m = utils.zeroPad(time.getMinutes(), 2);
      var s = utils.zeroPad(time.getSeconds(), 2);

      //return ((h<=12)?h:h%12) + ((s%2)?':':'\u2009') + m + ((h>=12)?' PM':' AM');
      return ((h <= 12) ? h : h % 12) + ((s%2)?':':'\u2009') + m + ((h >= 12) ? ' PM' : ' AM');

      //return time.toLocaleTimeString();
    }

    µ('#clock').textContent = timeString();
    setInterval(function() {
      µ('#clock').textContent = timeString();
    }, 1000);

    //µ('#reset').onmousedown = µ('#attract').reset;

    var dt = µ('#windows');

    µ('#contact').onclick = ()=> {
      µ('[name=' + µ('#contact>target') + ']')[0].openWindow();
    };

    document.onmousemove = function(e) {
      //e.preventDefault();
      if (dt.dragged) dt.dragged.drag(e);
    };

    document.onmouseup = function(e) {
      if (dt.dragged) dt.dragged.release(e);
    };

    document.onclick = function(e) {
      if (µ('#start').opened && e.target != µ('#start')) {
        console.log('close');
        µ('#start').close();
      }
    };

    document.onkeydown = function(e) {
      switch (e.which) {
        case 27:

          //µ('#login').logout();
          break;
        case 32:
          break;
        default:
          break;
      }
    };

  };

  provide(exports);
});
