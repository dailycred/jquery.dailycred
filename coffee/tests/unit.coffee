$ ->
  module "dailycred SDK"
  clientId = 'd967453a-b8aa-444e-a8b5-f31d5431f73d'

  FORM = ->
    $('#qunit-fixture form')

  test "should be defined on jquery object", ->
    form = FORM()
    ok(form.dailycred())

  test "should use defaults", ->
    form = FORM().dailycred()
    data = form.data()['dailycred']
    equal data.site, "https://www.dailycred.com"
    equal data.style, 'oauth'
    equal data.method, 'signin'
    equal data.action(), "/oauth/api/signin.json"
    ok data.after

  test "overrides defaults", ->
    form = FORM().dailycred
      method: 'signup'
      style: 'user'
    data = form.data()['dailycred']
    equal data.method, 'signup'
    equal data.style, 'user'

  test "signs in successfully", ->
    stop()
    form = FORM().dailycred
      client_id: clientId
      after: (err, data) ->
        deepEqual err, undefined
        ok data
        start()
    form.find('input[name="email"]').val 'test@2.com'
    form.find('input[name="pass"]').val 'password'
    form.dailycred 'submit'

  test "signs up successfully", ->
    stop()
    form = FORM().dailycred
      client_id: clientId
      after: (err, data) ->
        deepEqual err, undefined
        ok data
        start()
    d = new Date()
    form.find('input[name="email"]').val "test#{d.getTime()}@2.com"
    form.find('input[name="pass"]').val 'password'
    form.dailycred('method','signup').dailycred('submit')

  test "signs in successfully from keyboard", ->
    stop()
    form = FORM().dailycred
      client_id: clientId
      after: (err, data) ->
        deepEqual err, undefined
        ok data
        start()
    form.find('input[name="email"]').val 'test@2.com'
    form.find('input[name="pass"]').val 'password'
    e = $.Event "keyup"
    e.which = 13
    form.find('input[name="email"]').trigger e

  test "signs up successfully from keyboard", ->
    stop()
    form = FORM().dailycred
      client_id: clientId
      after: (err, data) ->
        deepEqual err, undefined
        ok data
        start()
    d = new Date()
    form.find('input[name="email"]').val "test#{d.getTime()}@2.com"
    form.find('input[name="pass"]').val 'password'
    e = $.Event "keyup"
    e.which = 13
    form.dailycred('method','signup').find('input[name="email"]').trigger e