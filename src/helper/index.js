import {correctPolygonCornersMinDistance, polygonPointDefRound} from '../libs/point';
import {createElement} from '../libs/misc';
import {settings} from '../classes/Editor';

/**
 * Create helper by corner points
 * @param {Editor} editor
 * @param {DOMPoint[]} points
 * @returns {SVGElement}
 */
export default function(editor, points) {
    const base = settings.base;
    let helper = createElement('g', true, [`${base}__helper`]);
    let polygon = polygonPointDefRound(points);
    points = correctPolygonCornersMinDistance(points, 24, 8);
    let text = editor.selection[0];
    // code in one line for minification
    let html = `<polygon class="${base}__rect ${base}__move" points="${polygon.join(' ')}"/><g class="${base}__act _rotate ${base}__rotate"><circle cx="${points[0].x}" cy="${points[0].y}" r="8"/><g class="${base}__icon" style="transform:translate(${points[0].x}px,${points[0].y}px)"><path d="M4.75-3V-.75a0,0,0,0,1,0,0,.13.13,0,0,1,0,.06.09.09,0,0,1,0,.05s0,0,0,0h0l-.06,0a0,0,0,0,1,0,0H2.25A.25.25,0,0,1,2-.75.25.25,0,0,1,2.25-1H3.87L2.59-2.2A3.13,3.13,0,0,0,.82-3.09a3.08,3.08,0,0,0-1.95.36A3.09,3.09,0,0,0-2.47-1.28a3.11,3.11,0,0,0-.2,2,3.14,3.14,0,0,0,1,1.7A3.15,3.15,0,0,0,.2,3.12,3.11,3.11,0,0,0,2.11,2.6,3.07,3.07,0,0,0,3.32,1,.25.25,0,0,1,3.64.89a.26.26,0,0,1,.16.32A3.63,3.63,0,0,1,2.38,3a3.68,3.68,0,0,1-2,.61H.17A3.74,3.74,0,0,1-2,2.77,3.7,3.7,0,0,1-3.16.8a3.65,3.65,0,0,1,.23-2.28A3.56,3.56,0,0,1-1.37-3.17,3.62,3.62,0,0,1,.89-3.59a3.66,3.66,0,0,1,2.05,1L4.25-1.33V-3a.25.25,0,0,1,.25-.25A.25.25,0,0,1,4.75-3Z"/></g></g><g class="${base}__act _delete ${base}__delete"><circle cx="${points[1].x}" cy="${points[1].y}" r="8"/><g class="${base}__icon" style="transform:translate(${points[1].x}px,${points[1].y}px)"><path d="M.35,0,2.43-2.07a.27.27,0,0,0,0-.36.27.27,0,0,0-.36,0L0-.35-2.07-2.43a.27.27,0,0,0-.36,0,.27.27,0,0,0,0,.36L-.35,0-2.43,2.07a.27.27,0,0,0,0,.36.26.26,0,0,0,.18.07.26.26,0,0,0,.18-.07L0,.35,2.07,2.43a.27.27,0,0,0,.36,0,.27.27,0,0,0,0-.36Z"/></g></g><g class="${base}__act _scale ${base}__scale"><circle cx="${points[2].x}" cy="${points[2].y}" r="8"/><g class="${base}__icon" style="transform:translate(${points[2].x}px,${points[2].y}px)"><path d="M3.63,3.38a.29.29,0,0,1,0,.09.32.32,0,0,1-.14.14l-.09,0H1.13a.25.25,0,0,1-.25-.25.25.25,0,0,1,.25-.25H2.77L.57.93a.27.27,0,0,1,0-.36.27.27,0,0,1,.36,0l2.2,2.2V1.13A.25.25,0,0,1,3.38.88a.25.25,0,0,1,.25.25Zm-6.4-6.51h1.64a.25.25,0,0,0,.25-.25.25.25,0,0,0-.25-.25H-3.38l-.09,0a.32.32,0,0,0-.14.14.29.29,0,0,0,0,.09v2.25a.25.25,0,0,0,.25.25.25.25,0,0,0,.25-.25V-2.77l2.2,2.2A.26.26,0,0,0-.75-.5.26.26,0,0,0-.57-.57a.27.27,0,0,0,0-.36Z"/></g></g>`;
    if (text && text.nodeName === 'text') {
        html += `<g class="${base}__act _text ${base}__text"><circle cx="${points[3].x}" cy="${points[3].y}" r="8"/><g class="${base}__icon" style="transform:translate(${points[3].x}px,${points[3].y}px)"><path d="M-1.5,3.63H-3.38a.26.26,0,0,1-.25-.25V1.5a.25.25,0,0,1,.08-.18L1.32-3.55a.25.25,0,0,1,.36,0L3.55-1.68a.25.25,0,0,1,0,.36L-1.32,3.55A.25.25,0,0,1-1.5,3.63Zm-1.63-.5H-1.6L3-1.5,1.5-3-3.13,1.6Z"/></g></g>`;
    }
    helper.innerHTML = html;
    return helper;
}