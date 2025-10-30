const urlParams = new URLSearchParams(window.location.search);
const videoId = window.location.pathname.substring(1);

const loading = document.getElementById('loading');
const videoTitleElement = document.getElementById('video-title'); // Ahora es el div del skeleton

const btnFilemoon = document.getElementById('btn-filemoon');
const btnStreamhg = document.getElementById('btn-streamhg');
const btnTerabox = document.getElementById('btn-terabox');
const socialPlaceholder = document.getElementById('social-links-placeholder');

// ✅ TUS ENLACES DE REDES (los de tu script original)
const socialLinks = {
  x: "https://x.com/patuconsumoxxd?t=lBK2T6a-4wD-fXKMzQ_Lsg&s=35",
  facebook: "https://www.facebook.com/people/GREAT-LINKS/61556741140694/?mibextid=ZbWKwL",
  instagram: "https://www.instagram.com/mysweetlinks/?igsh=eDhuZHNtOHE4eXdx#",
  whatsapp: "https://whatsapp.com/channel/0029VaUDtFDDp2QCGAzyPB3u",
  tiktok: "https://www.tiktok.com/@patuconsumoxdpacks?is_from_webapp=1&sender_device=pc"
};

// ✅ TUS CANALES DE TELEGRAM
const telegramChannels = {
  // ⭐ ENLACE CORREGIDO ⭐
  main: "https://t.me/teralinks12",        // Canal principal
  catalog: "https://t.me/patuconsumoxdmenu", // Catálogo completo
  tutorial: "https://t.me/tutodescargas"    // Tutorial de descargas
};

// Llamamos a nuestra API segura en Cloudflare
fetch(`/api/get-video?id=${videoId}`)
  .then(response => response.json())
  .then(data => {
    
    videoTitleElement.classList.remove('skeleton-loader'); 

    if (data.error) {
      videoTitleElement.textContent = data.error; 
      loading.textContent = "❌ Video no disponible.";
      return;
    }

    const video = data;
    videoTitleElement.textContent = video.title; 

    btnFilemoon.href = video.filemoon;
    btnStreamhg.href = video.streamhg;
    btnTerabox.href = video.terabox;

    loading.style.display = 'none';

    // ⭐ MOSTRAR REDES SOCIALES (CON ICONOS DE NEÓN)
    setTimeout(() => {
      
      // ⭐ HTML ACTUALIZADO CON FACEBOOK E INSTAGRAM ⭐
      const socialHTML = `
        <h2 class="section-title">🌟 ¡Únete a la Comunidad!</h2>
        <div class="social-icons-container">
          <a href="${socialLinks.whatsapp}" target="_blank" class="social-icon icon-whatsapp" aria-label="WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
          </a>
          <a href="${telegramChannels.main}" target="_blank" class="social-icon icon-telegram" aria-label="Telegram">
            <i class="fa-brands fa-telegram"></i>
          </a>
          <a href="${socialLinks.tiktok}" target="_blank" class="social-icon icon-tiktok" aria-label="TikTok">
            <i class="fa-brands fa-tiktok"></i>
          </a>
          <a href="${socialLinks.x}" target="_blank" class="social-icon icon-x" aria-label="X (Twitter)">
            <i class="fa-brands fa-x-twitter"></i>
          </a>
          <a href="${socialLinks.facebook}" target="_blank" class="social-icon icon-facebook" aria-label="Facebook">
            <i class="fa-brands fa-facebook-f"></i>
          </a>
          <a href="${socialLinks.instagram}" target="_blank" class="social-icon icon-instagram" aria-label="Instagram">
            <i class="fa-brands fa-instagram"></i>
          </a>
        </div>
        
        <h2 class="section-title">📬 Catálogo y Guías</h2>
        <div class="social-icons-container">
          <a href="${telegramChannels.catalog}" target="_blank" class="social-icon icon-telegram" aria-label="Catálogo de Telegram">
            <i class="fa-solid fa-folder-open"></i>
          </a>
          <a href="${telegramChannels.tutorial}" target="_blank" class="social-icon icon-telegram" aria-label="Tutorial de Descarga">
            <i class="fa-solid fa-book-open"></i>
          </a>
        </div>
      `;
      
      socialPlaceholder.innerHTML = socialHTML;

    }, 1000);
  })
  .catch(() => {
    videoTitleElement.classList.remove('skeleton-loader');
    videoTitleElement.textContent = "⚠️ Error de conexión.";
    loading.textContent = "Intenta recargar la página.";
  });
