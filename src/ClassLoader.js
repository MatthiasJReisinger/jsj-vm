/**
 * The bootstrap class loader of the JavaVM.
 *
 * @param Array classFiles the class files to be used when loading
 * a class
 */
function ClassLoader(classFiles) {
    this.classFiles = classFiles;
}

/**
 * @param className the name of the class to be loaded
 */
ClassLoader.prototype.loadClass = function(className) {
    var classFile = this.getClassFile(className);
    var loadedClass = new Class();
    console.log(classFile);
    console.log(classFile.getBytes()[0]);
    return loadedClass;
}

ClassLoader.prototype.getClassFile = function(className) {
    var fileName = className + ".class";
    for (var i = 0; i < this.classFiles.length; i++) {
        var classFile = this.classFiles[i];
        if (classFile.getFileName() == fileName) {
            return classFile;
        }
    }
    throw "ClassNotFoundException";
}
