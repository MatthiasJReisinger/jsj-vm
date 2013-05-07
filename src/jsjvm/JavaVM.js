/**
 * The constructor creates the Java VM and immediately begins with the
 * execution of the main method of the class given by the param "className".
 *
 * @param string className the name of the class containing the main method
 * @param FileList files the .class files needed for execution
 */
jsjvm.JavaVM = function(className, files) {
    this.mainClassName = className;
    this.stack = new Array();
    this.classLoader = null;

    this.loadFiles(files);
}

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
    var mainMethod = mainClass.getMethod("main");
    console.log(mainMethod);
    var frame = new jsjvm.Frame(mainMethod);
    this.stack.push(frame);

    /* start interpreter */
    this.execute();

    /* shutdown */
    console.log("shutdown");
}

jsjvm.JavaVM.prototype.getCurrentFrame = function() {
    var stackSize = this.stack.length;
    return this.stack[stackSize - 1];
}

jsjvm.JavaVM.prototype.execute = function() {
    while (!this.isStackEmpty()) {
        var frame = this.getCurrentFrame();
        var opCode = 177;


        return_from_current_method:
            this.stack.pop();
            continue;
        switch (opCode) {
            case (177): /* return */
                continue return_from_current_method;
            default:
                throw "UnknownOpCodeError";
                break;
        }

        this.stack.pop();
    }
}

jsjvm.JavaVM.prototype.isStackEmpty = function() {
    return this.stack.length == 0;
}
