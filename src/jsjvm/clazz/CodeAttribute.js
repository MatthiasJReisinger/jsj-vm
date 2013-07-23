/**
 * Represents a code attribute within the class file. It holds
 * information like the actual bytecode of the corresponding
 * method, code length, etc.
 */
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
