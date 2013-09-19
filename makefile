TARGET_DIR=target
TARGET=sawu.js

all:
	mkdir -p $(TARGET_DIR)
	cat src/namespaces.js > $(TARGET_DIR)/$(TARGET)
	find src/sawu src/util -name "*.js" | xargs cat >> $(TARGET_DIR)/$(TARGET)

test:
	javac test/Test.java

lines:
	find . -name '*.js' | xargs wc -l

.PHONY: all test lines
