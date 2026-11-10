import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {afterEach,describe,expect,it} from 'vitest';
import {writeReviewExport} from './review-export-format.mjs';

const tempDirs=[];
afterEach(async()=>{await Promise.all(tempDirs.splice(0).map(dir=>rm(dir,{recursive:true,force:true})));});

describe('review export formatting',()=>{
 it('writes real line breaks and no literal backslash-n sequences',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'syj-review-export-'));
  tempDirs.push(dir);
  const outputPath=join(dir,'review.txt');
  await writeReviewExport(outputPath,['DAY 1 — ENGLISH','Q1. Example']);
  const output=await readFile(outputPath,'utf8');
  expect(output).toBe('DAY 1 — ENGLISH\nQ1. Example\n');
  expect(output).not.toContain(String.raw`\n`);
 });
});
