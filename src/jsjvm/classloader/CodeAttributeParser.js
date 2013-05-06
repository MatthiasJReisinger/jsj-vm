jsjvm.classloader.CodeAttributeParser = function(classFile, offset) {
    /* call super constructor */
    jsjvm.classloader.AbstractParser.call(this, classFile, offset);
}

inherit(jsjvm.classloader.CodeAttributeParser, jsjvm.classloader.AbstractParser);

jsjvm.classloader.CodeAttributeParser.prototype.parse = function() {
    var codeAttribute = new jsjvm.clazz.CodeAttribute();
    codeAttribute.attribute_name_index = this.parseInt(2);
    codeAttribute.attribute_length = this.parseInt(4);
    codeAttribute.max_stack = this.parseInt(2);
    codeAttribute.max_locals = this.parseInt(2);
    codeAttribute.code_length = this.parseInt(4);
    codeAttribute.code = this.classFile.getBytes().subarray(this.offset, this.offset + codeAttribute.code_length);
    this.offset += codeAttribute.code_length;

    var exceptionTableLength = this.parseInt(2);
    codeAttribute.exception_table = new Array(exceptionTableLength);
    for (var i = 0; i < exceptionTableLength; i++) {
        var exception_table_entry = {};
        exception_table_entry.start_pc = this.parseInt(2);
        exception_table_entry.end_pc = this.parseInt(2);
        exception_table_entry.handler_pc = this.parseInt(2);
        exception_table_entry.catch_type = this.parseInt(2);
        codeAttribute.exception_table[i] = exception_table_entry;
    }

    var attributesCount = this.parseInt(2);
    codeAttribute.attributes = new Array(attributesCount);
    for (var i = 0; i < attributesCount; i++) {
        var attributeParser = new jsjvm.classloader.AttributeInfoParser(this.classFile, this.offset);
        var attributeInfo = attributeParser.parse();
        this.offset = attributeParser.getOffset();
        codeAttribute.attributes[i] = attributeInfo;
    }

    return codeAttribute;
}
