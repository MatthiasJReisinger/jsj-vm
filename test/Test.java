/**
 * Test program for the java VM.
 *
 * This class represents a small test program, which demonstrates
 * the current abilities of the jsj-vm. After every line of java code,
 * there's a comment, which shows the human readable java bytecode for
 * the given operations.
 */
public class Test {
    public static void main(String[] args) {
        int a = -3; 
        // 0: bipush -3;
        // 2: istore_1;

        int b = 4;
        // 3: iconst_4;
        // 4: istore_2;

        int c = 500;
        // 5: sipush 500;
        // 8: istore_3;

        int d = -500;
        // 9: sipush -500;
        // 12: istore 4;

        a = b + c;
        // 14: iload_2;
        // 15: iload_3;
        // 16: iadd;
        // 17: istore_1;

        b = c - d;
        // 18: iload_3;
        // 19: iload 4;
        // 21: isub;
        // 22: istore_2;

        d = d * 2;
        // 23: iload 4;
        // 25: iconst_2;
        // 26: imul;
        // 27: istore 4

        c = b / 4;
        // 29: iload_2;
        // 30: iconst_4;
        // 31: idiv;
        // 32: istore_3;

        a = a << 5;
        // 33: iload_1;
        // 34: iconst_5;
        // 35: ishl;
        // 36: istore_1;

        a = a >> 5;
        // 37: iload_1;
        // 38: iconst_5;
        // 39: ishr;
        // 40: istore_1;

        c = c & 128;
        // 41: iload_3;
        // 42: sipush 128;
        // 45: iand;
        // 46: istore_3;

        c++;
        // 47: iinc 3 1;

        c--;
        // 50: iinc 3 -1;

        if (c != 128) {
        // 53: iload_3;
        // 54: sipush 128;
        // 57: if_icmpeq 63;

            c += 3;
        // 60: iinc 3 3;
        }

        if (c == 128) {
        // 63: iload_3;
        // 64: sipush 128;
        // 67: if_icmpne 73;

            c += 3;
        // 70: iinc 3 3;
        }

        if (c < 128) {
        // 73: iload_3;
        // 74: sipush 128;
        // 77: if_cmpge 83;

            c += 3;
        // 80: iinc 3 3;
        }

        if (c > 128) {
        // 83: iload_3;
        // 84: sipush 128;
        // 87: if_cmple 93;

            c += 3;
        // 90: iinc 3 3;
        }

        a = add(2, 3);

        // return;
    }

    public static int add(int a, int b) {
        int sum = a + b;
        return sum;
    }
}
