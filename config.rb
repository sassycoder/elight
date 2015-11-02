http_path = "/"
css_dir = "dist/HTMLResources/css"
sass_dir = "sass"
images_dir = "dist/HTMLResources/img"
javascripts_dir = "dist/HTMLResources/js"
output_style = :compressed
line_comments = false
disable_warnings = true

require 'autoprefixer-rails'

on_stylesheet_saved do |file|
  css = File.read(file)
  File.open(file, 'w') do |io|
    io << AutoprefixerRails.process(css)
  end
end
