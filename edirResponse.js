/**
 * 
 */
var mySheetId = '1_aL5HOiEVUCf9Zz_qocSRdnd9ZSqBDT9tdke6V4rH_I'; // (Code Tests https://docs.google.com/spreadsheets/d/1_aL5HOiEVUCf9Zz_qocSRdnd9ZSqBDT9tdke6V4rH_I/)
// We only use this spreadsheet in this code
var mySS = SpreadsheetApp.openById(mySheetId);
var myFormURL = 'https://docs.google.com/forms/d/1o2HssPZcBH8j4oQUNSZpohtRSue5JBa3jdfiWBrX5qY/viewform';
var mySheetName = 'Form Responses 2';
// Column where we WRITE the URL byName
var editUrlColumnName = 'Updated';
// Column where we WRITE the URL byIndex
var editUrlColumnIndex = getColumnIndexByName(mySS.getSheetByName(mySheetName), editUrlColumnName);

function testing() {
  var sheet = mySS.getSheetByName(mySheetName);
  var myColumnNumber=2;
  var myColumnName = 'Updated';
  Logger.log(`Looking in ${mySheetName} for Column ${myColumnName}`);

  var myRowNumber=3;
  var thisRange =getCellRangeByColumnName(sheet, myColumnName,myRowNumber );
  var cellRange = thisRange.getA1Notation();
  Logger.log(`editUrleditUrlColumnIndex: ${editUrlColumnIndex}`);
  Logger.log(`getColumnIndexByName: ${getColumnIndexByName(sheet, myColumnName)}`);
  Logger.log(`getCellRangeByColumnName: ${thisRange.getA1Notation()}`);
  Logger.log(`getColumnRangeByName: ${getColumnRangeByName(sheet, myColumnName).getA1Notation()}`);
  Logger.log(`getCellValueByColumnName: ${getCellValueByColumnName(sheet, myColumnName, myRowNumber)}`);
  Logger.log(`getColumnValuesByName: ${getColumnValuesByName(sheet, myColumnName)}`);
}

/**
 * Sets an URL where this entry could be edited with existing values filled in the form
 */
function getEditResponseUrls() {
  var sheet = mySS.getSheetByName(mySheetName);
  Logger.log("Starting getEditResponseUrls");
  var data = sheet.getDataRange().getValues();
  var form = FormApp.openByUrl(myFormURL);
  //Logger.log(data);
  for(var i = 2; i < data.length; i++) {
    if (data[i][0] != '' && data[i][editUrlColumnIndex-1] == '') {
      var timestamp = data[i][0];
      Logger.log("data(i):" + data[i]);
      var formSubmitted = form.getResponses(timestamp);
      if (formSubmitted.length < 1) continue;
      var editResponseUrl = formSubmitted[0].getEditResponseUrl();
      Logger.log("editResponseUrl:" + editResponseUrl);
      sheet.getRange(i+1, editUrlColumnIndex).setValue(editResponseUrl);
      // we do this so we know if we already set the URL.
      sheet.getRange(i+1, editUrlColumnIndex-1).setValue(Utilities.getUuid());
    }
  }
}


