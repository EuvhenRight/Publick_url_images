"""
Illustrative pseudocode for the qk-clip idea used in MuonClip-style training.

This is an EDUCATIONAL sketch, NOT the official Moonshot implementation.
It demonstrates the concept: rescale query/key projection weights when
attention logits threaten to explode, to keep training stable.

Run requirement: numpy only.
"""
from __future__ import annotations

import numpy as np


def attention_logits(q: np.ndarray, k: np.ndarray) -> np.ndarray:
    """Scaled dot-product attention logits (pre-softmax).

    q, k shape: (seq_len, d_head)
    returns: (seq_len, seq_len)
    """
    d_head = q.shape[-1]
    return (q @ k.T) / np.sqrt(d_head)


def qk_clip(W_q: np.ndarray, W_k: np.ndarray, x: np.ndarray,
            threshold: float = 30.0) -> tuple[np.ndarray, np.ndarray]:
    """Rescale query/key projection weights if max attention logit exceeds
    a threshold. Splits the scale factor evenly (sqrt) across W_q and W_k so
    the product q.kT scales linearly with `scale`.

    W_q, W_k shape: (d_model, d_head)
    x shape:        (seq_len, d_model)
    """
    q = x @ W_q
    k = x @ W_k
    logits = attention_logits(q, k)
    max_abs = np.max(np.abs(logits))

    if max_abs > threshold:
        scale = threshold / max_abs
        root = np.sqrt(scale)
        W_q = W_q * root
        W_k = W_k * root
        print(f"clipped: max_logit={max_abs:.2f} -> scale={scale:.4f}")
    else:
        print(f"no clip needed: max_logit={max_abs:.2f}")

    return W_q, W_k


def demo() -> None:
    rng = np.random.default_rng(0)
    d_model, d_head, seq = 64, 16, 8

    x = rng.standard_normal((seq, d_model))
    # Deliberately large-magnitude weights to trigger exploding logits.
    W_q = rng.standard_normal((d_model, d_head)) * 2.0
    W_k = rng.standard_normal((d_model, d_head)) * 2.0

    before = np.max(np.abs(attention_logits(x @ W_q, x @ W_k)))
    W_q, W_k = qk_clip(W_q, W_k, x, threshold=10.0)
    after = np.max(np.abs(attention_logits(x @ W_q, x @ W_k)))

    print(f"max|logit| before={before:.2f} after={after:.2f}")


if __name__ == "__main__":
    demo()
