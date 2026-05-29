import { useEffect, useRef } from "react";

export default function CyberCanvas({ activePage }) {
  const canvasRef = useRef(null);
  const activePageRef = useRef(activePage);

  // Sync ref with prop
  useEffect(() => {
    activePageRef.current = activePage;
  }, [activePage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = [];
    const maxParticles = 30; // Optimized for mobile

    const mouse = {
      x: null,
      y: null,
      radius: 130,
    };

    // Helper to resolve particle colors on the fly based on current page
    const getParticleColor = (type, page) => {
      switch (page) {
        case "home":
          return type === "primary" ? "#ff5f00" : "#00b0ff"; // Orange & Blue
        case "about":
          return type === "primary" ? "#ff5f00" : "#ffb300"; // Orange & Amber
        case "work":
          return type === "primary" ? "#00f0ff" : "#0072ff"; // Cyan & Electric Blue
        case "journey":
          return type === "primary" ? "#ff3b00" : "#a855f7"; // Neon Red & Purple
        case "credentials":
          return type === "primary" ? "#38bdf8" : "#e2e8f0"; // Sky Blue & Silver
        case "contact":
          return type === "primary" ? "#10b981" : "#00b0ff"; // Emerald & Blue
        default:
          return "#ffffff";
      }
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1;
        this.type = Math.random() > 0.5 ? "primary" : "secondary";
      }

      update(page) {
        // 1. Core Physics Modes based on Page
        if (page === "journey") {
          // Flow Upwards (Rising Bubbles)
          this.vy = -Math.abs(this.vy) - 0.15;
          this.vx = (this.vx * 0.95) + (Math.random() - 0.5) * 0.05;
          if (this.y < -10) {
            this.y = height + 10;
            this.x = Math.random() * width;
          }
        } else if (page === "contact") {
          // Stream Horizontally
          this.vx = Math.abs(this.vx) + 0.15;
          this.vy = (this.vy * 0.95) + (Math.random() - 0.5) * 0.05;
          if (this.x > width + 10) {
            this.x = -10;
            this.y = Math.random() * height;
          }
        } else {
          // Standard Float & Bounce
          if (this.x < 0 || this.x > width) this.vx = -this.vx;
          if (this.y < 0 || this.y > height) this.vy = -this.vy;
        }

        // 2. Interactive Pointer Forces
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            
            if (page === "work") {
              // Repel (Push away)
              const repelX = -dx;
              const repelY = -dy;
              this.vx += (repelX / dist) * force * 0.08;
              this.vy += (repelY / dist) * force * 0.08;
            } else {
              // Attract / Speed Wave
              this.vx += (dx / dist) * force * 0.04;
              this.vy += (dy / dist) * force * 0.04;
            }
          }
        }

        // Limit speed to prevent chaotic flying
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const maxSpeed = page === "about" ? 1.8 : 1.2; // about page has slightly faster particles
        if (speed > maxSpeed) {
          this.vx = (this.vx / speed) * maxSpeed;
          this.vy = (this.vy / speed) * maxSpeed;
        }

        this.x += this.vx;
        this.y += this.vy;
      }

      draw(page) {
        const color = getParticleColor(this.type, page);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for efficiency
      }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Pointer event listeners
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (e.touches && e.touches.length > 0) {
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      } else {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }
    };

    const handlePointerLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Attach interaction listeners to viewport wrapper instead of just the canvas
    const wrapper = canvas.closest(".app-viewport") || canvas.parentElement;
    wrapper.addEventListener("mousemove", handlePointerMove);
    wrapper.addEventListener("mouseleave", handlePointerLeave);
    wrapper.addEventListener("touchmove", handlePointerMove, { passive: true });
    wrapper.addEventListener("touchend", handlePointerLeave);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const page = activePageRef.current;

      // Draw particle nodes
      particles.forEach((p) => {
        p.update(page);
        p.draw(page);
      });

      // Constellation lines connection range
      const maxDistance = page === "credentials" ? 110 : 85; 

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = ((maxDistance - dist) / maxDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            const colorI = getParticleColor(particles[i].type, page);
            const colorJ = getParticleColor(particles[j].type, page);

            const grad = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            grad.addColorStop(0, colorI);
            grad.addColorStop(1, colorJ);

            ctx.strokeStyle = grad;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.7;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (wrapper) {
        wrapper.removeEventListener("mousemove", handlePointerMove);
        wrapper.removeEventListener("mouseleave", handlePointerLeave);
        wrapper.removeEventListener("touchmove", handlePointerMove);
        wrapper.removeEventListener("touchend", handlePointerLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.65,
      }}
    />
  );
}
