---
name: cashu-emoji
description: Encode and decode Cashu tokens that are hidden inside emojis using Unicode variation selectors.
metadata:
  openclaw:
    emoji: "🥜"
    examples:
      - "Decode an emoji token from a full chat message"
      - "Encode a Cashu token into an emoji for sending"
---

# Cashu Emoji Tokens (Variation Selector encoding)

This skill helps agents **decode** Cashu tokens received as emoji (and **encode** tokens for sending).

## Why this exists

Some services embed a `cashu...` token into an emoji using Unicode variation selectors (VS1..VS256). Chat apps often display only the emoji, but preserve the hidden selector characters.

Important: many messengers can *truncate or normalize* Unicode. If the variation selectors are lost, the embedded token cannot be recovered.

## What you can do

### 1) Decode

- Input: entire message text (may include other text/emojis)
- Output: the embedded UTF‑8 text, usually a `cashuA...`/`cashuB...` token

```bash
cashu-emoji decode "<paste entire message>"
```

### 2) Encode

- Input: a carrier emoji (recommend `🥜`) and a token string
- Output: an emoji string that visually looks like the emoji but contains the hidden token

```bash
cashu-emoji encode "🥜" "cashuB..."
```

Tip: adding a short trailing sentinel (e.g. `" ok"`) after the emoji token can reduce the chance some messengers “corrupt” the token.

## Optional metadata

To sanity-check the decoded token without redeeming it, you can request metadata:

```bash
cashu-emoji decode "<message>" --metadata
```

This prints mint/unit/amount using `@cashu/cashu-ts` `getTokenMetadata()` (no mint calls).

## Files

- `src/emoji-encoder.ts`: core encode/decode
- `bin/cashu-emoji.js`: CLI wrapper
- `examples/`: test vectors

## Safety

This tool only encodes/decodes text. It does not spend funds.
