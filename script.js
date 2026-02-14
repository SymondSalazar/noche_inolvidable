// Frase que aparecerá antes de la imagen
const MI_FRASE = "Aquella fue la noche mas hermosa del mundo";

function verificar() {
  const input = document.getElementById("passInput").value;
  const regex = /^29-0?8-2025$/;

  if (regex.test(input.trim())) {
    // 1. Apagar estrellas y ocultar login
    document.getElementById("starCanvas").style.opacity = "0";
    document.getElementById("login-screen").classList.add("hidden");

    // 2. Preparar la vista de contenido
    const mainContent = document.getElementById("main-content");
    mainContent.classList.remove("hidden");

    // Mostrar la frase animada
    const phrase = document.getElementById("fade-phrase");
    phrase.innerText = MI_FRASE;
    document.getElementById("phrase-overlay").classList.remove("hidden");

    // 3. Temporizador para mostrar el regalo final
    setTimeout(() => {
      document.getElementById("phrase-overlay").classList.add("hidden");
      const finalGift = document.getElementById("final-gift");
      finalGift.classList.remove("hidden");

      // Pequeño retraso para asegurar que la transición CSS se active
      setTimeout(() => {
        finalGift.classList.add("visible");
      }, 100);

      // Una vez mostrado el regalo, permitimos que el canvas deje de renderizar
      setTimeout(() => {
        canvas.style.display = "none";
      }, 3000);
    }, 4000); // Espera 4 segundos
  } else {
    document.getElementById("error-msg").innerText =
      "Formato incorrecto, pideme ayuda si te estancas";
  }
}

// --- LÓGICA DE ESTRELLAS DEL FONDO ---
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
let stars = [];
const mouse = { x: null, y: null, radius: 150 };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.baseX = this.x;
    this.baseY = this.y;
    this.size = Math.random() * 1.5;
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      this.x += dx * 0.04;
      this.y += dy * 0.04;
    } else {
      let dxBase = this.baseX - this.x;
      let dyBase = this.baseY - this.y;
      this.x += dxBase * 0.02;
      this.y += dyBase * 0.02;
    }
  }
}

function init() {
  stars = [];
  for (let i = 0; i < 350; i++) {
    stars.push(new Star());
  }
}

function animate() {
  if (canvas.style.opacity === "0" && canvas.style.display === "none") return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((s) => {
    s.update();
    s.draw();
  });
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
