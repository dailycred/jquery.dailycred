(function() {
  var defaults, methods, params;

  defaults = {
    site: "https://www.dailycred.com",
    style: 'oauth',
    method: 'signin',
    action: function() {
      return "/" + this.style + "/api/" + this.method + ".json";
    },
    error: function() {},
    success: function() {},
    after: function() {}
  };

  params = function(hash, $el) {
    var parms, str;
    parms = [];
    $.each(hash, function(k, v) {
      if (["client_id", "redirect_uri", "state"].indexOf(k) > -1) {
        return parms.push("" + k + "=" + v);
      }
    });
    str = parms.join("&") + ("&" + ($el.serialize().replace(/[^&]+=\.?(?:&|$)/g, '').replace(/&$/, '').replace(/\?$/, '')));
    if (str.length > 0) {
      str = "?" + str;
    }
    return str;
  };

  methods = {
    init: function(opts) {
      opts = opts || {};
      $.each(defaults, function(k, v) {
        return opts[k] = opts[k] || v;
      });
      this.data('dailycred', opts);
      this.submit(function(e) {
        return methods['submit'](e);
      });
      return this.find('input').keypress(function(e) {
        if (e.which === 13) {
          return methods['submit'](e);
        }
      });
    },
    submit: function(e) {
      var $el, data, url;
      if (!e) {
        $el = this;
      } else {
        e.preventDefault();
        $el = $(e.target);
      }
      data = $el.data('dailycred');
      url = "" + data.site + (data.action()) + (params(data, $el));
      $.ajax({
        url: url,
        dataType: 'json',
        type: 'post',
        success: function(response) {
          if (response.worked) {
            return data.after(void 0, response);
          } else {
            return data.after(response.errors[0]);
          }
        },
        error: function() {
          e = {
            message: "Server Error.",
            attribute: "Form"
          };
          return data.after(e);
        }
      });
      return false;
    },
    method: function(action) {
      var data;
      data = this.data('dailycred');
      data.method = action;
      return this.data('dailycred', data);
    }
  };

  $.fn.dailycred = function(method, arg) {
    return this.each(function() {
      var $this;
      $this = $(this);
      if (methods[method]) {
        return methods[method].apply($this, [arg]);
      } else if (typeof method === 'object' || !method) {
        return methods.init.apply($this, [method]);
      } else {
        return $.error('Method ' + method + ' does not exist on jQuery.tooltip');
      }
    });
  };

  $(document).ready(function() {
    $('#dailycred').dailycred({
      client_id: "dailycred",
      style: 'user',
      after: function(obj) {
        $('#dailycred-jq-response').html(JSON.stringify(obj, void 0, 2));
        return prettyPrint();
      }
    });
    return $('#demo-signup').click(function() {
      $('#dailycred').dailycred('method', 'signup').dailycred('submit');
      return false;
    });
  });

}).call(this);
