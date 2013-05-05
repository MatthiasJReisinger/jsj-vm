/**
 * Represents a java class
 */
jsjVM.Class = function() {
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

jsjVM.Class.prototype.setRuntimeConstantPool = function(pool) {
    this.runtimeConstantPool = pool;
}

jsjVM.Class.prototype.getRuntimeConstantPool = function() {
    return this.runtimeConstantPool;
}

jsjVM.Class.prototype.setPublicFlag = function(publicFlag) {
    this.publicFlag = publicFlag;
}

jsjVM.Class.prototype.setFinalFlag = function(finalFlag) {
    this.finalFlag = finalFlag;
}

jsjVM.Class.prototype.setSuperFlag = function(superFlag) {
    this.superFlag = superFlag;
}

jsjVM.Class.prototype.setInterfaceFlag = function(interfaceFlag) {
    this.interfaceFlag = interfaceFlag;
}

jsjVM.Class.prototype.setAbstractFlag = function(abstractFlag) {
    this.abstractFlag = abstractFlag;
}

jsjVM.Class.prototype.setSyntheticFlag = function(syntheticFlag) {
    this.syntheticFlag = syntheticFlag;
}

jsjVM.Class.prototype.setAnnotationFlag = function(annotationFlag) {
    this.annotationFlag = annotationFlag;
}

jsjVM.Class.prototype.setEnumFlag = function(enumFlag) {
    this.enumFlag = enumFlag;
}
