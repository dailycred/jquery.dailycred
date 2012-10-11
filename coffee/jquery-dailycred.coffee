defaults =
  site: "https://www.dailycred.com"
  style: 'oauth'
  method: 'signin'
  action: ->
    "/#{this.style}/api/#{this.method}.json"
  error: ->
  success: ->
  after: ->

params = (hash, $el) ->
  parms = []
  $.each hash, (k,v) ->
    if ["client_id","redirect_uri","state"].indexOf(k) > -1
      parms.push("#{k}=#{v}")
  str = parms.join("&") + "&#{$el.serialize().replace(/[^&]+=\.?(?:&|$)/g, '').replace(/&$/, '').replace(/\?$/,'')}"
  if str.length > 0
    str = "?#{str}"
  str

methods =
  init: (opts) ->
    opts = opts || {}
    $.each defaults, (k,v) ->
      opts[k] = opts[k] || v
    this.data('dailycred',opts)
    this.submit (e) ->
      methods['submit']($(e.target))
      e.preventDefault()
    this.find('input').keypress (e) ->
      if e.which == 13
        methods['submit']($(e.target).closest('form'))
        e.preventDefault()
  submit: ($el) ->
    if !$el
      $el = this
    data = $el.data('dailycred')
    url = "#{data.site}#{data.action()}#{params(data,$el)}"
    $.ajax
      url: url
      dataType: 'json'
      type: 'post'
      success: (response) ->
        if response.worked
          data.after undefined, response
        else
          data.after response.errors[0]
      error: ->
        e =
          message: "Server Error."
          attribute: "Form"
        data.after e
    false
  method: (action) ->
    data = this.data('dailycred')
    data.method = action
    this.data('dailycred', data)
$.fn.dailycred = (method, arg)->
  this.each ->
    $this = $(this)
    if methods[method]
      return methods[method].apply( $this, [arg])
    else if typeof method == 'object' || ! method
      return methods.init.apply( $this, [method] )
    else
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' )


$(document).ready ->
  $('#dailycred').dailycred
    client_id: "dailycred"
    style: 'user'
    after: (obj) ->
      $('#dailycred-jq-response').html JSON.stringify(obj, undefined, 2)
      prettyPrint()
  $('#demo-signup').click ->
    $('#dailycred').dailycred('method','signup').dailycred('submit')
    # set the method back to signin
    $('#dailycred').dailycred('method','signin')
    false