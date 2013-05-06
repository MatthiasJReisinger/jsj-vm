jsjvm.Frame = function(methodInfo) {
    this.localVariables = new Array(methodInfo.getNumberOfLocalVariables());
    this.operandStack = new Array(methodInfo.getMaxStackSize());
}
