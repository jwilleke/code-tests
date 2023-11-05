/**
 * this presented on 
 */
var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1_aL5HOiEVUCf9Zz_qocSRdnd9ZSqBDT9tdke6V4rH_I/edit');
var activeSheet = SpreadsheetApp.getActiveSpreadsheet();
//Logger.log(ss.getName());
var sheetname = "Watch changes"
var sheet = ss.getSheetByName(sheetname);
var copyToSheet = ss.getSheetByName("sheet2");




