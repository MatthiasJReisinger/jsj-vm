/**
 * Represents the runtime constant pool of a java class.
 */
sawu.clazz.ConstantPool = function(entries) {
    this.entries = entries;
}

sawu.clazz.ConstantPoolType = {
    CONSTANT_Class : 7,
    CONSTANT_Fieldref : 9,
    CONSTANT_Methodref : 10,
    CONSTANT_InterfaceMethodref : 11,
    CONSTANT_String : 8,
    CONSTANT_Integer : 9,
    CONSTANT_Float : 4,
    CONSTANT_Long : 5,
    CONSTANT_Double : 6,
    CONSTANT_NameAndType : 12,
    CONSTANT_Utf8 : 1,
    CONSTANT_MethodHandle : 15,
    CONSTANT_MethodType : 16,
    CONSTANT_InvokeDynamic : 18
}

/******************************************************************************
 * PUBLIC METHODS
 *****************************************************************************/

/**
 * Returns the runtime constant pool entry at the given index.
 */
sawu.clazz.ConstantPool.prototype.getEntry = function(index) {
    return this.entries[index];
}

sawu.clazz.ConstantPool.prototype.getClassName = function(index) {
    var entry = this.entries[index];
    if (entry.tag == sawu.clazz.ConstantPoolType.CONSTANT_Class) {
        return this.getString(entry.name_index);
    }
}

sawu.clazz.ConstantPool.prototype.getString = function(index) {
    var entry = this.entries[index];
    if (entry.tag == sawu.clazz.ConstantPoolType.CONSTANT_String) {
        var utf8Entry = this.entries[entry.string_index];
        return this.getStringFromUtf8(utf8Entry);
    } else if (entry.tag == sawu.clazz.ConstantPoolType.CONSTANT_Utf8) {
        return this.getStringFromUtf8(entry);
    }
}

/*****************************************************************************
 * NON-PUBLIC HELPER METHODS
 *****************************************************************************/

sawu.clazz.ConstantPool.prototype.getStringFromUtf8 = function(utf8Entry) {
    var stringVal = "";
    for (var i = 0; i < utf8Entry.bytes.length; i++) {
        stringVal += String.fromCharCode(utf8Entry.bytes[i]);
    }
    return stringVal;
}
