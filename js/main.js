const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual
const window_height = 800;
const window_width = 900;

// Ajusta el tamaño del canvas para que coincida con la pantalla
canvas.height = window_height;
canvas.width = window_width;

// Establece el color de fondo del canvas
canvas.style.background = "#f1f7a8";

/**
 * Clase Circle que representa un círculo en el canvas.
 */
class Circle {
  constructor(x, y, radius, color, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.dx = 0.5 * this.speed;
    this.dy = 0.5 * this.speed;
    this.collisionCount = 0; // Contador de colisiones
    this.isStopped = false; // Controla si el círculo debe detenerse
  }

  /**
   * Dibuja el círculo en el canvas con el contador de colisiones
   */
  draw(context) {
    context.beginPath();

    // Configura el color del borde del círculo
    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    
    // Dibuja el número de colisiones dentro del círculo
    context.fillText(this.collisionCount, this.posX, this.posY);

    // Dibuja el círculo con borde
    context.lineWidth = 4;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  /**
   * Actualiza la posición del círculo y lo redibuja
   */
  update(context) {
    if (this.isStopped) {
      this.draw(context); // Mantiene el círculo en su posición final
      return; // No se mueve más
    }

    this.draw(context);

    // Rebote en los bordes del canvas y aumenta el contador
    if (this.posX + this.radius >= window_width) {
      this.posX = window_width - this.radius;
      this.dx = -this.dx;
      this.collisionCount++;
    }
    if (this.posX - this.radius <= 0) {
      this.posX = this.radius;
      this.dx = -this.dx;
      this.collisionCount++;
    }
    if (this.posY + this.radius >= window_height) {
      this.posY = window_height - this.radius;
      this.dy = -this.dy;
      this.collisionCount++;
    }
    if (this.posY - this.radius <= 0) {
      this.posY = this.radius;
      this.dy = -this.dy;
      this.collisionCount++;
    }

    // Si el contador alcanza 10, detiene el movimiento
    if (this.collisionCount >= 10) {
      this.isStopped = true;
      return;
    }

    // Mueve el círculo en su dirección actual
    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// Se generan posiciones y radios aleatorios para los círculos
let randomX = Math.random() * window_width;
let randomY = Math.random() * window_height;
let randomRadius = Math.floor(Math.random() * 100 + 30);

// Se crea un círculo con contador de colisiones
let miCirculo = new Circle(randomX, randomY, randomRadius, "#2b0505", 5);
miCirculo.draw(ctx);

/**
 * Función de animación que actualiza la posición del círculo en cada frame.
 */
let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height); // Limpia el canvas
  miCirculo.update(ctx); // Actualiza el círculo
};

// Inicia la animación
updateCircle();
