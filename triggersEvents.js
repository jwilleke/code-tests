const sheetForLogs = "sheetLogs";
//const timeZone =

/**
 * Requires TRIGGER From spreadsheet - On edit
 * Creates a menu 'Update Folder List'
 * Clicking it would update the list
 */
function onOpen(event) {
  Logger.log(`Installing UI for: Update Folder List`);
  //function notOnOpen(e) {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Update Folder List')
    .addItem('Update Folder List', 'listFolder')
    .addToUi();
}



/**
 * Add a looging facility for any edits to cells to a specific sheet
 * Does not show modifications to the Sheet Structure such as deleting row or column
 */
function onEditTimeStamp(event) {
  Logger.log(JSON.stringify(event, null, 2));
  const rangeModified = event.range;
  const sheetModifiedName = rangeModified.getSheet().getName()
  const logsTarget = event.source.getSheetByName(sheetForLogs);
  Logger.log(`A1 Notation rangeModified: ${rangeModified.getA1Notation()}`);
  Logger.log(`Sheet Name: ${sheetModifiedName}`);
  if (!event.user.email || event.user.email === "") {
    Logger.log(`event.user.email NOT PROVIDED`);
    Logger.log(`event.user.nickname NOT PROVIDED`);
    logsTarget.appendRow([new Date(), rangeModified.getSheet().getSheetName(), rangeModified.getA1Notation(), "UNKNOWN", "UNKNOWN"]);
  } else {
    Logger.log(`event.user.email ${event.user.email}`);
    Logger.log(`event.user.nickname ${event.user.nickname}`);
    logsTarget.appendRow([new Date(), rangeModified.getSheet().getSheetName(), rangeModified.getA1Notation(), event.user.email, event.user.nickname]);
  }
}

/**
 * Requires TRIGGER From spreadsheet - On change
 * SHOULD only fire on a sheet change
 */
function sheetChangeType(event) {
  Logger.log(JSON.stringify(event, null, 2));
  Logger.log(`event.authMode ${event.authMode}`);
  const eventChangeType = event.changeType;
  Logger.log(`event.changeType ${eventChangeType}`);
  Logger.log(`event.triggerUid ${event.triggerUid}`);
  Logger.log(`event.source ${event.source}`);
  if (!event.user.email || event.user.email === "") {
    Logger.log(`event.user.email NOT PROVIDED`);
    Logger.log(`event.user.nickname NOT PROVIDED`);
  } else {
    Logger.log(`event.user.email ${event.user.email}`);
    Logger.log(`event.user.nickname ${event.user.nickname}`);
  }
  //for( i in event.source) {
  //  Logger.log(`event.source[${i}]: ${JSON.stringify(i, null, 2)}`);
  //}
  const ss = event.source;
  var sheet = ss.getActiveSheet();
  const sheetName = sheet.getName();
  Logger.log(`sheet.getName().source ${sheetName}`);
  // create some variables from Event Objects
  //  if (sheet.getName() != "XXXX") return;
  //var edtitedRange;
  let edtitedRange;
  // which onChange Event occured
  switch (eventChangeType) {
    case "EDIT":
      if (sheetName != 'Form Responses 1') {
        Logger.log(`Not sheet "Form Responses 1" so skipping`)
        return;
      }
      Logger.log("DEBUG: The changeType is " + eventChangeType);
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
      Logger.log("DEBUG: The changeType is " + eventChangeType);
      var range = sheet.getActiveRange();
      var numberRows = range.getNumRows();
      var row = range.getLastRow();
      Logger.log("DEBUG: ADDED LastRow: " + row);
      Logger.log("DEBUG: ADDED numberRows: " + numberRows);
      copyToSheet.insertRowsBefore(row, numberRows);
      Logger.log("DEBUG: copyToSheet.insertRowsBefore numberRows: " + numberRows);
      break;
    case "INSERT_COLUMN":
      Logger.log("DEBUG: The changeType is " + eventChangeType);
      var colNumber = editedsheet.getSelection().getActiveRange().getColumn();
      edtitedRange = editedsheet.getRange(1, colNumber, editedsheet.getMaxRows(), 1);
      onInsertColumn(edtitedRange);
      Logger.log("DEBUG: The activeRng is " + activeRng);
      break;
    case "REMOVE_ROW":
      Logger.log("DEBUG: The changeType is " + eventChangeType);
      var range = sheet.getActiveRange();
      var numberRows = range.getNumRows();
      var tValues = range.getValues();
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
      Logger.log("DEBUG: The changeType is " + eventChangeType);
      break;
    case "INSERT_GRID":
      // implies a sheet was added
      Logger.log("DEBUG: The changeType is " + eventChangeType);
      break;
    case "REMOVE_GRID":
      // implies a sheet was deleted
      Logger.log("DEBUG: The changeType is " + eventChangeType);
      break;
    case "FORMAT":
      Logger.log("DEBUG: The changeType is " + eventChangeType);
      break;
    case "OTHER":
      // impiles this was changed by a formula
      Logger.log("DEBUG: The changeType is " + eventChangeType);
      break;
    default:
      Logger.log("DEBUG: The changeType is " + Unknown);
      break;
  }
}


/**
 * Intended to be called by a trigger.
 * Sets an URL where this entry could be edited with existing values filled in the form
 */
function getEditResponseUrls() {
  var sheet = mySS.getSheetByName(mySheetName);
  Logger.log("Starting getEditResponseUrls");
  var data = sheet.getDataRange().getValues();
  var form = FormApp.openByUrl(myFormURL);
  //Logger.log(data);
  for (var i = 2; i < data.length; i++) {
    if (data[i][0] != '' && data[i][editUrlColumnIndex - 1] == '') {
      var timestamp = data[i][0];
      Logger.log("data(i):" + data[i]);
      var formSubmitted = form.getResponses(timestamp);
      if (formSubmitted.length < 1) continue;
      var editResponseUrl = formSubmitted[0].getEditResponseUrl();
      Logger.log("editResponseUrl:" + editResponseUrl);
      sheet.getRange(i + 1, editUrlColumnIndex).setValue(editResponseUrl);
      // we do this so we know if we already set the URL.
      sheet.getRange(i + 1, editUrlColumnIndex - 1).setValue(Utilities.getUuid());
    }
  }
}
