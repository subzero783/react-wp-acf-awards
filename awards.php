<?php
/*
* Template Name: Awards
*/

$image = get_field('image');

$image = empty($image) ? '' : sprintf('style="background-image: url(%s); background-size: cover; overflow: hidden;" ', $image);

$title = get_field('title');

$subtitle = get_field('subtitle');

get_header(); 

?>
</div> <!-- End headerWrapper -->
<div id="wt_containerWrapper" class="clearfix">
<?php
    
    if( get_field('header_image') ) :
        $image = get_field('header_image');
    elseif( has_post_thumbnail() ) :
        $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'full' );
        $image = $image[0];
    else:
        $image = get_stylesheet_directory_uri() . '/assets/img/generic-hero.jpg';
    endif;
?>

<div class="ac_main_banner" style="min-height:500px;">
    <div class="container">
        <div class="acb_header-title" style="max-width:700px;">
            <h1 class="hero-title"><?=$title;?></h1>
            <?=$subtitle;?>
        </div>
    </div>
</div>

<div id="awards-app"></div>

<div class="ascent-press-releases">
    <div class="container">
        <div class="row">
            <h2 class="ag-title-2">Ascent Press Releases</h2>
            <?php echo do_shortcode('[ag_blog_carousel_3 cat="press"]'); ?>
            <p class="aglrrml agrolo"><a class="bfh-item" href="/blog/">Read More</a></p>
        </div>
    </div>
</div>


<?php get_footer();
