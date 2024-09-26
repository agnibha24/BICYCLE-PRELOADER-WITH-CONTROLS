import React, { StrictMode, useState } from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";
createRoot(document.getElementById("root")).render(React.createElement(StrictMode, null,
    React.createElement(App, null)));
function App() {
    const [thickness, setThickness] = useState(1);
    const [solidTires, setSolidTires] = useState(false);
    const [color1, setColor1] = useState("#f2180d");
    const [color2, setColor2] = useState("#737a8c");
    function swapColors() {
        const color1Previous = color1;
        setColor1(color2);
        setColor2(color1Previous);
    }
    return (React.createElement("main", null,
        React.createElement(IconSprites, null),
        React.createElement(Result, { thickness: thickness, solidTires: solidTires, color1: color1, color2: color2 }),
        React.createElement(Controls, null,
            React.createElement(RowGroup, { title: "Lines" },
                React.createElement(RowRange, { id: "thickness", label: "Thickness", iconMin: "thin", iconMax: "thick", step: 0.1, min: 0.2, max: 2, value: thickness, valueChange: setThickness }),
                React.createElement(RowSwitch, { id: "solid-tires", label: "Solid Tires", value: solidTires, valueChange: setSolidTires })),
            React.createElement(RowGroup, { title: "Colors" },
                React.createElement(RowColor, { id: "color1", label: "Color 1", value: color1, valueChange: setColor1 }),
                React.createElement(RowColor, { id: "color2", label: "Color 2", value: color2, valueChange: setColor2 }),
                React.createElement(RowButton, { action: swapColors }, "Swap Colors")))));
}
function Controls({ children }) {
    return (React.createElement("form", { className: "controls" }, children));
}
function Icon({ name }) {
    return (React.createElement("svg", { className: "controls__icon", width: "24px", height: "24px", "aria-hidden": "true" },
        React.createElement("use", { href: `#${name}` })));
}
function IconSprites() {
    const viewBox = "0 0 24 24";
    const curvePoints = "M 0 4 C 3 0, 6 0, 10 4 S 17 8, 20 4";
    return (React.createElement("svg", { display: "none" },
        React.createElement("symbol", { id: "thin", viewBox: viewBox },
            React.createElement("path", { fill: "none", stroke: "currentcolor", strokeLinecap: "round", strokeWidth: "1", d: curvePoints, transform: "translate(2,8)" })),
        React.createElement("symbol", { id: "thick", viewBox: viewBox },
            React.createElement("path", { fill: "none", stroke: "currentcolor", strokeLinecap: "round", strokeWidth: "4", d: curvePoints, transform: "translate(2,8)" }))));
}
function Result({ thickness, solidTires, color1, color2 }) {
    return (React.createElement("svg", { className: "bike", viewBox: "0 0 64 32", width: "64px", height: "32px", "aria-label": "Bicycle traveling to the right", role: "img" },
        React.createElement("g", { className: "bike__group-x", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: thickness, transform: "translate(7,1)" },
            React.createElement("g", { className: "bike__group-y" },
                React.createElement("g", { id: "back-tire", transform: "translate(9.5,19)" },
                    React.createElement("g", { className: "bike__tire" },
                        React.createElement("circle", { r: "9", fill: solidTires ? color2 : "none", stroke: color2 }),
                        React.createElement("circle", { className: "bike__spokes-spin", stroke: solidTires ? "#ffffff" : color2, strokeDasharray: "31.416 31.416", strokeDashoffset: "23.562", r: "5", transform: "rotate(90,0,0)" }))),
                React.createElement("g", { id: "pedals", transform: "translate(22,19)" },
                    React.createElement("g", { className: "bike__pedals-spin", stroke: color2, strokeDasharray: "31.416 31.416", strokeDashoffset: "-27.489", transform: "rotate(67.5,0,0)" },
                        React.createElement("circle", { r: "5" }),
                        React.createElement("circle", { r: "5", transform: "rotate(180,0,0)" }))),
                React.createElement("g", { id: "front-tire", stroke: color2, transform: "translate(40,19)" },
                    React.createElement("g", { className: "bike__tire" },
                        React.createElement("circle", { r: "9", fill: solidTires ? color2 : "none", stroke: color2 }),
                        React.createElement("circle", { className: "bike__spokes-spin", stroke: solidTires ? "#ffffff" : color2, strokeDasharray: "31.416 31.416", strokeDashoffset: "23.562", r: "5", transform: "rotate(90,0,0)" }))),
                React.createElement("g", { id: "body", stroke: color1 },
                    React.createElement("path", { d: "m31,2h6s1,0,1,1-1,1-1,1" }),
                    React.createElement("polyline", { points: "33 2,40 19" }),
                    React.createElement("polyline", { points: "16 3,22 19" }),
                    React.createElement("polyline", { points: "35.75 9,22 19,9.5 19,18 8,35 7" }),
                    React.createElement("polyline", { stroke: color2, points: "14 3,18 3" }))))));
}
function RowButton({ action, children }) {
    return (React.createElement("button", { className: "controls__button", type: "button", onClick: action }, children));
}
function RowColor({ id, label, value, valueChange }) {
    return (React.createElement("div", { className: "controls__row" },
        React.createElement("label", { htmlFor: id, className: "controls__label" }, label),
        React.createElement("span", { className: "controls__value-wrap" },
            React.createElement("span", { id: `${id}-value` }, value),
            React.createElement("input", { id: id, className: "controls__color", type: "color", value: value, "aria-describedby": `${id}-value`, onChange: (e) => valueChange(e.target.value) }))));
}
function RowGroup({ title, children }) {
    return (React.createElement("div", { className: "controls__row-group" },
        React.createElement("div", { className: "controls__row-group-title" }, title),
        React.createElement("div", null, children)));
}
function RowRange({ id, label, iconMin, iconMax, step, min, max, value, valueChange }) {
    const isRTL = document.dir === "rtl";
    const fillX = (value - min) / (max - min) * 100;
    const fill = {
        backgroundSize: `${fillX}% 100%`,
        backgroundPosition: `${isRTL ? "100%" : "0"} 0`
    };
    return (React.createElement("div", { className: "controls__row" },
        React.createElement(Icon, { name: iconMin }),
        React.createElement("label", { htmlFor: id, className: "controls__label controls__label--sr" }, label),
        React.createElement("input", { id: id, className: "controls__range", type: "range", step: step, min: min, value: value, max: max, onChange: (e) => valueChange(+e.target.value), style: fill }),
        React.createElement(Icon, { name: iconMax })));
}
function RowSwitch({ id, label, value, valueChange }) {
    return (React.createElement("div", { className: "controls__row" },
        React.createElement("label", { htmlFor: id, className: "controls__label" }, label),
        React.createElement("input", { id: id, className: "controls__switch", type: "checkbox", checked: value, onChange: () => valueChange(!value) })));
}