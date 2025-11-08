export const animations = {
  fadeUp: {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  fadeRight: {
    initial: { opacity: 0, x: -60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  fadeLeft: {
    initial: { opacity: 0, x: 60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  zoomIn: {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  flipUp: {
    initial: { opacity: 0, rotateX: -90 },
    whileInView: { opacity: 1, rotateX: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  staggerContainer: {
    initial: {},
    whileInView: {},
    viewport: { once: true, amount: 0.2 },
    transition: { staggerChildren: 0.2 }
  }
};

export const pulseAnimation = {
  scale: [1, 1.1, 1],
  opacity: [0.8, 1, 0.8]
};

export const bubbleAnimation = {
  scale: [1, 1.2, 1],
  opacity: [0.3, 0.5, 0.3]
};