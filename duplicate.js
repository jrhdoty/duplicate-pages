//Global Variables

var form = FormApp.getActiveForm();

// Menu

function createMenu() {
  FormApp.getUi()
      .createMenu('Menu')
      .addItem('Duplicate Page', 'duplicatePage')
      .addToUi();
}

//

function duplicatePage() {
  
  // Dialog
  var ui = FormApp.getUi();

  var result = ui.prompt('Select page','Which page should be duplicated? Doesnt work with 1st Page.',ui.ButtonSet.OK_CANCEL);
  
  var result2 = ui.prompt('How often','How often should it be duplicated?',ui.ButtonSet.OK_CANCEL);

  // Process the user's response.
  var page = result.getResponseText();
  var amount = result2.getResponseText();
    
  // Fetch Pages
  var pages = getPages();
  Logger.log(pages);
  var items = form.getItems();
  var start = items[pages[page-1]].getIndex();
  var end = items[pages[page]-1].getIndex();
  
  // Duplicates entries on the page
  for(var j=0;j<amount;j++){
  for(var i=start;i<=end;i++){
    var item = items[i];
    item.duplicate();
    }
  }
}

function getPages() {
  // Returns an Array with Pagebreak positions and first and last index in form.getItems()
  var items = form.getItems();
  var pages = new Array();
  pages[0]=0;
  for(var i=0;i<items.length;i++) {
  Logger.log(items[i].getType());
  if (items[i].getType() == 'PAGE_BREAK'){
  pages.push(i);
  }
  }
  pages.push(items.length);
  return pages;
}