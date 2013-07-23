/**
 * This is the class loader of the Java VM.
 *
 * @param Array classFiles the class files to be used when loading
 * a class
 */
jsjvm.classloader.ClassLoader = function(classFiles) {
    this.classFiles = classFiles;
}

/**
 * @param String className the name of the class to be loaded
 */
jsjvm.classloader.ClassLoader.prototype.loadClass = function(className) {
    var classFile = this.getClassFile(className);
    var parser = new jsjvm.classloader.Parser(classFile);
    var parsedClass = parser.parse();
    return parsedClass;
}

/**
 * @param String className
 */
jsjvm.classloader.ClassLoader.prototype.getClassFile = function(className) {
    var fileName = className + ".class";
    for (var i = 0; i < this.classFiles.length; i++) {
        var classFile = this.classFiles[i];
        if (classFile.getFileName() == fileName) {
            return classFile;
        }
    }
    throw "ClassNotFoundException";
}

