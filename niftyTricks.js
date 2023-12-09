function testFunctionArray() {
  // Add this after the definition of myArray in your code
  myArray = Array.from(new Set(myArray));
}


/**
 * read Persistent values from a sheet
 * Often you need to store values in a sheet and not need to store constants in code.
 * 
 */
// Get a sheet with the values
var testSpreadsSheetID = "1_aL5HOiEVUCf9Zz_qocSRdnd9ZSqBDT9tdke6V4rH_I"; //https://docs.google.com/spreadsheets/d/1_aL5HOiEVUCf9Zz_qocSRdnd9ZSqBDT9tdke6V4rH_I/edit#gid=977107447
var testSS = SpreadsheetApp.openById(testSpreadsSheetID);
let REFERENCESHEET = testSS.getSheetByName('REF');
// read values from sheet (limited to 20 rows)
// start at 2 to skip headers
const REFVALUES = REFERENCESHEET.getRange(2, 1, 20, 2).getValues();
// define where to store values
let REF = readConfig();

function testReadConfig() {
  for (const key in REF) {
    if (REF.hasOwnProperty(key)) {
      console.log(`${key} : ${REF[key]}`)
    }
  }
  Logger.log(`Access any value from key as REF['lastNumber'] ${REF['lastNumber']}`)
}

/**
 * reads Persistent values from a sheet put into an Object
 */
function readConfig() {
  let refObj = {};

  REFVALUES.forEach((v) => {
    if (v[0]) {
      // Extract the key and the value
      let key = v[0];
      let value = v[1];

      // Add the key and value to
      // the object
      refObj[key] = value;
    }
  });
  return refObj;
}