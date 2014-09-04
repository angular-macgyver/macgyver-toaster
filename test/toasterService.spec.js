describe("service", function() {
  var service;

  beforeEach(function() {
    module("Mac.Toaster");

    inject(function(notification) {
      service = notification;
    });

    spyOn(service, "show").and.callThrough();
  });

  it("should get the service", function() {
    expect(service).toBeDefined();
  });

  it("should append toasters element to body", function() {
    var element = document.body.querySelector(".mac-toaster");
    expect(element).toBeDefined();
  });

  describe("error", function() {
    it("should call show function", function() {
      service.error("Fail");

      expect(service.show).toHaveBeenCalledWith("error", "Fail", {});
    });

    it("should extend options correctly", function() {
      service.error("Fail", {delay: 9001});

      expect(service.show).toHaveBeenCalledWith("error", "Fail", {
        delay: 9001
      });
    });
  });

  describe("success", function() {
    it("should call show function", function() {
      service.success("SUCCESS!!!!!");

      expect(service.show).toHaveBeenCalled();
    });

    it("should extend options correctly", function() {
      service.success("IT'S WORKING", {delay: 9001});

      expect(service.show).toHaveBeenCalledWith("success", "IT'S WORKING", {
        delay: 9001
      });
    });
  });

  describe("notice", function() {
    it("should call show function", function() {
      service.notice("Good News Everyone!");

      expect(service.show).toHaveBeenCalled();
    });

    it("should extend options correctly", function() {
      service.notice("Not sure...", {delay: 9001});

      expect(service.show).toHaveBeenCalledWith("notice", "Not sure...", {
        delay: 9001
      });
    });
  });
});
