const r = require("raylib");

function setup() {
    const WIDTH = 800;
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
    r.ClearBackground(r.BLACK);

    const target = r.LoadRenderTexture(500, 300);
    r.BeginTextureMode(target);
    r.DrawCircle(cf, cf, 50, r.RED);
    r.DrawLine(0, 0, 300, 300, r.WHITE);
    r.DrawRectangle(cf, cf, 20, 20, r.WHITE);
    r.EndTextureMode();

    for (let i = 0; i < 10; i++) {
        const x = 100;
        const y = 100;
        r.DrawTexture(target.texture, x * i, y, r.WHITE);
    }

    r.EndDrawing();
}
function loop(world, cf) {
    while (!r.WindowShouldClose()) {
        draw(world, cf);
        cf++;
    }
}

function main() {
    const world = setup();
    let cf = world.FPS;
    loop(world, cf);
}
main();
