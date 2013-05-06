jsjvm.classloader.AttributeParserFactory = function() {
}

jsjvm.classloader.AttributeParserFactory.prototype.create = function(positionIndex, classFile, offset) {
    switch (positionIndex) {
        case 0:
            return new jsjvm.classloader.CodeAttributeParser(classFile, offset);
            break;
        default:
            return new jsjvm.classloader.AttributeInfoParser(classFile, offset);
            break;
    }
}
