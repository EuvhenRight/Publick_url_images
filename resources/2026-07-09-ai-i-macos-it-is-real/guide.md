# Getting Started with Apple's Foundation Models Framework

The post argues that the real story of Apple Intelligence isn't the consumer
features — it's the **Foundation Models framework**: native Swift access to an
on-device large language model with zero token cost and no cloud bill.

This guide shows you how to actually build something with it.

## Requirements

- **macOS 26 (Tahoe)** or **iOS 26** / iPadOS 26 / visionOS 26 SDKs
- **Xcode 26** or later
- **Apple Silicon** device (the on-device model runs locally)
- Apple Intelligence enabled in System Settings

> Note: The framework is `import FoundationModels`. It exposes the same ~3B
> parameter on-device model that powers system features like Writing Tools.
> It is **not** a replacement for large cloud models — it's optimized for
> focused, on-device tasks (summarization, extraction, classification,
> short generation, tool calling).

## Core Concepts

| Concept | Type | Purpose |
|--------|------|---------|
| Model availability | `SystemLanguageModel.default.availability` | Check the model can run before using it |
| Session | `LanguageModelSession` | A stateful conversation context |
| Prompting | `session.respond(to:)` | Send a prompt, get a response |
| Guided generation | `@Generable` / `@Guide` | Get typed, structured Swift output |
| Tool calling | `Tool` protocol | Let the model call your functions |
| Streaming | `session.streamResponse(to:)` | Token-by-token output |

## 1. Check availability first

The model may be unavailable (device not supported, Apple Intelligence off,
model still downloading). Always branch on it:

```swift
import FoundationModels

let model = SystemLanguageModel.default

switch model.availability {
case .available:
    // Safe to create sessions
    break
case .unavailable(.deviceNotEligible):
    print("This device can't run the on-device model.")
case .unavailable(.appleIntelligenceNotEnabled):
    print("Ask the user to enable Apple Intelligence in Settings.")
case .unavailable(.modelNotReady):
    print("Model is downloading / not ready yet. Try again later.")
case .unavailable(let other):
    print("Unavailable: \(other)")
}
```

## 2. A basic prompt

```swift
let session = LanguageModelSession()
let response = try await session.respond(
    to: "Summarize this in one sentence: \(articleText)"
)
print(response.content)
```

Sessions retain context across calls, so follow-ups work:

```swift
_ = try await session.respond(to: "Now list the three key points.")
```

## 3. Guided generation (typed output)

Instead of parsing free text, describe a Swift type and let the model fill it in.

```swift
import FoundationModels

@Generable
struct Recipe {
    @Guide(description: "A short, appetizing title")
    var title: String

    @Guide(description: "Total minutes to prepare and cook")
    var totalMinutes: Int

    @Guide(description: "Ingredient lines, e.g. '2 eggs'")
    var ingredients: [String]
}

let session = LanguageModelSession()
let recipe = try await session.respond(
    to: "Give me a quick weeknight pasta recipe.",
    generating: Recipe.self
).content

print(recipe.title, recipe.totalMinutes)
```

Guided generation constrains decoding so the output is valid for your type —
no brittle JSON string parsing.

## 4. Tool calling

Let the model invoke your own code when it needs live data.

```swift
import FoundationModels

struct WeatherTool: Tool {
    let name = "getWeather"
    let description = "Get the current temperature for a city."

    @Generable
    struct Arguments {
        @Guide(description: "City name")
        var city: String
    }

    func call(arguments: Arguments) async throws -> String {
        // Replace with a real lookup.
        return "It is 21°C in \(arguments.city)."
    }
}

let session = LanguageModelSession(tools: [WeatherTool()])
let answer = try await session.respond(
    to: "Should I bring a jacket in Kraków today?"
)
print(answer.content)
```

## 5. Streaming

```swift
let session = LanguageModelSession()
for try await partial in session.streamResponse(to: "Write a haiku about Swift.") {
    print(partial.content, terminator: "")
}
```

## Practical guidance

- **Keep tasks focused.** On-device models excel at bounded jobs, not open-ended
  reasoning. Summarize, extract, tag, rewrite.
- **Set expectations in the prompt.** A system-style instruction improves
  consistency (see `prompt.md`).
- **Handle unavailability gracefully.** Offer a fallback UI path when the model
  can't run.
- **Privacy is the selling point.** Data stays on device; there's no per-call
  cost, so you can afford to call it liberally.
- **Don't ship the framework as your only path.** Older devices won't have it.

## Where it fits vs. cloud LLMs

| Use on-device (Foundation Models) | Use cloud |
|-----------------------------------|-----------|
| Private data, offline, low latency | Very large context / heavy reasoning |
| Free per-call, high volume | Latest frontier capabilities |
| Short structured tasks | Long-form multi-step generation |

That's the point the post makes: the plumbing shipped. Now go build on it.
