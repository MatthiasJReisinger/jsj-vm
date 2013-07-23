/**
 * This is the base class for the parsers used to parse the class
 * files. It should not be instantiated, instead only its subclasses
 * should be instantiated.
 */
jsjvm.classloader.AbstractParser = function(classFile, offset) {
    this.classFile = classFile;
    this.offset = offset;
}

/**
 * This is an abstract method, thus it is not implemented. It has to
 * be implemented by each subclass.
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


