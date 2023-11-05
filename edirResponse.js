/**
 * 
 */
var mySheetId = '1_aL5HOiEVUCf9Zz_qocSRdnd9ZSqBDT9tdke6V4rH_I'; // (Code Tests https://docs.google.com/spreadsheets/d/1_aL5HOiEVUCf9Zz_qocSRdnd9ZSqBDT9tdke6V4rH_I/)
// We only use this spreadsheet in this code
var mySS = SpreadsheetApp.openById(mySheetId); // This errors on occasion and still no idea why. 
var myFormURL = 'https://docs.google.com/forms/d/1o2HssPZcBH8j4oQUNSZpohtRSue5JBa3jdfiWBrX5qY/viewform';
var mySheetName = 'Form Responses 2';
// Column where we WRITE the URL byName
var editUrlColumnName = 'Updated';
// Column where we WRITE the URL byIndex
//var editUrlColumnIndex = getColumnIndexByName(mySS.getSheetByName(mySheetName), editUrlColumnName);

function testing() {
  const mySheetName = 'Form Responses 2';
  var editUrlColumnIndex = getColumnIndexByName(mySS.getSheetByName(mySheetName), editUrlColumnName);
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

