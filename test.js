const r = require("raylib");

function setup() {
    const WIDTH = 1000;
    const HEIGHT = 400;
    const FPS = 50;
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "texture");
    r.SetTargetFPS(FPS);

    return {
        WIDTH,
        HEIGHT,
        FPS,
    };
}

function draw(world, cf) {
    r.BeginDrawing();
    r.ClearBackground(r.DARKGRAY);

    const target = r.LoadRenderTexture(200, 200);
    r.BeginTextureMode(target);

    r.ClearBackground(r.BLACK);
    r.DrawCircle(100, 100, 60, r.RED);
    r.DrawCircle(80, 80, 15, r.WHITE);
    r.DrawCircle(10, 10, 3, r.SKYBLUE);
    // ball(cf);

    r.EndTextureMode();

    r.DrawTexture(target.texture, 50, 50, r.WHITE);
    r.DrawTexture(target.texture, 300, 50, r.WHITE);
    r.DrawTexture(target.texture, 550, 50, r.WHITE);

    r.EndDrawing();
}

// function ball(cf) {
//     for (let i = 0; i < 200; i++) {
//         const x = 100;
//         r.DrawCircle(cf + x, cf + x, 3, r.SKYBLUE);
//     }
// }

function loop(world, cf) {
    // while (!r.WindowShouldClose()) {
    //     draw(world);
    // }
    const target = r.LoadRenderTexture(1000, 500);

    while (!r.WindowShouldClose()) {
        cf++;
        r.BeginTextureMode(target);

        drawCircle(cf);
        r.EndTextureMode();

        r.BeginDrawing();

        r.ClearBackground(r.BLACK);

        r.DrawTexture(target.texture, 0, 0, r.PINK);
        r.DrawTexture(target.texture, 100, 0, r.WHITE);
        r.DrawTexture(target.texture, 300, 100, r.PINK);

        r.EndDrawing();
    }
}

function drawCircle(cf) {
    let x = 0;
    let y = 0;
    for (let i = 0; i < 100; i++) {
        x += 10;
        r.DrawCircle(x, y + cf, 2, r.WHITE);
    }
}

function main() {
    const world = setup();
    let cf = world.FPS;
    loop(world, cf);
}
main();
