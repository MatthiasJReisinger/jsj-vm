/**
 * This is the runtime representation of a Java class. It
 * holds its runtime constant pool and provides access to
 * the methods, which are implemented by this class.
 */
jsjvm.clazz.Class = function() {
    this.className = null;
    this.methods = null;
}

jsjvm.clazz.Class.prototype.getConstantPool = function() {
    return this.constant_pool;
}

jsjvm.clazz.Class.prototype.getMethod = function(methodName) {
    for (var i = 0; i < this.methods.length; i++) {
        var method = this.methods[i];
        if (method.name == methodName) {
            return method;
        }
    }
    throw "NoSuchMethodException";
}


