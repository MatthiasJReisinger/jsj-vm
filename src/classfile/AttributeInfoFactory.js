jsjvm.classfile.AttributeInfoFactory = function() {
}

jsjvm.classfile.AttributeInfoFactory.prototype.create = function(positionIndex) {
    switch (positionIndex) {
        case 0:
            return new jsjvm.classfile.CodeAttribute();
            break;
        default:
            return new jsjvm.classfile.AttributeInfo();
            break;
    }
}
