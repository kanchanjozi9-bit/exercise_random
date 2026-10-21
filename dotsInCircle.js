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

    return {
        WIDTH,
        HEIGHT,
        FPS,
        rec,
    };
}

function randomBetween(min, max, number) {
    const random = [];
    const delta = max - min;
    for (let i = 0; i < number; i++) {
        random.push(Math.random() * delta + min);
    }
    return random;
}

function drawDots(cx, cy, radius) {
    const randomAngle = randomBetween(0, 360, 100);

    for (let i = 0; i < 100; i++) {
        const angle = randomAngle[i];
        const radian = (angle * Math.PI) / 180;

        const horiZontalOffset = radius * Math.cos(radian);
        const vOffset = radius * Math.sin(radian);

        const x = cx + horiZontalOffset;
        const y = cy + vOffset;

        const dotX = randomBetween(cx, x, 100);
        const dotY = randomBetween(cy, y, 100);
        r.DrawCircle(dotX[i], dotY[i], 4, r.ColorAlpha(r.WHITE, 0.3));
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.DARKBLUE);
    const cx = 500;
    const cy = 100;
    const radius = 100;
    r.DrawCircleLines(cx, cy, radius, r.WHITE);
    drawDots(cx, cy, radius);
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
