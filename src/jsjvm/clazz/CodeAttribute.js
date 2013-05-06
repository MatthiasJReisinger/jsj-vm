jsjvm.clazz.CodeAttribute = function() {
    /* call super constructor */
    jsjvm.clazz.AttributeInfo.call(this);
    
    var max_stack;
    var max_locals;
    var code_length;
    var code;
    var exception_table_length;
    var exception_table;
    var attributes_count;
    var attributes;
}

inherit(jsjvm.clazz.CodeAttribute, jsjvm.clazz.AttributeInfo);
