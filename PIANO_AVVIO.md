# 📋 Piano di Avvio - Finanze App

Questo documento contiene un piano dettagliato passo-passo per avviare l'applicazione Finanze App.

## 🎯 Panoramica del Progetto

**Finanze App** è un'applicazione full-stack per la gestione delle finanze personali:
- **Backend**: PHP 8+ (senza framework) con API RESTful
- **Frontend**: Vue.js 3 + Vite + TailwindCSS
- **Database**: MySQL/MariaDB
- **Autenticazione**: JWT (JSON Web Tokens)

---

## ✅ FASE 1: Verifica Prerequisiti

### 1.1 Verifica Installazioni

Esegui questi comandi per verificare che tutto sia installato:

```powershell
# Verifica PHP (deve essere 8.0 o superiore)
php -v

# Verifica Node.js (deve essere 16.0 o superiore)
node -v

# Verifica pnpm (se non installato: npm install -g pnpm)
pnpm -v

# Verifica MySQL (deve essere in esecuzione)
mysql --version
```

### 1.2 Installazione Dipendenze Mancanti

Se manca qualcosa:

**PHP**: Scarica da [php.net](https://www.php.net/downloads.php) o usa XAMPP/WAMP

**Node.js e pnpm**: 
```powershell
# Installa Node.js da nodejs.org, poi:
npm install -g pnpm
```

**MySQL**: 
- Scarica MySQL da [mysql.com](https://dev.mysql.com/downloads/mysql/)
- Oppure usa XAMPP/WAMP che include MySQL
- Assicurati che il servizio MySQL sia avviato

---

## 🗄️ FASE 2: Setup Database

### 2.1 Creazione Database e Tabelle

1. **Apri MySQL** (via terminale o phpMyAdmin):
   ```powershell
   mysql -u root -p
   ```
   (Inserisci la password quando richiesto, o premi Invio se non c'è password)

2. **Esegui lo schema SQL**:
   ```sql
   source C:/Users/cplop/Desktop/Finanza/finanze-app/database/schema.sql
   ```
   
   Oppure copia e incolla il contenuto di `database/schema.sql` direttamente nel client MySQL.

3. **Verifica che il database sia stato creato**:
   ```sql
   SHOW DATABASES;
   USE finanze_app;
   SHOW TABLES;
   ```
   
   Dovresti vedere: `users`, `categories`, `transactions`, `recurring_instances`

### 2.2 Popolamento Dati Demo (Opzionale ma Consigliato)

1. **Esegui lo script di seed**:
   ```sql
   source C:/Users/cplop/Desktop/Finanza/finanze-app/database/seed.sql
   ```
   
   Oppure copia e incolla il contenuto di `database/seed.sql`.

2. **Verifica i dati inseriti**:
   ```sql
   SELECT * FROM users;
   SELECT COUNT(*) FROM categories;
   SELECT COUNT(*) FROM transactions;
   ```

**Utente Demo creato:**
- Email: `demo@finanze.app`
- Password: `demo123`

---

## ⚙️ FASE 3: Configurazione Backend

### 3.1 Configurazione Database

1. **Apri il file**: `backend/config/database.php`

2. **Modifica le credenziali** se necessario:
   ```php
   private $host = 'localhost';        // Di solito 'localhost'
   private $db_name = 'finanze_app';   // Nome del database
   private $username = 'root';         // Il tuo username MySQL
   private $password = '';             // La tua password MySQL (lasciare '' se non c'è password)
   ```

### 3.2 Configurazione JWT (Opzionale per sviluppo)

Il file `backend/utils/JWT.php` ha già una chiave di default per lo sviluppo.
**⚠️ IMPORTANTE**: Cambia la chiave in produzione!

### 3.3 Test Connessione Database

Crea un file di test temporaneo `backend/test_db.php`:

```php
<?php
require_once __DIR__ . '/config/database.php';

$database = new Database();
$conn = $database->getConnection();

if ($conn) {
    echo "✅ Connessione al database riuscita!";
} else {
    echo "❌ Errore di connessione al database";
}
```

Esegui: `php backend/test_db.php`

Se funziona, elimina il file di test.

---

## 🎨 FASE 4: Configurazione Frontend

### 4.1 Installazione Dipendenze

1. **Naviga nella cartella frontend**:
   ```powershell
   cd frontend
   ```

2. **Installa le dipendenze**:
   ```powershell
   pnpm install
   ```
   
   Questo installerà tutte le dipendenze necessarie (Vue, Vite, TailwindCSS, Chart.js, ecc.)

### 4.2 Verifica Configurazione API

1. **Apri il file**: `frontend/src/services/api.js`

2. **Verifica che l'URL sia corretto**:
   ```javascript
   baseURL: 'http://localhost:8000/api'
   ```
   
   Questo dovrebbe essere già configurato correttamente.

---

## 🚀 FASE 5: Avvio dell'Applicazione

### 5.1 Avvio Backend (Terminale 1)

1. **Apri un terminale PowerShell** e naviga nella cartella backend:
   ```powershell
   cd C:\Users\cplop\Desktop\Finanza\finanze-app\backend
   ```

2. **Avvia il server PHP**:
   ```powershell
   php -S localhost:8000
   ```

3. **Verifica che il server sia attivo**:
   - Dovresti vedere: `PHP 8.x.x Development Server started`
   - Apri il browser e vai su: `http://localhost:8000/api/auth/login`
   - Dovresti vedere una risposta JSON (anche se è un errore, significa che il server funziona)

### 5.2 Avvio Frontend (Terminale 2)

1. **Apri un NUOVO terminale PowerShell** e naviga nella cartella frontend:
   ```powershell
   cd C:\Users\cplop\Desktop\Finanza\finanze-app\frontend
   ```

2. **Avvia il server di sviluppo Vite**:
   ```powershell
   pnpm dev
   ```

3. **Verifica che il server sia attivo**:
   - Dovresti vedere: `Local: http://localhost:5173/`
   - Il browser potrebbe aprirsi automaticamente

---

## 🧪 FASE 6: Test dell'Applicazione

### 6.1 Test Accesso

1. **Apri il browser** su: `http://localhost:5173`

2. **Dovresti vedere la Landing Page**

3. **Test Login con utente demo**:
   - Clicca su "Login" o "Accedi"
   - Email: `demo@finanze.app`
   - Password: `demo123`

4. **Dovresti essere reindirizzato alla Dashboard**

### 6.2 Test Funzionalità

1. **Dashboard**: Verifica che i grafici e le statistiche si carichino
2. **Transazioni**: Prova ad aggiungere una nuova transazione
3. **Categorie**: Verifica che le categorie siano visibili
4. **Filtri**: Prova a filtrare le transazioni per data/tipo/categoria

---

## 🔧 Risoluzione Problemi Comuni

### Problema: "Connection Error" nel backend

**Soluzione**:
- Verifica che MySQL sia in esecuzione
- Controlla le credenziali in `backend/config/database.php`
- Assicurati che il database `finanze_app` esista

### Problema: Frontend non si connette al backend

**Soluzione**:
- Verifica che il backend sia in esecuzione su `http://localhost:8000`
- Controlla l'URL in `frontend/src/services/api.js`
- Verifica che non ci siano errori CORS (dovrebbero essere gestiti automaticamente)

### Problema: Errore "pnpm: command not found"

**Soluzione**:
```powershell
npm install -g pnpm
```

### Problema: Porta 8000 già in uso

**Soluzione**:
- Chiudi altri processi che usano la porta 8000
- Oppure cambia la porta nel backend: `php -S localhost:8001`
- E aggiorna `frontend/src/services/api.js` con la nuova porta

### Problema: Porta 5173 già in uso

**Soluzione**:
- Vite userà automaticamente la porta successiva disponibile (5174, 5175, ecc.)
- Oppure specifica una porta: `pnpm dev --port 3000`

---

## 📝 Checklist Finale

Prima di considerare il progetto avviato, verifica:

- [ ] MySQL è in esecuzione
- [ ] Database `finanze_app` creato con tutte le tabelle
- [ ] Dati demo inseriti (opzionale)
- [ ] Backend in esecuzione su `http://localhost:8000`
- [ ] Frontend in esecuzione su `http://localhost:5173`
- [ ] Login funzionante con utente demo
- [ ] Dashboard visualizza dati correttamente
- [ ] Possibilità di aggiungere/modificare transazioni

---

## 🎉 Pronto!

Se tutti i passaggi sono completati, l'applicazione dovrebbe essere funzionante!

**URLs importanti:**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000/api`
- Landing Page: `http://localhost:5173`
- Login: `http://localhost:5173/login`

**Credenziali Demo:**
- Email: `demo@finanze.app`
- Password: `demo123`

---

## 📚 Prossimi Passi

1. Esplora tutte le funzionalità dell'app
2. Crea un nuovo account utente
3. Aggiungi le tue transazioni personali
4. Esporta i dati in Excel o PDF
5. Confronta periodi diversi

Buon lavoro! 💰

