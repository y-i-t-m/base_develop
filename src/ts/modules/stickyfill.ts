// @ts-nocheck
import * as Stickyfill from "stickyfilljs";

export default function stickyFill() {
    const elements = document.querySelectorAll('.sticky');
    Stickyfill.add(elements);
}
