(function() {

  $(function() {
    var FORM, clientId;
    module("dailycred SDK");
    clientId = 'd967453a-b8aa-444e-a8b5-f31d5431f73d';
    FORM = function() {
      return $('#qunit-fixture form');
    };
    test("should be defined on jquery object", function() {
      var form;
      form = FORM();
      return ok(form.dailycred());
    });
    test("should use defaults", function() {
      var data, form;
      form = FORM().dailycred();
      data = form.data()['dailycred'];
      equal(data.site, "https://www.dailycred.com");
      equal(data.style, 'oauth');
      equal(data.method, 'signin');
      equal(data.action(), "/oauth/api/signin.json");
      return ok(data.after);
    });
    test("overrides defaults", function() {
      var data, form;
      form = FORM().dailycred({
        method: 'signup',
        style: 'user'
      });
      data = form.data()['dailycred'];
      equal(data.method, 'signup');
      return equal(data.style, 'user');
    });
    test("signs in successfully", function() {
      var form;
      stop();
      form = FORM().dailycred({
        client_id: clientId,
        after: function(err, data) {
          deepEqual(err, void 0);
          ok(data);
          ok(data.redirect);
          return start();
        }
      });
      form.find('input[name="email"]').val('test@2.com');
      form.find('input[name="pass"]').val('password');
      return form.dailycred('submit');
    });
    test("signs up successfully", function() {
      var d, form;
      stop();
      form = FORM().dailycred({
        client_id: clientId,
        after: function(err, data) {
          deepEqual(err, void 0);
          ok(data);
          ok(data.redirect);
          return start();
        }
      });
      d = new Date();
      form.find('input[name="email"]').val("test" + (d.getTime()) + "@2.com");
      form.find('input[name="pass"]').val('password');
      return form.dailycred('method', 'signup').dailycred('submit');
    });
    test("signs in successfully from keyboard", function() {
      var e, form;
      stop();
      form = FORM().dailycred({
        client_id: clientId,
        after: function(err, data) {
          deepEqual(err, void 0);
          ok(data);
          return start();
        }
      });
      form.find('input[name="email"]').val('test@2.com');
      form.find('input[name="pass"]').val('password');
      e = $.Event("keyup");
      e.which = 13;
      return form.find('input[name="email"]').trigger(e);
    });
    test("signs up successfully from keyboard", function() {
      var d, e, form;
      stop();
      form = FORM().dailycred({
        client_id: clientId,
        after: function(err, data) {
          deepEqual(err, void 0);
          ok(data);
          return start();
        }
      });
      d = new Date();
      form.find('input[name="email"]').val("test" + (d.getTime()) + "@2.com");
      form.find('input[name="pass"]').val('password');
      e = $.Event("keyup");
      e.which = 13;
      return form.dailycred('method', 'signup').find('input[name="email"]').trigger(e);
    });
    test("errors with bad pass on signin", function() {
      var form;
      stop();
      form = FORM().dailycred({
        client_id: clientId,
        after: function(err, data) {
          ok(err);
          deepEqual(data, void 0);
          return start();
        }
      });
      form.find('input[name="email"]').val('test@2.com');
      form.find('input[name="pass"]').val('passwor');
      return form.dailycred('submit');
    });
    test("errors with bad pass on signup", function() {
      var d, form;
      stop();
      form = FORM().dailycred({
        client_id: clientId,
        after: function(err, data) {
          ok(err);
          deepEqual(data, void 0);
          return start();
        }
      });
      d = new Date();
      form.find('input[name="email"]').val("test" + d + "@2.com");
      form.find('input[name="pass"]').val('password');
      return form.dailycred('method', 'signup').dailycred('submit');
    });
    test("signs in successfully with user flow", function() {
      var form;
      stop();
      form = FORM().dailycred({
        client_id: clientId,
        style: 'user',
        after: function(err, data) {
          deepEqual(err, void 0);
          ok(data);
          ok(data.user);
          return start();
        }
      });
      form.find('input[name="email"]').val('test@2.com');
      form.find('input[name="pass"]').val('password');
      return form.dailycred('submit');
    });
    return test("signs up successfully with user flow", function() {
      var d, form;
      stop();
      form = FORM().dailycred({
        client_id: clientId,
        style: 'user',
        after: function(err, data) {
          deepEqual(err, void 0);
          ok(data);
          ok(data.user);
          return start();
        }
      });
      d = new Date();
      form.find('input[name="email"]').val("test" + (d.getTime()) + "@2.com");
      form.find('input[name="pass"]').val('password');
      return form.dailycred('method', 'signup').dailycred('submit');
    });
  });

}).call(this);
