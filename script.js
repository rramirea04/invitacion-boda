// ======================================================
// CONFIGURACIÓN GENERAL
// ======================================================

// Enlace público del formulario de Google Forms.
// Aquí se encuentra la dirección que abrirán los invitados
// para confirmar su asistencia a la boda.
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd953Kqbv9jxXLpqFU0hiJ1YIBha3_iQF_wKXeyXQ75FURfUA/viewform";


// ======================================================
// ELEMENTOS DEL HTML
// ======================================================

// Botón que permite abrir el sobre de la invitación.
const openButton = document.getElementById('openInvitation');

// Imagen del sobre que contiene la invitación.
const envelopeImage = document.getElementById('envelopeImage');

// Texto de ayuda que indica al usuario que puede abrir el sobre.
const openHint = document.getElementById('openHint');

// Sección inicial que contiene la portada y el sobre.
const intro = document.getElementById('intro');

// Sección donde se muestra la invitación completa.
const invitation = document.getElementById('invitation');

// Elemento de audio que reproduce la música de la boda.
const music = document.getElementById('weddingMusic');

// Botón para activar o pausar la música.
const musicToggle = document.getElementById('musicToggle');

// Texto que indica el estado actual de la música.
const musicLabel = document.getElementById('musicLabel');

// Sello de cera que aparece sobre el sobre.
const waxSeal = document.getElementById('waxSeal');


// Variable que controla si el sobre ya fue abierto.
// Evita que la animación se ejecute varias veces.
let opened = false;


// ======================================================
// CONFIGURACIÓN DE LOS TIEMPOS DE ANIMACIÓN
// ======================================================

// Tiempo de espera antes de comenzar el GIF del sobre.
const GIF_START_DELAY = 450;

// Duración de la animación del GIF (3 segundos).
const GIF_DURATION = 3000;

// Tiempo de espera antes de mostrar la invitación completa.
const INVITATION_DELAY = 3800;

// Tiempo total antes de retirar la portada inicial.
const INTRO_EXIT_DELAY = 5500;


// ======================================================
// APERTURA DEL SOBRE Y REPRODUCCIÓN AUTOMÁTICA DE MÚSICA
// ======================================================

// Detecta cuando el usuario hace clic en el botón de apertura.
openButton.addEventListener('click', async () => {

  // Si el sobre ya fue abierto, no permite repetir el proceso.
  if (opened) return;

  // Marca el sobre como abierto.
  opened = true;

  // Desactiva el botón para evitar nuevos clics.
  openButton.disabled = true;

  // Agrega una clase CSS para iniciar la animación de apertura.
  openButton.classList.add('is-opening');

  // Actualiza el mensaje que aparece debajo del sobre.
  openHint.textContent = 'TU INVITACIÓN ESTÁ POR DESPLEGARSE…';


  // ------------------------------------------------------
  // INICIO AUTOMÁTICO DE LA MÚSICA
  // ------------------------------------------------------

  // Intenta reproducir la música cuando el usuario abre
  // la invitación. El clic permite iniciar el audio.
  try {
    await music.play();

    // Actualiza visualmente el botón indicando que
    // la música se encuentra reproduciéndose.
    musicToggle.classList.add('is-playing');

    // Informa a los lectores de pantalla que la música
    // está activa y que el botón permite pausarla.
    musicToggle.setAttribute('aria-pressed', 'true');
    musicToggle.setAttribute('aria-label', 'Pausar música');

    // Cambia el texto visible del botón.
    musicLabel.textContent = 'Pausar canción';

  } catch (error) {

    // Si el navegador no permite iniciar el audio,
    // muestra un mensaje para que el usuario lo active.
    musicLabel.textContent = 'Toca para reproducir';

    // Muestra el error en la consola del navegador.
    console.log('No se pudo iniciar la música:', error);
  }


  // ------------------------------------------------------
  // DESAPARICIÓN DEL SELLO DE CERA
  // ------------------------------------------------------

  // Agrega la clase CSS que activa la animación
  // de desaparición del sello.
  waxSeal.classList.add('seal-away');


  // ------------------------------------------------------
  // ANIMACIÓN DE APERTURA DEL SOBRE
  // ------------------------------------------------------

  // Espera el tiempo establecido antes de cambiar
  // la imagen estática por el GIF de apertura.
  window.setTimeout(() => {

    // Carga el GIF que muestra el sobre abriéndose.
    envelopeImage.src = 'assets/sobre-abriendo.gif';

    // Agrega la clase CSS que controla la animación del GIF.
    envelopeImage.classList.add('envelope-playing');

    // Agrega la clase que indica que el sobre está abierto.
    openButton.classList.add('envelope-open');

  }, GIF_START_DELAY);


  // ------------------------------------------------------
  // FINALIZACIÓN DE LA ANIMACIÓN DEL SOBRE
  // ------------------------------------------------------

  // Espera hasta que termine la duración del GIF.
  // Después agrega una clase CSS para hacerlo desaparecer.
  window.setTimeout(() => {
    envelopeImage.classList.add('envelope-away');

  }, GIF_START_DELAY + GIF_DURATION);


  // ------------------------------------------------------
  // APARICIÓN DE LA INVITACIÓN COMPLETA
  // ------------------------------------------------------

  // Después del tiempo establecido, muestra la invitación
  // definitiva y comienza las animaciones de entrada.
  window.setTimeout(() => {

    // Hace visible la sección de la invitación.
    invitation.hidden = false;

    // Agrega una clase que permite controlar la portada
    // como una capa superpuesta.
    intro.classList.add('intro-overlay');

    // Inicia la animación de entrada de la invitación.
    invitation.classList.add('invitation-enter');

    // Activa las animaciones de aparición de las secciones
    // cuando el usuario se desplaza por la página.
    observeSections();

    // Inicia la animación de salida de la portada.
    intro.classList.add('intro-exit');

  }, INVITATION_DELAY);


  // ------------------------------------------------------
  // RETIRADA DEFINITIVA DE LA PORTADA
  // ------------------------------------------------------

  // Una vez terminada la transición, oculta la portada
  // para dejar visible únicamente la invitación.
  window.setTimeout(() => {

    // Oculta completamente la sección inicial.
    intro.hidden = true;

    // Coloca la página nuevamente en la parte superior.
    window.scrollTo({ top: 0, behavior: 'auto' });

  }, INTRO_EXIT_DELAY);

});


// ======================================================
// CONTROL MANUAL DE LA MÚSICA
// ======================================================

// Detecta los clics sobre el botón de música.
// Permite reproducir o pausar la canción en cualquier momento.
musicToggle.addEventListener('click', async () => {

  // Comprueba si la música está pausada.
  if (music.paused) {

    // ----------------------------------------------------
    // REPRODUCIR MÚSICA
    // ----------------------------------------------------

    try {

      // Intenta iniciar la reproducción de la canción.
      await music.play();

      // Actualiza el aspecto visual del botón.
      musicToggle.classList.add('is-playing');

      // Actualiza los atributos de accesibilidad.
      musicToggle.setAttribute('aria-pressed', 'true');
      musicToggle.setAttribute('aria-label', 'Pausar música');

      // Cambia el texto del botón.
      musicLabel.textContent = 'Pausar canción';

    } catch (error) {

      // Si ocurre un problema al reproducir,
      // indica al usuario que puede intentarlo nuevamente.
      musicLabel.textContent = 'Toca para reproducir';
    }

  } else {

    // ----------------------------------------------------
    // PAUSAR MÚSICA
    // ----------------------------------------------------

    // Detiene la reproducción de la canción.
    music.pause();

    // Elimina la clase visual que indica que está sonando.
    musicToggle.classList.remove('is-playing');

    // Actualiza los atributos de accesibilidad.
    musicToggle.setAttribute('aria-pressed', 'false');
    musicToggle.setAttribute('aria-label', 'Activar música');

    // Cambia el texto para indicar que se puede escuchar.
    musicLabel.textContent = 'Escuchar canción';
  }

});


// ======================================================
// CUENTA REGRESIVA PARA LA BODA
// ======================================================

// Fecha y hora de la boda:
// 3 de enero de 2027 a las 3:00 p. m.
// El valor -05:00 corresponde al horario de Colombia.
const weddingDate = new Date('2027-01-03T15:00:00-05:00').getTime();


// ------------------------------------------------------
// FUNCIÓN PARA ACTUALIZAR LA CUENTA REGRESIVA
// ------------------------------------------------------

function updateCountdown() {

  // Calcula el tiempo restante entre la fecha de la boda
  // y la fecha y hora actuales del dispositivo.
  const diff = weddingDate - Date.now();

  // Si el tiempo restante es cero o negativo,
  // significa que la fecha de la boda ya llegó.
  if (diff <= 0) {

    // Reemplaza la cuenta regresiva por un mensaje especial.
    document.querySelector('.countdown').innerHTML =
      '<p>¡Hoy comienza nuestra celebración!</p>';

    // Finaliza la función para evitar cálculos innecesarios.
    return;
  }


  // ----------------------------------------------------
  // CÁLCULO DE DÍAS, HORAS, MINUTOS Y SEGUNDOS
  // ----------------------------------------------------

  // Convierte el tiempo restante en sus respectivas unidades.
  const values = {

    // Calcula los días completos que faltan.
    days: Math.floor(diff / 86400000),

    // Calcula las horas restantes después de descontar los días.
    hours: Math.floor((diff % 86400000) / 3600000),

    // Calcula los minutos restantes después de descontar las horas.
    minutes: Math.floor((diff % 3600000) / 60000),

    // Calcula los segundos restantes.
    seconds: Math.floor((diff % 60000) / 1000)
  };


  // ----------------------------------------------------
  // ACTUALIZACIÓN DE LOS VALORES EN EL HTML
  // ----------------------------------------------------

  // Recorre cada valor de la cuenta regresiva.
  Object.entries(values).forEach(([id, value]) => {

    // Busca en el HTML el elemento correspondiente
    // mediante su identificador: days, hours, minutes o seconds.
    const node = document.getElementById(id);

    // Comprueba que el elemento exista antes de modificarlo.
    if (node) {

      // Actualiza el contenido y agrega un cero a la izquierda
      // cuando el valor tiene un solo dígito.
      node.textContent = String(value).padStart(2, '0');
    }
  });
}


// ------------------------------------------------------
// INICIO Y ACTUALIZACIÓN AUTOMÁTICA DEL CONTADOR
// ------------------------------------------------------

// Ejecuta la función inmediatamente para mostrar
// los valores de la cuenta regresiva al cargar la página.
updateCountdown();

// Actualiza la cuenta regresiva automáticamente cada segundo.
window.setInterval(updateCountdown, 1000);


// ======================================================
// CONFIRMACIÓN DE ASISTENCIA (RSVP)
// ======================================================

// Botón o enlace que dirige a los invitados
// al formulario de confirmación de asistencia.
const confirmButton = document.getElementById('confirm');

// Elemento donde se muestran los mensajes relacionados
// con la confirmación de asistencia.
const formNote = document.querySelector('.form-note');


// Comprueba que el botón exista y que la dirección
// de Google Forms esté configurada.
if (confirmButton && GOOGLE_FORM_URL.trim()) {

  // Asigna el enlace de Google Forms al botón.
  confirmButton.href = GOOGLE_FORM_URL.trim();

  // Abre el formulario en una pestaña nueva.
  confirmButton.target = '_blank';

  // Mejora la seguridad al abrir una pestaña nueva.
  confirmButton.rel = 'noopener noreferrer';

  // Informa al invitado que se abrirá el formulario.
  if (formNote) {
    formNote.textContent =
      'Se abrirá el formulario seguro de confirmación de asistencia.';
  }

} else if (confirmButton) {

  // Si no existe una dirección configurada, evita
  // que el botón intente abrir una página incorrecta.
  confirmButton.addEventListener('click', event => {

    // Cancela el comportamiento predeterminado del enlace.
    event.preventDefault();

    // Informa que falta configurar el enlace de Google Forms.
    if (formNote) {
      formNote.textContent =
        'Falta pegar el enlace de Google Forms en la variable GOOGLE_FORM_URL de script.js.';

      // Agrega una clase CSS para destacar el mensaje.
      formNote.classList.add('form-note-alert');
    }
  });
}


// ======================================================
// ANIMACIONES DE APARICIÓN DE LAS SECCIONES
// ======================================================

// Esta función controla la aparición progresiva de las
// diferentes secciones de la invitación al desplazarse
// por la página (efecto de revelación o reveal).

function observeSections() {

  // Selecciona todas las secciones que tendrán
  // animaciones de aparición al entrar en pantalla.
  const items = document.querySelectorAll(
    '.welcome,.date-section,.story-gallery,.events,.dresscode,.gift-section,.rsvp'
  );


  // ----------------------------------------------------
  // ALTERNATIVA PARA NAVEGADORES SIN INTERSECTIONOBSERVER
  // ----------------------------------------------------

  // Comprueba si el navegador admite IntersectionObserver.
  if (!('IntersectionObserver' in window)) {

    // Si no lo admite, muestra todas las secciones
    // sin aplicar el efecto de aparición progresiva.
    items.forEach(item => item.classList.add('visible'));

    // Finaliza la función.
    return;
  }


  // ----------------------------------------------------
  // OBSERVADOR DE VISIBILIDAD DE LAS SECCIONES
  // ----------------------------------------------------

  // Crea un observador que detecta cuándo cada sección
  // entra en el área visible de la pantalla.
  const observer = new IntersectionObserver(entries => {

    // Recorre los elementos que han cambiado
    // su estado de visibilidad.
    entries.forEach(entry => {

      // Comprueba si el elemento está entrando en pantalla.
      if (entry.isIntersecting) {

        // Agrega la clase CSS que activa su aparición.
        entry.target.classList.add('visible');

        // Deja de observar ese elemento porque
        // su animación ya se ha ejecutado.
        observer.unobserve(entry.target);
      }
    });

  }, {

    // La animación comienza cuando al menos el 12 %
    // de la sección entra en el área visible.
    threshold: 0.12
  });


  // ----------------------------------------------------
  // ACTIVACIÓN DEL OBSERVADOR EN CADA SECCIÓN
  // ----------------------------------------------------

  // Recorre todas las secciones seleccionadas.
  items.forEach(item => {

    // Agrega la clase inicial que prepara la animación
    // definida en la hoja de estilos CSS.
    item.classList.add('reveal');

    // Comienza a observar cada sección.
    observer.observe(item);
  });

}



