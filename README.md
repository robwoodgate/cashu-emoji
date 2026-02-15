# cashu-emoji

Encode/decode Cashu tokens hidden inside emoji variation selectors.

This repo is designed as a **Clawhub agent skill** reference: a small, copy/pasteable implementation + CLI examples.

## What is this?

You can hide arbitrary UTF-8 text (e.g. a `cashuB...` token) inside an emoji by appending Unicode **variation selectors** (VS1..VS256). Most chat apps display only the emoji, but preserve the hidden selector characters.

This implementation is based on Paul Butler’s `emoji-encoder` technique and the TypeScript adaptation used in Rob’s `nostrly` repo.

## Quick examples

### Decode (emoji/message → cashu token)

```bash
cashu-emoji decode "<paste whole message here>"
```

### Encode (cashu token → emoji token)

```bash
cashu-emoji encode "🥜" "cashuB..."
```

Tip: Some messengers are more reliable when there is a little trailing text after the emoji token (e.g. `" ok"`).

## Test vector

See `examples/minimal-1sat-emoji.txt` for a small emoji token you can decode.
