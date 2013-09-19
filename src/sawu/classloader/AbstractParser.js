/**
 * This is the base class for the parsers used to parse the class
 * files. It should not be instantiated, instead only its subclasses
 * should be instantiated.
 */
sawu.classloader.AbstractParser = function(classFile, offset) {
    this.classFile = classFile;
    this.offset = offset;
}

/**
 * This is an abstract method, thus it is not implemented. It has to
 * be implemented by each subclass.
 */
sawu.classloader.AbstractParser.prototype.parse = function() {}

sawu.classloader.AbstractParser.prototype.getOffset = function() {
    return this.offset;
}

sawu.classloader.AbstractParser.prototype.parseInt = function(numberOfBytes) {
    var intValue = sawu.getIntFromBytes(this.classFile.getBytes(), this.offset, numberOfBytes);
    this.offset += numberOfBytes;
    return intValue;
}


