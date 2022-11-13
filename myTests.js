const ff = bmFolderFun.paths(DriveApp)

const fromPath = 'worldpublic';


function testPileOfFiles() {
  const fromPath = '/mydata/family/Jim/identities';
  // force a permission dialog with this comment 
  // DriveApp.getRootFolder()
  console.log('Simple File List:');
  console.log(ff.pileOfFiles({ start: fromPath }));
  console.log('Simple Image File List (NO SUBFOLDERS):');
  console.log(ff.pileOfFiles({
    start: fromPath,
    mimeTypes: ['image/jpeg', 'image/png'],
    includeSubfolders: false
  }))
  console.log('Simple Folder List AND COUNT OF google-apps.document:');
  const pile = ff.pileOfFiles({
    includeSubfolders: true,
    start: fromPath,
    mimeTypes: [ 'application/vnd.google-apps.document']
  })
 // dedup by folder path
  const map = new Map(pile.map(({folderPath})=>([folderPath, 0])))

  // count by folder path
  pile.forEach (p=>map.set(p.folderPath,map.get(p.folderPath)+1))
  console.log(Array.from(map).map(([folderPath, count])=>({
    folderPath,
    count
  })))
}
