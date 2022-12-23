
const sheetForLogs = "sheetLogs";

  function myFunction() {

  }

// onEdit is sheetname
/**
 * Add a looging facility for any edits to cells to a specific sheet
 * Does not show modifications to the Sheet Structure such as deleting row or column
 */
function onEditTimeStamp(e) {
  const rangeModified = e.range;
  const sheetModifiedName = rangeModified.getSheet().getName()
  const logsTarget = e.source.getSheetByName(sheetForLogs);
  Logger.log(`A1 Notation rangeModified: ${rangeModified.getA1Notation()}`);
  Logger.log(`Sheet Name: ${sheetModifiedName}`);
  //Logger.log(`rowModified: ${rowModified}`);
  //Logger.log(`columnModified: ${columnModified}`);
  logsTarget.appendRow([new Date(), rangeModified.getSheet().getSheetName(), rangeModified.getA1Notation()])
}