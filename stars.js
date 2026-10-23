const r = require("raylib");

function setup() {
    const screen = {
        WIDTH: 1000,
        HEIGHT: 800,
        FPS: 50,
    };

    r.SetConfigFlags(r.FLAG_WINDOW_HIGHDPI);
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.WIDTH, screen.HEIGHT, "stars");
    r.SetTargetFPS(screen.FPS);

    const origin = {
        x: screen.WIDTH / 2,
        y: screen.HEIGHT / 2,
    };

    const noOfPoints = 1000;
    const stars = generatePoints(noOfPoints, screen);
    console.log(stars);

    return {
        screen,
        origin,
        stars,
    };
}

function randomBetween(lower, upper) {
    return Math.floor(Math.random() * (upper - lower) + lower);
}

function generatePoints(noOfPoints, screen) {
    const points = [];
    for (let i = 0; i < noOfPoints; i++) {
        const x = randomBetween(0, screen.WIDTH);
        const y = randomBetween(0, screen.HEIGHT);
        points.push({ x, y });
    }
    return points;
}

function drawStar(star) {
    r.DrawCircleV(star, 3, r.WHITE);
}

function getDirection(from, to) {
    return { x: to.x - from.x, y: to.y - from.y };
}

function updateStars(world) {
    world.factor = 0.01;
    const starPosition = world.points;
    for (let i = 0; i < starPosition.length; i++) {
        const direction = getDirection(world.origin, starPosition[i]);

        const x = world.origin.x + direction.x * world.factor;
        const y = world.origin.y + direction.y * world.factor;

        if (isOutOfBound(starPosition, i, world)) {
            drawStarAt(
                x,
                y,
                world.offset,
                world.origin,

                world,
                starPosition[i],
            );
        } else {
            drawStarAt(
                x,
                y,
                -world.offset,
                world.origin,

                world,
                starPosition[i],
            );
        }

        world.factor += 0.01;
    }
}
function isOutOfBound(starPosition, i, world) {
    return (
        starPosition[i].x > world.WIDTH / 2 &&
        starPosition[i].y > world.HEIGHT / 2
    );
}

function drawStarAt(x, y, offset, origin, world, currentStar) {
    const starX = x + offset;
    const starY = y + offset;

    if (
        starX >= world.WIDTH ||
        starY >= world.HEIGHT ||
        starX <= 0 ||
        starY <= 0
    ) {
        world.factor = 0.01;
        currentStar.x = origin.x;
        currentStar.y = origin.y;

        drawStar(starX, starY);
    }
    drawStar(starX, starY);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    // r.DrawCircleV(world.origin, 3, r.GOLD);

    // updateStars(world);
    for (let i = 0; i < world.stars.length; i++) {
        drawStar(world.stars[i]);
    }

    r.EndDrawing();
}

function loop(world) {
    while (!r.WindowShouldClose()) {
        world.offset += 1;
        draw(world);
    }
}

function main() {
    const world = setup();
    world.offset = 0.01;
    loop(world);
}
main();
