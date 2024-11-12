if ('serviceWorker' in navigator) {
    console.log('si tiene sw');

    navigator.serviceWorker.register('./sw.js')
        .then(res => console.log('serviceWorker cargando correctamente', res))
        .catch(err => console.log('serviceWorker no se pudo', err)); // Cambiado 'res' por 'err'
} else {
    console.log('no se localiza');
}
