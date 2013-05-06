jsjvm.File = function(fileName) {
    this.fileName = fileName;
    this.bytes = null;
}

jsjvm.File.prototype.getFileName = function() {
    return this.fileName;
}

jsjvm.File.prototype.setBytes = function(bytes) {
    this.bytes = bytes;
}

jsjvm.File.prototype.getBytes = function() {
    return this.bytes;
}
