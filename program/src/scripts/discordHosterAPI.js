/**
 * Author: https://bio.link/evanechecssss
 */

/**Needed usage */
var JAVA_URL = Java.type("java.net.URL")
var JAVA_BYTE = Java.type("java.lang.Byte")
var JAVA_RUNTIME = Java.type("java.lang.Runtime")
var JAVA_MATH = Java.type("java.lang.Math")
var JAVA_CHARSET = Java.type("java.nio.charset.Charset")
var JAVA_CHANNELS = Java.type("java.nio.channels.Channels")
var JAVA_FILE_OUTPUT_STREAM = Java.type("java.io.FileOutputStream")
var JAVA_FILE_INPUT_STREAM = Java.type("java.io.FileInputStream")
var JAVA_ZIP_INPUT_STREAM = Java.type("java.util.zip.ZipInputStream")
var JAVA_BUF_OUTPUT_STREAM = Java.type("java.io.BufferedOutputStream")
var JAVA_PATH = Java.type("java.nio.file.Path")
var JAVA_FILE = Java.type("java.io.File")
var JAVA_FILES = Java.type("java.nio.file.Files")
var JAVA_FILE_SYSTEM = Java.type("java.nio.file.FileSystems")
var JAVA_STANDART_COPY_OPTION = Java.type("java.nio.file.StandardCopyOption")
var JAVA_STRING = Java.type("java.lang.String");
var CNPS_EXCEPTION = Java.type("noppes.npcs.api.CustomNPCsException");
/**Help vars */
var WEB_SOURCE = "https://raw.githubusercontent.com/Evanechecssss/CustomNPCDiscordBotHoster/main/testToSend.zip";
var CONTENT_NAME = "content"
var targetFile
var targetFolder
var API = Java.type("noppes.npcs.api.NpcAPI").Instance()
var WORLD_DIR = API.getWorldDir()
var ASSETS_IN_CLIENT = WORLD_DIR.resolve("assets")
var ASSETS_IN_SERVER = targetFolder.resolve("assets")
var ENCODING_CHARSET = "windows-1251"
var TUTORIAL_FILE_NAME = "tutor.html"
var DEF_BUFFER_SIZE = [1024 * 1024 * 50]
/**Flags */
var downloadedFlag = false;
var unzipedFlag = false;
/**Exceptions*/
/**IO */
function createFolderException(file){
    throw new IOException("Failed to create directory " + file)
}
function zipEntryException(zipEntry){
    throw new IOException("Entry is outside of the target dir: " + zipEntry.getName())
}
/**
 * 
 * @param {Nullable} info 
 */
function customNPCFatalError(info){
    throw new CNPS_EXCEPTION(info);
}
/**
 * SCRIPT
 */
/**
 * Start def execution with algorithm
 */
function START_EXECUTION() {
    DOWNLOAD_ASSETS()
    if (downloadedFlag) {
        UNZIP(targetFile.toString(), targetFolder.toString())
        downloadedFlag = false;
    }
    if (unzipedFlag) {
        runFileFromPath()
    }

}
/**
 * Download assets from web site
 */
function DOWNLOAD_ASSETS() {
    var website = new JAVA_URL(WEB_SOURCE) //Get web site as JAVA URL
    var target = JAVA_FILE_SYSTEM.getDefault().getPath(WORLD_DIR.getPath() + JAVA_STRING.format("/%s.zip",CONTENT_NAME)) //Get target file path. World path + content
    var folder = JAVA_FILE_SYSTEM.getDefault().getPath(WORLD_DIR.getPath() + JAVA_STRING.format("/%s/",CONTENT_NAME)) //Get target folder path. World path + content
    var folderFile = new JAVA_FILE(folder) //Get File from path
    if (!folderFile.exists()) { //IF it dont exist, mkdir
        folderFile.mkdir()
    }
    try {
        var inputStream = website.openStream() //Open input stream from URL of web site
        JAVA_FILES.copy(inputStream, target, JAVA_STANDART_COPY_OPTION.REPLACE_EXISTING) //coping input steam to target file with replacing
    } catch (e) { 
         customNPCFatalError(e) //It should be happened, else script is not work
    }
    targetFile = target; //Set target file to file afet downloading
    target.targetFolder = folder; //Set target folder to folder after downloading
    downloadedFlag = true; //This flag is true, if assets is download
}
/**
 * 
 * @param {String} fileZip 
 * @param {String} destDir 
 */
function UNZIP(fileZip, folder) {
    var destDir = new JAVA_FILE(folder) //file from target folder path
    var buffer = DEF_BUFFER_SIZE; //def buffer size
    var zis = new JAVA_ZIP_INPUT_STREAM(new JAVA_FILE_INPUT_STREAM(fileZip), JAVA_CHARSET.forName(ENCODING_CHARSET)) //zip input stream from input stream file path with encoding
    var zipEntry = zis.getNextEntry() 
    while (zipEntry != null) { 
        var newFile = newZipFile(destDir, zipEntry)
        if (zipEntry.isDirectory()) { 
            if (!newFile.isDirectory() && !newFile.mkdirs()) {
                createFolderException(newFile)
            }
        } else {
            var parent = newFile.getParentFile() 
            if (!parent.isDirectory() && !parent.mkdirs()) {
                createFolderException(parent)
            }
            var fos = new JAVA_FILE_OUTPUT_STREAM(newFile)
            var len
            while ((len = zis.read(buffer)) > 0) {
                fos.write(buffer, 0, len)
            }
            fos.close()
        }
        zipEntry = zis.getNextEntry()
    }
    zis.closeEntry()
    zis.close()
    unzipedFlag = true;
}
/**
 * SHOUL HAS ASSETS ON SINGLE PLAYER OR RUN IT AFTER DOWNLOADING ASSETS ON SERVER
 */
function TUTORIAL(server){
    if(server){
        var file = new JAVA_FILE(WORLD_DIR.resolve(ASSETS_IN_CLIENT.resolve(TUTORIAL_FILE_NAME)))
        DESKTOP.getDesktop().browse(file.toURI())
    }else{
        var file = new JAVA_FILE(WORLD_DIR.resolve(ASSETS_IN_SERVER.resolve(TUTORIAL_FILE_NAME)))
        DESKTOP.getDesktop().browse(file.toURI())
    }
}
function runFileFromPath(path) {
    var p = JAVA_RUNTIME.getRuntime().exec(path.toString());
    p.waitFor();
}
/**
 * @deprecated
 */
function runFileFromString(string) {
    var p = JAVA_RUNTIME.getRuntime().exec(string);
    p.waitFor();
}

function newZipFile(destinationDir, zipEntry) {
    var destFile = new JAVA_FILE(destinationDir, zipEntry.getName())
    var destDirPath = destinationDir.getCanonicalPath()
    var destFilePath = destFile.getCanonicalPath()
    if (!destFilePath.startsWith(destDirPath + JAVA_FILE.separator)) {
        zipEntryException(zipEntry)
    }
    return destFile
}

function interact(e) {
    //DOWNLOAD_ASSETS()
    START_EXECUTION()
}