import { readFile } from 'node:fs/promises';

for (const language of ['es', 'en', 'fr']) {
    const pdf = await readFile(new URL(`../dist/media/cv-${language}.pdf`, import.meta.url));
    if (pdf.subarray(0, 5).toString() !== '%PDF-') {
        throw new Error(`CV ${language}: el recurso no es un PDF válido.`);
    }
    const video = await readFile(new URL(`../dist/media/video-cv-${language}.mp4`, import.meta.url));
    if (video.subarray(4, 8).toString() !== 'ftyp') {
        throw new Error(`Video ${language}: el recurso no es un MP4 válido.`);
    }
}
console.log('Los tres PDF y los tres videos están incluidos en dist/media.');
