jsjvm.classloader.AttributeParserFactory = function() {
}

/**
 * This method returns an instance of a subclass 
 *
 * @param positionIndex this is the index of an element of the attributes array
 * of a method in the given class file
 * @param classFile the class file to use for parsing the attribute
 * @param offset the byte offset in the given class file, where the parser
 * should begin to parse
 */
jsjvm.classloader.AttributeParserFactory.prototype.create = function(positionIndex, classFile, offset) {
    switch (positionIndex) {
        case 0:
            return new jsjvm.classloader.CodeAttributeParser(classFile, offset);
            break;
        default:
            return new jsjvm.classloader.AttributeInfoParser(classFile, offset);
            break;
    }
}
