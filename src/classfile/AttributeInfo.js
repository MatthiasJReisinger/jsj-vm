jsjvm.classfile.AttributeInfo = function() {
    var attribute_name_index;
    var attribute_length;
    var info;
}

jsjvm.classfile.AttributeInfo.prototype.parse = function(classFile, offset) {
    this.attribute_name_index = jsjvm.classfile.getIntFromBytes(classFile.getBytes(), offset, 2);
    offset += 2;

    this.attribute_length = jsjvm.classfile.getIntFromBytes(classFile.getBytes(), offset, 4);
    offset += 4;

    /* ignore field info (the length of this field this.attribute_length) */
    offset += this.attribute_length;

    return offset;
}
