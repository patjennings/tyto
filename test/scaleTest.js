var chai = require("chai");
var assert = chai.assert;

// import scale from "../client/js/utils/scale";
var scale = require("../client/js/utils/scale");

describe("scale", function(){
    it("should return the number value from one range to another", function(){
	var s = scale(5, 0, 10, 100, 200);

	assert.equal(s, 150);
    });
})
