TARGET=jsj-vm.js

all:
	mkdir -p bin
	cat src/*.js > bin/$(TARGET)

clean:
	rm -rf bin/*

.PHONY: all clean
