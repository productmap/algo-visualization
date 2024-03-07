/**
 * Asynchronously delays for a specified amount of time.
 * @param ms - The number of milliseconds to delay.
 * @param value - The value to return after the delay.
 * @param options - Additional options for controlling the delay.
 * @param options.signal - An optional AbortSignal to allow aborting the delay.
 * @returns A promise that resolves to the specified value after the delay.
 */
export const delay = async (
  ms: number,
  value = null,
  { signal }: { signal?: AbortSignal } = {}
) => {
  const timeoutPromise = new Promise((resolve) => setTimeout(resolve, ms));
  if (signal) {
    try {
      await Promise.race([
        timeoutPromise,
        new Promise((_, reject) =>
          signal.addEventListener("abort", () => reject(new Error("aborted")))
        ),
      ]);
    } finally {
      signal.removeEventListener("abort", () => {});
    }
  } else {
    await timeoutPromise;
  }
  return value;
};
