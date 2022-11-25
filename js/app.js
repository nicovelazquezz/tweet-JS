// Variables
const form = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
EventListeners();

function EventListeners(){
    // Cuando el usuario agrega un nuevo tweet
    form.addEventListener('submit', agregarTweet);
    
    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML();
        
    })

}

// Funciones        

function agregarTweet(e){
    e.preventDefault();  

    // text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // validación
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacío.');
        return;
    }
    
    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir el arreglo de tweets
    tweets = [...tweets, tweetObj];
    
    // Una vez agregado crear HTML
    crearHTML();

    // Reiniciar el formulario
    form.reset();

}

// mostrar mensaje de error

function mostrarError(error) {
    const msjError = document.createElement('P');
    msjError.classList.add('error');
    msjError.textContent = error;

    // insertarlo en el conectido
    const contenido = document.querySelector('#contenido');    
    contenido.appendChild(msjError);

    // elimina la alerta después de 3 segundos
    setTimeout(() => {
        msjError.remove();
    }, 3000);
}

// Muestra un listado de los tweets

function crearHTML(){    

    limpiarHTML();   
    

    if (tweets.length > 0){ 
        tweets.forEach( tweet => {

            // Crear botón eliminar
            const btnEliminar = document.createElement('A');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            // Añadir la función eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear el html
            const li = document.createElement('li')

            // Añadir el texto
            li.textContent = tweet.tweet;

            // Asignar el boton Eliminar
            li.appendChild(btnEliminar);

            // Insertar tweet al HTML
            listaTweets.appendChild(li);
            
        });
    }

    // Sincronizar Local Storage
    sincronizarStorage();
    
}

// Agrega los tweets actuales a Local Storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Eliminar el tweet

function borrarTweet(id) {
    // Filtra el array de tweets y solo deja los tweets que no coinciden con el ID del btn eliminar
    tweets = tweets.filter(tweet => tweet.id !== id);
    // Se vuelve a llamar a la función para que se resfresque el html
    crearHTML();
    console.log(tweets);
}


// Limpiar HTML
function limpiarHTML() {
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

