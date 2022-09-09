/**
 * This SHOULD always run unless soemone removes a column or row
 */
function myUtilitiesTestFunction() {
  var testSpreadsSheetID = "1_aL5HOiEVUCf9Zz_qocSRdnd9ZSqBDT9tdke6V4rH_I";
  var testSS = SpreadsheetApp.openById(testSpreadsSheetID); //  .openByUrl('https://docs.google.com/spreadsheets/d/1_aL5HOiEVUCf9Zz_qocSRdnd9ZSqBDT9tdke6V4rH_I/edit');
  //Logger.log(testSS.getName());
  var testSheetname = "Sheet1";
  var testSheet = testSS.getSheetByName(testSheetname);
  var testCopyToSheet = testSS.getSheetByName("sheet2");
  var testColumnNumber = 2;
  var testRowNumber = 3;
  // value sto test form URLs
  var testUrlSheetName = 'Form Responses 2';
  var testUrlSheet = testSS.getSheetByName(testUrlSheetName);
  var testUrlColumnName = 'Edit Link';
  var testFormEditColumnIndex = getColumnIndexByName(testUrlSheet, testUrlColumnName);
  var testFormURL = 'https://docs.google.com/forms/d/1o2HssPZcBH8j4oQUNSZpohtRSue5JBa3jdfiWBrX5qY/viewform';
  Logger.log(`Looking in: ${testSheetname} for Column: "${testUrlColumnName}"`);
  var testUrlRowNumber = 7;
  //var testRange = getCellRangeByColumnName(testSheet, testColumnName, testRowNumber );
  //var testColumnRange = thisRange.getA1Notation();
  Logger.log(`editUrleditUrlColumnIndex: ${testFormEditColumnIndex}`);
  Logger.log(`getColumnIndexByName: ${getColumnIndexByName(testSheet, testUrlColumnName)}`);
  Logger.log(`getCellRangeByColumnName: ${getCellRangeByColumnName(testSheet, testUrlColumnName, testRowNumber).getA1Notation()}`);
  Logger.log(`getColumnRangeByName: ${getColumnRangeByName(testSheet, testUrlColumnName).getA1Notation()}`);
  var testCellValue = getCellValueByColumnName(testSheet, testUrlColumnName, testRowNumber);
  Logger.log(`getCellValueByColumnName: ${getCellValueByColumnName(testSheet, testUrlColumnName, testRowNumber)}`);
  Logger.log(`getColumnValuesByName: ${getColumnValuesByName(testSheet, testUrlColumnName)}`);
  // setFormEditResponseUrls(testUrlSheet, testUrlRowNumber, testFormURL, testFormEditColumnIndex);
  // getRowsData(testSheet) creates an aray of JSON objects with headings as keys
  var sheetObjecrts = getRowsData(testSheet);
  Logger.log(JSON.stringify(sheetObjecrts, null, 3));
  // test function fileChangesDateRange(folderId, startDate, endDate)  --> Not working
  // last 24 hours
  var nowDate = new Date().getTime();
  var oneDaysBeforeNow = nowDate - 3600 * 1000 * 24;
  var folderId = "0B5biGEQ1GLz0U2tLVktJNmFLejg";
  var cutOffDate = new Date(oneDaysBeforeNow);
  //fileChangesDateRange(folderId, oneDaysBeforeNow, nowDate);
}


/**
 * 
 Passing only two arguments returns a "range" with a single cell.
    var range = sheet.getRange(1, 1);
  getRange(row, column, numRows) 
 */

/**
 * gets range of a cell specified by a columnName and row
 */
function getCellRangeByRow(sheet, row) {
  let data = sheet.getDataRange().getValues();

  if (column != -1) {
    return sheet.getRange(row, sheet.getLastColumn(), 1, 1);
  }
}

/**
 * gets value of a cell specified by columnName and row
 */
function getCellValueByColumnName(sheet, columnName, row) {
  let cell = getCellRangeByColumnName(sheet, columnName, row);
  // so if we do not return anything on null value we are returning null so why is this here?
  // do we throw an exception?
  if (cell != null) {
    return cell.getValue();
  }
}

/**
 * gets the column as a range
 */
function getColumnRangeByName(sheet, columnName) {
  let data = sheet.getRange("A1:1").getValues();
  let column = data[0].indexOf(columnName);
  if (column != -1) {
    return sheet.getRange(2, column + 1, sheet.getMaxRows());
  }
}

/**
 * Get all values in a column
 */
function getColumnValuesByName(sheet, columnName) {
  let column = getColumnRangeByName(sheet, columnName);
  if (column != null) {
    return column.getValues();
  }
}

/**
 * getColumnIndexByName()
 */
function getColumnIndexByName(sheet, columnName) {
  data = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues();//Get 2D array of all values in row one
  data = data[0];//Get the first and only inner array
  return data.indexOf(columnName) + 1; //Arrays are zero indexed- so add 1
}

// by row

/**
 * gets range of a cell specified by a columnName and row
 */
function getCellRangeByColumnName(sheet, columnName, row) {
  let data = sheet.getDataRange().getValues();
  let column = data[0].indexOf(columnName);
  if (column != -1) {
    return sheet.getRange(row, column + 1, 1, 1);
  }
}

/**
 * gets value of a cell specified by columnName and row
 */
function getCellValueByColumnName(sheet, columnName, row) {
  let cell = getCellRangeByColumnName(sheet, columnName, row);
  // so if we do not return anything on null value we are returning null so why is this here?
  // do we throw an exception?
  if (cell != null) {
    return cell.getValue();
  }
}

/**
 * gets the column as a range
 */
function getColumnRangeByName(sheet, columnName) {
  let data = sheet.getRange("A1:1").getValues();
  let column = data[0].indexOf(columnName);
  if (column != -1) {
    return sheet.getRange(2, column + 1, sheet.getMaxRows());
  }
}

/**
 * Get all values in a column
 */
function getColumnValuesByName(sheet, columnName) {
  let column = getColumnRangeByName(sheet, columnName);
  if (column != null) {
    return column.getValues();
  }
}

/**
 * getColumnIndexByName()
 */
function getColumnIndexByName(sheet, columnName) {
  data = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues();//Get 2D array of all values in row one
  data = data[0];//Get the first and only inner array
  return data.indexOf(columnName) + 1; //Arrays are zero indexed- so add 1
}

/**
 * Use of a SPREADSHEET_KEY = "your sheet key" and then call this function to get the spreadsheet
 */
function getSpreadsheet(SPREADSHEET_KEY) {
  return SpreadsheetApp.openById(SPREADSHEET_KEY);
}

/**
 * Returns true if the cell where cellData was read from is empty.
 * @parms
 * - cellData: string
 */
function isCellEmpty(cellData) {
  return typeof (cellData) == "string" && cellData == "";
}

/**
 * Returns true if the character char is alphabetical, false otherwise
 */
function isAlnum(char) {
  return char >= 'A' && char <= 'Z' ||
    char >= 'a' && char <= 'z' ||
    isDigit(char);
}



/**
 * Returns true if the character char is a digit, false otherwise.
 */
function isDigit(char) {
  return char >= '0' && char <= '9';
}


/**
 * Iterates row by row in the input range and returns an array of objects.
 * Each object contains all the data for a given row, indexed by its normalized column name.
 * Arguments:
 * - sheet: the sheet object that contains the data to be processed
 * - range: the exact range of cells where the data is stored
 *    This argument is optional and it defaults to all the cells except those in the first row or all the cells below columnHeadersRowIndex (if defined).
 * - columnHeadersRowIndex: specifies the row number where the column names are stored.
 *    This argument is optional and it defaults to the row immediately above range;
 */
function getRowsData(sheet, range, columnHeadersRowIndex) {
  Logger.log("DEBUG: getRowsData");
  var headersIndex = columnHeadersRowIndex || range ? range.getRowIndex() - 1 : 1;
  var dataRange = range ||
    sheet.getRange(headersIndex + 1, 1, sheet.getMaxRows() - headersIndex, sheet.getMaxColumns());
  var numColumns = dataRange.getLastColumn() - dataRange.getColumn() + 1;
  var headersRange = sheet.getRange(headersIndex, dataRange.getColumn(), 1, numColumns);
  var headers = headersRange.getValues()[0];
  return getObjects(dataRange.getValues(), normalizeHeaders(headers));
}

/**
 * For every row of data in data, generates an object that contains the data. 
 * Names of object fields are defined in keys.
 * Arguments:
 *   - data: JavaScript 2d array
 *   - keys: Array of Strings that define the property names for the objects to create
 */
function getObjects(data, keys) {
  var objects = [];
  for (var i = 0; i < data.length; ++i) {
    var object = {};
    var hasData = false;
    for (var j = 0; j < data[i].length; ++j) {
      var cellData = data[i][j];
      if (isCellEmpty(cellData)) {
        continue;
      }
      object[keys[j]] = cellData;
      hasData = true;
    }
    // Increment 1 for the header row, and one more so that it matches the spreadsheet.
    object.__row_ = 2 + i;
    if (hasData) {
      objects.push(object);
    }
  }
  return objects;
}


/**
 * Returns an Array of normalized Strings.
 * Empty Strings are returned for all Strings that could not be successfully normalized.
 * Arguments:
 *   - headers: Array of Strings to normalize
 */
function normalizeHeaders(headers) {
  var keys = [];
  for (var i = 0; i < headers.length; ++i) {
    keys.push(normalizeHeader(headers[i]));
    //Logger.log("DEBUG: string: " + headers[i]);
  }
  return keys;
}

/**
 * Normalizes a string, by removing all alphanumeric characters and using mixed case
to separate words. The output will always start with a lower case letter.

This function is designed to produce JavaScript object property names.

Arguments:
- header: string to normalize

Examples:
   "First Name" -> "firstName"
   "Market Cap (millions) -> "marketCapMillions
   "1 number at the beginning is ignored" -> "numberAtTheBeginningIsIgnored"
 */
function normalizeHeader(header) {
  var key = "";
  var upperCase = false;
  for (var i = 0; i < header.length; ++i) {
    var letter = header[i];
    if (letter == " " && key.length > 0) {
      upperCase = true;
      continue;
    }
    if (!isAlnum(letter)) {
      continue;
    }
    if (key.length == 0 && isDigit(letter)) {
      continue; // first character must be a letter
    }
    if (upperCase) {
      upperCase = false;
      key += letter.toUpperCase();
    } else {
      key += letter.toLowerCase();
    }
  }

  //Logger.log("header: "+key);
  return key;
}

/**
 * 
 */
function fileChangesDateRange(folderId, firstDate, lastDate) {
  var firstDateAsString = Utilities.formatDate(new Date(firstDate), "GMT", "yyyy-MM-dd");
  var lastDateAsString = Utilities.formatDate(new Date(lastDate), "GMT", "yyyy-MM-dd");


  //where B > date '"&TEXT(A2,"yyyy-mm-dd")&"' and B <= date '"&TEXT(B2,"yyyy-mm-dd")&"' 
  //var files = DriveApp.getFolderById(folderId).searchFiles('modifiedDate > "' + firstDateAsString + ' and modifiedDate < "' +lastDateAsString +'"');

  // var files = DriveApp.getFolderById(folderId).searchFiles('createdDate > "' + cutOffDateAsString + '"');

  var query = `'${folderId}' in parents and modifiedDate > '${firstDateAsString}' and modifiedDate < '${lastDateAsString}' and trashed=false`;
  Logger.log(query);
  var url = encodeURI(`https://www.googleapis.com/drive/v3/files?q=${query}`);
  var res = UrlFetchApp.fetch(url, { headers: { authorization: "Bearer " + ScriptApp.getOAuthToken() } });
  var fileList = res.getContentText();
  console.log(fileList)
}

/**
 * Sets an URL where for a speicic row which MUST be fed from a form
 * which allows the entry could be edited with existing values filled in the form.
 * Rather complex code and may be difficult to work with as a function outside of specic sheets.
 */
function setFormEditResponseUrls(sheet, myRow, myFormURL, setFormEditColumnIndex) {
  Logger.log("Starting setFormEditResponseUrls");
  Logger.log(`Looking in: "${sheet.getName()}" for Column: "${setFormEditColumnIndex}"`);
  var form = FormApp.openByUrl(myFormURL);
  var rowData = sheet.getRange(myRow, 1, 1, sheet.getLastColumn()).getValues();
  Logger.log(rowData);
  var timestamp = rowData[0][0];
  Logger.log(`timestamp: ${timestamp}`);
  var formSubmitted = form.getResponses(timestamp);
  var editResponseUrl = formSubmitted[0].getEditResponseUrl();
  Logger.log("editResponseUrl:" + editResponseUrl);
  var urlValue = rowData[0][setFormEditColumnIndex - 1];
  var exisitingValue = sheet.getRange(myRow, setFormEditColumnIndex).getValue();
  if (timestamp != '' && exisitingValue == '') {
    Logger.log("rowData(myRow):" + rowData);
    var formSubmitted = form.getResponses(timestamp);
    Logger.log(`formSubmitted: ${formSubmitted}`);
    Logger.log(`formSubmitted.length: ${formSubmitted.length}`);
    if (formSubmitted.length < 1) {
      Logger.log(`Error: formSubmitted.length is not right: ${formSubmitted.length}`);
      //sheet.getRange(i+1, editUrlColumnIndex).setValue(editResponseUrl);
      sheet.getRange(myRow, setFormEditColumnIndex).setValue(editResponseUrl);
    } else {
      sheet.getRange(myRow, setFormEditColumnIndex).setValue(editResponseUrl);
    }
    // we do this so we know if we already set the URL.
    //sheet.getRange(i+1, editUrlColumnIndex-1).setValue(Utilities.getUuid());
  } else {
    Logger.log(`Error: No timestamp: ${timestamp} or URL value ${exisitingValue}`);
  }
}
