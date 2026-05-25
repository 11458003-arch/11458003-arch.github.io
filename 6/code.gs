// 線上記事本（單一 GAS 檔案）
// 會在指定雲端資料夾中讀寫檔案：記事本.txt

var FOLDER_ID = '1MNFvZ7U1Tk1VO4HrhqlIh4eY0I3OPD_I';
var NOTE_FILENAME = '記事本.txt';

function doGet() {
  var t = HtmlService.createTemplateFromFile('index');
  t.note = getNote();
  return t.evaluate().setTitle('雲端記事本');
}

// 轉換為網頁應用可呼叫的簡單提示函式（取代 SpreadsheetApp.getUi）
function helloWorld(){
  return '你好！這是你的第一個 GAS 提示（網頁版）。\n\n可在此顯示任意訊息。';
}

function _normalizeFolderId(id){
  if(!id) throw new Error('未設定 FOLDER_ID');
  return id.replace(/\?.*$/,'');
}

function esc_(value){
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function _getFolder(){
  var id = _normalizeFolderId(FOLDER_ID);
  try{
    return DriveApp.getFolderById(id);
  }catch(e){
    throw new Error('無法存取資料夾（檢查 FOLDER_ID 權限與是否正確）：'+e.message);
  }
}

function getNote(){
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try{
    var folder = _getFolder();
    var files = folder.getFilesByName(NOTE_FILENAME);
    if(files.hasNext()){
      var file = files.next();
      var content = file.getBlob().getDataAsString('utf-8');
      var updated = Utilities.formatDate(file.getLastUpdated(), Session.getScriptTimeZone(), 'yyyy/MM/dd HH:mm:ss');
      return {content: content, updated: updated, fileId: file.getId()};
    } else {
      var file = folder.createFile(NOTE_FILENAME, '', 'text/plain');
      var updated = Utilities.formatDate(file.getLastUpdated(), Session.getScriptTimeZone(), 'yyyy/MM/dd HH:mm:ss');
      return {content: '', updated: updated, fileId: file.getId()};
    }
  }finally{
    lock.releaseLock();
  }
}

function saveNote(content){
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try{
    var folder = _getFolder();
    var files = folder.getFilesByName(NOTE_FILENAME);
    var file;
    if(files.hasNext()){
      file = files.next();
      file.setContent(content);
    } else {
      file = folder.createFile(NOTE_FILENAME, content || '', 'text/plain');
    }
    var updated = Utilities.formatDate(file.getLastUpdated(), Session.getScriptTimeZone(), 'yyyy/MM/dd HH:mm:ss');
    return {updated: updated, fileId: file.getId()};
  }finally{
    lock.releaseLock();
  }
}
