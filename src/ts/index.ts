// @ts-nocheck
import('what-input');
import('picturefill');
import objectFitImages from 'object-fit-images';
import stickyFill from "./modules/stickyfill";

// イベント実行
document.addEventListener("DOMContentLoaded", () => {
stickyFill();
objectFitImages();

}, false);