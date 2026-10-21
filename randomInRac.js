const r = require("raylib");

function setup() {
    const WIDTH = 1000;
    const HEIGHT = 800;
    const FPS = 50;

    r.SetConfigFlags(r.FLAG_WINDOW_HIGHDPI);
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Dots");
    r.SetTargetFPS(FPS);

    const rec = {
        x: 100,
        y: 100,
        width: 400,
        height: 500,
    };

    const valueOfX = randomBetween(rec.x + 3, rec.x + rec.width - 3);
    const valueOfY = randomBetween(rec.y + 3, rec.y + rec.height - 3);

    return {
        WIDTH,
        HEIGHT,
        FPS,
        rec,
        valueOfX,
        valueOfY,
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

function drawDots(x, y) {
    for (let i = 0; i < x.length; i++) {
        r.DrawCircle(x[i], y[i], 4, r.ColorAlpha(r.WHITE, 0.3));
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.DARKBLUE);
    r.DrawRectangleLinesEx(world.rec, 10, r.RAYWHITE);
    drawDots(world.valueOfX, world.valueOfY);
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
