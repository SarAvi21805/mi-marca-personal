import {readdir,readFile} from 'node:fs/promises';
const assets=await readdir(new URL('../dist/assets/',import.meta.url));
const pdf=assets.find(name=>name.startsWith('cv-sarai-')&&name.endsWith('.pdf'));
if(!pdf)throw new Error('El build no incluyó el CV. No publiques esta versión.');
const bytes=await readFile(new URL(`../dist/assets/${pdf}`,import.meta.url));
if(bytes.subarray(0,5).toString()!=='%PDF-')throw new Error('El recurso del CV no es un PDF válido.');
console.log('CV PDF incluido y verificado en dist/assets.');
