/**
 * Author: https://bio.link/evanechecssss
 */

var JAVA_URL = Java.type("java.net.URL")
var JAVA_BYTE = Java.type("java.lang.Byte")
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
var API = Java.type("noppes.npcs.api.NpcAPI").Instance()
var WORLD_DIR = API.getWorldDir()

function DOWNLOAD_ASSETS() {
    var website = new JAVA_URL("https://raw.githubusercontent.com/Evanechecssss/CustomNPCDiscordBotHoster/main/testToSend.zip")
    var target = JAVA_FILE_SYSTEM.getDefault().getPath(WORLD_DIR.getPath() + "/content.zip")
    var folder = JAVA_FILE_SYSTEM.getDefault().getPath(WORLD_DIR.getPath() + "/content/")
    if (!folder.exists()) {
        folder.mkdir()
    }
    try {
        var inputStream = website.openStream()
        JAVA_FILES.copy(inputStream, target, JAVA_STANDART_COPY_OPTION.REPLACE_EXISTING)
    } catch (e) {
    }
    UNZIP(target.toString(), folder.toString())
}
/**
 * 
 * @param {String} fileZip 
 * @param {String} destDir 
 */
function UNZIP(fileZip, folder) {
    var destDir = new JAVA_FILE(folder);
    var buffer = new Uint8Array(1024 * 1024 * 50);
    var zis = new JAVA_ZIP_INPUT_STREAM(new JAVA_FILE_INPUT_STREAM(fileZip), JAVA_CHARSET.forName("windows-1251"));
    var zipEntry = zis.getNextEntry();
    while (zipEntry != null) {
        var newZipFile = newZipFile(destDir, zipEntry);
        if (zipEntry.isDirectory()) {
            if (!newZipFile.isDirectory() && !newZipFile.mkdirs()) {
                throw new IOException("Failed to create directory " + newZipFile);
            }
        } else {
            var parent = newZipFile.getParentFile();
            if (!parent.isDirectory() && !parent.mkdirs()) {
                throw new IOException("Failed to create directory " + parent);
            }
            var fos = new JAVA_FILE_OUTPUT_STREAM(newZipFile);
            var len;
            while ((len = zis.read(buffer)) > 0) {
                fos.write(buffer, 0, len);
            }
            fos.close();
        }
        zipEntry = zis.getNextEntry();
    }
    zis.closeEntry();
    zis.close();
}
function newZipFile(destinationDir, zipEntry) {
    var destFile = new JAVA_FILE(destinationDir, zipEntry.getName());

    var destDirPath = destinationDir.getCanonicalPath();
    var destFilePath = destFile.getCanonicalPath();

    if (!destFilePath.startsWith(destDirPath + JAVA_FILE.separator)) {
        throw new IOException("Entry is outside of the target dir: " + zipEntry.getName());
    }

    return destFile;
}

function interact(e) {
    DOWNLOAD_ASSETS()
}

