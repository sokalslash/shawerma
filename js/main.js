import { fix100vh, findHeight } from './view/adapt-screen.js';
import { animation } from './view/animation.js';
import { addStickyHeader } from './view/sticky-header.js';

import './view/mob-navigation.js';
import './view/page-view.js';
// import './view/basket-view.js';

window.addEventListener('DOMContentLoaded', () => {
  fix100vh();
  findHeight();
  animation();
  window.addEventListener('resize', () => {
    fix100vh();
    findHeight();
  });
  window.addEventListener('scroll', () => addStickyHeader())
});