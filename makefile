TARGET_DIR=target
TARGET=jsj-vm.js

all:
	mkdir -p $(TARGET_DIR)
	cat src/*.config > $(TARGET_DIR)/$(TARGET)
	find src -name "*.js" | xargs cat >> $(TARGET_DIR)/$(TARGET)

clean:
	rm -rf $(TARGET_DIR)

.PHONY: all clean
