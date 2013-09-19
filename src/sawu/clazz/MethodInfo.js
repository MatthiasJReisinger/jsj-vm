/**
 * This clazz encapsulates all the information of a
 * Java method.
 */
sawu.clazz.MethodInfo = function() {
    this.access_flags;
    this.name;
    this.descriptor_index;
    this.attributes;
}

sawu.clazz.MethodInfo.prototype.getMaxStackSize = function() {
    var codeAttribute = this.attributes[0];
    return codeAttribute.max_stack;
}

sawu.clazz.MethodInfo.prototype.getNumberOfLocalVariables = function() {
    var codeAttribute = this.attributes[0];
    return codeAttribute.max_locals;
}

sawu.clazz.MethodInfo.prototype.getCodeSize = function() {
    var codeAttribute = this.attributes[0];
    return codeAttribute.code.length;
}

sawu.clazz.MethodInfo.prototype.getCode = function() {
    var codeAttribute = this.attributes[0];
    return codeAttribute.code;
}
