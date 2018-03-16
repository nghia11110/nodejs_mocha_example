var http_mocks = require('node-mocks-http'),
should = require('should'),
mockery = require('mockery');

function buildResponse() {
return http_mocks.createResponse({eventEmitter: require('events').EventEmitter})
}

describe('News Controller Tests', function () {
	before(function () {
	    mockery.enable({
	        warnOnUnregistered: false
	    });

	    mockery.registerMock('../models/news', {
	        all: (cb) => cb(null, ["First news", "Second news"]),
	        create: (title, text, cb) => cb(null, {title: title, text: text, id: Math.random()})
	    });

	    this.controller = require('../controllers/news')
	});

	after(function () {
	    mockery.disable()
	});

	it('all', function (done) {
	    var response = buildResponse();
	    var request = http_mocks.createRequest({
	        method: 'GET',
	        url: '/all'
	    });

	    response.on('end', function () {
	        response._isJSON().should.be.true;

	        var data = JSON.parse(response._getData());
	        should.not.exist(data.error);
	        data.news.length.should.eql(2);
	        data.news[0].should.eql("First news");
	        data.news[1].should.eql("Second news");

	        done()
	    });

	    this.controller.handle(request, response)
	});

	it('create', function (done) {
	    var response = buildResponse();
	    var request = http_mocks.createRequest({
	        method: 'POST',
	        url: '/create'
	    });

	    request.body = {
	        title: "Something is happening",
	        text: "Something is happening in the world!"
	    };

	    response.on('end', function () {
	        response._isJSON().should.be.true;

	        var data = JSON.parse(response._getData());
	        should.not.exist(data.error);
	        data.news.title.should.eql(request.body.title);
	        data.news.text.should.eql(request.body.text);
	        data.news.id.should.exist;

	        done()
	    });

	    this.controller.handle(request, response)
	});
});