/**
 * Represents a java class
 */
jsjvm.clazz.Class = function() {
    this.runtimeConstantPool = null;

    /**
     * The flags from the "access_flags" part of the class file
     */
    this.publicFlag = false;
    this.finalFlag = false;
    this.superFlag = false;
    this.interfaceFlag = false;
    this.abstractFlag = false;
    this.syntheticFlag = false;
    this.annotationFlag = false;
    this.enumFlag = false;

    this.className = null;
    this.superClass = null;

    this.methods = null;
}

jsjvm.clazz.Class.prototype.setRuntimeConstantPool = function(pool) {
    this.runtimeConstantPool = pool;
}

jsjvm.clazz.Class.prototype.getRuntimeConstantPool = function() {
    return this.runtimeConstantPool;
}

jsjvm.clazz.Class.prototype.setPublicFlag = function(publicFlag) {
    this.publicFlag = publicFlag;
}

jsjvm.clazz.Class.prototype.setFinalFlag = function(finalFlag) {
    this.finalFlag = finalFlag;
}

jsjvm.clazz.Class.prototype.setSuperFlag = function(superFlag) {
    this.superFlag = superFlag;
}

jsjvm.clazz.Class.prototype.setInterfaceFlag = function(interfaceFlag) {
    this.interfaceFlag = interfaceFlag;
}

jsjvm.clazz.Class.prototype.setAbstractFlag = function(abstractFlag) {
    this.abstractFlag = abstractFlag;
}

jsjvm.clazz.Class.prototype.setSyntheticFlag = function(syntheticFlag) {
    this.syntheticFlag = syntheticFlag;
}

jsjvm.clazz.Class.prototype.setAnnotationFlag = function(annotationFlag) {
    this.annotationFlag = annotationFlag;
}

jsjvm.clazz.Class.prototype.setEnumFlag = function(enumFlag) {
    this.enumFlag = enumFlag;
}
