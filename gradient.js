const r = require("raylib");

function setup() {
    const WIDTH = 1000;
    const HEIGHT = 800;
    const FPS = 50;

    r.SetConfigFlags(r.FLAG_WINDOW_HIGHDPI);
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "gradient");
    r.SetTargetFPS(FPS);

    const randomPoints = randomBetween(0, 100);

    const gradientPalette = {
        0: { first: r.SKYBLUE, second: r.BLUE },
        1: { first: r.DARKBLUE, second: r.DARKPURPLE },
        2: { first: r.GOLD, second: r.DARKGREEN },
        3: { first: r.ORANGE, second: r.RED },
    };

    const stripPalette = {
        0: { color: r.BLUE, alpha: randomBetween(0, 10) },
        1: { color: r.RED, alpha: randomBetween(0, 10) },
        2: { color: r.DARKGREEN, alpha: randomBetween(0, 10) },
        3: { color: r.ORANGE, alpha: randomBetween(0, 10) },
    };

    return {
        WIDTH,
        HEIGHT,
        FPS,
        gradientPalette,
        stripPalette,
        randomPoints,
    };
}

function randomBetween(min, max) {
    const random = [];
    const delta = max - min;
    for (let i = 0; i < 100; i++) {
        random.push(Math.random() * 0.5); //* delta + min);
    }
    return random;
}

function drawStrips(world) {
    for (let i = 0; i < 4; i++) {
        const y = 100 * i;
        drawBackStrips(y, i, world.WIDTH, world.gradientPalette);
        drawFrontStrips(world.stripPalette, i, y, world.randomPoints);
    }
}

function drawFrontStrips(strips, i, y, random) {
    for (let j = 0; j < 100; j++) {
        const x = j * 10;
        r.DrawRectangle(
            x,
            y,
            10,
            100,
            r.ColorAlpha(strips[i].color, strips[i].alpha[j]),
        );
    }
}

function drawBackStrips(y, i, width, gradients) {
    r.DrawRectangleGradientH(
        0,
        y,
        width,
        100,
        gradients[i].first,
        gradients[i].second,
    );
}

function draw(world, cf) {
    const target = r.LoadRenderTexture(world.WIDTH, world.HEIGHT / 2);

    r.BeginTextureMode(target);
    r.ClearBackground(r.DARKGRAY);
    drawStrips(world);

    r.EndTextureMode();

    r.BeginDrawing();
    const source = {
        x: 0,
        y: 0,
        width: target.texture.width,
        height: -target.texture.height,
    };
    const source2 = {
        x: 0,
        y: 0,
        width: -target.texture.width,
        height: target.texture.height,
    };

    r.DrawTextureRec(target.texture, source, { x: 0, y: 0 }, r.LIGHTGRAY);
    r.DrawTextureRec(
        target.texture,
        source2,
        { x: 0, y: world.HEIGHT / 2 },
        r.LIGHTGRAY,
    );

    r.EndDrawing();
}

function loop(world, cf) {
    while (!r.WindowShouldClose()) {
        draw(world);
    }
}

function main() {
    const world = setup();
    let cf = world.FPS;
    loop(world, cf);
}
main();
