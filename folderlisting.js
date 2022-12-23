/**
 * Creates a menu 'Update Folder List'
 * Clicking it would update the list
 */
function onOpen(e) {
//function notOnOpen(e) {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Update Folder List')
    .addItem('Update Folder List', 'listFolder')
    .addToUi();
}


function listFolder() {
  
  // forces this code to this sheet
  const testSpreadsSheetID = "1_aL5HOiEVUCf9Zz_qocSRdnd9ZSqBDT9tdke6V4rH_I";
  const testSS = SpreadsheetApp.openById(testSpreadsSheetID);
  //this is the name of the tab where the info will go
  const testSheetname = "Folder-Listing";
  const testSheet = testSS.getSheetByName(testSheetname);
  // clear anything in the testSheetname
  testSheet.clear()
  // folder by ID we will raed files from
  const folderID = '0B5biGEQ1GLz0U2tLVktJNmFLejg';
  //Send the info to the function
  var rslt = getListOfDocs(folderID, testSheet);
  if (rslt) {
    SpreadsheetApp.getActiveSpreadsheet().toast("All done!!", "Success", 5)
  }
  else {
    SpreadsheetApp.getActiveSpreadsheet().toast("Something went wrong!!", "FAIL", 5)
  }
}


/**
 * Generates a list of doc names and URLs
 * 
 * @param {string} FolderID the id of the folder with the docs
 * @param {string} sheet reference to sheet where the info is to entered
 * @return {boolean} done returns true if done
 */
function getListOfDocs(FolderID, sheet) {
  try {
    var fld = DriveApp.getFolderById(FolderID);
    const folderName = fld.getName();
    SpreadsheetApp.getActiveSpreadsheet().toast("Listing files in ", "folderName", 5)
    var files = fld.getFiles();
    var rslts = [];
    while (files.hasNext()) {
      var file = files.next();
      rslts.push([file.getName(), file.getUrl()]);
    }
    //alphabatize the list
    rslts.sort();

    var rng = sheet.getRange(2, sheet.getLastColumn() + 1, rslts.length, 2);
    rng.setValues(rslts);
    var headers = sheet.getRange(1, sheet.getLastColumn() - 1, 1, 2);
    const headerName = "Folder: " + folderName;
    headers.setValues([[headerName, 'Link to File']]);

    return true;
  }
  catch (err) {
    return false;
  }
}