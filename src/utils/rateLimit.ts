// src/utils/rateLimit.ts
export function rateLimit(options: { interval: number; uniqueTokenPerInterval: number }) {
  const tokenCache = new Map<string, number[]>();

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const now = Date.now();
        const tokenCount = tokenCache.get(token) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, [tokenCount[0] + 1, now]);
        } else {
          // Check if interval has passed
          if (now - tokenCount[1] > options.interval) {
            tokenCount[0] = 1;
            tokenCount[1] = now;
          } else {
            tokenCount[0] += 1;
          }
          tokenCache.set(token, tokenCount);
        }

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage > limit;

        if (isRateLimited) {
          reject('Rate limit exceeded');
        } else {
          resolve();
        }
      }),
  };
}
