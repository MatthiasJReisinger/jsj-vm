jsjvm.clazz.MethodInfo = function() {
    this.access_flags;
    this.name;
    this.descriptor_index;
    this.attributes;
}

jsjvm.clazz.MethodInfo.prototype.getMaxStackSize = function() {
    var codeAttribute = this.attributes[0];
    return codeAttribute.max_stack;
}

jsjvm.clazz.MethodInfo.prototype.getNumberOfLocalVariables = function() {
    var codeAttribute = this.attributes[0];
    return codeAttribute.max_locals;
}

jsjvm.clazz.MethodInfo.prototype.getCodeSize = function() {
    var codeAttribute = this.attributes[0];
    return codeAttribute.code.length;
}

jsjvm.clazz.MethodInfo.prototype.getCode = function() {
    var codeAttribute = this.attributes[0];
    return codeAttribute.code;
}
