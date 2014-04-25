describe("provider", function() {
  var provider = null;

  beforeEach(function() {
    module("Mac.Toaster", function(notificationProvider) {
      provider = notificationProvider;
    });
  });

  it("should have the options method", inject(function() {
    expect(provider.options).toBeDefined();
  }));

  it("should have default position value", inject(function() {
    expect(provider.options("position")).toBe("top right");
  }));

  it("should have default max value", inject(function() {
    expect(provider.options("max")).toBe(5);
  }));

  it("should have default delay value", inject(function() {
    expect(provider.options("delay")).toBe(4000);
  }));

  it("should have update position value", inject(function() {
    provider.options("position", "bottom right");
    expect(provider.options("position")).toBe("bottom right");
  }));
});
