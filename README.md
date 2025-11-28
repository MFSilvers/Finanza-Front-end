# Finanze App - Gestione Finanze Personali

Finanze App è una web application full-stack per la gestione delle finanze personali. Permette di tracciare entrate e spese, analizzare i dati tramite grafici interattivi e prendere il controllo del proprio budget.

## ✨ Funzionalità Principali

- **Landing Page Pubblica**: Una pagina di presentazione elegante e moderna con animazioni e demo.
- **Autenticazione Sicura**: Registrazione e login basati su JWT (JSON Web Tokens) con hashing delle password.
- **Gestione Transazioni**: CRUD completo per entrate e spese, con supporto per transazioni ricorrenti (giornaliere, settimanali, mensili, annuali).
- **Dashboard Interattiva**: Visualizzazione del saldo totale, grafici per spese/entrate per categoria e andamento mensile.
- **Filtri Avanzati**: Filtra le transazioni per tipo, categoria e intervallo di date.
- **Confronto Periodi**: Confronta le performance finanziarie di due periodi diversi con grafici affiancati.
- **Esportazione Dati**: Esporta i dati delle transazioni in formato **Excel (.xlsx)** e i report di confronto in **PDF**.
- **Design Responsive**: Interfaccia mobile-first, completamente navigabile da qualsiasi dispositivo.
- **API RESTful**: Backend con API ben definite per una chiara separazione tra frontend e backend.

## 🚀 Tecnologie Utilizzate

### Frontend

- **Vue.js 3** (Composition API)
- **Vite** (Build tool)
- **Vue Router** (Routing lato client)
- **Pinia** (State management)
- **Axios** (Client HTTP)
- **TailwindCSS** (Framework CSS utility-first)
- **Chart.js** (Grafici interattivi)
- **SheetJS (xlsx)** (Esportazione Excel)
- **jsPDF & html2canvas** (Esportazione PDF)

### Backend

- **PHP 8+** (Nativo, senza framework)
- **PDO** (Interazione con il database)
- **MySQL** (Database relazionale)
- **JWT** (Autenticazione stateless)

## 🛠️ Setup e Installazione

### Prerequisiti

- **Node.js** e **pnpm** (o npm/yarn)
- **PHP 8+**
- **MySQL** (o un altro database compatibile come MariaDB)
- Un server web come **Apache** o **Nginx** (o il server di sviluppo integrato di PHP)

### 1. Setup del Backend

1.  **Clona il progetto**:
    ```bash
    git clone <repository_url>
    cd finanze-app
    ```

2.  **Crea il database**:
    - Accedi al tuo client MySQL.
    - Esegui lo script `database/schema.sql` per creare il database `finanze_app` e le relative tabelle.
    ```sql
    CREATE DATABASE IF NOT EXISTS finanze_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    USE finanze_app;
    -- ... (contenuto di schema.sql)
    ```

3.  **Popola il database (opzionale)**:
    - Esegui lo script `database/seed.sql` per inserire un utente demo e dati di esempio.
    - **Utente Demo**: `demo@finanze.app`
    - **Password**: `demo123`

4.  **Configura la connessione al database**:
    - Apri il file `backend/config/database.php`.
    - Modifica le credenziali (`$host`, `$db_name`, `$username`, `$password`) per farle corrispondere alla tua configurazione MySQL.

5.  **Configura la chiave segreta JWT**:
    - Apri il file `backend/utils/JWT.php`.
    - Cambia il valore di `$secret_key` con una stringa casuale e sicura.

6.  **Avvia il server PHP**:
    - Naviga nella cartella `backend`.
    - Avvia il server di sviluppo integrato di PHP (o configura il tuo server web per puntare a questa cartella).
    ```bash
    cd backend
    php -S localhost:8000
    ```
    L'API sarà disponibile all'indirizzo `http://localhost:8000/api`.

### 2. Setup del Frontend

1.  **Naviga nella cartella del frontend**:
    ```bash
    cd ../frontend
    ```

2.  **Installa le dipendenze**:
    ```bash
    pnpm install
    ```

3.  **Configura l'URL dell'API**:
    - Apri il file `frontend/src/services/api.js`.
    - Assicurati che `baseURL` corrisponda all'indirizzo del tuo server backend (di default `http://localhost:8000/api`).

4.  **Avvia il server di sviluppo Vite**:
    ```bash
    pnpm dev
    ```
    L'applicazione sarà accessibile all'indirizzo `http://localhost:5173`.

## 📝 Struttura del Progetto

```
finanze-app/
├── backend/                # Codice del backend PHP
│   ├── api/                # Endpoint dell'API (auth, transactions, etc.)
│   ├── config/             # Configurazione (database)
│   ├── middleware/         # Middleware (autenticazione)
│   ├── utils/              # Utility (JWT, helpers)
│   ├── .htaccess           # Regole di routing per Apache
│   └── index.php           # Router principale
├── database/
│   ├── schema.sql          # Schema del database
│   └── seed.sql            # Dati di esempio
├── frontend/               # Codice del frontend Vue.js
│   ├── public/
│   ├── src/
│   │   ├── assets/         # Risorse statiche
│   │   ├── components/     # Componenti Vue riutilizzabili
│   │   ├── router/         # Configurazione di Vue Router
│   │   ├── services/       # Servizi (chiamate API)
│   │   ├── stores/         # Store Pinia (auth, transactions)
│   │   ├── views/          # Pagine dell'applicazione
│   │   ├── App.vue         # Componente radice
│   │   ├── main.js         # Entry point dell'applicazione
│   │   └── style.css       # Stili globali e Tailwind
│   ├── index.html          # File HTML principale
│   ├── package.json
│   └── vite.config.js      # Configurazione di Vite
└── README.md
```

## 📄 API Endpoints

Tutti gli endpoint sono prefissati con `/api`.

| Metodo | Endpoint                  | Descrizione                                  | Protetta |
|--------|---------------------------|----------------------------------------------|----------|
| POST   | `/auth/register`          | Registra un nuovo utente                     | No       |
| POST   | `/auth/login`             | Effettua il login e restituisce un JWT       | No       |
| GET    | `/auth/me`                | Restituisce i dati dell'utente autenticato   | Sì       |
| GET    | `/categories`             | Ottiene tutte le categorie dell'utente       | Sì       |
| POST   | `/categories`             | Crea una nuova categoria                     | Sì       |
| GET    | `/transactions`           | Ottiene le transazioni con filtri            | Sì       |
| POST   | `/transactions`           | Crea una nuova transazione                   | Sì       |
| PUT    | `/transactions/{id}`      | Aggiorna una transazione                     | Sì       |
| DELETE | `/transactions/{id}`      | Elimina una transazione                      | Sì       |
| GET    | `/statistics`             | Ottiene statistiche aggregate                | Sì       |

---

_Progetto realizzato da Manus AI._
