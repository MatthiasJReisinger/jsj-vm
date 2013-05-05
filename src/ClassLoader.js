/**
 * The bootstrap class loader of the JavaVM.
 *
 * @param Array classFiles the class files to be used when loading
 * a class
 */
jsjvm.ClassLoader = function(classFiles) {
    this.classFiles = classFiles;
}

/**
 * @param className the name of the class to be loaded
 */
jsjvm.ClassLoader.prototype.loadClass = function(className) {
    var classFile = this.getClassFile(className);
    var parser = new jsjvm.classfile.Parser();
    var parsedClassFile = parser.parse(classFile);
    console.log(parsedClassFile);

    /*
    loadedClass.setPublicFlag((accessFlags & 0x0001) != 0);
    loadedClass.setFinalFlag((accessFlags & 0x0010) != 0);
    loadedClass.setSuperFlag((accessFlags & 0x0020) != 0);
    loadedClass.setInterfaceFlag((accessFlags & 0x0200) != 0);
    loadedClass.setAbstractFlag((accessFlags & 0x0400) != 0);
    loadedClass.setSyntheticFlag((accessFlags & 0x1000) != 0);
    loadedClass.setAnnotationFlag((accessFlags & 0x2000) != 0);
    loadedClass.setEnumFlag((accessFlags & 0x4000) != 0);
    */
}

jsjvm.ClassLoader.prototype.getClassFile = function(className) {
    var fileName = className + ".class";
    for (var i = 0; i < this.classFiles.length; i++) {
        var classFile = this.classFiles[i];
        if (classFile.getFileName() == fileName) {
            return classFile;
        }
    }
    throw "ClassNotFoundException";
}
