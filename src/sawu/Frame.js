/**
 * This class represents a frame on the stack of the virtual machine. It
 * provides access of the program counter (PC register) used to execute
 * the bytecode of the method, which is represented by this frame. It also
 * provides access to the local variables, the operand stack, the executed
 * method, the containing class and its runtime constant pool.
 *
 * @param sawu.MethodInfo method the method, which is represented by this
 * frame
 * @param sawu.clazz.Class clazz the class which provides the method
 */
sawu.Frame = function(method, clazz) {
    this.pc = 0;
    this.localVariables = new Array(method.getNumberOfLocalVariables());
    this.operandStack = new Array();
    this.method = method;
    this.clazz = clazz;
}

sawu.Frame.prototype.getPc = function() {
    return this.pc;
}

sawu.Frame.prototype.incrementPc = function() {
    this.pc++;
}

sawu.Frame.prototype.increasePc = function(val) {
    this.pc += val;
}

sawu.Frame.prototype.getLocalVariables = function() {
    return this.localVariables;
}

sawu.Frame.prototype.getOperandStack = function() {
    return this.operandStack;
}

sawu.Frame.prototype.getMethod = function() {
    return this.method;
}

sawu.Frame.prototype.getClazz = function() {
    return this.clazz;
}

sawu.Frame.prototype.getConstantPool = function() {
    return this.clazz.getConstantPool();
}
