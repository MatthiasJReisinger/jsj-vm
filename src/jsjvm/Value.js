jsjvm.Value = function(type, value) {
    this.type = type;
    this.value = value;
}

jsjvm.Value.prototype.getType = function() {
    return this.type;
}

jsjvm.Value.prototype.getValue = function() {
    return this.value;
}
