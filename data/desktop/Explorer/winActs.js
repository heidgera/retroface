var main = µ('win-dow[name=' + imports.window + ']')[0];
console.log(imports.window);
var menu = main.menuBar;

var file = µ('+menu-item');
file.addTitle('File');
file.addOption('Open');

file.addOption('Open folder...');
file.addDivider();
file.addOption('Print...');

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

var hist = document.createElement('menu-item');
hist.addTitle('History');
hist.addOption('Home', function() {
  main.navigate('http://re.trof.it', 'http://re.trof.it');
});

hist.addDivider();
hist.addOption('Recently Visited');
hist.addOption('Wired', function() {
  main.navigate('http://www.wired.com', 'www.wired.com');
});

hist.addOption('Sparkfun', function() {
  main.navigate('http://sparkfun.com', 'www.sparkfun.com');
});

hist.addOption('Dinosaurs', function() {
  main.navigate('http://qwantz.com', 'www.qwantz.com');
});

menu.appendChild(hist);

var help = document.createElement('menu-item');
help.addTitle('Help');
help.addOption('Help...');

menu.appendChild(help);

var div = µ('+div', menu);
div.className = 'entryDivider';

var address = µ('+div', menu);
address.className = 'addressBar';

var addLbl = µ('+div', address);
addLbl.textContent = 'Address';

var addBox = µ('+div', address);
addBox.className = 'addressBox';
addBox.contentEditable = true;
addBox.textContent = 're.trof.it';

menu.style.height = '42px';

main.resetContentHeight();

main.changeSize(640, 480);

main.navigate = function(add, fakeAddress) {
  /*if (~add.indexOf('http://')) {
    add = add.substring(7);
  }*/

  /*var comp = new difflib.SequenceMatcher(add, 'www.labsecurity.com/drk');
  if (~add.indexOf('www.labsecurity.com/drk')) add = 'data/drk/video.html';
  else if (comp.ratio() > 0.9) {
    add = 'data/drk/close.html';
  } else if (add == 'data/drk/home.html') {
    add = 'data/drk/home.html';
  } else {
    add = 'data/drk/error.html';
  }*/

  µ('#load', main.content).src = add;
  if (fakeAddress) addBox.textContent = fakeAddress;

  //console.log(µ('#load', main).contentWindow.history);
};

addBox.onkeypress = function(e) {
  var keyCode = e.keyCode;
  if (keyCode === 13) {
    e.preventDefault();
    main.navigate(addBox.textContent);
    addBox.blur();
  }
};

addBox.onmousedown = function(e) {
  e.stopPropagation();
  addBox.focus();
};

main.content.onmousedown = function() {

};

main.resetContentHeight();
main.style.visibility = 'visible';
