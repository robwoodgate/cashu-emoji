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

This skill helps agents **decode** Cashu tokens received as emoji (and **encode** tokens for sending), and it also supports **general hidden messages inside emojis**.

If the decoded text starts with `cashu`, it’s likely a Cashu token. Otherwise treat it as a plain hidden message.

## Why this exists

Some services embed a `cashu...` token into an emoji using Unicode variation selectors (VS1..VS256). Chat apps often display only the emoji, but preserve the hidden selector characters.

Important: many messengers can *truncate or normalize* Unicode. If the variation selectors are lost, the embedded token cannot be recovered.

## What you can do

## Quickstart (copy/paste)

```bash
git clone https://github.com/robwoodgate/cashu-emoji.git
cd cashu-emoji
npm ci

# decode a whole message (recommended)
node ./bin/cashu-emoji.js decode "<paste message>"

# decode and print mint/unit/amount if it’s a cashu token
node ./bin/cashu-emoji.js decode "<paste message>" --metadata

# encode a hidden message
node ./bin/cashu-emoji.js encode "🥜" "hello from inside an emoji"

# encode a cashu token
node ./bin/cashu-emoji.js encode "🥜" "cashuB..."
```

## What you can do

### 1) Decode

- Input: entire message text (may include other text/emojis)
- Output: the embedded UTF‑8 text, usually a `cashuA...`/`cashuB...` token

```bash
cashu-emoji decode "<paste entire message>"
```

Decode semantics (important): the decoder ignores normal characters until it finds the first variation-selector byte, then collects bytes until the first normal character after that payload begins.

### 2) Encode

- Input: a carrier emoji (recommend `🥜`) and a token string
- Output: an emoji string that visually looks like the emoji but contains the hidden token

```bash
cashu-emoji encode "🥜" "cashuB..."
```

Tip: some messengers are less likely to deliver a *truncated/corrupted* emoji-token if **any normal text follows it** (even a single character). It’s not required, just a delivery reliability trick.

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
