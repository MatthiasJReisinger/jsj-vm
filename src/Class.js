/**
 * Represents a java class
 */
function Class() {
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

Class.prototype.setRuntimeConstantPool = function(pool) {
    this.runtimeConstantPool = pool;
}

Class.prototype.getRuntimeConstantPool = function() {
    return this.runtimeConstantPool;
}

Class.prototype.setPublicFlag = function(publicFlag) {
    this.publicFlag = publicFlag;
}

Class.prototype.setFinalFlag = function(finalFlag) {
    this.finalFlag = finalFlag;
}

Class.prototype.setSuperFlag = function(superFlag) {
    this.superFlag = superFlag;
}

Class.prototype.setInterfaceFlag = function(interfaceFlag) {
    this.interfaceFlag = interfaceFlag;
}

Class.prototype.setAbstractFlag = function(abstractFlag) {
    this.abstractFlag = abstractFlag;
}

Class.prototype.setSyntheticFlag = function(syntheticFlag) {
    this.syntheticFlag = syntheticFlag;
}

Class.prototype.setAnnotationFlag = function(annotationFlag) {
    this.annotationFlag = annotationFlag;
}

Class.prototype.setEnumFlag = function(enumFlag) {
    this.enumFlag = enumFlag;
}
