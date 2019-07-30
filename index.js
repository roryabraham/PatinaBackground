function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min + 1)) + min;
}

function getRandomBoolean() {
    return Math.random() >= 0.5;
}

let mousePos = {};
const shiftRange = 15;

document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    const drawCircle = (x, y, radius) => {
        //console.log(`drawing at (${x}, ${y}) with radius ${radius}`);
        context.beginPath();
        context.arc(x, y, radius, 0, 2*Math.PI);
        context.fill()
    };

    const cutCircle = (x, y, radius) => {
        //console.log(`cutting at (${x}, ${y}) with radius ${radius}`);
        context.save();
        context.globalCompositeOperation = 'destination-out';
        context.arc(x, y, radius, 0, Math.PI*2);
        context.clip();
        context.restore();
    };

    let animRequestId;

    const animateDrawCircle = (x, y, currRadius, maxRadius) => {
        console.log(`maxRadius: ${maxRadius}`);
        cutCircle(x, y, currRadius);
        currRadius += 0.1;
        drawCircle(x, y, currRadius);
        animRequestId = window.requestAnimationFrame(() => {
            animateDrawCircle(x, y, currRadius, maxRadius);
        });
        if(currRadius >= maxRadius) {
            window.cancelAnimationFrame(animRequestId);
        }
    };

    // load copper image to fill canvas
    let img = new Image();
    img.src = 'images/copper.jpeg';
    img.alt = 'Copper Texture';
    img.onload = () => {
        let width = img.width;
        let height = img.height * (width / img.width);
        canvas.width = width;
        canvas.height = height;
        context.drawImage(img, 0, 0, width, height);
    };

    canvas.addEventListener('mouseout', function(e) {
       mousePos.x = -1;
       mousePos.y = -1;
    });

    canvas.addEventListener('mousemove', function (e) {
        mousePos.x = e.offsetX;
        mousePos.y = e.offsetY;
        context.globalCompositeOperation = 'destination-out';

        let radius = getRandomInt(1, 6);
        let xShift = getRandomInt(0, shiftRange);
        let yShift = getRandomInt(0, shiftRange);

        if(getRandomBoolean()) {
            xShift *= -1;
        }
        if(getRandomBoolean()) {
            yShift *= -1;
        }

/*        context.beginPath();
        context.arc(mousePos.x + xShift, mousePos.y + yShift, radius, 0, 2 * Math.PI);
        context.fill();*/

        console.log(`desired radius: ${radius}`);
        animateDrawCircle(mousePos.x + xShift, mousePos.y + yShift, 1, radius);

/*        context.lineWidth = 20;
        context.beginPath();
        context.moveTo(old.x, old.y);
        context.lineTo(mousePos.x, mousePos.y);
        context.stroke();*/
    });
});
