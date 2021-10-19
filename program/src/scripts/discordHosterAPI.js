/**
 * Author: https://bio.link/evanechecssss
 */

var JAVA_URL = Java.type("java.net.URL")
var JAVA_CHANNELS = Java.type("java.nio.channels.Channels")
var JAVA_FILE_OUTPUT_STREAM = Java.type("java.io.FileOutputStream")


function START() {

}
function DOWNLOAD_ASSETS() {
    var website = new JAVA_URL("https://github.com/Evanechecssss/CustomNPCDiscordBotHoster");
    rbc = JAVA_CHANNELS.newChannel(website.openStream());
    var fos = new JAVA_FILE_OUTPUT_STREAM("README.md");
    fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);
}