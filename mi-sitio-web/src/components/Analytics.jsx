import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

let trackerPromise;
let lastPath;

function loadTracker() {
    const id = import.meta.env.VITE_UMAMI_WEBSITE_ID?.trim();
    const src = import.meta.env.VITE_UMAMI_SCRIPT_URL?.trim();
    if (!import.meta.env.PROD || !id || !src) return Promise.resolve(null);
    if (!['saravi.codes', 'www.saravi.codes'].includes(window.location.hostname)) return Promise.resolve(null);
    try { if (new URL(src).protocol !== 'https:') return Promise.resolve(null); }
    catch { return Promise.resolve(null); }
    if (!trackerPromise) {
        trackerPromise = new Promise(resolve => {
            const script = document.createElement('script');
            script.src = src;
            script.defer = true;
            script.dataset.websiteId = id;
            script.dataset.autoTrack = 'false';
            script.dataset.domains = 'saravi.codes,www.saravi.codes';
            script.onload = () => resolve(window.umami || null);
            script.onerror = () => resolve(null);
            document.head.appendChild(script);
        });
    }
    return trackerPromise;
}

export default function Analytics() {
    const { pathname } = useLocation();
    useEffect(() => {
        let active = true;
        loadTracker().then(tracker => {
            if (!active || !tracker || lastPath === pathname) return;
            // HashRouter pages counted separately; no form values or query strings.
            const request = tracker.track(props => ({
                ...props,
                url: '/#' + pathname,
                referrer: document.referrer ? new URL(document.referrer).origin : ''
            }));
            lastPath = pathname;
            Promise.resolve(request).catch(() => {});
        }).catch(() => {});
        return () => { active = false; };
    }, [pathname]);
    return null;
}
