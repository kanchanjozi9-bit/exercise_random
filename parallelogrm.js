const r = require("raylib");

function setup() {
    const WIDTH = 1000;
    const HEIGHT = 800;
    const FPS = 50;

    r.SetConfigFlags(r.FLAG_WINDOW_HIGHDPI);
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Dots");
    r.SetTargetFPS(FPS);

    const randomPoints = getRandomPoints(200);

    const widthVector = { x: 50, y: -50 };
    const heightVector = { x: 300, y: -50 };

    const bottomLeft = { x: 300, y: 400 };

    return {
        WIDTH,
        HEIGHT,
        FPS,
        randomPoints,
        parallelogram: { widthVector, heightVector, bottomLeft },
    };
}

function getRandomPoints(length) {
    const random = [];
    for (let i = 0; i < length; i++) {
        random.push(Math.random());
    }
    return random;
}

function drawDot(position) {
    r.DrawCircle(position.x, position.y, 3, r.ColorAlpha(r.WHITE, 0.5));
}

function drawDots(p, random) {
    for (let i = 0; i < random.length - 1; i++) {
        const multi = r.Vector2Scale(p.widthVector, random[i]);
        const sum = r.Vector2Add(p.bottomLeft, multi);
        const multi2 = r.Vector2Scale(p.heightVector, random[i + 1]);
        const point = r.Vector2Add(sum, multi2);

        drawDot(point);
    }
}

function drawParallelogram(p) {
    const bottomRight = r.Vector2Add(p.bottomLeft, p.widthVector);
    const topLeft = r.Vector2Add(p.bottomLeft, p.heightVector);
    const topRight = r.Vector2Add(bottomRight, p.heightVector);

    r.DrawLineV(p.bottomLeft, bottomRight, r.WHITE);
    r.DrawLineV(topLeft, topRight, r.WHITE);
    r.DrawLineV(p.bottomLeft, topLeft, r.WHITE);
    r.DrawLineV(bottomRight, topRight, r.WHITE);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.DARKBLUE);

    drawParallelogram(world.parallelogram);
    drawDots(world.parallelogram, world.randomPoints);

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
