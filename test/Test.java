public class Test {
    public static void main(String[] args) {
        /*
        int a = 5;
        int b = 6;
        int c = a + b;
        int d = 500 - c;
        d *= 0;
        a = b / 6;
        a++;
        if (a > 1) {
            a = a << 1;
        }
        if (a == 4) {
            a = a >> 1;
        }
        if (a != 4) {
            a = a & 1;
        }
        */

        int a = -3;         // bipush -3; istore_1;
        int b = 4;          // iconst_4; istore_2;
        int c = 500;        // sipush 500; istore_3;
        int d = -500;       // sipush -500; istore 4;
        a = b + c;          // iload_2; iload_3; iadd; istore_1;
        b = c - d;          // iload_3; iload 4; isub; istore_2;
        d = d * 2;          // iload 4; iconst_2; imul; istore 4
        c = b / 4;          // iload_2; iconst_4; idiv; istore_3;
        a = a << 5;         // iload_1; iconst_5; ishl; istore_1;
        a = a >> 5;         // iload_1; iconst_5; ishr; istore_1;
        c = c & 128;        // iload_3; sipush 128; iand; istore_3;
        c++;                // iinc 3 1;
        c--;                // iinc 3 -1;
    }                       // return;

    public static int add(int a, int b) {
        int sum = a + b;
        return sum;
    }
}
