// SPDX-License-Identifier: Apache-2.0
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

test('HELLO-01: the real CLI returns hello followed by LF', () => {
  const result = spawnSync(process.execPath, [fileURLToPath(new URL('../src/hello.mjs', import.meta.url))]);
  assert.ifError(result.error);
  assert.equal(result.status, 0);
  assert.deepEqual(result.stdout, Buffer.from('hello\n'));
  assert.deepEqual(result.stderr, Buffer.alloc(0));
});
