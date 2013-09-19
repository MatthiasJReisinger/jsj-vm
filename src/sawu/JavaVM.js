/**
 * The constructor creates the Java VM and immediately begins with the
 * execution of the main method of the class given by the param "className".
 *
 * @param String className the name of the class containing the main method
 * @param FileList files the .class files needed for execution
 * @param Object outputElement the html element that is used to print the output
 * of the java vm
 * @param boolean debug defines, if the Java VM should be started with debug
 * mode turned on or off
 */
sawu.JavaVM = function(className, files, outputElement, debug) {
    this.mainClassName = className;
    this.stack = new Array();
    this.classLoader = null;
    this.outputElement = outputElement;
    this.debug = debug;

    this.loadFiles(files);
}

////////////////////////////////////////////////////////////////////////////////
// Startup methods
////////////////////////////////////////////////////////////////////////////////

sawu.JavaVM.prototype.loadFiles = function(files) {
    var reader = new FileReader();
    reader.javaVM = this;
    reader.classFiles = new Array();
    var classFile = new sawu.File(files[0].name);
    reader.classFiles.push(classFile);
    reader.onload = sawu.finishedReading;
    reader.readAsArrayBuffer(files[0]);
}

sawu.finishedReading = function(evt) {
    var bytes = new Uint8Array(evt.target.result);
    this.classFiles[0].setBytes(bytes);
    this.javaVM.classLoader = new sawu.classloader.ClassLoader(this.classFiles);
    this.javaVM.start();
}

sawu.JavaVM.prototype.start = function() {
    /* for performance measuring */
    var startTime = new Date();

    /* prepare execution of the main method */
    var mainClass = this.classLoader.loadClass(this.mainClassName);
    var mainMethod = mainClass.getMethod("main");
    var frame = new sawu.Frame(mainMethod, mainClass);
    this.stack.push(frame);

    console.log(frame.getMethod().getCode());

    /* start interpreter */
    this.execute();

    /* statistical output */
    var endTime = new Date();
    var executionTime = (endTime.getTime() - startTime.getTime()) / 1000;
    this.println("total execution time: " + executionTime + " seconds");
}

////////////////////////////////////////////////////////////////////////////////
// Interpreter methods
////////////////////////////////////////////////////////////////////////////////

sawu.JavaVM.prototype.execute = function() {
    while (this.stack.length > 0) {
        var opCode = this.readNextOpCode();
        var instruction = this["op" + opCode];
        if (instruction != null) {
            instruction.call(this);
            this.log("");
            this.log("Executed instruction: " + opCode);
            this.logCurrentFrame();
            this.log("");
        } else {
            this.abort("unknown opcode: " + opCode);
        }
    }
    this.println("finished execution");
}

sawu.JavaVM.prototype.getCurrentFrame = function() {
    var stackSize = this.stack.length;
    return this.stack[stackSize - 1];
}

sawu.JavaVM.prototype.readNextOpCode = function() {
    var frame = this.getCurrentFrame();
    var method = frame.getMethod();
    var code = method.getCode();
    var opCode = code[frame.getPc()];
    frame.incrementPc();
    return opCode;
}

sawu.JavaVM.prototype.readUnsignedByte = function() {
    return this.readUnsignedIntegral(1);
}

sawu.JavaVM.prototype.readSignedByte = function() {
    return this.readSignedIntegral(1);
}

sawu.JavaVM.prototype.readUnsignedShort = function() {
    return this.readUnsignedIntegral(2);
}

sawu.JavaVM.prototype.readSignedShort = function() {
    return this.readSignedIntegral(2);
}

sawu.JavaVM.prototype.readUnsignedInt = function() {
    return this.readUnsignedIntegral(4);
}

sawu.JavaVM.prototype.readUnsignedIntegral = function(numberOfBytes) {
    var frame = this.getCurrentFrame();
    var bytes = frame.getMethod().getCode();
    var value = sawu.getIntFromBytes(bytes, frame.getPc(), numberOfBytes);
    this.getCurrentFrame().increasePc(numberOfBytes);
    return value;
}

/**
 * Reads the next numberOfBytes bytes. It sign extends the parsed value
 * using two's complement.
 */
sawu.JavaVM.prototype.readSignedIntegral = function(numberOfBytes) {
    var uIntegral = this.readUnsignedIntegral(numberOfBytes);
    return uIntegral - 2 * ((1<<(numberOfBytes * 8) - 1) & uIntegral);
}

////////////////////////////////////////////////////////////////////////////////
// Logging
////////////////////////////////////////////////////////////////////////////////

sawu.JavaVM.prototype.abort = function(message) {
    this.println("[ERROR] " + message);
    throw "JavaVM Error";
}

sawu.JavaVM.prototype.log = function(message) {
    if (this.debug) {
        this.println(message);
    }
}

sawu.JavaVM.prototype.println = function(message) {
    var line = document.createElement("div");
    line.innerHTML = "> " + message;
    this.outputElement.appendChild(line);
}

sawu.JavaVM.prototype.print = function(message) {
    this.outputElement.innerHTML += message;
}

sawu.JavaVM.prototype.logCurrentFrame = function() {
    if (this.debug) {
        var frame = this.getCurrentFrame();
        if (frame) {
            var operandStack = frame.getOperandStack();
            var operandStackString = this.arrayToString(operandStack);
            this.println("operand stack: " + operandStackString);
    
            var localVariables = frame.getLocalVariables();
            var localVarString = this.arrayToString(localVariables);
            this.println("local variables: " + localVarString);
        }
    }
}

sawu.JavaVM.prototype.arrayToString = function(arrayToPrint) {
    var arrayString = "";
    for (var i = 0; i < arrayToPrint.length; i++) {
        arrayString += i + ": ";
        if (arrayToPrint[i] != undefined) {
            arrayString += "" + arrayToPrint[i];
        } else if (arrayToPrint[i] === null) {
            arrayString += "null";
        } else {
            arrayString += "-";
        }
        arrayString += "; ";
    }
    return arrayString;
}

////////////////////////////////////////////////////////////////////////////////
// Java Virtual Machine Instructions
////////////////////////////////////////////////////////////////////////////////

/**
 * aconst_null
 */
sawu.JavaVM.prototype.op1 = function() {
    this.getCurrentFrame().getOperandStack().push(null);
}

/**
 * iconst_m1
 */
sawu.JavaVM.prototype.op2 = function() {
    this.getCurrentFrame().getOperandStack().push(-1);
}

/**
 * iconst_0
 */
sawu.JavaVM.prototype.op3 = function() {
    this.getCurrentFrame().getOperandStack().push(0);
}

/**
 * iconst_1
 */
sawu.JavaVM.prototype.op4 = function() {
    this.getCurrentFrame().getOperandStack().push(1);
}

/**
 * iconst_2
 */
sawu.JavaVM.prototype.op5 = function() {
    this.getCurrentFrame().getOperandStack().push(2);
}

/**
 * iconst_3
 */
sawu.JavaVM.prototype.op6 = function() {
    this.getCurrentFrame().getOperandStack().push(3);
}

/**
 * iconst_4
 */
sawu.JavaVM.prototype.op7 = function() {
    this.getCurrentFrame().getOperandStack().push(4);
}

/**
 * iconst_5
 */
sawu.JavaVM.prototype.op8 = function() {
    this.getCurrentFrame().getOperandStack().push(5);
}

/**
 * bipush
 */
sawu.JavaVM.prototype.op16 = function() {
    var byteVal = this.readSignedByte();
    this.getCurrentFrame().getOperandStack().push(byteVal);
}

/**
 * sipush
 */
sawu.JavaVM.prototype.op17 = function() {
    var shortVal = this.readSignedShort();
    this.getCurrentFrame().getOperandStack().push(shortVal);
}

/**
 * iload
 */
sawu.JavaVM.prototype.op21 = function() {
    var index = this.readUnsignedByte();
    this.iload(index);
}

/**
 * iload_0
 */
sawu.JavaVM.prototype.op26 = function() {
    this.iload(0);
}

/**
 * iload_1
 */
sawu.JavaVM.prototype.op27 = function() {
    this.iload(1);
}

/**
 * iload_2
 */
sawu.JavaVM.prototype.op28 = function() {
    this.iload(2);
}

/**
 * iload_3
 */
sawu.JavaVM.prototype.op29 = function() {
    this.iload(3);
}

/**
 * helper function for the "iload" operations
 */
sawu.JavaVM.prototype.iload = function(index) {
    var localVariables = this.getCurrentFrame().getLocalVariables()
    var value = localVariables[index];
    this.getCurrentFrame().getOperandStack().push(value);
}

/**
 * istore
 */
sawu.JavaVM.prototype.op54 = function() {
    var index = this.readUnsignedByte();
    this.istore(index);
}

/**
 * istore_0
 */
sawu.JavaVM.prototype.op59 = function() {
    this.istore(0);
}

/**
 * istore_1
 */
sawu.JavaVM.prototype.op60 = function() {
    this.istore(1);
}

/**
 * istore_2
 */
sawu.JavaVM.prototype.op61 = function() {
    this.istore(2);
}

/**
 * istore_3
 */
sawu.JavaVM.prototype.op62 = function() {
    this.istore(3);
}

/**
 * helper function for the "istore" operations
 */
sawu.JavaVM.prototype.istore = function(index) {
    var frame = this.getCurrentFrame();
    var value = frame.getOperandStack().pop();
    frame.getLocalVariables()[index] = value;
}

/**
 * iadd
 */
sawu.JavaVM.prototype.op96 = function() {
    var operandStack = this.getCurrentFrame().getOperandStack();
    var value2 = operandStack.pop();
    var value1 = operandStack.pop();
    var sum = value1 + value2;
    operandStack.push(sum);
}

/**
 * isub
 */
sawu.JavaVM.prototype.op100 = function() {
    var operandStack = this.getCurrentFrame().getOperandStack();
    var value2 = operandStack.pop();
    var value1 = operandStack.pop();
    var dif = value1 - value2;
    operandStack.push(dif);
}

/**
 * imul
 */
sawu.JavaVM.prototype.op104 = function() {
    var operandStack = this.getCurrentFrame().getOperandStack();
    var value2 = operandStack.pop();
    var value1 = operandStack.pop();
    var mul = value1 * value2;
    operandStack.push(mul);
}

/**
 * idiv
 */
sawu.JavaVM.prototype.op108 = function() {
    var operandStack = this.getCurrentFrame().getOperandStack();
    var value2 = operandStack.pop();
    var value1 = operandStack.pop();
    var div = value1 / value2;
    operandStack.push(div);
}

/**
 * ishl
 */
sawu.JavaVM.prototype.op120 = function() {
    var operandStack = this.getCurrentFrame().getOperandStack();
    var value2 = operandStack.pop();
    var value1 = operandStack.pop();
    var result = value1 << value2;
    operandStack.push(result);
}

/**
 * ishr
 */
sawu.JavaVM.prototype.op122 = function() {
    var operandStack = this.getCurrentFrame().getOperandStack();
    var value2 = operandStack.pop();
    var value1 = operandStack.pop();
    var result = value1 >> value2;
    operandStack.push(result);
}

/**
 * iand
 */
sawu.JavaVM.prototype.op126 = function() {
    var operandStack = this.getCurrentFrame().getOperandStack();
    var value2 = operandStack.pop();
    var value1 = operandStack.pop();
    var result = value1 & value2;
    operandStack.push(result);
}

/**
 * iinc
 */
sawu.JavaVM.prototype.op132 = function() {
    var index = this.readUnsignedByte();
    var constant = this.readSignedByte();
    this.getCurrentFrame().getLocalVariables()[index] += constant;
}

/**
 * ifge
 */
sawu.JavaVM.prototype.op156 = function() {
    var branchOffset = this.readBranchOffset();
    var value = this.getCurrentFrame().getOperandStack().pop();
    if (value >= 0) {
        this.getCurrentFrame().increasePc(branchOffset);
    }
}

/**
 * if_icmpeq
 */
sawu.JavaVM.prototype.op159 = function() {
    this.if_cmp(function(value1, value2) {
        return value1 == value2;
    });
}

/**
 * if_icmpne
 */
sawu.JavaVM.prototype.op160 = function() {
    this.if_cmp(function(value1, value2) {
        return value1 != value2;
    });
}

/**
 * if_icmpge
 */
sawu.JavaVM.prototype.op162 = function() {
    this.if_cmp(function(value1, value2) {
        return value1 >= value2;
    });
}

/**
 * if_icmple
 */
sawu.JavaVM.prototype.op164 = function() {
    this.if_cmp(function(value1, value2) {
        return value1 <= value2;
    });
}

/**
 * helper for the if_icmp* operations
 */
sawu.JavaVM.prototype.if_cmp = function(compareFunction) {
    var branchOffset = this.readBranchOffset();
    var operandStack = this.getCurrentFrame().getOperandStack();
    var value2 = operandStack.pop();
    var value1 = operandStack.pop();
    if (compareFunction(value1, value2)) {
        this.getCurrentFrame().increasePc(branchOffset);
    }
}

/**
 * goto
 */
sawu.JavaVM.prototype.op167 = function() {
    var branchOffset = this.readBranchOffset();
    this.getCurrentFrame().increasePc(branchOffset);
}

/**
 * helper function for the control transfer instructions
 */
sawu.JavaVM.prototype.readBranchOffset = function() {
    return this.readSignedIntegral(2) - 3;
}

/**
 * ireturn
 */
sawu.JavaVM.prototype.op172 = function() {
    var returnValue = this.getCurrentFrame().getOperandStack().pop();
    this.stack.pop();
    this.getCurrentFrame().getOperandStack().push(returnValue);
}

/**
 * return
 */
sawu.JavaVM.prototype.op177 = function() {
    this.stack.pop();
}

/**
 * getstatic
 */
sawu.JavaVM.prototype.op178 = function() {
    /* Skip the following two bytes. */
    this.getCurrentFrame().increasePc(2);

    /* Do nothing. This method is only needed to support
       then System.out.println() method. */
}

/**
 * invokevirtual
 */
sawu.JavaVM.prototype.op182 = function() {
    /* Skip the following two bytes. */
    this.getCurrentFrame().increasePc(2);
    this.println("System.out.println(): " + this.getCurrentFrame().getOperandStack().pop());
}

/**
 * invokestatic
 */
sawu.JavaVM.prototype.op184 = function() {
    var constantPoolIndex = this.readUnsignedShort();
    var constantPool = this.getCurrentFrame().getConstantPool();
    
    var methodRef = constantPool.getEntry(constantPoolIndex);
    var nameAndTypeInfo = constantPool.getEntry(methodRef.name_and_type_index);

    /* get the method to invoke */
    var methodName = constantPool.getString(nameAndTypeInfo.name_index);
    var method = this.getCurrentFrame().getClazz().getMethod(methodName);

    /* the new frame that will be pushed onto the stack */
    var frame = new sawu.Frame(method, this.getCurrentFrame().getClazz());

    /* get the number of arguments for the method to invoke */
    var operandStack = this.getCurrentFrame().getOperandStack();
    var descriptor = constantPool.getString(nameAndTypeInfo.descriptor_index);
    var argsCount = 0;
    for (var i = 1; descriptor.charAt(i) != ")"; i++) {
        var currentChar = descriptor.charAt(i);
        switch (currentChar) {
            case "I":
                argsCount++;
                break;
            default:
                this.abort("unknown type: " + currentChar);
                break;
        }
    }

    /* read the arguments from the operand stack */
    for (var i = argsCount - 1; i >= 0; i--) {
        var local = operandStack.pop();
        frame.getLocalVariables()[i] = local;
    }

    /* now the frame for the method to invoke is ready to be pushed
       onto the stack */
    this.stack.push(frame);
}
