/**
 * @param string className the name of the class containing the main method
 * @param array files the .class files needed for execution
 */
function JavaVM(className, files) {
    this.pc = null;
    this.stack = new Array();
    this.heap = null;

    
}
