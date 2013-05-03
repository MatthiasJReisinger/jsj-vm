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
    
}
