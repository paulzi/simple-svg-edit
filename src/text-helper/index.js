import {pointGetCenter, polygonPointDefRound} from '../libs/point';
import {createElement} from '../libs/misc';
import {settings} from '../classes/Editor';

/**
 * Create text helper by corner points
 * @param {Editor} editor
 * @param {DOMPoint[]} points
 * @returns {SVGElement}
 */
export default function(editor, points) {
    const base = settings.base;
    let helper = createElement('g', true, [`${base}__helper`, '_text']);
    let polygon = polygonPointDefRound(points);
    let a = Math.atan2(points[0].y - points[1].y, points[1].x - points[0].x);
    let dx = 24 * Math.cos(a);
    let dy = -24 * Math.sin(a);
    let mt = pointGetCenter([points[0], points[1]]);
    let mr = pointGetCenter([points[1], points[2]]);
    // code in one line for minification
    helper.innerHTML = `<polygon class="sse__rect" points="${polygon.join(' ')}"/><g class="${base}__act _align-left ${base}__align-left"><circle cx="${mt.x - dx}" cy="${mt.y - dy}" r="8"/><g class="${base}__icon" style="transform:translate(${mt.x - dx}px,${mt.y - dy}px)"><path d="M1.13,1.13H-3.38v.75H1.13Zm0-3H-3.38v.75H1.13ZM-3.38.38H3.38V-.38H-3.38Zm0,3H3.38V2.63H-3.38Zm0-6.76v.75H3.38v-.75Z"/></g></g><g class="${base}__act _align-center ${base}__align-center"><circle cx="${mt.x}" cy="${mt.y}" r="8"/><g class="${base}__icon" style="transform:translate(${mt.x}px,${mt.y}px)"><path d="M-1.88,1.13v.75H1.88V1.13Zm-1.5,2.25H3.38V2.63H-3.38Zm0-3H3.38V-.38H-3.38Zm1.5-2.26v.75H1.88v-.75Zm-1.5-1.5v.75H3.38v-.75Z"/></g></g><g class="${base}__act _align-right ${base}__align-right"><circle cx="${mt.x + dx}" cy="${mt.y + dy}" r="8"/><g class="${base}__icon" style="transform:translate(${mt.x + dx}px,${mt.y + dy}px)"><path d="M-3.38,3.38H3.38V2.63H-3.38Zm2.25-1.5H3.38V1.13H-1.13ZM-3.38.38H3.38V-.38H-3.38Zm2.25-1.51H3.38v-.75H-1.13ZM-3.38-3.38v.75H3.38v-.75Z"/></g></g><g class="${base}__act _text-width ${base}__text-width"><circle cx="${mr.x}" cy="${mr.y}" r="8"/><g class="${base}__icon" style="transform:translate(${mr.x}px,${mr.y}px)"><path d="M-.68,0A.21.21,0,0,1-.89.21h-2.6l1,1a.21.21,0,0,1,0,.29.2.2,0,0,1-.15.06.2.2,0,0,1-.14-.06L-4.15.15h0l0-.06a.22.22,0,0,1,0-.16l0-.06h0l1.34-1.33a.21.21,0,0,1,.29,0,.22.22,0,0,1,0,.3l-1,1h2.6A.21.21,0,0,1-.68,0ZM4.19.08a.19.19,0,0,0,0-.08.19.19,0,0,0,0-.08.16.16,0,0,0,0-.07L2.81-1.48a.21.21,0,0,0-.29,0,.22.22,0,0,0,0,.3l1,1H.89A.21.21,0,0,0,.68,0,.21.21,0,0,0,.89.21h2.6l-1,1a.21.21,0,0,0,.15.35.2.2,0,0,0,.14-.06L4.15.15A.16.16,0,0,0,4.19.08Z"/></g></g>`;
    return helper;
}