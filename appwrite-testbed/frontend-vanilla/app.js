const meta = document.getElementById("meta");

const outAppwrite = document.getElementById("outAppwrite");
const outApi = document.getElementById("outApi");
const outEcho = document.getElementById("outEcho");

const btnAppwrite = document.getElementById("btnAppwrite");
const btnApi = document.getElementById("btnApi");
const btnEcho = document.getElementById("btnEcho");

const cfg = window.APP || {};
const AW_EP = cfg.APPWRITE_ENDPOINT || "";
const AW_PID = cfg.APPWRITE_PROJECT_ID || "";
const API = cfg.API_BASE || "";

meta.textContent = `Site: ${location.origin} | Appwrite: ${AW_EP} | API: ${API}`;

function pretty(x){
  if (typeof x === "string") return x;
  try { return JSON.stringify(x, null, 2); } catch { return String(x); }
}

async function safeFetch(url, opts){
  const res = await fetch(url, opts);
  const text = await res.text();
  let body = text;
  try { body = JSON.parse(text); } catch {}
  return { ok: res.ok, status: res.status, body };
}

btnAppwrite.addEventListener("click", async () => {
  outAppwrite.textContent = "Loading...";
  try{
    const r = await safeFetch(`${AW_EP}/ping`, {
      method: "GET",
      headers: { "X-Appwrite-Project": AW_PID }
    });
    outAppwrite.textContent = pretty(r);
  } catch (e){
    outAppwrite.textContent = `Error: ${e?.message || e}`;
  }
});

btnApi.addEventListener("click", async () => {
  outApi.textContent = "Loading...";
  try{
    const r = await safeFetch(`${API}/ping`);
    outApi.textContent = pretty(r);
  } catch (e){
    outApi.textContent = `Error: ${e?.message || e}`;
  }
});

btnEcho.addEventListener("click", async () => {
  outEcho.textContent = "Loading...";
  try{
    const r = await safeFetch(`${API}/echo`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ hello: "world", at: new Date().toISOString() })
    });
    outEcho.textContent = pretty(r);
  } catch (e){
    outEcho.textContent = `Error: ${e?.message || e}`;
  }
});
