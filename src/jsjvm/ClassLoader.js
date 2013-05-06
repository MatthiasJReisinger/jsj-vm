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
 * @param String className the name of the class to be loaded
 */
jsjvm.ClassLoader.prototype.loadClass = function(className) {
    var classFile = this.getClassFile(className);
    var parser = new jsjvm.classfile.Parser();
    var parsedClassFile = parser.parse(classFile);
    // TODO validate parsedClassFile
    console.log(parsedClassFile);
    var loadedClass = this.setupClass(parsedClassFile);
    console.log(loadedClass);
    return loadedClass;
}

/**
 * @param String className
 */
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

/**
 * Creates a class from the given parsed class file
 *
 * @param jsjvm.classfile.ParsedClassFile parsedClassFile
 * @return jsjvm.Class
 */
jsjvm.ClassLoader.prototype.setupClass = function(parsedClassFile) {
    var loadedClass = new jsjvm.clazz.Class();

    loadedClass.setPublicFlag((parsedClassFile.access_flags & 0x0001) != 0);
    loadedClass.setFinalFlag((parsedClassFile.access_flags & 0x0010) != 0);
    loadedClass.setSuperFlag((parsedClassFile.access_flags & 0x0020) != 0);
    loadedClass.setInterfaceFlag((parsedClassFile.access_flags & 0x0200) != 0);
    loadedClass.setAbstractFlag((parsedClassFile.access_flags & 0x0400) != 0);
    loadedClass.setSyntheticFlag((parsedClassFile.access_flags & 0x1000) != 0);
    loadedClass.setAnnotationFlag((parsedClassFile.access_flags & 0x2000) != 0);
    loadedClass.setEnumFlag((parsedClassFile.access_flags & 0x4000) != 0);

    return loadedClass;
}
