/**
 *
 */
jsjvm.classloader.AbstractParser = function(classFile, offset) {
    this.classFile = classFile;
    this.offset = offset;
}

/**
 * This is an abstract method, thus it is not implemented.
 */
jsjvm.classloader.AbstractParser.prototype.parse = function() {}

jsjvm.classloader.AbstractParser.prototype.getOffset = function() {
    return this.offset;
}

jsjvm.classloader.AbstractParser.prototype.parseInt = function(numberOfBytes) {
    var intValue = jsjvm.getIntFromBytes(this.classFile.getBytes(), this.offset, numberOfBytes);
    this.offset += numberOfBytes;
    return intValue;
}


