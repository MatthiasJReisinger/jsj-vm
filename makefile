TARGET=jsj-vm.js

all:
	cat src/*.js > bin/$(TARGET)

clean:
	rm -rf bin/*

.PHONY: all clean
