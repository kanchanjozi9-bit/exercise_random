const r = require("raylib");

function setup() {
    const WIDTH = 800;
    const HEIGHT = 840;
    const FPS = 50;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Spain");
    r.SetTargetFPS(FPS);

    const pallet = [
        r.WHITE,
        r.PINK,
        r.GOLD,
        r.ORANGE,
        r.RED,
        r.DARKBROWN,
        r.SKYBLUE,
    ];

    const length = 100;
    const max = 700;
    const min = 50;
    const randomValues = generatingRandomValues(length, max, min);
    return {
        WIDTH,
        HEIGHT,
        FPS,
        randomValues,
        pallet,
    };
}
function getColor(i, pallet, cf) {
    return pallet[i % 7];
}

function drawLine(world) {
    const randomValues = world.randomValues;
    for (let i = 0; i < randomValues.length; i++) {
        r.DrawLine(
            0 + world.cf,
            randomValues[i],
            randomValues[i],
            0,
            getColor(i, world.pallet, world.cf),
        );
    }
}

function drawCircle(world) {
    const randomValues = generatingRandomValues(25, 60, 700);
    for (let i = 0; i < randomValues.length; i++) {
        r.DrawCircle(
            0 + world.cf,
            randomValues[i],
            10,
            getColor(i, world.pallet, world.cf),
        );
    }
}

function generatingRandomValues(length, max, min) {
    const randomValues = [];
    for (let i = 0; i < length; i++) {
        const ran = Math.random() * (max - min) + min;
        randomValues.push(ran);
    }
    return randomValues;
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    const target = r.LoadRenderTexture(1000, 700);
    r.BeginTextureMode(target);
    drawLine(world);
    drawCircle(world);
    r.EndTextureMode();

    r.DrawTexture(target.texture, 0, -10, r.WHITE);
    r.DrawTexture(target.texture, 100, 0, r.WHITE);
    r.DrawTexture(target.texture, 200, 10, r.WHITE);
    r.DrawTexture(target.texture, 300, 20, r.WHITE);

    // drawLine(world);
    // drawCircle(world);

    r.EndDrawing();
}

function loop(world) {
    world.cf = world.FPS;
    while (!r.WindowShouldClose()) {
        world.cf++;
        draw(world);
    }
}

function main() {
    const world = setup();

    loop(world);
}
main();
