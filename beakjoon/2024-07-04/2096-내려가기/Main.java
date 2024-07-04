import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());

        int[] maxDP = new int[3];
        int[] minDP = new int[3];
        int[] tempMaxDP = new int[3];
        int[] tempMinDP = new int[3];

        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int left = Integer.parseInt(st.nextToken());
            int middle = Integer.parseInt(st.nextToken());
            int right = Integer.parseInt(st.nextToken());

            if (i == 0) {
                maxDP[0] = minDP[0] = left;
                maxDP[1] = minDP[1] = middle;
                maxDP[2] = minDP[2] = right;
            } else {
                tempMaxDP[0] = Math.max(maxDP[0], maxDP[1]) + left;
                tempMaxDP[1] = Math.max(Math.max(maxDP[0], maxDP[1]), maxDP[2]) + middle;
                tempMaxDP[2] = Math.max(maxDP[1], maxDP[2]) + right;

                tempMinDP[0] = Math.min(minDP[0], minDP[1]) + left;
                tempMinDP[1] = Math.min(Math.min(minDP[0], minDP[1]), minDP[2]) + middle;
                tempMinDP[2] = Math.min(minDP[1], minDP[2]) + right;

                System.arraycopy(tempMaxDP, 0, maxDP, 0, 3);
                System.arraycopy(tempMinDP, 0, minDP, 0, 3);
            }
        }

        int maxResult = Math.max(Math.max(maxDP[0], maxDP[1]), maxDP[2]);
        int minResult = Math.min(Math.min(minDP[0], minDP[1]), minDP[2]);

        System.out.println(maxResult + " " + minResult);
    }
}
