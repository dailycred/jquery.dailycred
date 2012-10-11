task :upload do
  #upload to s3
  require 'aws/s3'
  AWS::S3::Base.establish_connection!(
    :access_key_id     => ENV['DC_AWS_ACCESS_KEY'],
    :secret_access_key => ENV['DC_AWS_SECRET_KEY']
  )

  AWS::S3::S3Object.store(
    "js/jquery-dailycred.js",
    File.open("lib/jquery-dailycred.js"),
    'file.dailycred.com',
    :content_type => 'text/javascript')

  AWS::S3::S3Object.store(
    "js/jquery-demo.html",
    File.open("demo.html"),
    'file.dailycred.com')
  print "Uploaded.\n"
end

task :default => :upload

