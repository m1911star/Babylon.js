import {
    countCurrentObjects,
    countObjects,
    CountValues,
    evaluateDisposeEngine,
    evaluateDisposeScene,
    evaluateEventListenerAugmentation,
    evaluateInitEngine,
    evaluatePrepareScene,
    getGlobalConfig,
    prepareLeakDetection,
    evaluateRenderSceneForVisualization,
} from "@tools/test-tools";

const classesToCheck = ["BABYLON.Camera", "BABYLON.TransformNode", "BABYLON.Scene", "BABYLON.Vector3", "BABYLON.BaseTexture", "BABYLON.Material"];

const playgrounds = [
    "#WIR77Z",
    "#WIR77Z#1165",
    "#WIR77Z#1166",
    "#WIR77Z#1167",
    "#WIR77Z#1168",
    "#2AH4YH",
    "#YEZPVT",
    // "#SRZRWV#6",
    "#XCPP9Y#1",
    "#XZ0TH6",
    "#JU1DZP",
    "#7V0Y1I#1523",
    "#6FBD14#2004",
    "#KQV9SA",
    "#7CBW04",
];

// IN TESTS
// declare const BABYLON: typeof import("core/index");

describe("Playground Memory Leaks", () => {
    jest.setTimeout(30000);

    let init: CountValues;

    beforeEach(async () => {
        await page.goto(getGlobalConfig().baseUrl + `/empty.html`, {
            waitUntil: "load", // for chrome should be "networkidle0"
            timeout: 0,
        });
        init = await countObjects(page);
        await page.evaluate(evaluateEventListenerAugmentation);
        await page.evaluate(evaluateInitEngine, "webgl2", getGlobalConfig().baseUrl);
        page.evaluate(prepareLeakDetection, classesToCheck);
    });

    // eslint-disable-next-line jest/expect-expect
    test.each(playgrounds)(
        "Leaks for playground %s",
        async (playgroundId) => {
            const globalConfig = getGlobalConfig();
            await page.evaluate(
                evaluatePrepareScene,
                {
                    playgroundId,
                },
                globalConfig
            );
            await page.evaluate(evaluateRenderSceneForVisualization, 60);
            await page.evaluate(evaluateDisposeScene);
            await page.evaluate(evaluateDisposeEngine);
            await countCurrentObjects(init);
        },
        30000
    );
});
