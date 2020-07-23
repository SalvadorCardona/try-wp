<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <base href="/">
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#6d9aea">

    <script src="http://localhost:4200/runtime.js" type="module"></script>
    <script src="http://localhost:4200/polyfills.js" type="module"></script>
    <script src="http://localhost:4200/styles.js" type="module"></script>
    <script src="http://localhost:4200/vendor.js" type="module"></script>
    <script src="http://localhost:4200/main.js" type="module"></script>
    <style type="text/css">
        #wp-content, #wp-header {
            display: none;
        }
    </style>
    <!--  <link rel="stylesheet" href="--><?php //echo get_theme_file_uri('assets/styles/app.css'); ?><!--">-->
  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <header id="wp-header">
        <nav role="navigation">
            <?php wp_nav_menu(['theme_location' => 'navigation']); ?>
        </nav>
    </header>
<app-root></app-root>