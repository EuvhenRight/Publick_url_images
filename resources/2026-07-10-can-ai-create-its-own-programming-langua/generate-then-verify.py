"""
Demonstrates the 'generate in a high-resource language, then verify' pattern
discussed in the post. Instead of trusting an LLM to emit correct code in a
niche AI-oriented language, you:

  1. Generate in a well-represented language (here: Python).
  2. Verify SEMANTICS by executing tests, not just checking that it parses.

This file is self-contained and runnable: `python generate-then-verify.py`
The 'LLM' is stubbed so the point is clear without an API key.
"""

import ast
import textwrap


def fake_llm_generate(spec: str) -> str:
    """Stand-in for a real LLM call. Returns candidate Python source.
    Swap this for an actual model call in production.
    """
    # A deliberately imperfect candidate to show why structural checks
    # are insufficient on their own.
    return textwrap.dedent(
        '''
        def add(a, b):
            return a + b

        def is_even(n):
            # correct semantics
            return n % 2 == 0
        '''
    )


def check_structural_validity(source: str) -> bool:
    """The EASY half: does it parse? Cheap, but proves nothing about meaning."""
    try:
        ast.parse(source)
        return True
    except SyntaxError as exc:
        print(f"[structural] FAILED to parse: {exc}")
        return False


def check_semantic_validity(source: str) -> bool:
    """The HARD half: run it and assert behavior. This is where reality lives."""
    namespace: dict = {}
    try:
        exec(compile(source, "<candidate>", "exec"), namespace)
    except Exception as exc:  # noqa: BLE001
        print(f"[semantic] execution error: {exc}")
        return False

    tests = [
        ("add(2, 3) == 5", namespace["add"](2, 3) == 5),
        ("add(-1, 1) == 0", namespace["add"](-1, 1) == 0),
        ("is_even(4) is True", namespace["is_even"](4) is True),
        ("is_even(7) is False", namespace["is_even"](7) is False),
    ]

    all_pass = True
    for label, result in tests:
        status = "ok" if result else "FAIL"
        if not result:
            all_pass = False
        print(f"[semantic] {status}: {label}")
    return all_pass


def transpile_note():
    """In a real pipeline, only AFTER semantic checks pass would you transpile
    the verified Python into the niche/AI-oriented target language."""
    print("[transpile] semantics verified -> safe to transpile to target lang")


def main() -> None:
    spec = "Provide add(a, b) and is_even(n)."
    candidate = fake_llm_generate(spec)

    print("== Step 1: structural validity (easy) ==")
    if not check_structural_validity(candidate):
        print("Rejected: does not parse.")
        return

    print("\n== Step 2: semantic validity (hard, requires running) ==")
    if not check_semantic_validity(candidate):
        print("Rejected: parses but behaves incorrectly.")
        return

    print("\n== Step 3: transpile only after verification ==")
    transpile_note()
    print("\nDone. Clean grammar fixed the easy half; execution proved the rest.")


if __name__ == "__main__":
    main()
