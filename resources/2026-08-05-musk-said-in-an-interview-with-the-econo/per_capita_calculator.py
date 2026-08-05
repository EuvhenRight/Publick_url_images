#!/usr/bin/env python3
"""
Per-capita comparison helper for claims that use raw death totals.

This script is self-contained and uses only the Python standard library.
Edit the example inputs below to match your preferred sources, geography,
year, and population denominator.

Run:
    python per_capita_calculator.py
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class MortalityFigure:
    label: str
    deaths: float
    population: float

    def rate_per_100k(self) -> float:
        return self.deaths / self.population * 100_000


def print_comparison(figures: list[MortalityFigure]) -> None:
    print("Raw totals and population-adjusted rates")
    print("-" * 52)
    print(f"{'Metric':<30} {'Deaths':>10} {'Population':>14} {'Per 100k':>10}")
    print("-" * 72)

    for figure in figures:
        print(
            f"{figure.label:<30} "
            f"{figure.deaths:>10,.0f} "
            f"{figure.population:>14,.0f} "
            f"{figure.rate_per_100k():>10.2f}"
        )

    print("-" * 72)
    print("Note: Results depend on the chosen geography, year, and definitions.")
    print("Use raw totals for total burden; use rates for population-adjusted risk.")


def main() -> None:
    # Illustrative inputs based on the LinkedIn post's figures.
    # Adjust the population denominator to match the exact source definition of "Europe".
    # A study-specific European population base around 540 million gives a ratio of
    # roughly 1.6x the U.S. population of about 335 million.
    figures = [
        MortalityFigure(
            label="Europe heat deaths, low",
            deaths=50_000,
            population=540_000_000,
        ),
        MortalityFigure(
            label="Europe heat deaths, high",
            deaths=68_000,
            population=540_000_000,
        ),
        MortalityFigure(
            label="U.S. gun deaths",
            deaths=46_728,
            population=335_000_000,
        ),
    ]

    print_comparison(figures)


if __name__ == "__main__":
    main()
