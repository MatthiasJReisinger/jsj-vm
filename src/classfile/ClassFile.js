jsjvm.classfile.ClassFile = function(fileName) {
    this.fileName = fileName;
    this.bytes = null;
}

jsjvm.classfile.ClassFile.prototype.getFileName = function() {
    return this.fileName;
}

jsjvm.classfile.ClassFile.prototype.setBytes = function(bytes) {
    this.bytes = bytes;
}

jsjvm.classfile.ClassFile.prototype.getBytes = function() {
    return this.bytes;
}
