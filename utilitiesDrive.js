/**
 * https://docs.google.com/document/d/1kbbs2dLUUXO-xTPRRyhTd6mTSHcjk7T3LeJ2rDeJnCI/
 */

function myFunction4() {
  var testFileID = '1xt7RH9hPHMfL44-T7Pnih7z5WDX21wBeKVtrwsTflNE';
  Logger.log(`testFileID for File: ${testFileID}`);
  fileInfo(testFileID);
  var testFolderID = '0B5biGEQ1GLz0U2tLVktJNmFLejg'
  Logger.log(`folderInfo for Folder: ${testFolderID}`);
  folderInfo(testFolderID);
  const getFilesNamed = "Temp";
  Logger.log(`getFilesNamed: ${getFilesNamed}(s)`);
  var files = DriveApp.getFilesByName(getFilesNamed);
  var filecount = 0;
  var dupFileArray = [];
  while (files.hasNext()) {
    var file = files.next();
    dupFileArray.push(file.getId());
    filecount++;
  };
  if (filecount > 1) {
    Logger.log(`More than one file with name: $(fileName}`);
    for (fl = 0; fl < dupFileArray.length; fl++) {
      var activeFileID = dupFileArray[fl];
       var folders = DriveApp.getFileById(dupFileArray[fl]).getParents();
       let foldercount=0;
       //Get the folder name for each file
       while(folders.hasNext()){
         folder = folders.next().getName(); 
         foldercount++;
       };
       if(folder == foldercount > 1){
         Logger.log(`There is more than one parent folder for file ${getFilesNamed} with ${dupFileArray[fl]}`);
       } else {
         Logger.log(`Folder; ${folder} for file ${getFilesNamed} has ${dupFileArray[fl]} ${fileInfo(dupFileArray[fl])}`);
       }
    }

    } else {
      Logger.log(`No file in your drive exists with name: "+fileName}`)
  }
      // var fileInFolder = "root";
    //getFileByName(getFilesNamed, fileInFolder);

}


  /**
   *  Obtains details on Google Drive File
   */
  function fileInfo(fileId) {
    // display informations about a file given by its id
    var file = DriveApp.getFileById(fileId);
    var fileName = file.getName();
    var fileSize = file.getSize();
    var creation = file.getDateCreated();
    var lastChange = file.getLastUpdated();
    var fileOwner = file.getOwner();
    var fileUrl = file.getUrl();
    Logger.log("File Name: %s  creation: %s  update: %s  size: %s owner: %s \n url: %s",
      fileName, fileSize, creation, lastChange, fileOwner, fileUrl)
  }

  /**
   * Obtains details on Google Drive Folder
   */
  function folderInfo(folderId) {
    var folder = DriveApp.getFolderById(folderId)
    var name = folder.getName();
    var date = folder.getDateCreated();
    var url = folder.getUrl();
    Logger.log("Folder Name: %s  Creation date: %s   URL: %s", name, date, url);
  }


  /**
   * As different files may share the same name, we will write a function that displays the names of folders that contain a file given by its name and indicate the creation date of the corresponding file. 
   * There will be a double loop, because a file can be in different parent folders. We start with the method  getFilesByName(name) to generates all files with a given name.
   */
  function getFileByName(fileName, fileInFolder) {
    var filecount = 0;
    var dupFileArray = [];
    var folderID = "";

    var files = DriveApp.getFilesByName(fileName);

    while (files.hasNext()) {
      var file = files.next();
      dupFileArray.push(file.getId());

      filecount++;
    };

    if (filecount > 1) {
      if (typeof fileInFolder === 'undefined') {
        folderID = { "id": false, "error": "More than one file with name: " + fileName + ". \nTry adding the file's folder name as a reference in Argument 2 of this function." }

      } else {
        //iterate through list of files with the same name
        for (fl = 0; fl < dupFileArray.length; fl++) {
          var activeFile = DriveApp.getFileById(dupFileArray[fl]);
          var folders = activeFile.getParents();
          var folder = ""
          var foldercount = 0;

          //Get the folder name for each file
          while (folders.hasNext()) {
            folder = folders.next().getName();
            foldercount++;
          };

          if (folder === fileInFolder && foldercount > 1) {
            folderID = { "id": false, "error": "There is more than one parent folder: " + fileInFolder + " for file " + fileName }
          };

          if (folder === fileInFolder) {
            folderID = { "id": dupFileArray[fl], "error": false };

          } else {
            folderID = { "id": false, "error": "There are multiple files named: " + fileName + ". \nBut none of them are in folder, " + fileInFolder }
          };
        };
      };

    } else if (filecount === 0) {
      folderID = { "id": false, "error": "No file in your drive exists with name: " + fileName };

    } else { //IF there is only 1 file with fileName
      folderID = { "id": dupFileArray[0], "error": false };
    };

    return folderID;
  };