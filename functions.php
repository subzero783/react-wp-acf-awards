<?php 

add_action('wp_enqueue_scripts', 'awards_react_app');
function awards_react_app(){
    
    $classes = get_body_class();

    if( in_array('page-template-awards',$classes) ){
    wp_enqueue_style( 
      'awards-app', 
      get_stylesheet_directory_uri() . '/page-templates/template-awards/build/index.css', 
      [], 
      '1.0', 
      'all' 
    );
    wp_enqueue_script(
      'awards-app',
      get_stylesheet_directory_uri() . '/page-templates/template-awards/build/index.js', // This refer to the built React app
      array('wp-blocks', 'wp-element', 'wp-editor'), //This dependency indicates that you need React at Frontend
      rand(), // This could be changed to the theme version for production
      true
    );
  }
}

?>