import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync, spawnSync} from 'node:child_process';
import {existsSync,mkdtempSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
const script=name=>fileURLToPath(new URL(`../scripts/${name}.mjs`,import.meta.url));

test('preparation creates isolated baseline and preserves it on duplicate preparation',t=>{
  const temp=mkdtempSync(join(tmpdir(),'skill 验收 materials '));
  t.after(()=>rmSync(temp,{recursive:true,force:true}));
  const root=join(temp,'new run');
  const run=JSON.parse(execFileSync(process.execPath,[script('prepare-fixtures'),'--root',root,'--host','codex'],{encoding:'utf8'}));
  assert.equal(existsSync(join(run.project,'specs')),false);
  assert.equal(existsSync(join(run.specProject,'specs')),false);
  const testRun=spawnSync(process.execPath,['--test','test/hello.test.mjs'],{cwd:run.project,encoding:'utf8'});
  assert.equal(testRun.status,0,testRun.stderr+testRun.stdout);
  const report=JSON.parse(execFileSync(process.execPath,[script('assert-hello'),'--project',run.project,'--mode','baseline'],{encoding:'utf8'}));
  assert.equal(report.passed,true);
  const bad=spawnSync(process.execPath,[script('assert-hello'),'--project',run.project,'--mode','implemented'],{encoding:'utf8'});
  assert.equal(bad.status,1,'an unimplemented feature cannot pass the post-code check');
  const before=readFileSync(join(run.project,'src/hello.mjs'),'utf8');
  const duplicate=spawnSync(process.execPath,[script('prepare-fixtures'),'--root',root,'--host','codex']);
  assert.equal(duplicate.status,1);
  assert.equal(readFileSync(join(run.project,'src/hello.mjs'),'utf8'),before);
  assert.equal(execFileSync('git',['status','--porcelain'],{cwd:run.project,encoding:'utf8'}),'');
});
