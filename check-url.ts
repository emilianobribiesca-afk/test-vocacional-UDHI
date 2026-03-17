import { readFileSync } from 'fs';
const data = JSON.parse(readFileSync('test-payload.json', 'utf-8'));
const payload = JSON.stringify({ s: data.results.scores });
const encoded = Buffer.from(payload).toString('base64url');
console.log('Encoded:', encoded);
console.log('Decoded:', Buffer.from(encoded, 'base64url').toString());

// Test client-side decode
const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
try {
  const decoded = JSON.parse(atob(base64));
  console.log('Client decode OK:', JSON.stringify(decoded));
} catch(e: any) {
  console.log('Client decode FAILED:', e.message);
}
