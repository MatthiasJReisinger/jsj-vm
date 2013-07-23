/**
 * This class represents a frame on the stack of the virtual machine. It
 * provides access of the program counter (PC register) used to execute
 * the bytecode of the method, which is represented by this frame. It also
 * provides access to the local variables, the operand stack, the executed
 * method, the containing class and its runtime constant pool.
 *
 * @param jsjvm.MethodInfo method the method, which is represented by this
 * frame
 * @param jsjvm.clazz.Class clazz the class which provides the method
 */
jsjvm.Frame = function(method, clazz) {
    this.pc = 0;
    this.localVariables = new Array(method.getNumberOfLocalVariables());
    this.operandStack = new Array();
    this.method = method;
    this.clazz = clazz;
}

jsjvm.Frame.prototype.getPc = function() {
    return this.pc;
}

jsjvm.Frame.prototype.incrementPc = function() {
    this.pc++;
}

jsjvm.Frame.prototype.increasePc = function(val) {
    this.pc += val;
}

jsjvm.Frame.prototype.getLocalVariables = function() {
    return this.localVariables;
}

jsjvm.Frame.prototype.getOperandStack = function() {
    return this.operandStack;
}

jsjvm.Frame.prototype.getMethod = function() {
    return this.method;
}

jsjvm.Frame.prototype.getClazz = function() {
    return this.clazz;
}

jsjvm.Frame.prototype.getConstantPool = function() {
    return this.clazz.getConstantPool();
}
