/**
 * This is an internal representation of a class file. An instance
 * of this class is returned by the jsjvm.classfile.Parser after
 * parsing a .class file.
 * This internal representation is then used for validation of
 * the parsed .class file and will be converted to a
 * jsjvm.Class object that will be stored within the method
 * area of the Java Virtual Machine.
 */
jsjvm.classfile.ParsedClassFile = function() {
    var magic;
    var minor_version;
    var major_version;
    var constant_pool_count;
    var constant_pool;
    var access_flags;
    var this_class;
    var super_class;
    var interfaces_count;
    var interfaces;
    var fields_count;
    var fields;
    var methods_count;
    var methods;
    var attributes_count;
    var attributes;
}
