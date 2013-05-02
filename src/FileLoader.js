function FileLoader() {
    this.callback = null;
}

FileLoader.prototype.setCallback = function(callback) {
    this.callback = callback;
}

/**
 * @param FileList files the files to be read
 */
FileLoader.prototype.load = function(files) {
    callback = this.callback;
    var reader = new FileReader();
    reader.filesToRead = files.length;
    reader.readFiles = 0;
    reader.fileLoaderCallback = this.callback;
    reader.onload = finishedReading;
    for (var i = 0, f; f = files[i]; i++) {
        reader.readAsArrayBuffer(f);
    }
}

/**
 * A internal helper function. Should only be used by the
 * readFiles method
 */
finishedReading = function(evt) {
    this.readFiles++;
    console.log(evt);
    var bytes = Uint8Array(evt.target.result);
    if (this.readFiles == this.filesToRead && this.fileLoaderCallback != null) {
        this.fileLoaderCallback();
    }
}
