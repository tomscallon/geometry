import Canvas from './canvas';
import './style.css'

console.log(document.readyState);
if (document.readyState === 'complete') {
  Canvas.initialize(document.getElementById('canvas'));
} else {
  document.addEventListener(
    'DOMContentLoaded',
    () => Canvas.initialize(document.getElementById('canvas')),
  );
}
