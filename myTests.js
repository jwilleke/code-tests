const ff = bmFolderFun.paths(DriveApp)

const fromPath = 'worldpublic';


function testPileOfFiles() {
  const fromPath = 'worldpublic';
  // force a permission dialog with this comment 
  // DriveApp.getRootFolder()
  console.log('Simple File List:');
  console.log(ff.pileOfFiles({ start: fromPath }));
  console.log('Simple File List:');
  console.log(ff.pileOfFiles({ 
    start: fromPath, 
    mimeTypes: ['image/jpeg','image/png'], 
    includeSubfolders: false 
  }))
}
