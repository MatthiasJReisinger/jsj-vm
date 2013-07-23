/**
 * Test program for the Java VM.
 *
 * This class represents a small test program, which demonstrates
 * the current abilities of the jsj-vm. You can use System.out.println()
 * to print some test output for debugging, but ATTENTION:
 *
 * !!! System.out.println() can only be used to print integral variables 
 * (type int, short, byte, etc.) or integral constants. Strings are not
 * supported!!!
 */
public class Test {
    public static void main(String[] args) {
        int a = -3;
        System.out.println(a);
        int b = 4;
        System.out.println(b);
        int c = 500;
        System.out.println(c);
        int d = -500;
        System.out.println(d);
        a = b + c;
        System.out.println(a);
        b = c - d;
        System.out.println(b);
        d = d * 2;
        System.out.println(d);
        c = b / 4;
        System.out.println(c);
        a = a << 5;
        System.out.println(a);
        a = a >> 5;
        System.out.println(a);
        c = c & 128;
        System.out.println(c);
        c++;
        System.out.println(c);
        c--;
        System.out.println(c);
        
        if (c != 128) {
            c += 3;
        }
        System.out.println(c);

        if (c == 128) {
            c += 3;
        }
        System.out.println(c);

        if (c < 128) {
            c += 3;
        }
        System.out.println(c);

        if (c > 128) {
            c += 3;
        }
        System.out.println(c);

        a = add(2, 3);
        System.out.println(a);

        int i = 0;
        while (i < 10) {
            i++;
            System.out.println(i);
        }
    }

    public static int add(int a, int b) {
        int sum = a + b;
        return sum;
    }
}
