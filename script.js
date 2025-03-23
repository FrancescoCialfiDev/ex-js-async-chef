"use strict"

// Funzione di supporto per ottenere i dati dalla fetch e convertirli in oggetto
async function fetchData(url) {
    const fetchData = await fetch(url) // Restituisce la risposta della richiesta http
    const parseData = await fetchData.json() // Converte il corpo della richiesta in json
    return parseData // Ritorna una promises
}

async function getChefBirthday(id) {

    let recipe // Dichiriamo fuori la variabili per propagare eventuali errori in scope globale
    try { // Gestione degli errori con try - catch
        recipe = await fetchData(`https://dummyjson.com/recipes/${id}`)
    } catch (error) { // Gestione errore nella fetch
        throw new Error("Errore nella richiesta al server: Impossibile trovare la ricetta") // Stoppa esecuzione del codice e lancia un errore custom
    }

    if (recipe.message) {
        console.error("Errore di ricerca:", recipe.message) // Se il Try viene eseguito con successo, controlliamo che non ci siamo eventuali errori, ad esempio un id undefined
    }

    // Qui il codice continua poichè non stiamo lanciando errori
    // Eseguiamo come per la gestione effettuata in precedenza la stessa cosa per l'utente, lanciando perà un errore in caso la richiesta non vada a buon fine

    let userInfo
    try {
        userInfo = await fetchData(`https://dummyjson.com/users/${recipe.userId}`)
    } catch (error) {
        throw new Error(`Errore nella richiesta al server: Impossibile trovare l'utente'`) // Lanciamo un errore che stoppa il codice
    }

    if (userInfo.message) {
        console.error("Error:", userInfo.message) // Stampiamo in console un errore poichè non esiste un utente con questo id
        return { user: undefined }
    }

    return { birthDate: userInfo.birthDate } // Se tutto va a buon fine ritorniamo un oggetto col la data di nascita dell'utente

}

(async () => {
    try { // Catturiamo gli errori lanciati in precendenza
        const birthDate = await getChefBirthday(1)
        console.log(birthDate)
    } catch (error) {
        console.error(error)
    } finally {
        console.log("Data fetch completed")
    }
})()



