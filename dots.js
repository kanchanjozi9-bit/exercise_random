const r = require("raylib");

function setup() {
    const WIDTH = 1000;
    const HEIGHT = 800;
    const FPS = 50;

    r.SetConfigFlags(r.FLAG_WINDOW_HIGHDPI);
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Dots");
    r.SetTargetFPS(FPS);

    const randomPoints = randomBetween(10, 1000);

    return {
        WIDTH,
        HEIGHT,
        FPS,
        randomPoints,
    };
}

function randomBetween(min, max) {
    const random = [];
    const delta = max - min;
    for (let i = 0; i < 2001; i++) {
        random.push(Math.random() * delta + min);
    }
    return random;
}

function drawDots(random) {
    for (let i = 0; i < 2000; i++) {
        const x = random[i];
        r.DrawCircle(x, random[i + 1], 5, r.ColorAlpha(r.WHITE, 0.5));
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.DARKBLUE);
    drawDots(world.randomPoints);
    r.EndDrawing();
}

function loop(world) {
    while (!r.WindowShouldClose()) {
        draw(world);
    }
}

function main() {
    const world = setup();

    loop(world);
}
main();
