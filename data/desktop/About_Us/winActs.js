
var main = µ('win-dow[name=' + imports.window + ']')[0];
var icon = µ('eye-con[name=' + imports.window + ']')[0];

//console.log(main);
var menu = main.menuBar;

var fcont = µ('.frameContent', main.content)[0];
var cont = µ('+div', fcont);
var foot = main.foot;

var kids = icon.querySelectorAll('eye-con');
for (var i = 0; i < kids.length; i++) {
  cont.appendChild(kids[i]);
  kids[i].style.display = 'inline-block';
}

µ('+div', foot).textContent = kids.length + ' file(s)';

main.onClose = function(contn) {
  var kids = contn.querySelectorAll('eye-con');
  for (var i = 0; i < kids.length; i++) {
    icon.appendChild(kids[i]);
    kids[i].style.display = 'none';
  }
};

var file = new customElements.get('menu-item')();
console.log(file);
file.addTitle('File');
file.addOption('Open', function(argument) {
  var sel = cont.selected;
  if (sel) sel.openWindow();
});

file.addOption('Open with...');
file.addOption('Print...');

file.addDivider();
file.addOption('Delete');

file.addDivider();
file.addOption('Close Window', function() {
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

main.resetContentHeight();
main.style.visibility = 'visible';
