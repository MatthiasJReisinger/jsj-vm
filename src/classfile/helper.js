/**
 * This file contains helper functions used within this package
 */

jsjvm.classfile.getIntFromBytes = function(bytes, offset, length) {
    var intValue = 0;
    for (var i = 0; i < length; i++) {
        intValue += bytes[offset + i] * Math.pow(2, 8 * (length - 1 - i));
    }
    return intValue;
}
