var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1_aL5HOiEVUCf9Zz_qocSRdnd9ZSqBDT9tdke6V4rH_I/edit');
var activeSheet = SpreadsheetApp.getActiveSpreadsheet();
Logger.log(ss.getName());
var sheetname = "Sheet1"
var sheet = ss.getSheetByName("sheet1");
var copyToSheet = ss.getSheetByName("sheet2");

function myChangeType(e) {
  if ( activeSheet != sheet) return;
  Logger.log(JSON.stringify(e)); //DEBUG
  // create some variables from Event Objects
  var type = e.changeType;
  Logger.log("DEBUG: The changeType is " + type);
  var editedsheet = e.source.getSheetName();
  Logger.log("DEBUG: The sheet name is " + e.source.getSheetName() + ", and the change type is " + type);
  //var edtitedRange;
  let edtitedRange;
  // which onChange Event occured
  switch (type) {
    case "EDIT":
      Logger.log("DEBUG: The changeType is " + type);
      // we just copy all the values in the first two columns
      // get all the values as we may have inserted or deleted a row
      // this is due to bug in apps script where range is not provided in onChange=EDIT
      var lastRow = sheet.getLastRow();
      var valuesToCopy = sheet.getRange(2, 1, lastRow, 2).getValues();
      // now copy values to other sheet
      var copyToRange = copyToSheet.getRange(2, 1, lastRow, 2);
      copyToRange.setValues(valuesToCopy);
      break;
    case "INSERT_ROW":
      Logger.log("DEBUG: The changeType is " + type);
      var range = sheet.getActiveRange();
      var numberRows = range.getNumRows();
      var row = range.getLastRow();
      Logger.log("DEBUG: ADDED LastRow: " + row);
      Logger.log("DEBUG: ADDED numberRows: " + numberRows);
      copyToSheet.insertRowsBefore(row, numberRows);
      Logger.log("DEBUG: copyToSheet.insertRowsBefore numberRows: " + numberRows);
      break;
    case "INSERT_COLUMN":
      Logger.log("DEBUG: The changeType is " + type);
      var colNumber = editedsheet.getSelection().getActiveRange().getColumn();
      edtitedRange = editedsheet.getRange(1, colNumber, editedsheet.getMaxRows(), 1);
      onInsertColumn(edtitedRange);
      Logger.log("DEBUG: The activeRng is " + activeRng);
      break;
    case "REMOVE_ROW":
      Logger.log("DEBUG: The changeType is " + type);
      var range = sheet.getActiveRange();
      var numberRows = range.getNumRows();
      var tValues=range.getValues();
      Logger.log(tValues)
      var lastRow = range.getLastRow();
      Logger.log("DEBUG: DELETED LastRow: " + lastRow);
      Logger.log("DEBUG: DELETED numberRows: " + numberRows);
      //Have to add the top row back
      let topRow = lastRow - numberRows + 1;
      copyToSheet.deleteRows(topRow, numberRows);
      Logger.log("DEBUG: copyToSheet.deleteRows numberRows: " + numberRows);
      break;
    case "REMOVE_COLUMN":
      Logger.log("DEBUG: The changeType is " + type);
      break;
    case "INSERT_GRID":
      // implies a sheet was added
      Logger.log("DEBUG: The changeType is " + type);
      break;
    case "REMOVE_GRID":
      // implies a sheet was deleted
      Logger.log("DEBUG: The changeType is " + type);
      break;
    case "FORMAT":
      Logger.log("DEBUG: The changeType is " + type);
      break;
    case "OTHER":
      // impiles this was changed by a formula
      Logger.log("DEBUG: The changeType is " + type);
      break;
    default:
      Logger.log("DEBUG: The changeType is " + Unknown);
      break;
  }
}


