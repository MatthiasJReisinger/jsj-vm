jsjvm.classloader.AbstractParser = function(classFile, offset) {
    this.classFile = classFile;
    this.offset = offset;
}

/*****************************************************************************
 * PUBLIC METHODS
 *****************************************************************************/

jsjvm.classloader.AbstractParser.prototype.parse = function() {}

jsjvm.classloader.AbstractParser.prototype.getOffset = function() {
    return this.offset;
}

jsjvm.classloader.AbstractParser.prototype.parseInt = function(numberOfBytes) {
    var intValue = this.getIntFromBytes(this.classFile.getBytes(), this.offset, numberOfBytes);
    this.offset += numberOfBytes;
    return intValue;
}

/*****************************************************************************
 * NON-PUBLIC HELPER METHODS
 *****************************************************************************/

jsjvm.classloader.AbstractParser.prototype.getIntFromBytes = function(bytes, offset, length) {
    var intValue = 0;
    for (var i = 0; i < length; i++) {
        intValue += bytes[offset + i] * Math.pow(2, 8 * (length - 1 - i));
    }
    return intValue;
}
