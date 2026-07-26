# The Interface, Not the Atom: A Practical Guide to 2D Quantum Material Stacks

This guide unpacks the claims in the post and gives you the numbers, the physics, and the decision framework to evaluate 2D material stacks (graphene / hBN and friends) for quantum applications.

## 1. Why the substrate dominates, not the hero layer

Mobility (μ) in a 2D conductor is set by scattering. In graphene the dominant limiters at low temperature are **not** intrinsic — they are extrinsic:

- Charged impurities in / on the substrate (Coulomb scattering)
- Surface optical phonons of the dielectric (remote phonon scattering)
- Surface roughness / dangling bonds
- Charge puddles from trapped charges at the interface

On amorphous SiO2 you have dangling bonds, trapped charge, and roughness → μ ≈ 1,000–15,000 cm²/Vs typically quoted near 1,500 for a plain sheet.

On hexagonal boron nitride (hBN), the surface is atomically flat, chemically inert, dangling-bond-free, and has a large-gap phonon spectrum that suppresses remote phonon scattering → μ ≈ 100,000 cm²/Vs and higher (>1,000,000 in the best encapsulated devices).

**Takeaway:** the graphene never changed. The scattering environment did. "Atomically thin" is necessary but not the differentiator — the crystalline dielectric interface is.

## 2. Coherence in hBN spin qubits

The boron vacancy (V_B^-) center in hBN is an optically addressable spin defect. Empirically:

- Going from multilayer to monolayer host does **not** by itself buy you coherence.
- Coherence (T2) is limited by the surrounding nuclear spin bath: both boron (^10B, ^11B) and nitrogen (^14N) carry spin.
- Levers that actually move T2:
  - **Isotopic engineering**: growing h^10B N or purifying nuclear spin content reduces the bath.
  - **Strain / dynamical decoupling**: strain engineering and pulse sequences (XY8, CPMG) extend coherence.

**Takeaway:** "thinner = more coherent" is a myth. Fewer atoms ≠ fewer decoherence channels. The nuclear spin environment and control physics dominate.

## 3. The scalability gap (the real commercial question)

| Method | Typical mobility (cm²/Vs) | Wafer-scale? |
|---|---|---|
| Mechanical exfoliation | ~100,000+ | No (flakes, µm–mm) |
| CVD / grown films | ~10,000+ | Yes, but interface quality drops |

The frontier is transferring/growing films where the **interface** stays clean across a full wafer. Every scalable process trades some interface quality for area and reproducibility. That trade — not layer thickness — is the business.

## 4. The concrete tell: Raman 2D-peak linewidth

Raman spectroscopy is the cheap, fast, non-destructive QC lever.

- The graphene **2D peak** (~2680 cm⁻¹, 514 nm excitation) has a linewidth (FWHM) sensitive to substrate-induced disorder, strain inhomogeneity, and doping variation.
- A narrow 2D FWHM (~22 cm⁻¹) indicates low nanoscale strain/doping variation → high-quality interface → predicts high mobility.
- Broad 2D FWHM signals inhomogeneity that will cap device performance regardless of how thin the sheet is.

Complementary checks:
- **D peak (~1350 cm⁻¹)**: intensity relative to G peak (I_D/I_G) flags defect density.
- **2D/G intensity ratio**: high ratio (>2) consistent with monolayer, low doping.

See `raman_qc.py` for a runnable screening heuristic.

## 5. Investment / evaluation decision framework

When someone pitches a 2D quantum stack, ask:

1. **What is the dielectric/substrate, and is it crystalline?** (hBN or equivalent, not amorphous oxide)
2. **What is the interface QC metric and at what wafer coverage?** (Raman 2D FWHM map, not a single hero flake)
3. **What's the mobility distribution across a wafer, not the best data point?**
4. **For qubits: what's the nuclear spin / isotope strategy?**
5. **What is the manufacturing yield of clean boundaries?** (the actual bottleneck)

Back the cleanest, most reproducible interface at scale — not the thinnest layer.

## References / further reading (concepts)
- Remote phonon & charged-impurity scattering in graphene on hBN vs SiO2
- V_B^- spin defects in hBN; isotopic purification and coherence
- Raman signatures of strain/doping in 2D materials (Grüneisen analysis)
