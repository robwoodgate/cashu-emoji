# cashu-emoji

Allows AI Agents (and humans) to **encode and decode hidden messages in emojis** using Unicode variation selectors.

Primary use-case: decode/encode **Cashu emoji tokens** (`cashu...`) for agent-to-agent payments.
Secondary use-case: hide **general short text messages** in an emoji, Vercel-demo style.

This repo is designed as a **Clawhub agent skill** reference: small, copy/pasteable implementation + CLI examples.

## What is this?

You can hide arbitrary UTF-8 text (e.g. a `cashuB...` token or a plain message) inside an emoji by appending Unicode **variation selectors** (VS1..VS256). Most chat apps display only the emoji, but preserve the hidden selector characters.

This implementation is based on Paul Butler’s `emoji-encoder` technique and the TypeScript adaptation used in Rob’s `nostrly` repo.

## Quick examples

### Decode (emoji/message → hidden text)

```bash
cashu-emoji decode "<paste whole message here>"
```

### Decode + show Cashu metadata (if hidden text is a Cashu token)

```bash
cashu-emoji decode "<paste whole message here>" --metadata
```

### Encode (text → emoji with hidden message)

```bash
cashu-emoji encode "🥜" "hello from inside an emoji"
```

### Encode a Cashu token for sending

```bash
cashu-emoji encode "🥜" "cashuB..."
```

Tip: Some messengers are more reliable when there is a little trailing text after the emoji token (e.g. `" ok"`).

## Test vector

See `examples/minimal-1sat-emoji.txt` for a small Cashu emoji token you can decode.
