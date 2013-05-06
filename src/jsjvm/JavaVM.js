/**
 * The constructor creates the Java VM and immediately begins with the
 * execution of the main method of the class given by the param "className".
 *
 * @param string className the name of the class containing the main method
 * @param FileList files the .class files needed for execution
 */
jsjvm.JavaVM = function(className, files) {
    this.mainClassName = className;
    this.pc = null;
    this.stack = new Array();
    this.heap = null;
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
    this.javaVM.classLoader = new jsjvm.ClassLoader(this.classFiles);
    this.javaVM.start();
}

jsjvm.JavaVM.prototype.start = function() {
    var mainClass = this.classLoader.loadClass(this.mainClassName);
}
