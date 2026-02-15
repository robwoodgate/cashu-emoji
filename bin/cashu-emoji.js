#!/usr/bin/env node
import { encode, decode } from '../src/emoji-encoder.js';

function usage() {
  console.log(`cashu-emoji

Usage:
  cashu-emoji decode <text|-> [--metadata]
  cashu-emoji encode <emoji> <text|->

Notes:
  - Use '-' to read from stdin.
  - decode: pass the whole message (it will ignore non-variation-selector chars).
`);
}

async function readArgOrStdin(value) {
  if (value !== '-') return value;
  return await new Promise((resolve, reject) => {
    let buf = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (d) => (buf += d));
    process.stdin.on('end', () => resolve(buf));
    process.stdin.on('error', reject);
  });
}

const [,, cmd, ...args] = process.argv;
if (!cmd || cmd === '--help' || cmd === '-h') {
  usage();
  process.exit(0);
}

if (cmd === 'decode') {
  const input = args[0];
  if (!input) {
    usage();
    process.exit(2);
  }

  const wantMeta = args.includes('--metadata');
  const text = (await readArgOrStdin(input)).trimEnd();
  const out = decode(text);
  process.stdout.write(out + '\n');

  if (wantMeta) {
    if (!out.startsWith('cashu')) {
      process.stderr.write('metadata: decoded text does not look like a cashu token (does not start with "cashu")\n');
    } else {
      try {
        const { getTokenMetadata } = await import('@cashu/cashu-ts');
        const meta = getTokenMetadata(out);
        process.stderr.write(`mint: ${meta.mint}\nunit: ${meta.unit}\namount: ${meta.amount}\n`);
      } catch (e) {
        process.stderr.write(`metadata error: ${(e && e.message) ? e.message : String(e)}\n`);
      }
    }
  }

  process.exit(0);
}

if (cmd === 'encode') {
  const emoji = args[0];
  const input = args[1];
  if (!emoji || !input) {
    usage();
    process.exit(2);
  }

  const text = await readArgOrStdin(input);
  const out = encode(emoji, text.trimEnd());
  process.stdout.write(out + '\n');
  process.exit(0);
}

usage();
process.exit(2);
