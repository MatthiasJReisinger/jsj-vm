/**
 * Represents a java class
 */
jsjvm.Class = function() {
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
}

jsjvm.Class.prototype.setRuntimeConstantPool = function(pool) {
    this.runtimeConstantPool = pool;
}

jsjvm.Class.prototype.getRuntimeConstantPool = function() {
    return this.runtimeConstantPool;
}

jsjvm.Class.prototype.setPublicFlag = function(publicFlag) {
    this.publicFlag = publicFlag;
}

jsjvm.Class.prototype.setFinalFlag = function(finalFlag) {
    this.finalFlag = finalFlag;
}

jsjvm.Class.prototype.setSuperFlag = function(superFlag) {
    this.superFlag = superFlag;
}

jsjvm.Class.prototype.setInterfaceFlag = function(interfaceFlag) {
    this.interfaceFlag = interfaceFlag;
}

jsjvm.Class.prototype.setAbstractFlag = function(abstractFlag) {
    this.abstractFlag = abstractFlag;
}

jsjvm.Class.prototype.setSyntheticFlag = function(syntheticFlag) {
    this.syntheticFlag = syntheticFlag;
}

jsjvm.Class.prototype.setAnnotationFlag = function(annotationFlag) {
    this.annotationFlag = annotationFlag;
}

jsjvm.Class.prototype.setEnumFlag = function(enumFlag) {
    this.enumFlag = enumFlag;
}
