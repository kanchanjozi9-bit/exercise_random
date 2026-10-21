const r = require("raylib");

function setup() {
    const WIDTH = 800;
    const HEIGHT = 400;
    const FPS = 50;
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "A drawing that remains");
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
    r.DrawCircle(10, 10, 5, r.WHITE);

    r.EndTextureMode();

    for (let i = 0; i < 10; i++) {
        let x = 10;
        let y = 10;
        if (x < world.WHITE && x > 0) x += cf;
        if (x >= world.WHITE && x > 0) x += -cf;
        r.DrawTexture(target.texture, x, y, r.WHITE);
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
