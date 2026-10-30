// Las preferencias no son analítica. El almacenamiento puede estar bloqueado.
export function readSetting(key, fallback, session = false) {
  try { const raw = (session ? sessionStorage : localStorage).getItem(`sarai:${key}`); return raw === null ? fallback : JSON.parse(raw); }
  catch { return fallback; }
}
export function saveSetting(key, value, session = false) {
  try { (session ? sessionStorage : localStorage).setItem(`sarai:${key}`, JSON.stringify(value)); } catch { /* La página funciona sin almacenamiento. */ }
}
let visitRequest;
export function registerVisit(endpoint) {
  if (!endpoint) return Promise.resolve(null);
  // Una única petición por carga, incluso bajo React StrictMode.
  if (!visitRequest) {
    let id = readSetting('visit-session', null, true);
    if (typeof id !== 'string') { id = crypto.randomUUID(); saveSetting('visit-session', id, true); }
    visitRequest = (async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      try {
        const response = await fetch(endpoint, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({sessionId:id}), signal: controller.signal, credentials: 'omit' });
        if (!response.ok) throw new Error('Contador no disponible');
        const data = await response.json();
        return Number.isSafeInteger(data.visitNumber) && data.visitNumber > 0 ? data.visitNumber : null;
      } catch { return null; } finally { clearTimeout(timeout); }
    })();
  }
  return visitRequest;
}
