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
    r.ClearBackground(r.BLACK);

    const target = r.LoadRenderTexture(100, 100);
    r.BeginTextureMode(target);
    drawDots();
    r.EndTextureMode();

    const destination = {
        x: 0,
        y: 0,
        width: target.texture.width,
        height: target.texture.height,
    };

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const source = chooseSource(target, i, j);
            r.DrawTexturePro(
                target.texture,
                source,
                destination,
                {
                    x: target.texture.width * i - cf,
                    y: -target.texture.height * j,
                },
                0,
                r.WHITE,
            );
        }
    }
    r.EndDrawing();
}

function chooseSource(target, i, j) {
    const source = {
        x: 0,
        y: 0,
        width: target.texture.width,
        height: target.texture.height,
    };
    const source2 = {
        x: 0,
        y: 0,
        width: target.texture.width,
        height: -target.texture.height,
    };
    return ((i * j) % 5) % 3 === 0 ? source : source2;
}

function drawDots() {
    const x = 0;
    const y = 10;
    const width = 100;
    const height = 100;
    r.DrawRectangle(x, y, width, height, r.BLACK);
    const ring = {};
    for (let i = 0; i < 10; i++) {
        ring.y = width - 20 * i;
        for (let j = 0; j < 12; j++) {
            ring.x = x + 10;
            r.DrawRing(ring, 120, 130, 45, 0, 8, getColor(i, j));
        }
    }
}
function getColor(i, j) {
    return (i * j * j) % 3 === 0 ? r.WHITE : r.SKYBLUE;
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
