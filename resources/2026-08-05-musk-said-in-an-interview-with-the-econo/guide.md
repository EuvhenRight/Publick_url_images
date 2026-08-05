# Raw Totals vs. Rates: A Quick Data-Literacy Guide

This guide supports the LinkedIn post about comparing European heat deaths with U.S. gun deaths. The main lesson: a true number can still be misleading if it answers the wrong question.

## The core issue

A raw total answers:

> How many events happened?

A rate answers:

> How common is the event relative to the population at risk?

If two regions have different population sizes, raw totals alone are usually a weak basis for comparing individual risk.

## Example framing

Suppose we compare:

- European heat deaths: 50,000 to 68,000 per year
- U.S. gun deaths: 46,728 per year

The raw totals are close enough that someone might say:

> More people die from heat in Europe than from guns in America.

That statement may be numerically true depending on the year, geography, and source definitions. But it does not automatically mean a person in Europe faces a higher annual death risk from heat than a person in the U.S. faces from guns.

To answer the risk question, we need a denominator.

## Use deaths per 100,000 people

A common comparison is:

```text
rate per 100,000 = deaths / population * 100,000
```

For example, if a European population base is about 540 million and the U.S. population is about 335 million:

```text
50,000 European heat deaths / 540,000,000 * 100,000 ≈ 9.3 per 100,000
68,000 European heat deaths / 540,000,000 * 100,000 ≈ 12.6 per 100,000
46,728 U.S. gun deaths / 335,000,000 * 100,000 ≈ 13.9 per 100,000
```

With those illustrative denominators, the per-capita comparison looks different from the raw-total comparison.

## Questions to ask before accepting the chart

1. **Compared to what?**  
   Is the claim comparing totals, rates, risks, trends, or policy outcomes?

2. **What is the population denominator?**  
   Europe can mean the EU, the WHO European Region, continental Europe, or a study-specific set of countries. Each has a different population.

3. **Are the time windows aligned?**  
   Are both numbers from the same year or comparable multi-year averages?

4. **Are the event definitions comparable?**  
   Gun deaths may include homicide, suicide, accidents, and legal intervention depending on the source. Heat deaths may be directly certified deaths or statistically estimated excess deaths attributable to heat.

5. **Is age structure relevant?**  
   Heat mortality is strongly age-sensitive. Age-adjusted rates may be needed for deeper comparisons.

6. **Is the intended question about individual risk, public-health burden, or policy priority?**  
   Raw counts can matter for system capacity and total burden. Rates are usually better for comparing risk across populations.

## Better dashboard pattern

Instead of showing only raw totals, show both:

| Metric | Why it matters |
|---|---|
| Total deaths | Shows total burden and scale |
| Deaths per 100,000 people | Shows population-adjusted risk |
| Time trend | Shows whether risk is rising or falling |
| Definition/source note | Prevents false precision |

## Reusable rule

When a chart compares places of different sizes, ask:

> Where is the denominator?

If the denominator is missing, the chart may still be factually correct — but analytically incomplete.
