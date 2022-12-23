function myFunctionTwo() {
  Logger.log(ss.getName());
  var sheet = ss.getSheetByName("Form Responses 1");
  var row = sheet.getLastRow();
  Logger.log(row);
  var request = new Submission(row, sheet);
  Logger.log(request);
}





function myFunction() {
  var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1_aL5HOiEVUCf9Zz_qocSRdnd9ZSqBDT9tdke6V4rH_I/edit');
  Logger.log(ss.getName());
  const sheetX = ss.getSheetByName("copy-row");
  const sheetY = ss.getSheetByName("copy-row-to");
}

/**
 * 
 * @param {*} sheetX 
 * @param {*} sheetY 
 */
function copyRow(sheetX, sheetY) {
  var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1_aL5HOiEVUCf9Zz_qocSRdnd9ZSqBDT9tdke6V4rH_I/edit');
  Logger.log(ss.getName());
  var sheet = ss.getSheetByName("copy-row");
  const row = sheetX.getLastRow();
  var valuesToCopy = sheetX.getRange(row, 1, 1, sheetX.getLastColumn()).getValues();
  Logger.log(valuesToCopy);
  sheet.getRange(sheetY.getLastRow() + 1, 1, 1, valuesToCopy[0].length).setValues(valuesToCopy);
}

/**
 * Creates an object from the provided row
 * Needs customized to match data desired to be retreeived.
 * @TODO should chnged to be generic
 */
function Submission(row) {
  this.row = row;
  // when reservation form was filled out
  this.timestamp = aSheet.getRange(row, 1).getValue();
  // email who filled out form
  this.email = aSheet.getRange(row, 2).getValue();
  // Displayed Description
  this.eventDisplayed = aSheet.getRange(row, 3).getValue();
  // data of event
  var eventDate = new Date(aSheet.getRange(row, 4).getValue());
  // fix event start
  var startTime = aSheet.getRange(row, 5).getValue();
  this.startTimestamp = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), startTime.getHours(), startTime.getMinutes());
  //use this for formatting
  this.dateString = Utilities.formatDate(this.startTimestamp, 'America/New_York', 'MMMM dd, yyyy');
  //this.timeString = this.startTimestamp.toLocaleTimeString();
  // fix endtime
  var eventTimeEnd = calendarSheetName.getRange(row, 6).getValue(); // eventTimeEnd(F)
  this.endTimestamp = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), eventTimeEnd.getHours(), eventTimeEnd.getMinutes());
  // Displayed Description
  this.eventDescription = aSheet.getRange(row, 7).getValue();
  // contact phone
  this.name = aSheet.getRange(row, 9).getValue();
  // contacts name
  this.name = aSheet.getRange(row, 10).getValue();
}