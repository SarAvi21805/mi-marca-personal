import { Link } from 'react-router-dom';

// Only our editorial **bold** and [label](URL) notation is supported.
// HTML is never injected; React escapes plain text.
export default function ArticleText({ text }) {
    const tokens = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
    return tokens.map((token, index) => {
        if (token.startsWith('**') && token.endsWith('**')) {
            return <strong key={index}>{token.slice(2, -2)}</strong>;
        }
        const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!link) return token;
        const [, label, url] = link;
        if (url.startsWith('/') && !url.startsWith('//')) {
            return <Link key={index} to={url}>{label}</Link>;
        }
        if (url.startsWith('https://')) {
            return <a key={index} href={url} target="_blank" rel="noopener noreferrer">{label}</a>;
        }
        return label;
    });
}
