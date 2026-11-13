import test from 'node:test';
import assert from 'node:assert/strict';
import {createWordGrid,selectedLine,matchWord} from '../src/components/game-utils.js';
import {portfolioData,personalFacts,teaching,choose} from '../src/localized-content.js';

test('word searches are solvable in all three languages and both directions',()=>{
 for(const language of ['es','en','fr']){
  const {words,cells,paths}=createWordGrid(language);
  assert.equal(cells.length,64);
  paths.forEach((path,i)=>{
   assert.equal(path.map(index=>cells[index]).join(''),words[i]);
   assert.equal(matchWord(selectedLine(path[0],path.at(-1)),paths),i);
   assert.equal(matchWord(selectedLine(path.at(-1),path[0]),paths),i);
   assert.ok(path.every(index=>index>=0&&index<64));
  });
  assert.equal(matchWord([9],paths),-1);
 }
 assert.deepEqual(selectedLine(0,10),[]);
});
test('portfolio roles, personal facts and teaching dates have ES/EN/FR',()=>{
 for(const language of ['es','en','fr']){
  for(const project of portfolioData){for(const key of ['description','role','value','category']){assert.equal(project[key].length,3);assert.ok(choose(project[key],language).length>5);}}
  personalFacts.forEach(fact=>{assert.equal(fact.length,3);assert.ok(choose(fact,language));});
  teaching.forEach(item=>{assert.equal(item.course.length,3);assert.equal(item.period.length,3);});
 }
 assert.equal(new Set(portfolioData.map(p=>p.id)).size,portfolioData.length);
 assert.ok(portfolioData.length>=4);
 assert.ok(portfolioData.find(p=>p.id==='vive').demoVideo);
});
