const r = require("raylib");

function setup() {
    const WIDTH = 1000;
    const HEIGHT = 800;
    const FPS = 50;

    r.SetConfigFlags(r.FLAG_WINDOW_HIGHDPI);
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "stars");
    r.SetTargetFPS(FPS);

    const origin = {
        x: WIDTH / 2,
        y: HEIGHT / 2,
    };

    // randomInRange(min, max)
    // random

    const xOfPoints = randomBetween(0, 1000, 1000);
    const yOfPoints = randomBetween(0, 800, 1000);

    return {
        WIDTH,
        HEIGHT,
        FPS,
        origin,
        xOfPoints,
        yOfPoints,
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

function drawStars(starX, starY) {
    r.DrawCircle(starX, starY, 3, r.WHITE);
}
function distanceBetween(v1, v2) {
    return { x: v2.x - v1.x, y: v2.y - v1.y };
}
function createPoints(i, arrX, arrY) {
    return { x: arrX[i], y: arrY[i] };
}

function calDistance(world) {
    let factor = 0.01;
    for (let i = 0; i < world.xOfPoints.length; i++) {
        const point = createPoints(i, world.xOfPoints, world.yOfPoints);
        const distance = distanceBetween(world.origin, point);

        if (point.x > world.WIDTH / 2 && point.y > world.HEIGHT / 2) {
            drawStars(world.origin, distance, -world.cf, factor, world);
        } else drawStars(world.origin, distance, world.cf, factor, world);

        factor += 0.01;
    }
}
function drawStars(origin, distance, cf, factor, world) {
    const x = origin.x + distance.x * factor;
    const y = origin.y + distance.y * factor;
    let starX = x - cf;
    let starY = y - cf;
    if (
        starX === world.WIDTH ||
        starY === world.HEIGHT ||
        starX === 0 ||
        starY === 0
    ) {
        starX = origin.x;
        starY = origin.y;
    }
    r.DrawCircle(starX, starY, 3, r.WHITE);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawCircle(world.origin.x, world.origin.y, 4, r.WHITE);

    r.DrawCircleV(world.origin, 3, r.GOLD);
    calDistance(world);
    //drawStars(world);
    r.EndDrawing();
}

function loop(world) {
    while (!r.WindowShouldClose()) {
        world.cf += 1;
        draw(world);
    }
}

function main() {
    const world = setup();
    world.cf = 0.01;
    loop(world);
}
main();
