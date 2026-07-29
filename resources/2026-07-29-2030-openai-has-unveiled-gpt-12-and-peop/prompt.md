# Prompt Template: Getting CSS Layout Help from an LLM (that you can actually verify)

The post's core insight: an LLM "doesn't have eyeballs." So make it produce something you *can* look at, and make it state its assumptions so you can catch flipped logic.

## Copy-paste prompt

```
You are helping me center an element with CSS. You cannot see rendered output,
so follow these rules:

1. First restate my layout in plain terms:
   - Which axis do I want centered? (horizontal / vertical / both)
   - What is the parent's display context? (block / flex / grid / positioned)
   - Does the parent have a defined height?
2. Pick ONE technique from: flexbox, grid place-items, absolute+transform,
   or margin-inline:auto. Do not mix techniques for the same axis.
3. Give me the complete, minimal CSS + HTML I can paste into a blank .html file.
4. List the assumptions you made and one thing to check if it looks wrong.

My situation:
- Element to center: [e.g. a button]
- Parent: [e.g. a 300px-tall card with display:block]
- Axis: [horizontal / vertical / both]
- Constraints: [e.g. must not affect other children / must be an overlay]
```

## Why this works

- **Forces the model to restate the problem** — surfaces misread requirements before code.
- **Forbids mixing techniques** — the #1 cause of "looks right, behaves wrong" CSS from LLMs.
- **Demands a runnable snippet** — gives you eyeballs where the model has none.
- **Requests assumptions + a check** — turns a guess into something verifiable.

## Follow-up prompt when it's still wrong

```
Here is what actually rendered: [describe or screenshot]. It differs from what I
wanted because [describe]. Which of your stated assumptions was false, and give
me the corrected minimal snippet only.
```
