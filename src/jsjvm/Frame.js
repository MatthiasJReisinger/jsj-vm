jsjvm.Frame = function(methodInfo) {
    this.pc = 0;
    this.localVariables = new Array(methodInfo.getNumberOfLocalVariables());
    this.operandStack = new Array(methodInfo.getMaxStackSize());
}
