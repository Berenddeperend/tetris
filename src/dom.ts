import htm from "htm"
import { h, render } from 'preact';
const html = htm.bind(h);
type PreactNode = preact.VNode<any> | preact.VNode<any>[];
export { render, html, PreactNode };