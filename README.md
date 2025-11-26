# Finanze App - Frontend

Frontend dell'applicazione per la gestione delle finanze personali, sviluppato con Vue.js 3, Vite e TailwindCSS.

## Tecnologie

- Vue.js 3 (Composition API)
- Vite (Build tool)
- Vue Router (Routing)
- Pinia (State management)
- TailwindCSS (Styling)
- Chart.js (Grafici interattivi)
- Axios (HTTP client)

## Installazione

```bash
npm install
```

## Sviluppo

Avvia il server di sviluppo:

```bash
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:5173`

## Build per Produzione

```bash
npm run build
```

I file compilati saranno generati nella cartella `dist/`

## Configurazione

### Variabili d'Ambiente

Crea un file `.env` nella root del progetto per configurare l'URL dell'API:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

In produzione, modifica l'URL con quello del tuo backend.

## Struttura del Progetto

```
frontend/
├── public/          # File statici
├── src/
│   ├── assets/      # Risorse statiche
│   ├── components/  # Componenti Vue riutilizzabili
│   ├── router/      # Configurazione Vue Router
│   ├── services/    # Servizi API
│   ├── stores/      # Store Pinia per state management
│   ├── views/       # Pagine dell'applicazione
│   ├── App.vue      # Componente principale
│   ├── main.js      # Entry point dell'applicazione
│   └── style.css    # Stili globali e TailwindCSS
├── index.html
├── package.json
└── vite.config.js
```

## Funzionalità

- Landing page con presentazione dell'applicazione
- Sistema di autenticazione (Login e Registrazione)
- Dashboard con statistiche finanziarie e grafici
- Gestione completa delle transazioni (creazione, modifica, eliminazione)
- Filtri avanzati per ricerca transazioni
- Confronto tra periodi finanziari
- Esportazione dati in formato Excel e PDF
- Design responsive per dispositivi mobili e desktop

## Requisiti

- Node.js 16+ e npm
- Backend API in esecuzione su `http://localhost:8000` (per sviluppo locale)
- Browser moderno con supporto ES6+

## Deploy su GitHub

Per caricare il progetto su GitHub, esegui i seguenti comandi dalla cartella frontend:

```bash
git init
git add .
git commit -m "Initial commit: Frontend Finanze App"
git remote add origin https://github.com/MFSilvers/Finanza-Front-end.git
git branch -M main
git push -u origin main
```

Nota: Assicurati di avere Git installato. Se richiesto, usa un Personal Access Token invece della password GitHub.

