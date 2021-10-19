/**
 * Authors: 
 *  https://bio.link/evanechecssss
 *  https://bio.link/qazwseer2
 */

var JAVA_URL = Java.type("java.net.URL")
var JAVA_CHANNELS = Java.type("java.nio.channels.Channels")
var JAVA_FILE_OUTPUT_STREAM = Java.type("java.io.FileOutputStream")
var JAVA_Long = Java.type("java.lang.Long")


function START() {

}
function DOWNLOAD_ASSETS() {
    var website = new JAVA_URL("https://raw.githubusercontent.com/Evanechecssss/CustomNPCDiscordBotHoster/main/README.md");
    var rbc = JAVA_CHANNELS.newChannel(website.openStream());
    var fos = new JAVA_FILE_OUTPUT_STREAM("README.md");
    fos.getChannel().transferFrom(rbc, 0, JAVA_Long.MAX_VALUE);
    return fos
}
function interact() {
print(DOWNLOAD_ASSETS())
}
