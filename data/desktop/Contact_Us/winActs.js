var main = µ('win-dow[name=' + imports.window + ']')[0];
console.log(imports.window);
var menu = main.menuBar;

/*var file = µ('+menu-item');
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

var help = document.createElement('menu-item');
help.addTitle('Help');
help.addOption('Help...');

menu.appendChild(help);*/

main.changeSize(640, 250);

main.resetContentHeight();
main.style.visibility = 'visible';
