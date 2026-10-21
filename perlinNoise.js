const r = require("raylib");

function setup() {
    const WIDTH = 800;
    const HEIGHT = 840;
    const FPS = 50;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Perlin Noise");
    r.SetTargetFPS(FPS);

    return {
        WIDTH,
        HEIGHT,
        FPS,
        offset: 0,
    };
}

// ------------------------------------
// Perlin noise
// ------------------------------------

const gradients = [];

function createGradients(length) {
    for (let i = 0; i <= length + 1; i++) {
        gradients.push(Math.random() * 2 - 1);
    }
}

function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function noise(x) {
    const left = Math.floor(x);
    const right = left + 1;

    const distance = x - left;

    const leftGradient = gradients[left];
    const rightGradient = gradients[right];

    const leftValue = leftGradient * distance;
    const rightValue = rightGradient * (distance - 1);

    const smooth = fade(distance);

    return lerp(leftValue, rightValue, smooth);
}

// ------------------------------------
// Draw noise
// ------------------------------------

function drawNoise(world) {
    for (let x = 0; x < world.WIDTH; x++) {
        const sampleX = x * 0.01;

        const value = noise(sampleX);

        const y = world.HEIGHT / 8 + value * 300;

        //r.DrawCircle(x, y, 2, r.WHITE);
        // r.DrawLine(x, y, 350, 400, getColor(x));
        r.DrawRectangle(y, x, 100, 200, getColor(x));
    }
}
function getColor(i) {
    return {
        r: gradients[i],
        g: i,
        b: i,
        a: 255,
    };
}
// ------------------------------------
// Main drawing
// ------------------------------------

function draw(world) {
    r.BeginDrawing();

    r.ClearBackground(r.BLACK);

    drawNoise(world);

    r.EndDrawing();
}

// ------------------------------------
// Loop
// ------------------------------------

function loop(world) {
    while (!r.WindowShouldClose()) {
        world.offset += 0.01;

        draw(world);
    }
}

// ------------------------------------
// Main
// ------------------------------------

function main() {
    const world = setup();

    createGradients(1000);

    loop(world);
}

main();
