#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {readFileSync, writeFileSync, existsSync} from 'node:fs';
import {dirname, isAbsolute, join} from 'node:path';
import {parseArgs} from 'node:util';

const {values} = parseArgs({options:{project:{type:'string'},mode:{type:'string'}}});
if (!values.project || !isAbsolute(values.project)) throw new Error('--project requires an absolute path.');
if (!['baseline','implemented'].includes(values.mode)) throw new Error('--mode is baseline or implemented.');
const file = join(values.project,'src/hello.mjs');
const results = [[],['--upper']].map(args => {
  const run = spawnSync(process.execPath,[file,...args]);
  const expected = args.length && values.mode === 'implemented' ? Buffer.from('HELLO\n') : Buffer.from('hello\n');
  return {args,status:run.status,signal:run.signal,error:run.error?.message??null,
    stdoutHex:run.stdout?.toString('hex')??null,stderrHex:run.stderr?.toString('hex')??null,
    expectedStdoutHex:expected.toString('hex'),
    passed:!run.error && run.status===0 && run.stdout.equals(expected) && run.stderr.length===0};
});
const report = {mode:values.mode,node:process.execPath,time:new Date().toISOString(),
  sourceSha256:createHash('sha256').update(readFileSync(file)).digest('hex'),results,
  passed:results.every(r=>r.passed),
  note:values.mode==='baseline'?'The --upper observation only proves that the future feature is not implemented; it is not a baseline business requirement.':'Independent byte-level check; does not replace Playbook completion and review evidence.'};
const evidence = join(dirname(values.project),'evidence');
if (existsSync(evidence)) writeFileSync(join(evidence,`hello-${values.mode}-${Date.now()}.json`),JSON.stringify(report,null,2)+'\n',{flag:'wx'});
process.stdout.write(JSON.stringify(report,null,2)+'\n');
if (!report.passed) process.exitCode=1;
