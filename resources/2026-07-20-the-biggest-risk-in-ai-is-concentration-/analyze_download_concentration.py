"""
Analyze concentration in a model ecosystem using download counts.

The LinkedIn post claims that on Hugging Face the top 200 models
(~0.01% of hosted models) pull nearly half of all downloads, while
roughly half of all models see fewer than 200 downloads.

This script lets you test that kind of claim against real data pulled
from the Hugging Face Hub API, computing standard concentration metrics:
  - share of total downloads held by the top-N models
  - Gini coefficient
  - the fraction of models below a download threshold

Usage:
    pip install huggingface_hub numpy
    python analyze_download_concentration.py --limit 5000 --top 200 --threshold 200

No API token is required for public metadata.
"""

from __future__ import annotations

import argparse
from typing import List

import numpy as np


def fetch_download_counts(limit: int) -> List[int]:
    """Fetch download counts for public models, sorted by downloads desc."""
    from huggingface_hub import HfApi

    api = HfApi()
    models = api.list_models(sort="downloads", direction=-1, limit=limit)
    counts = []
    for m in models:
        d = getattr(m, "downloads", None)
        counts.append(int(d) if d is not None else 0)
    return counts


def gini(values: np.ndarray) -> float:
    """Gini coefficient (0 = perfect equality, 1 = maximal concentration)."""
    if values.size == 0:
        return float("nan")
    v = np.sort(values.astype(float))
    if v.sum() == 0:
        return 0.0
    n = v.size
    index = np.arange(1, n + 1)
    return float((2.0 * np.sum(index * v) / (n * v.sum())) - (n + 1) / n)


def top_n_share(values: np.ndarray, n: int) -> float:
    """Share of total downloads captured by the top-n models."""
    total = values.sum()
    if total == 0:
        return float("nan")
    top = np.sort(values)[::-1][:n].sum()
    return float(top / total)


def fraction_below(values: np.ndarray, threshold: int) -> float:
    """Fraction of models with fewer than `threshold` downloads."""
    if values.size == 0:
        return float("nan")
    return float(np.mean(values < threshold))


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--limit", type=int, default=5000,
                        help="How many models to sample from the Hub.")
    parser.add_argument("--top", type=int, default=200,
                        help="Top-N cutoff for concentration share.")
    parser.add_argument("--threshold", type=int, default=200,
                        help="Download threshold for the long-tail measure.")
    args = parser.parse_args()

    print(f"Fetching up to {args.limit} models from the Hugging Face Hub...")
    counts = np.array(fetch_download_counts(args.limit))
    print(f"Retrieved {counts.size} models.\n")

    print("=== Concentration metrics ===")
    print(f"Total downloads (sampled): {int(counts.sum()):,}")
    print(f"Top-{args.top} share of downloads: {top_n_share(counts, args.top):.1%}")
    print(f"Gini coefficient: {gini(counts):.3f}")
    print(f"Models with < {args.threshold} downloads: "
          f"{fraction_below(counts, args.threshold):.1%}")

    print("\nNote: results depend on sample size. The Hub hosts far more than")
    print("5,000 models, so a limited sample understates the long tail. Increase")
    print("--limit for a fuller picture (and expect longer runtimes).")


if __name__ == "__main__":
    main()
