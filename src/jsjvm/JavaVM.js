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

    console.log(mainClass);

    /* prepare execution of the main method */
    var mainMethod = mainClass.getMethod("main");
    var frame = new jsjvm.Frame(mainMethod, mainClass);
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
        var instruction = this["op" + opCode];
        if (instruction != null) {
            this.log("Execute instruction: " + opCode);
            instruction.call(this);
            this.logCurrentFrame();
            this.log("");
        } else {
            this.abort("unknown opcode: " + opCode);
        }
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

jsjvm.JavaVM.prototype.readUnsignedByte = function() {
    return this.readUnsignedIntegral(1);
}

jsjvm.JavaVM.prototype.readSignedByte = function() {
    return this.readSignedIntegral(1);
}

jsjvm.JavaVM.prototype.readUnsignedShort = function() {
    return this.readUnsignedIntegral(2);
}

jsjvm.JavaVM.prototype.readSignedShort = function() {
    return this.readSignedIntegral(2);
}

jsjvm.JavaVM.prototype.readUnsignedInt = function() {
    return this.readUnsignedIntegral(4);
}

jsjvm.JavaVM.prototype.readUnsignedIntegral = function(numberOfBytes) {
    var frame = this.getCurrentFrame();
    var bytes = frame.getMethod().getCode();
    var value = jsjvm.getIntFromBytes(bytes, frame.getPc(), numberOfBytes);
    this.getCurrentFrame().increasePc(numberOfBytes);
    return value;
}

/**
 * Reads the next numberOfBytes bytes. It sign extends the parsed value
 * using two's complement.
 */
jsjvm.JavaVM.prototype.readSignedIntegral = function(numberOfBytes) {
    var uIntegral = this.readUnsignedIntegral(numberOfBytes);
    return uIntegral - 2 * ((1<<(numberOfBytes * 8) - 1) & uIntegral);
}

jsjvm.JavaVM.prototype.getCurrentClass = function() {
    
}

/*****************************************************************************
 * Logging
 *****************************************************************************/

jsjvm.JavaVM.prototype.abort = function(message) {
    this.log("[ERROR] " + message);
    throw "JavaVM Error";
}

jsjvm.JavaVM.prototype.log = function(message) {
    this.print("> " + message);
    this.print("</br>");
}

jsjvm.JavaVM.prototype.print = function(message) {
    this.outputElement.innerHTML += message;
}

jsjvm.JavaVM.prototype.logCurrentFrame = function() {
    var frame = this.getCurrentFrame();
    if (frame) {
        var operandStack = frame.getOperandStack();
        this.print("> operand stack: ");
        this.printArray(operandStack);

        var localVariables = frame.getLocalVariables();
        this.print("> local variables: ");
        this.printArray(localVariables);
    }
}

jsjvm.JavaVM.prototype.printArray = function(arrayToPrint) {
    for (var i = 0; i < arrayToPrint.length; i++) {
        this.print(i + ": ");
        if (arrayToPrint[i] != undefined) {
            this.print(arrayToPrint[i]);
        } else if (arrayToPrint[i] === null) {
            this.print("null");
        } else {
            this.print("-");
        }
        this.print("; ");
    }
    this.print("</br>");
}

/*****************************************************************************
 * Java Virtual Machine Instructions
 *****************************************************************************/

/**
 * aconst_null
 */
jsjvm.JavaVM.prototype.op1 = function() {
    this.getCurrentFrame().getOperandStack().push(null);
}

/**
 * iconst_m1
 */
jsjvm.JavaVM.prototype.op2 = function() {
    this.getCurrentFrame().getOperandStack().push(-1);
}

/**
 * iconst_0
 */
jsjvm.JavaVM.prototype.op3 = function() {
    this.getCurrentFrame().getOperandStack().push(0);
}

/**
 * iconst_1
 */
jsjvm.JavaVM.prototype.op4 = function() {
    this.getCurrentFrame().getOperandStack().push(1);
}

/**
 * iconst_2
 */
jsjvm.JavaVM.prototype.op5 = function() {
    this.getCurrentFrame().getOperandStack().push(2);
}

/**
 * iconst_3
 */
jsjvm.JavaVM.prototype.op6 = function() {
    this.getCurrentFrame().getOperandStack().push(3);
}

/**
 * iconst_4
 */
jsjvm.JavaVM.prototype.op7 = function() {
    this.getCurrentFrame().getOperandStack().push(4);
}

/**
 * iconst_5
 */
jsjvm.JavaVM.prototype.op8 = function() {
    this.getCurrentFrame().getOperandStack().push(5);
}

/**
 * bipush
 */
jsjvm.JavaVM.prototype.op16 = function() {
    var byteVal = this.readSignedByte();
    this.getCurrentFrame().getOperandStack().push(byteVal);
}

/**
 * sipush
 */
jsjvm.JavaVM.prototype.op17 = function() {
    var shortVal = this.readSignedShort();
    this.getCurrentFrame().getOperandStack().push(shortVal);
}

/**
 * iload
 */
jsjvm.JavaVM.prototype.op21 = function() {
    var index = this.readUnsignedByte();
    this.iload(index);
}

/**
 * iload_0
 */
jsjvm.JavaVM.prototype.op26 = function() {
    this.iload(0);
}

/**
 * iload_1
 */
jsjvm.JavaVM.prototype.op27 = function() {
    this.iload(1);
}
/**
 * iload_2
 */
jsjvm.JavaVM.prototype.op28 = function() {
    this.iload(2);
}

/**
 * iload_3
 */
jsjvm.JavaVM.prototype.op29 = function() {
    this.iload(3);
}

/**
 * helper function for the "iload" operations
 */
jsjvm.JavaVM.prototype.iload = function(index) {
    var localVariables = this.getCurrentFrame().getLocalVariables()
    var value = localVariables[index];
    this.getCurrentFrame().getOperandStack().push(value);
}

/**
 * istore
 */
jsjvm.JavaVM.prototype.op54 = function() {
    var index = this.readUnsignedByte();
    this.istore(index);
}

/**
 * istore_0
 */
jsjvm.JavaVM.prototype.op59 = function() {
    this.istore(0);
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
 * iadd
 */
jsjvm.JavaVM.prototype.op96 = function() {
    var operandStack = this.getCurrentFrame().getOperandStack();
    var value2 = operandStack.pop();
    var value1 = operandStack.pop();
    var sum = value1 + value2;
    operandStack.push(sum);
}

/**
 * isub
 */
jsjvm.JavaVM.prototype.op100 = function() {
    var operandStack = this.getCurrentFrame().getOperandStack();
    var value2 = operandStack.pop();
    var value1 = operandStack.pop();
    var dif = value1 - value2;
    operandStack.push(dif);
}

/**
 * imul
 */
jsjvm.JavaVM.prototype.op104 = function() {
    var operandStack = this.getCurrentFrame().getOperandStack();
    var value2 = operandStack.pop();
    var value1 = operandStack.pop();
    var mul = value1 * value2;
    operandStack.push(mul);
}

/**
 * idiv
 */
jsjvm.JavaVM.prototype.op108 = function() {
    var operandStack = this.getCurrentFrame().getOperandStack();
    var value2 = operandStack.pop();
    var value1 = operandStack.pop();
    var div = value1 / value2;
    operandStack.push(div);
}

/**
 * ishl
 */
jsjvm.JavaVM.prototype.op120 = function() {
    var operandStack = this.getCurrentFrame().getOperandStack();
    var value2 = operandStack.pop();
    var value1 = operandStack.pop();
    var result = value1 << value2;
    operandStack.push(result);
}

/**
 * ishr
 */
jsjvm.JavaVM.prototype.op122 = function() {
    var operandStack = this.getCurrentFrame().getOperandStack();
    var value2 = operandStack.pop();
    var value1 = operandStack.pop();
    var result = value1 >> value2;
    operandStack.push(result);
}

/**
 * iand
 */
jsjvm.JavaVM.prototype.op126 = function() {
    var operandStack = this.getCurrentFrame().getOperandStack();
    var value2 = operandStack.pop();
    var value1 = operandStack.pop();
    var result = value1 & value2;
    operandStack.push(result);
}

/**
 * iinc
 */
jsjvm.JavaVM.prototype.op132 = function() {
    var index = this.readUnsignedByte();
    var constant = this.readSignedByte();
    this.getCurrentFrame().getLocalVariables()[index] += constant;
}

/**
 * if_icmpeq
 */
jsjvm.JavaVM.prototype.op159 = function() {
    this.if_cmp(function(value1, value2) {
        return value1 == value2;
    });
}

/**
 * if_icmpne
 */
jsjvm.JavaVM.prototype.op160 = function() {
    this.if_cmp(function(value1, value2) {
        return value1 != value2;
    });
}

/**
 * if_icmpge
 */
jsjvm.JavaVM.prototype.op162 = function() {
    this.if_cmp(function(value1, value2) {
        return value1 >= value2;
    });
}

/**
 * if_icmple
 */
jsjvm.JavaVM.prototype.op164 = function() {
    this.if_cmp(function(value1, value2) {
        return value1 <= value2;
    });
}

/**
 * helper for the ic_cmp* operations
 */
jsjvm.JavaVM.prototype.if_cmp = function(compareFunction) {
    var branchOffset = this.readUnsignedIntegral(2) - 3;
    var operandStack = this.getCurrentFrame().getOperandStack();
    var value2 = operandStack.pop();
    var value1 = operandStack.pop();
    if (compareFunction(value1, value2)) {
        this.getCurrentFrame().increasePc(branchOffset);
    }
}

/**
 * return
 */
jsjvm.JavaVM.prototype.op177 = function() {
    this.stack.pop();
}

/**
 * invokestatic
 */
jsjvm.JavaVM.prototype.op184 = function() {
    var constantPoolIndex = this.readUnsignedShort();
    var constantPool = this.getCurrentFrame().getConstantPool();
    var methodRef = constantPool.getEntry(constantPoolIndex);
    var nameAndTypeInfo = constantPool.getEntry(methodRef.name_and_type_index);
    var methodName = constantPool.getString(nameAndTypeInfo.name_index);
    var method = this.getCurrentFrame().getClazz().getMethod(methodName);
    console.log(method);
    var frame = new jsjvm.Frame(method, this.getCurrentFrame().getClazz());
    this.stack.push(frame);
   
}
