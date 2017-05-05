var main = µ('win-dow[name=' + imports.window + ']')[0];

var splash = µ('+img', µ('body')[0]);
splash.src = 'img/gallery/splash.png';
splash.className = 'splash';

main.changeSize(720, 480);

main.content.style.backgroundColor = '#ccc';

var menu = main.menuBar;

var file = document.createElement('menu-item');
file.addTitle('File');
file.addOption('Save');
/*file.addOption('Save', function() {
  main.save();
});*/

file.addOption('Save as...');

file.addDivider();
file.addOption('Close', function() {
  main.closeWindow();
});

menu.appendChild(file);

var edit = document.createElement('menu-item');
edit.addTitle('Edit');
edit.addOption('Undo');
edit.addOption('Redo');
edit.addDivider();
edit.addOption('Copy');
edit.addOption('Paste');

menu.appendChild(edit);

var show = document.createElement('menu-item');
show.addOption('Start');

menu.appendChild(show);

/*ajax('https://cors-anywhere.herokuapp.com/https://goo.gl/photos/8X7R2WVLVMMEJb4m6', (xml, http)=> {
  //console.log(xml);
  //var cont = xml;
  console.log(µ('html', xml).innerHTML);
  var frm = µ('#photos', main);
  frm.src = 'data:text/html;charset=utf-8,' + encodeURI(µ('html', xml).innerHTML);
  main.style.visibility = 'visible';
  µ('body').removeChild(splash);

});*/

var slides = main.content.querySelectorAll('.slideCont');
slides = [].slice.call(slides);
slides.forEach(function(cur, ind, arr) {
  var sl = cur;
  sl.onmousedown = function() {
    µ('.currentSlide', main.content)[0].className = µ('.currentSlide', main.content)[0].className.replace(' currentSlide', '');
    sl.className += ' currentSlide';
    µ('#displayedSlide', main.content).src = µ('img', sl)[0].src;
  };
});

setTimeout(function() {
  main.resetContentHeight();
  main.style.visibility = 'visible';
  µ('body')[0].removeChild(splash);
}, 2000);
