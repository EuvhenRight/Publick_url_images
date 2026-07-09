# Reusable Prompt Patterns for On-Device Foundation Models

The on-device model is smaller than a frontier cloud model, so prompt clarity
matters more. These patterns keep output focused and reliable.

## 1. Structured extraction

> You are a precise extraction assistant. From the text below, extract only the
> requested fields. If a field is not present, leave it empty. Do not invent
> information.
>
> Text:
> """
> {INPUT}
> """

Pair this with a `@Generable` struct for guaranteed typed output.

## 2. Summarization with a hard length limit

> Summarize the following in at most {N} words. Preserve the key facts. Do not
> add opinions or information that isn't in the source.
>
> """
> {INPUT}
> """

## 3. Classification

> Classify the message into exactly one of these categories: {CATEGORY_LIST}.
> Respond with only the category name.
>
> Message: "{INPUT}"

## 4. Rewrite / tone adjustment (Writing-Tools style)

> Rewrite the text below to be {TONE} while keeping the original meaning and
> approximate length. Return only the rewritten text.
>
> """
> {INPUT}
> """

## 5. Tool-calling nudge

> Answer the user's question. If you need current or external data, call the
> available tools rather than guessing. Only give a final answer once you have
> the needed information.
>
> Question: {INPUT}

## Tips for small on-device models

- **One task per prompt.** Chaining many instructions degrades quality.
- **Show the shape you want.** A one-line example beats a paragraph of rules.
- **Constrain the output.** "Respond with only X" reduces rambling.
- **Prefer guided generation** over asking for JSON in free text.
- **Avoid open-ended reasoning chains** — offload multi-step logic to code.
