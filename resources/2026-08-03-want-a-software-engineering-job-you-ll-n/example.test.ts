/**
 * A concrete illustration of the "all tests passed, but nothing works" trap
 * from Dave Farley's demo: tests so shallow they never reach the real behavior.
 *
 * The code under test fetches a user and returns their display name. There is a
 * real bug: it reads `data.name` when the API actually returns `data.fullName`,
 * so `getDisplayName` always returns `undefined` against the real server.
 *
 * Test A passes (false green) because it over-mocks and asserts nothing meaningful.
 * Test B fails and catches the bug because it exercises real parsing and asserts
 * on the actual content.
 *
 * Run with a test runner that provides `describe/it/expect` (Vitest or Jest).
 */

// ---------------------------------------------------------------------------
// Code under test (contains a real, shippable-looking bug)
// ---------------------------------------------------------------------------

export interface UserApiResponse {
  id: string;
  fullName: string; // <-- the real API returns `fullName`
  email: string;
}

export async function getDisplayName(
  userId: string,
  fetchFn: typeof fetch = fetch,
): Promise<string> {
  const res = await fetchFn(`https://api.example.com/users/${userId}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const data = (await res.json()) as any;
  // BUG: property is `fullName`, not `name`. Returns undefined in production.
  return data.name;
}

// ---------------------------------------------------------------------------
// Test A — FALSE GREEN. Passes even though getDisplayName is broken.
// ---------------------------------------------------------------------------
// Why it lies:
//   * The mock invents a `name` field the real API never sends, so the mock
//     is testing the mock, not the code.
//   * The assertion (`toBeDefined`) is too weak to fail on wrong content.
//   * The network is fully stubbed, so it never notices it can't reach reality.

describe('getDisplayName — shallow test (do NOT trust this green)', () => {
  it('returns a display name', async () => {
    const fakeFetch = (async () =>
      ({
        ok: true,
        status: 200,
        json: async () => ({ id: '1', name: 'Ada Lovelace' }), // wrong shape!
      }) as unknown as Response) as typeof fetch;

    const result = await getDisplayName('1', fakeFetch);

    // Passes for almost any value — including the buggy `undefined` if the mock
    // had used the real `fullName` field. This assertion guards nothing.
    expect(result).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// Test B — HONEST. Fails and surfaces the bug.
// ---------------------------------------------------------------------------
// Why it works:
//   * The mock mirrors the REAL API contract (`fullName`), so parsing is tested
//     against reality rather than a convenient fiction.
//   * The assertion is specific: it checks the actual expected string.
//   * It also covers an error path the happy-path test ignored.

describe('getDisplayName — honest test (this one catches the bug)', () => {
  it('parses the real API shape and returns the full name', async () => {
    const realisticFetch = (async () =>
      ({
        ok: true,
        status: 200,
        // Matches the documented contract: `fullName`, not `name`.
        json: async (): Promise<UserApiResponse> => ({
          id: '1',
          fullName: 'Ada Lovelace',
          email: 'ada@example.com',
        }),
      }) as unknown as Response) as typeof fetch;

    const result = await getDisplayName('1', realisticFetch);

    // Specific enough to fail: with the bug, `result` is undefined.
    expect(result).toBe('Ada Lovelace');
  });

  it('throws on a non-2xx response (happy-path-only tests miss this)', async () => {
    const failingFetch = (async () =>
      ({ ok: false, status: 500, json: async () => ({}) }) as unknown as Response) as typeof fetch;

    await expect(getDisplayName('1', failingFetch)).rejects.toThrow('Request failed: 500');
  });
});

/**
 * The fix: read `data.fullName` instead of `data.name`. Test B then goes green
 * for the right reason; Test A was never a signal at all.
 *
 * Takeaways:
 *   1. Mock the real contract, not a shape that makes the test convenient.
 *   2. Assert on content, not just existence.
 *   3. Break the code on purpose — if no test goes red, your tests prove nothing.
 */
