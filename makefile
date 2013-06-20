TARGET_DIR=target
TARGET=jsjvm.js

all:
	mkdir -p $(TARGET_DIR)
	cat src/namespaces.js > $(TARGET_DIR)/$(TARGET)
	find src/jsjvm src/util -name "*.js" | xargs cat >> $(TARGET_DIR)/$(TARGET)

test:
	javac test/Test.java

lines:
	find . -name '*.js' | xargs wc -l

clean:
	rm -rf $(TARGET_DIR)

.PHONY: all test clean
