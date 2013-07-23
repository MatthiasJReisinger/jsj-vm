/**
 * This parser is used by the main parser (see jsjvm.classloader.Parser) to
 * parse the AttributeInfo parts of the given class file. It starts parsing
 * at the given offset. Thus the offset has to mark a valid position within
 * the class file, where indeed an AttributeInfo structure begins.
 */
jsjvm.classloader.AttributeInfoParser = function(classFile, offset) {
    /* call super constructor */
    jsjvm.classloader.AbstractParser.call(this, classFile, offset);
}

inherit(jsjvm.classloader.AttributeInfoParser, jsjvm.classloader.AbstractParser);

jsjvm.classloader.AttributeInfoParser.prototype.parse = function() {
    var attributeInfo = new jsjvm.clazz.AttributeInfo();
    attributeInfo.attribute_name_index = this.parseInt(2);
    attributeInfo.attribute_length = this.parseInt(4);

    /* ignore field info (the length of this field is attribute_length) */
    this.offset += attributeInfo.attribute_length;

    return attributeInfo;
}
