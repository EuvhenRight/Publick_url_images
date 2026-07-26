"""
Raman-based quality screening for 2D material stacks (graphene on a dielectric).

Heuristic implementation of the post's "concrete tell": the 2D-peak linewidth
predicts whether a scalable film will deliver high mobility. This is a screening
tool / teaching aid, not a substitute for calibrated metrology.

No external dependencies. Python 3.8+.

Usage:
    python raman_qc.py
"""
from dataclasses import dataclass
from typing import Optional


@dataclass
class RamanFeatures:
    """Fitted Raman peak features for a single graphene spectrum.

    All positions/widths in cm^-1; intensities in arbitrary but consistent units.
    """
    twod_fwhm: float          # FWHM of the 2D peak (~2680 cm^-1)
    twod_over_g: float        # I(2D)/I(G) intensity ratio
    d_over_g: float           # I(D)/I(G) intensity ratio (defect proxy)
    g_position: Optional[float] = None   # G peak position (doping/strain shift)


def assess_layer_count(twod_over_g: float) -> str:
    """Rough layer-count indication from the 2D/G intensity ratio."""
    if twod_over_g >= 2.0:
        return "likely monolayer"
    if twod_over_g >= 1.0:
        return "bilayer / few-layer"
    return "multilayer or graphite-like"


def assess_interface_quality(twod_fwhm: float) -> str:
    """Map 2D FWHM to an interface-quality bucket.

    ~22 cm^-1 or below is the target described in the post: low strain/doping
    inhomogeneity, consistent with high mobility and a clean interface.
    """
    if twod_fwhm <= 24.0:
        return "excellent (clean interface, high-mobility candidate)"
    if twod_fwhm <= 32.0:
        return "acceptable (some inhomogeneity)"
    if twod_fwhm <= 45.0:
        return "marginal (strain/doping variation limiting)"
    return "poor (disordered interface, expect capped mobility)"


def assess_defects(d_over_g: float) -> str:
    """Defect density proxy from the D/G ratio."""
    if d_over_g <= 0.05:
        return "very low defect density"
    if d_over_g <= 0.2:
        return "low defect density"
    if d_over_g <= 0.5:
        return "moderate defects"
    return "high defect density"


def predicted_mobility_band(f: RamanFeatures) -> str:
    """Coarse mobility band prediction combining the strongest signals.

    The 2D FWHM is weighted most heavily, consistent with it being the
    'concrete tell'. Defects gate the ceiling.
    """
    if f.d_over_g > 0.5:
        return "< 5,000 cm2/Vs (defect-limited)"
    if f.twod_fwhm <= 24.0 and f.d_over_g <= 0.1:
        return "~50,000-100,000+ cm2/Vs (exfoliation-grade interface)"
    if f.twod_fwhm <= 32.0:
        return "~10,000-50,000 cm2/Vs (good grown-film grade)"
    if f.twod_fwhm <= 45.0:
        return "~1,000-10,000 cm2/Vs"
    return "< 1,500 cm2/Vs (amorphous-substrate grade)"


def screen(f: RamanFeatures) -> dict:
    """Full screening report for one spectrum."""
    ship = f.twod_fwhm <= 24.0 and f.d_over_g <= 0.1
    return {
        "layer_count": assess_layer_count(f.twod_over_g),
        "interface_quality": assess_interface_quality(f.twod_fwhm),
        "defects": assess_defects(f.d_over_g),
        "predicted_mobility": predicted_mobility_band(f),
        "ship_recommendation": "PASS (candidate for device fab)" if ship
            else "HOLD (interface not clean enough)",
    }


def _print_report(label: str, f: RamanFeatures) -> None:
    print(f"=== {label} ===")
    print(f"  2D FWHM        : {f.twod_fwhm:.1f} cm^-1")
    print(f"  I(2D)/I(G)     : {f.twod_over_g:.2f}")
    print(f"  I(D)/I(G)      : {f.d_over_g:.2f}")
    for k, v in screen(f).items():
        print(f"  {k:15s}: {v}")
    print()


if __name__ == "__main__":
    # Exfoliated flake on hBN: the hero benchmark.
    _print_report(
        "Exfoliated graphene / hBN",
        RamanFeatures(twod_fwhm=22.0, twod_over_g=2.6, d_over_g=0.02),
    )
    # Scalable CVD film: good but capped.
    _print_report(
        "CVD graphene / transferred hBN (wafer)",
        RamanFeatures(twod_fwhm=30.0, twod_over_g=2.1, d_over_g=0.08),
    )
    # Graphene on amorphous SiO2: the disordered floor.
    _print_report(
        "Graphene / SiO2",
        RamanFeatures(twod_fwhm=42.0, twod_over_g=1.8, d_over_g=0.15),
    )
