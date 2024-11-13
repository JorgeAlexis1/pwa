if ("serviceWorker" in navigator) {
    console.log("si tiene");
  
    navigator.serviceWorker
      .register("./sw.js")
      .then((res) => console.log("serviceWorker cargado"))
      .catch((err) => console.log("serviceWorker no se puede cargar"));
  } else {
    console.log("no se enceuntra");
  }
  