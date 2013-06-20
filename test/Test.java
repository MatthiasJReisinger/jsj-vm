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
        int b = 4;
        int c = 500;
        int d = -500;
        a = b + c;
        b = c - d;
        d = d * 2;
        c = b / 4;
        a = a << 5;
        a = a >> 5;
        c = c & 128;
        c++;
        c--;
        
        if (c != 128) {
            c += 3;
        }

        if (c == 128) {
            c += 3;
        }

        if (c < 128) {
            c += 3;
        }

        if (c > 128) {
            c += 3;
        }

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
