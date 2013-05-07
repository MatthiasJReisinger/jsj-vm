jsjvm.Frame = function(methodInfo) {
    this.pc = 0;
    this.localVariables = new Array(methodInfo.getNumberOfLocalVariables());
    this.operandStack = new Array();
    //this.operandStack = new Array(methodInfo.getMaxStackSize());
    this.method = methodInfo;
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
