const canvas = document.querySelector("#tech-background");
const context = canvas?.getContext("2d");

if (canvas && context) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pointer = { x: -1000, y: -1000 };
  let width = 0;
  let height = 0;
  let particles = [];
  let frameId = 0;
  let previousFrame = 0;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(76, Math.max(28, Math.round(width * height / 21000)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .16,
      vy: (Math.random() - .5) * .16,
      radius: 1 + Math.random() * 1.2
    }));
    draw(0, true);
  }

  function draw(timestamp, staticFrame = false) {
    if (!staticFrame && timestamp - previousFrame < 32) {
      frameId = window.requestAnimationFrame(draw);
      return;
    }
    previousFrame = timestamp;
    context.clearRect(0, 0, width, height);
    particles.forEach((particle, index) => {
      if (!staticFrame) {
        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 130 && distance > 0) {
          particle.vx += (dx / distance) * .002;
          particle.vy += (dy / distance) * .002;
        }
        particle.vx *= .995;
        particle.vy *= .995;
        particle.x = (particle.x + particle.vx + width) % width;
        particle.y = (particle.y + particle.vy + height) % height;
      }
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(39, 89, 129, .32)";
      context.fill();
      for (let next = index + 1; next < particles.length; next++) {
        const other = particles[next];
        const distance = Math.hypot(other.x - particle.x, other.y - particle.y);
        if (distance < 118) {
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = `rgba(47, 103, 145, ${(1 - distance / 118) * .12})`;
          context.stroke();
        }
      }
    });
    if (!reducedMotion) frameId = window.requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointermove", event => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) window.cancelAnimationFrame(frameId);
    else if (!reducedMotion) frameId = window.requestAnimationFrame(draw);
  });
  resize();
  if (!reducedMotion) frameId = window.requestAnimationFrame(draw);
}
