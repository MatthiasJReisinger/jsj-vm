function ClassFile(fileName) {
    this.fileName = fileName;
    this.bytes = null;
}

ClassFile.prototype.getFileName = function() {
    return this.fileName;
}

ClassFile.prototype.setBytes = function(bytes) {
    this.bytes = bytes;
}

ClassFile.prototype.getBytes = function() {
    return this.bytes;
}
