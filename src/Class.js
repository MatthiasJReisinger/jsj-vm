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

/**
 * 
 */
Class.prototype.setRuntimeConstantPool = function(constantPool) {
    this.runtimeConstantPool = constantPool;
}

/**
 * @return the runtime constant pool of the class
 */
Class.prototype.getRuntimeConstantPool = function() {
    return this.runtimeConstantPool;
}