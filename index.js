let block = document.getElementById("block");
let mouseDw = 0;
var colorSelected = 1;
var colorValue1 = "#000000";
var colorValue2 = "#ffffff00";
var pureColor = ["#000000", "#000000"];
var btt = 1;
document.body.addEventListener("mouseup", () => {
    mouseDw = 0;
});
document.getElementById("taskArea").addEventListener("mousedown", () => {
    mouseDw = 1;
});
block.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});
block.addEventListener("mousedown", (e) => {
    e.preventDefault();
    mouseDw = 1;
    btt = e.buttons;
    draw(e);
});
block.addEventListener("mouseup", (e) => {
    mouseDw = 0;
});
block.addEventListener("mousemove", (e) => {
    if (mouseDw) {
        e.stopPropagation();
        draw(e);
    }
});
function draw(e) {
    if (e.target.id != "block") {
        switch (btt) {
            case 1:
                e.target.style.background = `${colorValue1}`;
                break;
            case 2:
                e.target.style.background = `${colorValue2}`;
                break;
        }
    }
}
for (let i = 0; i < 1024; i++) {
    let pixel = document.createElement("div");
    pixel.className = "pixel";
    pixel.style.background = "rgba(0,0,0,0)";
    block.appendChild(pixel);
}
function colorClick(ele) {
    let inputs = document.getElementsByClassName("color active");
    inputs[0].classList.remove("active");
    ele.className = "color active";
    setColor(colorSelected, ele.id);
}
function changClsl(ele, id) {
    document.getElementsByClassName("ct ctacc")[0].classList.remove("ctacc");
    ele.className = "ct ctacc";
    colorSelected = id;
    document.getElementById("inpColor").value = pureColor[colorSelected - 1];
    document.getElementById("inpColor").click();
    document.getElementById("opBox").style.display = "block";
}
document.body.onmousedown = (e) => {
    if (e.target.id != "opBox" && e.target.id != "opacity") {
        document.getElementById("opBox").style.display = "none";
    }
};
function setColor(id, color) {
    document.getElementById("color" + id + "").style.background = color;
    color.value = color;
    switch (id) {
        case 1:
            colorValue1 = color;
            break;
        case 2:
            colorValue2 = color;
            break;
    }
}
//input color
function colorInp(color) {
    pureColor[colorSelected - 1] = color;
    setColor(colorSelected, color);
}

let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");
function save() {
    let element = document.getElementsByClassName("pixel");
    for (let i = 0; i < element.length; i++) {
        let ele = element[i];
        var boundaries = {
            principal: block.getBoundingClientRect(),
            secundario: ele.getBoundingClientRect()
        };
        cords = {
            y: boundaries.secundario.top - boundaries.principal.top,
            x: boundaries.secundario.left - boundaries.principal.left
        };
        ctx.beginPath();
        ctx.fillStyle = ele.style.background;
        console.log(ctx.fillStyle, ele.style.background);
        ctx.rect(cords.x, cords.y, 20, 20);
        ctx.fill();
    }
    let link = document.createElement("a");
    link.href = cnv.toDataURL();
    link.download = `${document.getElementById("textName").value}`;
    document.body.appendChild(link);
    link.click();
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.fill();
}

function opacity(value) {
    colorValue1 = colorToRGBA(colorValue1, value);
    setColor(colorSelected, colorValue1);
}
function colorToRGBA(color, opacity) {
    var parts;
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
        var r = parseInt(color.substring(1, 3), 16);
        var g = parseInt(color.substring(3, 5), 16);
        var b = parseInt(color.substring(5, 7), 16);
        parts = [r, g, b];
    } else if (/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.test(color)) {
        parts = color.match(/\d+/g);
    } else if (/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\)$/.test(color)) {
        parts = color.match(/\d+/g);
    } else return NaN;
    return (
        "rgba(" +
        parts[0] +
        ", " +
        parts[1] +
        ", " +
        parts[2] +
        ", " +
        opacity +
        ")"
    );
}
