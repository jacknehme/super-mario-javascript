import Camera from './Camera.js';
import Timer from './timer.js';
import { createLevelLoader } from './loaders/level.js';
import { loadEntities } from './entities.js';
import { setupKeyboard } from './input.js';
import { createCollisionLayer } from './layers.js';

async function main(canvas) {
    const context = canvas.getContext('2d');

    const entityFacory = await loadEntities();
    const loadLevel = await createLevelLoader(entityFacory);

    const level = await loadLevel('1-1');

    const camera = new Camera();
    window.camera = camera;

    const mario = entityFacory.mario();
    mario.pos.set(64, 64);
    level.entities.add(mario);

    level.comp.layers.push(createCollisionLayer(level));

    const input = setupKeyboard(mario);
    input.listenTo(window);

    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        if (mario.pos.x > 100) {
            camera.pos.x = mario.pos.x - 100;
        }
        level.comp.draw(context, camera);
    }
    timer.start();
}
const canvas = document.getElementById('screen');
main(canvas);