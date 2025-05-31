# Progetto di Basi di Dati

## Descrizione

Il progetto in questione consiste in un'applicazione di messaggistica. Lo stack utilizzato è il seguente:

* Frontend: React
* Backend: NodeJS (Express)
* Database: SQLite

## Istruzioni per l'esecuzione tramite git clone

Essendo un applicativo composto da diversi componenti, il progetto è organizzato nella seguente struttura:
* root
    * client
        * package.json (progetto frontend)
    * server 
        * package.json (progetto backend)
    * package.json (progetto complessivo)

E' necessario pertanto eseguire l'installazione delle dipendenze per tutte e tre le directory una per volta, nel seguente modo:

Trovandosi nella root directory del progetto:
* npm install
* cd client
* npm install
* cd ..
* cd server
* npm install

