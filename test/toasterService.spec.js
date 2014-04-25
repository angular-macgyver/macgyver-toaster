describe("service", function() {
  var service;

  beforeEach(function() {
    module("Mac.Toaster");

    inject(function(notification) {
      service = notification;
    });
  });

  it("should get the service", function() {
    expect(service).toBeDefined();
  });

  it("should append toasters element to body", function() {
    var element = document.body.querySelector(".mac-toaster");
    expect(element).toBeDefined();
  });
});
