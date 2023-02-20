const {mkdirSync} = require("fs");
const {rimrafSync} = require("rimraf");
const {runFile, runLive, compileSource, compileLibrary, runBinary, invokeFunction, loadFunctions} = require("@thimpat/c-node");

const showHello = function ()
{
    // Compile then run generated executable
    runFile("examples/ex1.c", {outputDir: "demo/"});

    runFile("examples/hello_win.c", {outputDir: "demo/"});

    const compiledCode = compileSource("examples/hello_win.c", {outputDir: "demo/"});
    if (!compiledCode)
    {
        return ;
    }

    // Run from source (JIT)
    runLive("examples/hello_win.c");

    // Run generated executable
    runBinary("demo/hello_win.exe", {outputDir: "demo/"});
}

const generateDll = function ()
{
    // Compile then run generated executable
    if (compileLibrary("examples/dll.c", {outputDir: "demo/"}))
    {
        runFile("examples/hello_dll.c", {outputDir: "demo/", defs: ["demo/dll.dll"]});
    }
}

const callFunction = function ()
{
    const result = invokeFunction("hello_func()", "examples/dll.c", {outputDir: "demo/"});
    console.log({lid: 3002}, result);
}

const loadDll = function ()
{
    const {hello_func} = loadFunctions("examples/dll.c", {
        hello_func: {
            prototype: "char* hello_func (char*)",
        }
    }, {outputDir: "demo/"});

    const res = hello_func("My name is awesome");
    console.log({lid: "NC6452"}, res);
}

const init = async function (argv)
{
    rimrafSync("demo/");
    mkdirSync("demo", {recursive: true});

    // showHello();
    // generateDll();
    // callFunction();
    loadDll();
};

(async function ()
{
    await init(process.argv);
}());

