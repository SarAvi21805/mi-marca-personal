export const wordsByLanguage = {
    es: ['LUNA', 'ARTE', 'IDEAS', 'MUSICA'],
    en: ['MOON', 'ART', 'IDEAS', 'MUSIC'],
    fr: ['LUNE', 'ART', 'IDEES', 'MUSIQUE'],
};
export function createWordGrid(language) {
    const words = wordsByLanguage[language] || wordsByLanguage.es;
    const cells = Array.from({ length: 64 }, (_, i) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[(i * 17 + 11) % 26]);
    const positions = [[0, 0, 0, 1], [1, 7, 1, 0], [4, 0, 0, 1], [7, 7, 0, -1]];
    const paths = words.map((word, i) => {
        const [row, column, dr, dc] = positions[i];
        return [...word].map((letter, offset) => {
            const index = (row + dr * offset) * 8 + column + dc * offset;
            cells[index] = letter;
            return index;
        });
    });
    return { words, cells, paths };
}
export function selectedLine(start, end) {
    const row = Math.floor(start / 8), column = start % 8;
    const dy = Math.floor(end / 8) - row, dx = end % 8 - column;
    if (dx !== 0 && dy !== 0 && Math.abs(dx) !== Math.abs(dy)) return [];
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    return Array.from({ length: steps + 1 }, (_, i) => (row + Math.sign(dy) * i) * 8 + column + Math.sign(dx) * i);
}
export function matchWord(path, paths) {
    return paths.findIndex(expected => expected.length === path.length && (
        expected.every((value, i) => value === path[i]) ||
        expected.every((value, i) => value === path[path.length - i - 1])
    ));
}
