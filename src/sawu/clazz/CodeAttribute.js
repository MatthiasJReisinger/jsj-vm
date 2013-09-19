/**
 * Represents a code attribute within the class file. It holds
 * information like the actual bytecode of the corresponding
 * method, code length, etc.
 */
sawu.clazz.CodeAttribute = function() {
    /* call super constructor */
    sawu.clazz.AttributeInfo.call(this);
    
    var max_stack;
    var max_locals;
    var code_length;
    var code;
    var exception_table_length;
    var exception_table;
    var attributes_count;
    var attributes;
}

inherit(sawu.clazz.CodeAttribute, sawu.clazz.AttributeInfo);
