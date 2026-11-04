#!/usr/bin/env node
import {cpSync, existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {dirname, isAbsolute, join, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseArgs} from 'node:util';
import {createHash} from 'node:crypto';

const materials = dirname(dirname(fileURLToPath(import.meta.url)));
const {values} = parseArgs({options: {root: {type: 'string'}, host: {type: 'string'}}});
if (!values.root || !isAbsolute(values.root)) throw new Error('--root requires a new absolute run directory.');
if (!['codex','claude'].includes(values.host)) throw new Error('--host must be codex or claude.');
const root = resolve(values.root);
if (existsSync(root)) throw new Error('Run directory already exists; choose another name. No existing files were changed.');
const within = relative(materials, root);
if (!within.startsWith('..') && !isAbsolute(within)) throw new Error('Place the run outside the materials checkout.');
const git = (args, cwd = materials) => execFileSync('git', args, {cwd, encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
const gitVersion = git(['--version']);
mkdirSync(root, {recursive:true});
const project = join(root,'playbook-demo');
const specProject = join(root,'spec-init');
const evidence = join(root,'evidence');
mkdirSync(specProject); mkdirSync(evidence);
cpSync(join(materials,'fixtures/hello-world'), project, {recursive:true});
git(['init','-q','-b','acceptance/manual'],project);
git(['config','user.name','Skill Acceptance Tester'],project);
git(['config','user.email','skill-acceptance@example.invalid'],project);
git(['config','commit.gpgsign','false'],project);
git(['config','core.autocrlf','false'],project);
git(['add','.'],project);
git(['commit','-qm','test: initial Hello World baseline'],project);
git(['tag','fixture-baseline'],project);
let materialsCommit = null;
try { materialsCommit = git(['rev-parse','HEAD']); } catch {}
const hashes = {};
for (const file of ['src/hello.mjs','test/hello.test.mjs','REQUIREMENTS.md','LICENSE']) {
  hashes[file] = createHash('sha256').update(readFileSync(join(project,file))).digest('hex');
}
const result = {
  root,host:values.host,materials,materialsCommit,project,specProject,evidence,
  spexHome:join(root,'spex-home'),node:process.execPath,nodeVersion:process.version,
  platform:process.platform,arch:process.arch,gitVersion,baselineCommit:git(['rev-parse','HEAD'],project),
  baselineHashes:hashes,versions:JSON.parse(readFileSync(join(materials,'versions.json'),'utf8')),
  note:'Preparation only. No Skill or Playbook has been executed by this script.'
};
writeFileSync(join(evidence,'run.json'),JSON.stringify(result,null,2)+'\n',{flag:'wx'});
writeFileSync(join(evidence,'RESULTS.md'),readFileSync(join(materials,'docs/RESULTS-TEMPLATE.md')),{flag:'wx'});
process.stdout.write(JSON.stringify(result,null,2)+'\n');
