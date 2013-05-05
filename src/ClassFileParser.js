function ClassFileParser() {
}

function Method_info() {
    var access_flags;
    var name_index;
    var descriptor_index;
    var attributes_count;
    var attributes;
}

function Attribute_info() {
    var attribute_name_index;
    var attribute_length;
    var info;
}

function Code_attribute() {
    var attribute_name_index;
    var attribute_length;
    var max_stack;
    var max_locals;
    var code_length;
    var code;
    var exception_table_length;
    var exception_table;
    var attributes_count;
    var attributes;
}

/**
 * @param ClassFile the class file to be parsed
 * @return ParsedClassFile the parsed representation of the given class file.
 */
ClassFileParser.prototype.parse = function(classFile) {
    var parsedClassFile = new ParsedClassFile();

    /* the offset at the beginning of the file is 0 */
    var currentOffset = 0;
    
    /* parse field: magic */
    parsedClassFile.magic = this.getIntFromBytes(classFile.getBytes(), currentOffset, 4);
    currentOffset += 4;

    /* parse field: minor_version */
    parsedClassFile.minor_version = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
    currentOffset += 2;
    
    /* parse field: major_version */
    parsedClassFile.major_version = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
    currentOffset += 2;

    /* parse field: constant_pool_count field */
    parsedClassFile.constant_pool_count = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
    parsedClassFile.constant_pool = new Array(parsedClassFile.constant_pool_count);
    currentOffset += 2;

    /* parse field: constant_pool */
    for (var i = 1; i <= parsedClassFile.constant_pool_count - 1; i++) {
        var info_struct = {};
        info_struct.tag = this.getIntFromBytes(classFile.getBytes(), currentOffset, 1);
        currentOffset++;
        switch (info_struct.tag) {
            case 1:
                /* CONSTANT_Utf8 */
                info_struct.length = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
                currentOffset += 2;
                // TODO parse characters
                info_struct.bytes = classFile.getBytes().subarray(currentOffset, currentOffset + info_struct.length);
                currentOffset += info_struct.length;
                break;
            case 3:
                /* CONSTANT_Integer */
                info_struct.bytes = this.getIntFromBytes(classFile.getBytes(), currentOffset, 4);
                currentOffset += 4;
                break;
            case 4:
                /* CONSTANT_Float */
                // TODO parse float value
                currentOffset += 4;
                break;
            case 5:
                /* CONSTANT_Long */
                // TODO parse long value

                /* long uses 2 entries of the constant_pool table */
                i++;
                currentOffset += 8;
                break;
            case 6:
                /* CONSTANT_Double */
                // TODO parse double value
                
                /* double uses 2 entries of the constant_pool table */
                i++;
                currentOffset += 8;
                break;
            case 7:
                /* CONSTANT_Class */
                info_struct.name_index = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
                currentOffset += 2;
                break;
            case 8:
                /* CONSTANT_String */
                info_struct.string_index = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
                currentOffset += 2;
                break;
            case 9:
                /* CONSTANT_Fieldref */
            case 10:
                /* CONSTANT_Methodref */
            case 11:
                /* CONSTANT_InterfaceMethodref */
                info_struct.class_index = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
                currentOffset += 2;
                info_struct.name_and_type_index = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
                currentOffset += 2;
                break;
            case 12:
                /* CONSTANT_NameAndType */
                info_struct.name_index = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
                currentOffset += 2
                info_struct.descriptor_index = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
                currentOffset += 2;
                break;
            case 15:
                /* CONSTANT_MethodHandle */
                currentOffset += 3;
                break;
            case 16:
                /* CONSTANT_MethodType */
                currentOffset += 2;
                break;
            case 18:
                /* CONSTANT_InvokeDynamic */
                currentOffset += 4;
                break;
            default:
                throw "UnknownTagException"
                break;
        }
        parsedClassFile.constant_pool[i] = info_struct;
    }

    /* parse field: access_flags */
    parsedClassFile.access_flags = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
    currentOffset += 2;

    /* parse field: this_class */
    parsedClassFile.this_class = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
    currentOffset += 2;

    /* parse field: super_class */
    parsedClassFile.super_class = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
    currentOffset += 2;

    /* parse field: interface_count */
    parsedClassFile.interface_count = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
    currentOffset += 2;

    /* parse field: interfaces */
    currentOffset += 2 * parsedClassFile.interface_count;

    /* parse field: fields_count */
    parsedClassFile.fields_count = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
    currentOffset += 2;

    /* parse field: fields */
    for (var i = 0; i < parsedClassFile.fields_count; i++) {
        /* parse field: access_flags */
        currentOffset += 2;

        /* parse field: name_index */
        currentOffset += 2;

        /* parse field: descriptor_index */
        currentOffset += 2;

        /* parse field: attributes_count */
        var attributesCount = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
        currentOffset += 2;

        /* parse field: attributes */
        for (var j = 0; j < attributesCount; j++) {
            /* parse field: attribute_name_index */
            currentOffset += 2;

            /* parse field: attribute_length */
            var attributeLength = this.getIntFromBytes(classFile.getBytes(), currentOffset, 4);
            currentOffset += 4;

            /* parse field: info (each element is 1 byte long) */
            currentOffset += attributeLength;
        }
    }

    /* parse field: methods_count */
    parsedClassFile.methods_count = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
    currentOffset += 2;

    /* parse field: methods */
    parsedClassFile.methods = new Array(parsedClassFile.methods_count);
    for (var i = 0; i < parsedClassFile.methods_count; i++) {
        var methodInfo = new Method_info();

        /* parse field: access_flags */
        methodInfo.access_flags = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
        currentOffset += 2;

        /* parse field: name_index */
        methodInfo.name_index = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
        currentOffset += 2;

        /* parse field: descriptor_index */
        methodInfo.descriptor_index = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
        currentOffset += 2;

        /* parse field: attributes_count */
        methodInfo.attributes_count = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
        currentOffset += 2;

        /* parse field: attributes */
        methodInfo.attributes = new Array(methodInfo.attributes_count);
        for (var j = 0; j < methodInfo.attributes_count; j++) {
            var attributeInfo = new Attribute_info();
            if (j == 0) {
                attributeInfo = new Code_attribute();
                
            } else {
                /* parse field: attribute_name_index */
                attributeInfo.attribute_name_index = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
                currentOffset += 2;

                /* parse field: attribute_length */
                attributeInfo.attribute_length = this.getIntFromBytes(classFile.getBytes(), currentOffset, 4);
                currentOffset += 4;

                /* parse field: info (each element is 1 byte long) */
                currentOffset += attributeInfo.attribute_length;
            }

            methodInfo.attributes[j] = attributeInfo;
        }
        
        parsedClassFile.methods[i] = methodInfo;
    }

    /* parse field: attributes_count */
    parsedClassFile.attributes_count = this.getIntFromBytes(classFile.getBytes(), currentOffset, 2);
    currentOffset += 2;

    /* parse field: attributes */

    return parsedClassFile;
}

ClassFileParser.prototype.getIntFromBytes = function(bytes, offset, length) {
    var intValue = 0;
    for (var i = 0; i < length; i++) {
        intValue += bytes[offset + i] * Math.pow(2, 8 * (length - 1 - i));
    }
    return intValue;
}
