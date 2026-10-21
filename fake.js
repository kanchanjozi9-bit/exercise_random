const r = require("raylib");

function setup() {
    const WIDTH = 880;
    const HEIGHT = 800;
    const FPS = 30;
    const offset = 0;

    const randomPoints = getRandomPoint(100);
    r.SetConfigFlags(r.FLAG_WINDOW_HIGHDPI);
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "fake perlin noise");
    r.SetTargetFPS(FPS);

    return {
        WIDTH,
        HEIGHT,
        FPS,
        offset,
        randomPoints,
    };
}

function getRandomPoint(length) {
    const points = [];
    for (let i = 0; i < length; i++) {
        const newRow = {};
        newRow.direction = Math.random() > 0.5 ? 1 : -1;
        points.push(newRow);
    }
    return points;
}
function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
}

function noise(world, x) {
    const left = Math.floor(x);
    const right = left + 1;

    const distanceLeft = x - left;
    const current = x - left;
    const distanceRight = x - right;

    const smoothCurrent = fade(current);

    const leftInfluence = world.randomPoints[left].direction * distanceLeft;
    const rightInfluence = world.randomPoints[right].direction * distanceRight;

    const value =
        leftInfluence + (rightInfluence - leftInfluence) * smoothCurrent;

    return value;
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    for (let x = 1; x < world.WIDTH; x++) {
        const sampleX = x / 80 + world.offset;
        const value = noise(world, sampleX);
        const y = 400 + value * 600;

        const lines = {};
        lines.x = 400 + value * 400;
        lines.y = x;
        r.DrawRingLines(lines, 10, 90, 60, 0, 18, getColor(x, value));
        //r.DrawCircle(x, y, 3, r.WHITE);
    }

    r.EndDrawing();
}

function getColor(i, value) {
    return { r: value * i, g: value * i + 200, b: 200, a: i };
}
function loop(world) {
    while (!r.WindowShouldClose()) {
        draw(world);
        world.offset += 0.025;
    }
}

function main() {
    const world = setup();
    loop(world);
}
main();
