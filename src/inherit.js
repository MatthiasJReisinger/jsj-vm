function inherit(SubClass, BaseClass) {
    SubClass.prototype = new BaseClass();
    SubClass.prototype._super_ = function() {
    }
}
