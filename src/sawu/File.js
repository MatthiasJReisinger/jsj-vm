/**
 * This class represents a file that has been passed
 * to the Java VM.
 */
sawu.File = function(fileName) {
    this.fileName = fileName;
    this.bytes = null;
}

sawu.File.prototype.getFileName = function() {
    return this.fileName;
}

sawu.File.prototype.setBytes = function(bytes) {
    this.bytes = bytes;
}

sawu.File.prototype.getBytes = function() {
    return this.bytes;
}
