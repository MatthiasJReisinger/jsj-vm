jsjvm.Frame = function(methodInfo, constantPool) {
    this.pc = 0;
    this.localVariables = new Array(methodInfo.getNumberOfLocalVariables());
    this.operandStack = new Array();
    this.method = methodInfo;
    this.constantPool = constantPool;
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
