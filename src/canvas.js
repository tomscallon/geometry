const roundTo = (x, n) => Math.round(x / n) * n;
const floorTo = (x, n) => Math.floor(x / n) * n;
const ceilTo = (x, n) => Math.ceil(x / n) * n;

// TODO: organize this into a class

let element;
const translate = {x: -100, y: -100};

let animationFrame;

const initialize = (canvasElement) => {
  console.log('Initializing');
  element = canvasElement;

  if (!(element instanceof HTMLCanvasElement)) {
    alert('Invalid element supplied! (Must be a <canvas>.)');
    console.error('Expected a <canvas>, instead got', element);
    return;
  }

  setSize(window.innerWidth, window.innerHeight);

  window.addEventListener(
    'resize',
    () => setSize(window.innerWidth, window.innerHeight)
  );
};

const setSize = (width = element.width, height = element.height) => {
  // Update the size.
  element.width = width;
  element.height = height;

  // Redraw the canvas.
  //redraw();
};

/* Completely redraws the canvas, including grid lines and any
   structures currently stored within this object. To add to an
   existing drawing without clearing, use 'draw()'. */
const redraw = (timestamp) => {
  const g = element.getContext('2d');
  const {width: w, height: h} = element;

  // Clear the old drawing.
  g.clearRect(0, 0, w, h);

  // Shift by the origin.
  g.translate(-translate.x, -translate.y);

  // Basic gridlines to test.
  g.translate(-0.5, -0.5);
  g.strokeStyle = 'gray';
  g.lineWidth = 1;

  for (let x = floorTo(translate.x, 50); x < w + translate.x; x += 50) {
    g.beginPath();
    g.moveTo(x, translate.y);
    g.lineTo(x, h + translate.y);
    g.stroke();
  }

  for (let y = floorTo(translate.y, 50); y < h + translate.y; y += 50) {
    g.beginPath();
    g.moveTo(translate.x, y);
    g.lineTo(w + translate.x, y);
    g.stroke();
  }

  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(0, translate.y);
  g.lineTo(0, h + translate.y);
  g.stroke();

  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(translate.x, 0);
  g.lineTo(w + translate.x, 0);
  g.stroke();

  g.translate(0.5, 0.5);

  // Shift back.
  g.translate(translate.x, translate.y);
};

const draw = (fn) => {
  // Shift by the origin.
  g.translate(-translate.x, -translate.y);

  // Invoke the function with the context.
  fn(g, {
    ...translate,
    w: element.width,
    h: element.height
  });

  // Shift back.
  g.translate(translate.x, translate.y);
};

export default {
  initialize,
  setSize,
  redraw,
};
