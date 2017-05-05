obtain(['µ/utilities.js'], function(utils) {
  var main = µ('win-dow[name=' + imports.window + ']')[0];
  var text = µ('#text', main.content);
  var menu = main.menuBar;

  main.changeSize(820, 512);
  main.style.minWidth = '650px';
  main.style.minHeight = '375px';

  var cont = µ('.frameContent', main.content)[0];

  var cal = µ('cal-endar', cont)[0];//utils.transplant(µ('cal-endar', cont)[0]);

  var div = µ('+div', menu);
  div.className = 'entryDivider';

  var file = document.createElement('menu-item');
  file.addTitle('File');

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

  menu.appendChild(help);

  var monthBar = µ('+div', menu);
  monthBar.className = 'calMonthBar';

  var monthPrev = µ('+div', monthBar);
  monthPrev.className = 'leftArrow';

  var monthLbl = µ('+div', monthBar);
  monthLbl.className = 'monthName';
  monthLbl.textContent = cal.getMonthAndYear();

  var monthNext = µ('+div', monthBar);
  monthNext.className = 'rightArrow';

  menu.style.height = '42px';

  monthNext.onclick = function(e) {
    cal.nextMonth();
    monthLbl.textContent = cal.getMonthAndYear();
  };

  monthPrev.onclick = function(e) {
    cal.prevMonth();
    monthLbl.textContent = cal.getMonthAndYear();
  };

  /*main.onmousedown = function(e) {
    e.preventDefault();
    if (!main.focused) main.focus();
  };*/

  //cal.setMonth(new Date((new Date()).getMonth()));
  main.resetContentHeight();
  main.style.visibility = 'visible';
});
