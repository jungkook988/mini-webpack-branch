(function (modules) {
  function require(id) {
    const module = {
      exports: {},
    };

    const [fn, mapping] = modules[id];

    function localRequire(filePath) {
      const id = mapping[filePath];
      return require(id);
    }

    fn(localRequire, module, module.exports);
    return module.exports;
  }

  require(1);
})({
  1: [
    function (require, module, exports) {
      const { foo } = require("./foo.js");
      foo();
      console.log("main.js");
    },
    { "./foo.js": 2 },
  ],
  2: [
    function (require, module, exports) {
      function foo() {
        console.log("foo");
      }
      module.exports = {
        foo,
      };
    },
    {},
  ],
});
