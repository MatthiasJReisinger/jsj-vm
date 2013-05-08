/**
 * The constructor creates the Java VM and immediately begins with the
 * execution of the main method of the class given by the param "className".
 *
 * @param string className the name of the class containing the main method
 * @param FileList files the .class files needed for execution
 * @param outputElement the html element that is used to print the output
 * of the java vm
 */
jsjvm.JavaVM = function(className, files, outputElement) {
    this.mainClassName = className;
    this.stack = new Array();
    this.classLoader = null;
    this.outputElement = outputElement;

    this.loadFiles(files);
}

/*****************************************************************************
 * Startup methods
 *****************************************************************************/

jsjvm.JavaVM.prototype.loadFiles = function(files) {
    var reader = new FileReader();
    reader.javaVM = this;
    reader.classFiles = new Array();
    var classFile = new jsjvm.File(files[0].name);
    reader.classFiles.push(classFile);
    reader.onload = jsjvm.finishedReading;
    reader.readAsArrayBuffer(files[0]);
}

jsjvm.finishedReading = function(evt) {
    var bytes = new Uint8Array(evt.target.result);
    this.classFiles[0].setBytes(bytes);
    this.javaVM.classLoader = new jsjvm.classloader.ClassLoader(this.classFiles);
    this.javaVM.start();
}

jsjvm.JavaVM.prototype.start = function() {
    var mainClass = this.classLoader.loadClass(this.mainClassName);
    var mainMethod = mainClass.getMethod("main");
    var frame = new jsjvm.Frame(mainMethod);
    this.stack.push(frame);

    console.log(frame.getMethod().getCode());

    /* start interpreter */
    this.execute();

    /* shutdown */
    this.log("shutdown");
}

/*****************************************************************************
 * Interpreter methods
 *****************************************************************************/

jsjvm.JavaVM.prototype.execute = function() {
    while (!this.isStackEmpty()) {
        var opCode = this.readNextOpCode();

        this.log("parsed op code: " + opCode);

        var instruction = this["op" + opCode];
        if (instruction != null) {
            instruction.call(this);
        } else {
            this.abort("unknown opcode: " + opCode);
        }

        this.logCurrentFrame();
    }
    this.log("finished execution");
}

jsjvm.JavaVM.prototype.isStackEmpty = function() {
    return this.stack.length == 0;
}

jsjvm.JavaVM.prototype.getCurrentFrame = function() {
    var stackSize = this.stack.length;
    return this.stack[stackSize - 1];
}

jsjvm.JavaVM.prototype.readNextOpCode = function() {
    var frame = this.getCurrentFrame();
    var method = frame.getMethod();
    var code = method.getCode();
    var opCode = code[frame.getPc()];
    frame.incrementPc();
    return opCode;
}

jsjvm.JavaVM.prototype.readNextInt = function() {
    return this.readNextIntegral(4);
}

jsjvm.JavaVM.prototype.readNextByte = function() {
    return this.readNextIntegral(1);
}

jsjvm.JavaVM.prototype.readNextIntegral = function(numberOfBytes) {
    var frame = this.getCurrentFrame();
    var bytes = frame.getMethod().getCode();
    var value = jsjvm.getIntFromBytes(bytes, frame.getPc(), numberOfBytes);
    this.getCurrentFrame().increasePc(numberOfBytes);
    return value;
}

/*****************************************************************************
 * Logging
 *****************************************************************************/

jsjvm.JavaVM.prototype.abort = function(message) {
    this.log("[ERROR] " + message);
    throw "JavaVM Error";
}

jsjvm.JavaVM.prototype.log = function(message) {
    this.outputElement.innerHTML += "> " + message + "</br>";
}

jsjvm.JavaVM.prototype.logCurrentFrame = function() {
    
}

/*****************************************************************************
 * Java Virtual Machine Instructions
 *****************************************************************************/

/**
 * bipush
 */
jsjvm.JavaVM.prototype.op16 = function() {
    var byteVal = this.readNextIntegral(1);
    this.getCurrentFrame().getOperandStack().push(byteVal);
}

/**
 * istore
 */
jsjvm.JavaVM.prototype.op54 = function() {
    var intValue = this.readNextInt();
}

/**
 * istore_0
 */
jsjvm.JavaVM.prototype.op59 = function() {

}

/**
 * istore_1
 */
jsjvm.JavaVM.prototype.op60 = function() {
    this.istore(1);
}

/**
 * istore_2
 */
jsjvm.JavaVM.prototype.op61 = function() {
    this.istore(2);
}

/**
 * istore_3
 */
jsjvm.JavaVM.prototype.op62 = function() {
    this.istore(3);
}

/**
 * helper function for the "istore" operations
 */
jsjvm.JavaVM.prototype.istore = function(index) {
    var frame = this.getCurrentFrame();
    var value = frame.getOperandStack().pop();
    frame.getLocalVariables()[index] = value;
}

/**
 * return
 */
jsjvm.JavaVM.prototype.op177 = function() {
    this.stack.pop();
}


