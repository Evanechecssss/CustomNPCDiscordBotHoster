/**
 * Author: https://bio.link/evanechecssss
 */

var JAVA_URL = Java.type("java.net.URL")
var JAVA_CHANNELS = Java.type("java.nio.channels.Channels")
var JAVA_FILE_OUTPUT_STREAM = Java.type("java.io.FileOutputStream")
var JAVA_PATH = Java.type("java.nio.file.Path")
var JAVA_FILE = Java.type("java.io.File")
var JAVA_FILES = Java.type("java.nio.file.Files")
var JAVA_STANDART_COPY_OPTION = Java.type("java.nio.file.StandardCopyOption")
var API = Java.type("noppes.npcs.api.NpcAPI").Instance()
var WORLD_DIR = API.getWorldDir()
function START() {

}
function DOWNLOAD_ASSETS() {
    var website = new JAVA_URL("https://raw.githubusercontent.com/Evanechecssss/CustomNPCDiscordBotHoster/main/testToSend.zip")
    var target = JAVA_PATH.of(WORLD_DIR.getPath())
    try {
        var inputStream = website.openStream()
        JAVA_FILES.copy(inputStream, target, JAVA_STANDART_COPY_OPTION.REPLACE_EXISTING)
        target.toFile().renameTo(new JAVA_FILE("content.zip"))
    } catch {
        print("TEMP ERROR. HERE WILL BE EXCEPTION OBJECT")
    }
}