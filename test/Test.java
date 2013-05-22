public class Test {
    public static void main(String[] args) {
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
    }

    public static int add(int a, int b) {
        int sum = a + b;
        return sum;
    }
}
