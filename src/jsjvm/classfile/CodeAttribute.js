jsjvm.classfile.CodeAttribute = function() {
    /* call super constructor */
    jsjvm.classfile.AttributeInfo.call(this);
    
    var max_stack;
    var max_locals;
    var code_length;
    var code;
    var exception_table_length;
    var exception_table;
    var attributes_count;
    var attributes;
}

inherit(jsjvm.classfile.CodeAttribute, jsjvm.classfile.AttributeInfo);

jsjvm.classfile.CodeAttribute.prototype.parse = function(classFile, offset) {
    /* call super method */
    offset = jsjvm.classfile.AttributeInfo.prototype.parse.call(this, classFile, offset);

    offset -= this.attribute_length;

    this.max_stack = jsjvm.classfile.getIntFromBytes(classFile.getBytes(), offset, 2);
    offset += 2;

    this.max_locals = jsjvm.classfile.getIntFromBytes(classFile.getBytes(), offset, 2);
    offset += 2;

    this.code_length = jsjvm.classfile.getIntFromBytes(classFile.getBytes(), offset, 4);
    offset += 4;

    this.code = classFile.getBytes().subarray(offset, offset + this.code_length);
    offset += this.code_length;

    this.exception_table_length = jsjvm.classfile.getIntFromBytes(classFile.getBytes(), offset, 2);
    offset += 2;

    this.exception_table = new Array(this.exception_table_length);
    for (var i = 0; i < this.exception_table_length; i++) {
        var exception_table_entry = {};
        
        exception_table_entry.start_pc = jsjvm.classfile.getIntFromBytes(classFile.getBytes(), offset, 2);
        offset += 2;
        exception_table_entry.end_pc = jsjvm.classfile.getIntFromBytes(classFile.getBytes(), offset, 2);
        offset += 2;
        exception_table_entry.handler_pc = jsjvm.classfile.getIntFromBytes(classFile.getBytes(), offset, 2);
        offset += 2;
        exception_table_entry.catch_type = jsjvm.classfile.getIntFromBytes(classFile.getBytes(), offset, 2);
        offset += 2;

        this.exception_table[i] = exception_table_entry;
    }

    this.attributes_count = jsjvm.classfile.getIntFromBytes(classFile.getBytes(), offset, 2);
    offset += 2;

    this.attributes = new Array(this.attributes_count);
    for (var i = 0; i < this.attributes_count; i++) {
        var attributeInfo = new jsjvm.classfile.AttributeInfo();
        offset = attributeInfo.parse(classFile, offset);
        this.attributes[i] = attributeInfo;
    }

    return offset;
}
