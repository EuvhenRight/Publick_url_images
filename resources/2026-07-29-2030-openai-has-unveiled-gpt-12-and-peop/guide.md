# Centering a Div: The Complete Reference

The LinkedIn post makes a fun point: LLMs fumble "simple" visual tasks because they can't *see* the result. The fix for humans is knowing the handful of reliable centering techniques and *why* they work. This guide gives you those techniques so you never have to guess.

## The Mental Model

Centering means answering two questions:
1. Center along which axis? (horizontal, vertical, or both)
2. What is the containing context? (flexbox, grid, block flow, absolute positioning)

Once you know both, the answer is deterministic.

## Method 1: Flexbox (recommended default)

```css
.parent {
  display: flex;
  justify-content: center; /* main axis (horizontal by default) */
  align-items: center;     /* cross axis (vertical by default) */
}
```

Works for one or many children. `justify-content` follows the `flex-direction`.

## Method 2: Grid (shortest for both axes)

```css
.parent {
  display: grid;
  place-items: center; /* shorthand for align-items + justify-items */
}
```

`place-items: center` is the cleanest single-line solution for centering one item both ways.

## Method 3: Absolute positioning + transform

Useful when the child must be removed from normal flow (overlays, modals).

```css
.parent { position: relative; }
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

The `translate(-50%, -50%)` shifts the element back by half *its own* size, which is why it works for elements of unknown dimensions.

## Method 4: Horizontal-only for block elements

```css
.child {
  width: 200px; /* must have a defined width */
  margin-inline: auto; /* or margin: 0 auto; */
}
```

Only centers horizontally, and only when the element has a width narrower than its parent.

## Method 5: Centering text / inline content

```css
.parent {
  text-align: center; /* horizontal for inline / inline-block children */
  line-height: 200px; /* crude vertical centering for a single text line */
}
```

Prefer flexbox over the `line-height` trick for anything beyond a single line.

## Decision Table

| Need | Best choice |
|------|-------------|
| One item, both axes | `display: grid; place-items: center;` |
| Multiple items in a row/column | flexbox |
| Element out of flow (modal/overlay) | absolute + translate |
| Just horizontal, known width | `margin-inline: auto` |
| Just text | `text-align: center` |

## Common Gotchas

- **Nothing happens with flexbox?** Check that the parent actually has extra space (height often collapses to content). Give the parent a height.
- **`margin: auto` doesn't center vertically** in normal block flow — that's expected. Use flex/grid.
- **`vertical-align: middle` only affects inline/inline-block/table-cell elements**, not block layout.
- **`align-items` vs `justify-content`** swap meaning if you change `flex-direction`.

## Why AI Still Fumbles This

A text model predicts plausible CSS but cannot render and inspect the output. When several methods are plausible it may mix them (e.g. `margin: auto` on a flex child *plus* `justify-content`), producing code that looks right and behaves oddly. The remedy is the same for humans and machines: verify against a rendered result. Use the example file to see each method live.
