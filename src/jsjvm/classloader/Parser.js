/**
 * This class holds the main logic for parsing
 * a class file.
 *
 * @param classFile the class file to be parsed
 */
jsjvm.classloader.Parser = function(classFile) {
    /* call super constructor */
    jsjvm.classloader.AbstractParser.call(this, classFile, 0);
}

inherit(jsjvm.classloader.Parser, jsjvm.classloader.AbstractParser);

///////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
///////////////////////////////////////////////////////////////////////////////

/**
 * @return jsjvm.clazz.Class the parsed representation of the given class file.
 */
jsjvm.classloader.Parser.prototype.parse = function() {
    var parsedClass = new jsjvm.clazz.Class();

    parsedClass.magic = this.parseInt(4);
    parsedClass.minor_version = this.parseInt(2);
    parsedClass.major_version = this.parseInt(2);
    parsedClass.constant_pool = this.parseConstantPool();
    parsedClass.access_flags = this.parseInt(2);
    parsedClass.className = this.parseClassName(parsedClass.constant_pool);
    parsedClass.super_class = this.parseInt(2);
    parsedClass.interfaces = this.parseInterfaces();
    parsedClass.fields = this.parseFields();
    parsedClass.methods = this.parseMethods(parsedClass.constant_pool);
    parsedClass.attributes = this.parseAttributes();
   
    return parsedClass;
}

///////////////////////////////////////////////////////////////////////////////
// NON-PUBLIC HELPER METHODS
///////////////////////////////////////////////////////////////////////////////

jsjvm.classloader.Parser.prototype.parseConstantPool = function() {
    var constantPoolCount = this.parseInt(2);
    var constantPoolEntries = new Array(constantPoolCount);
    for (var i = 1; i <= constantPoolCount - 1; i++) {
        var info_struct = {};
        info_struct.tag = this.parseInt(1);
        switch (info_struct.tag) {
            case 1:
                /* CONSTANT_Utf8 */
                info_struct.length = this.parseInt(2);
                info_struct.bytes = this.classFile.getBytes().subarray(this.offset, this.offset + info_struct.length);
                this.offset += info_struct.length;
                break;
            case 3:
                /* CONSTANT_Integer */
                info_struct.bytes = this.parse(4);
                break;
            case 4:
                /* CONSTANT_Float */
                // TODO parse float value
                this.offset += 4;
                break;
            case 5:
                /* CONSTANT_Long */
                // TODO parse long value
                /* long uses 2 entries of the constant_pool table */
                i++;
                this.offset += 8;
                break;
            case 6:
                /* CONSTANT_Double */
                // TODO parse double value
                /* double uses 2 entries of the constant_pool table */
                i++;
                this.offset += 8;
                break;
            case 7:
                /* CONSTANT_Class */
                info_struct.name_index = this.parseInt(2);
                break;
            case 8:
                /* CONSTANT_String */
                info_struct.string_index = this.parseInt(2);
                break;
            case 9:
                /* CONSTANT_Fieldref */
                /* fall through to case 11 */
            case 10:
                /* CONSTANT_Methodref */
                /* fall through to case 11 */
            case 11:
                /* CONSTANT_InterfaceMethodref */
                info_struct.class_index = this.parseInt(2);
                info_struct.name_and_type_index = this.parseInt(2);
                break;
            case 12:
                /* CONSTANT_NameAndType */
                info_struct.name_index = this.parseInt(2);
                info_struct.descriptor_index = this.parseInt(2);
                break;
            case 15:
                /* CONSTANT_MethodHandle */
                this.offset += 3;
                break;
            case 16:
                /* CONSTANT_MethodType */
                this.offset += 2;
                break;
            case 18:
                /* CONSTANT_InvokeDynamic */
                this.offset += 4;
                break;
            default:
                throw "UnknownTagException"
                break;
        }
        constantPoolEntries[i] = info_struct;
    }
    
    var constantPool = new jsjvm.clazz.ConstantPool(constantPoolEntries);
    return constantPool;
}

jsjvm.classloader.Parser.prototype.parseClassName = function(constantPool) {
    var this_class = this.parseInt(2);
    var className = constantPool.getClassName(this_class);
    return className;
}

jsjvm.classloader.Parser.prototype.parseInterfaces = function() {
    var interfaceCount = this.parseInt(2);
    /* ignore field interfaces */
    var interfaces = new Array(interfaceCount);
    this.offset += 2 * interfaceCount;
    return interfaces;
}

jsjvm.classloader.Parser.prototype.parseFields = function() {
    var fieldsCount = this.parseInt(2);
    var fields = new Array(fieldsCount);
    for (var i = 0; i < fieldsCount; i++) {
        /* ignore field: access_flags */
        this.offset += 2;

        /* ignore field: name_index */
        this.offset += 2;

        /* ignore field: descriptor_index */
        this.offset += 2;

        /* parse field: attributes_count */
        var attributesCount = this.parseInt(2);

        /* parse field: attributes */
        for (var j = 0; j < attributesCount; j++) {
            /* ignore field: attribute_name_index */
            this.offset += 2;

            /* parse field: attribute_length */
            var attributeLength = this.parseInt(4);

            /* ignore field: info (each element is 1 byte long) */
            this.offset += attributeLength;
        }
    }
    return fields;
}

jsjvm.classloader.Parser.prototype.parseMethods = function(constantPool) {
    var methodsCount = this.parseInt(2);
    var methods = new Array(methodsCount);
    for (var i = 0; i < methodsCount; i++) {
        var methodInfo = new jsjvm.clazz.MethodInfo();
        methodInfo.access_flags = this.parseInt(2);
        methodInfo.name_index = this.parseInt(2);
        methodInfo.name = constantPool.getString(methodInfo.name_index);
        methodInfo.descriptor_index = this.parseInt(2);
        methodInfo.attributes_count = this.parseInt(2);
        methodInfo.attributes = new Array(methodInfo.attributes_count);
       
        var attributeParserFactory = new jsjvm.classloader.AttributeParserFactory();
        for (var j = 0; j < methodInfo.attributes_count; j++) {
            var attributeParser = attributeParserFactory.create(j, this.classFile, this.offset);
            var attributeInfo = attributeParser.parse();
            this.offset = attributeParser.getOffset();
            methodInfo.attributes[j] = attributeInfo;
        }
      
        methods[i] = methodInfo;
    }
    return methods;
}

jsjvm.classloader.Parser.prototype.parseAttributes = function() {
    var attributesCount = this.parseInt(2);
    var attributes = new Array(attributesCount);
    for (var i = 0; i < attributesCount; i++) {
        var attributeInfo = new jsjvm.clazz.AttributeInfo();
        attributes[i] = attributeInfo;
    }
    return attributes;
}
