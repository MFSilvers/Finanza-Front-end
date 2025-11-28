# 🚀 Quick Start Guide - Finanze App

Questa guida ti permetterà di avviare l'applicazione in pochi minuti.

## 📋 Prerequisiti Rapidi

- PHP 8+ installato
- MySQL installato e in esecuzione
- Node.js e pnpm installati

## ⚡ Avvio Rapido

### 1. Database Setup (2 minuti)

```bash
# Accedi a MySQL
mysql -u root -p

# Esegui i comandi SQL
source /percorso/finanze-app/database/schema.sql
source /percorso/finanze-app/database/seed.sql
exit
```

**Utente Demo Creato:**
- Email: `demo@finanze.app`
- Password: `demo123`

### 2. Backend Setup (1 minuto)

```bash
cd finanze-app/backend

# Configura database.php se necessario
# Modifica backend/config/database.php con le tue credenziali MySQL

# Avvia il server PHP
php -S localhost:8000
```

Il backend sarà disponibile su `http://localhost:8000`

### 3. Frontend Setup (2 minuti)

```bash
# Apri un nuovo terminale
cd finanze-app/frontend

# Installa dipendenze
pnpm install

# Avvia il server di sviluppo
pnpm dev
```

Il frontend sarà disponibile su `http://localhost:5173`

## 🎉 Pronto!

Apri il browser e vai su `http://localhost:5173`

**Puoi:**
1. Esplorare la landing page
2. Registrare un nuovo account
3. Oppure accedere con l'utente demo: `demo@finanze.app` / `demo123`

## 🔧 Configurazioni Importanti

### Backend

**File: `backend/config/database.php`**
```php
private $host = 'localhost';
private $db_name = 'finanze_app';
private $username = 'root';  // Modifica se necessario
private $password = '';      // Modifica se necessario
```

**File: `backend/utils/JWT.php`**
```php
private static $secret_key = "your-secret-key-change-this-in-production-2024";
// ⚠️ IMPORTANTE: Cambia questa chiave in produzione!
```

### Frontend

**File: `frontend/src/services/api.js`**
```javascript
baseURL: 'http://localhost:8000/api'
// Modifica se il backend è su un altro indirizzo
```

## 📱 Funzionalità da Provare

1. **Dashboard**: Visualizza saldo, grafici e statistiche
2. **Transazioni**: Aggiungi entrate/spese con ricorrenze
3. **Confronto**: Confronta due periodi diversi
4. **Esportazione**: Scarica i dati in Excel o PDF

## ❓ Problemi Comuni

### Il backend non parte
- Verifica che la porta 8000 sia libera
- Controlla che PHP sia installato: `php -v`

### Il frontend non si connette al backend
- Verifica che il backend sia in esecuzione
- Controlla l'URL in `frontend/src/services/api.js`

### Errore di connessione al database
- Verifica che MySQL sia in esecuzione
- Controlla le credenziali in `backend/config/database.php`
- Assicurati che il database `finanze_app` sia stato creato

## 🌐 Deploy in Produzione

Per il deploy in produzione:

1. **Backend**: Configura Apache/Nginx con il file `.htaccess` fornito
2. **Frontend**: Esegui `pnpm build` e carica la cartella `dist/` sul server
3. **Sicurezza**: 
   - Cambia la chiave JWT in `backend/utils/JWT.php`
   - Usa HTTPS
   - Configura CORS appropriatamente

## 📞 Supporto

Per problemi o domande, consulta il file `README.md` completo.

---

Buon lavoro con Finanze App! 💰
