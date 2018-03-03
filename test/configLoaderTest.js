var configLoader = require("../libs/configLoader.js");

var assert = require("assert");
describe("ConfigLoader", function() {
  describe("#load", function() {
    it("should return env var NOMP_CONFIG", function() {
      // given
      var expectedConfig = {
        logLevel: "debug"
      };
      process.env.NOMP_CONFIG = expectedConfig;

      // when
      var actualConfig = configLoader.load();

      // then
      assert.equal(actualConfig, expectedConfig);

      // cleanup
      delete process.env.NOMP_CONFIG;
    });

    it("should return config.js", function() {
      // given
      // config.json is already on the file system
      var expectedConfig = {
        logLevel: "debug"
      };
      delete process.env.NOMP_CONFIG;

      // when
      var actualConfig = configLoader.load("test/data/config.json");

      // then
      assert.equal(actualConfig.trim, expectedConfig.trim);
    });

    it("should return an error", function() {
      // given
      // config.json is already on the file system
      var expectedConfig = {
        logLevel: "debug"
      };
      delete process.env.NOMP_CONFIG;

      // when
      try {
        var actualConfig = configLoader.load();
        // then
        assert.fail("should return an error");
      } catch (err) {
        // error expected, test should pass
      }
    });
  });
});
