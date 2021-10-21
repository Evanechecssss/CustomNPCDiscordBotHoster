/**
 * Author: https://bio.link/evanechecssss
 */

var JAVA_URL = Java.type("java.net.URL")
var JAVA_BYTE = Java.type("java.lang.Byte")
var JAVA_MATH = Java.type("java.lang.Math")
var JAVA_CHANNELS = Java.type("java.nio.channels.Channels")
var JAVA_FILE_OUTPUT_STREAM = Java.type("java.io.FileOutputStream")
var JAVA_FILE_INPUT_STEAM = Java.type("java.io.FileInputStream")
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
    var folder = new JAVA_FILE(JAVA_FILE_SYSTEM.getDefault().getPath(WORLD_DIR.getPath() + "/content/"))
    if (!folder.exists()) {
        folder.mkdir()
    }
    try {
        var inputStream = website.openStream()
        JAVA_FILES.copy(inputStream, target, JAVA_STANDART_COPY_OPTION.REPLACE_EXISTING)
    } catch (e) {
        print("ECXEPTION0" + e)
    }
    UNZIP_FILE(target, JAVA_FILE_SYSTEM.getDefault().getPath(WORLD_DIR.getPath() + "/content/"))
}

function UNZIP_FILE(zipFile, outputPath) {
    try {
        var zis = new JAVA_ZIP_INPUT_STREAM(JAVA_FILES.newInputStream(zipFile))
        var entry = zis.getNextEntry()
        print(entry)
        while (entry != null) {
            var newFilePath = outputPath.resolve(entry.getName())
            if (entry.isDirectory()) {
                JAVA_FILES.createDirectories(newFilePath)
            } else {
                if (!JAVA_FILES.exists(newFilePath.getParent())) {
                    JAVA_FILES.createDirectories(newFilePath.getParent())
                }
                try {
                    print("1" + entry.getName())
                    var bos = JAVA_FILES.newOutputStream(outputPath.resolve(newFilePath))
                    print("2" + entry.getName())
                    var buffer = [JAVA_MATH.toIntExact(entry.getSize())]
                    print("3" + entry.getName())
                    var location
                    while ((location = zis.read(buffer)) != -1) {
                        print("4" + entry.getName())
                        bos.write(buffer, 0, location)
                    }
                } catch (e) {
                    print("ECXEPTION1" + e)
                }
            }
            print("5" + entry.getName())
            entry = zis.getNextEntry()
        }
    } catch (e) {
        print("ECXEPTION2" + e)
    }
}
function interact(e) {
    DOWNLOAD_ASSETS()
}

