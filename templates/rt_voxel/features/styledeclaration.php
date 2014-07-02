<?php
/**
* @version   $Id: styledeclaration.php 612 2012-05-02 06:15:13Z josh $
* @author    RocketTheme http://www.rockettheme.com
* @copyright Copyright (C) 2007 - ${copyright_year} RocketTheme, LLC
* @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
*
* Gantry uses the Joomla Framework (http://www.joomla.org), a GNU/GPLv2 content management system
*
*/
defined('JPATH_BASE') or die();

gantry_import('core.gantryfeature');

class GantryFeatureStyleDeclaration extends GantryFeature {
    var $_feature_name = 'styledeclaration';

    function isEnabled() {
        global $gantry;
        $menu_enabled = $this->get('enabled');

        if (1 == (int)$menu_enabled) return true;
        return false;
    }

function init() {
        global $gantry;
		$browser = $gantry->browser;

	// COLORCHOOSER
    $accentColor = new Color($gantry->get('accent-colorchooser'));
    $css = 'a, #rt-subnavigation .menu li.active .item, #rt-subnavigation .menu li:hover .item, .sprocket-tabs-nav > li.active > .sprocket-tabs-inner, .component-content h2 a:hover, .sprocket-mosaic-title a:hover, .layout-slideshow .sprocket-readmore:hover, .noaccordion .sprocket-lists-title a:hover, #rt-utility .horizmenu a:hover, .style-panel-toggle:hover, .sprocket-headlines-navigation .arrow:hover {color:'.$gantry->get('accent-colorchooser').';}'."\n";
    $css .= '#rt-navigation3, .menutop.fusion-js-container ul li > .item:hover, .menutop.fusion-js-container li.f-menuparent-itemfocus > .item, .menutop.fusion-js-container ul li.active > .item, .menutop.fusion-js-container li.active.f-menuparent-itemfocus > .item, .sprocket-lists .active .sprocket-lists-title, .box1 .rt-block, #rt-sidebar-a .box1 .rt-block, #rt-sidebar-b .box1 .module-surround, #rt-sidebar-c .box1 .rt-block, #rt-content-top .box1 .rt-block, #rt-content-bottom .box1 .rt-block, .title4 .module-title, .sprocket-lists-pagination li, #roksearch_results .roksearch_header, #roksearch_results .roksearch_row_btm, .layout-slideshow .sprocket-features-pagination li, .title4 .title {background-color:'.$gantry->get('accent-colorchooser').';}'."\n";
    $css .= '.rt-menubar .menutop li.f-mainparent-itemfocus, .rt-menubar .menutop li:hover, .fusion-submenu-wrapper {background-color:'.$accentColor->lighten('3%').';}'."\n";
    $css .= '.sprocket-lists .sprocket-lists-title {background-color:'.$accentColor->lighten('5%').';}'."\n";
    $css .= '.box1 a, body #rt-copyright .box1 a {color:'.$accentColor->lighten('25%').';}'."\n";
    $css .= '.title3 .module-title {border-bottom: 1px solid '.$gantry->get('accent-colorchooser').';}'."\n";
    $css .= '.login-fields #username:focus, .login-fields #password:focus, #contact-form dd input:focus, #contact-form dd textarea:focus, #modlgn-username:focus, #modlgn-passwd:focus, input#jform_email:focus, #rokajaxsearch .inputbox:focus, #member-registration dd input:focus, #search-searchword:focus, .finder .inputbox:focus {border: 1px solid '.$gantry->get('accent-colorchooser').'; box-shadow: inset 0 1px 3px '.$this->_RGBA($gantry->get('accent-colorchooser'), '0.6').', 0 0 8px '.$this->_RGBA($gantry->get('accent-colorchooser'), '0.6').';}'."\n";
    $css .= '.button, .readon, .readmore, a.readon, button.validate, #member-profile a, #member-registration a, .formelm-buttons button {border: 1px solid '.$this->_RGBA($gantry->get('accent-colorchooser'), '0.4').';background-color: '.$accentColor->lighten('1%').'}'."\n";
    $css .= '.button:hover, .readon:hover, .readmore:hover, a.readon:hover, button.validate:hover, #member-profile a:hover, #member-registration a:hover, .formelm-buttons button:hover {border-color: '.$this->_RGBA($gantry->get('accent-colorchooser'), '0.3').';}'."\n";
    $css .= '.button:active, .readon:active, .readmore:active, a.readon:active, button.validate:active, #member-profile a:active, #member-registration a:active, .formelm-buttons button:active {border-color: '.$this->_RGBA($gantry->get('accent-colorchooser'), '0.7').';}'."\n";
    $css .= '.sprocket-corner-badge {border-right-color: '.$gantry->get('accent-colorchooser').';}'."\n";
    $css .= 'body ul.checkmark li::after, body ul.circle-checkmark li::before, body ul.square-checkmark li::before, body ul.circle-small li::after, body ul.circle li::after, body ul.circle-large li::after, .title5 .title:before, .sprocket-headlines-badge:after {border-color: '.$gantry->get('accent-colorchooser').';}'."\n";
    $css .= 'body ul.triangle-small li::after, body ul.triangle li::after, body ul.triangle-large li::after {border-color: transparent transparent transparent '.$gantry->get('accent-colorchooser').';}'."\n";
    $css .= ".sprocket-features-arrows .prev:hover span, .sprocket-features-arrows .next:hover span {color: ".$accentColor->darken('1%').";text-shadow: 0 0 6px ".$accentColor->lighten('15%').";}";
    $css .= '.main-style-light #rt-footer a, .main-style-light #rt-subnavigation ul li.active .item, .main-style-light #rt-subnavigation ul li:hover .item {color:'.$accentColor->lighten('12%').';}'."\n";
    $css .= '.presets-preset4.main-style-light #rt-subnavigation ul li.active .item, .presets-preset4.main-style-light #rt-subnavigation ul li:hover .item {color:'.$accentColor->lighten('25%').';}'."\n";

    // K2
    if ($gantry->get('k2')) :;
    $css .= '#k2Container .k2TagCloudBlock a:hover, div.k2ItemsBlock ul li div.moduleItemTags a:hover, div.itemTagsBlock ul.itemTags li:hover, div.userItemTagsBlock ul.userItemTags li:hover, div.latestItemTagsBlock ul.latestItemTags li:hover, .k2UserBlock .button, .k2CalendarBlock table.calendar tr td.calendarToday, div.itemToolbar ul li a#fontDecrease img, div.itemToolbar ul li a#fontIncrease img  {background-color:'.$gantry->get('accent-colorchooser').';}'."\n";
    $css .= '#k2Container span.itemHits, #k2Container h3, #k2Container h2, #k2Container h1, #k2Container h4 {color:'.$gantry->get('accent-colorchooser').';}'."\n";
    $css .= 'div.k2TagCloudBlock a:hover,div.catItemTagsBlock ul.catItemTags li:hover, #k2Container .button, span.catItemAddLink, span.userItemAddLink, span.userItemEditLink, span.catItemEditLink, span.itemEditLink {background-color:'.$gantry->get('accent-colorchooser').' !important;}'."\n";
    $css .= '#k2Container .button, .k2UserBlock .button, #k2Container .itemCommentsForm .button, span.catItemAddLink a, span.userItemAddLink a, span.userItemEditLink a, span.catItemEditLink a, span.itemEditLink a {border: 1px solid '.$this->_RGBA($gantry->get('accent-colorchooser'), '0.4').';background-color: '.$accentColor->lighten('10%').';color: '.$accentColor->darken('40%').'}'."\n";
    $css .= '#k2Container .button:hover, .k2UserBlock .button:hover, span.catItemAddLink a:hover, span.userItemAddLink a:hover, span.userItemEditLink a:hover, span.catItemEditLink a:hover, span.itemEditLink a:hover {border-color: '.$this->_RGBA($gantry->get('accent-colorchooser'), '0.3').';}'."\n";
     $css .= '#k2Container .button:active, .k2UserBlock .button:active, span.catItemAddLink a:active, span.userItemAddLink a:active, span.userItemEditLink a:active, span.catItemEditLink a:active, span.itemEditLink a:active {border-color: '.$this->_RGBA($gantry->get('accent-colorchooser'), '0.7').';}'."\n";
     $css .= 'div.k2CategoriesListBlock ul li.activeCategory > a {color:'.$gantry->get('accent-colorchooser').';}'."\n";
     $css .= '.module-content .k2TagCloudBlock a:hover, div.k2ItemsBlock ul li div.moduleItemTags a:hover, div.k2TagCloudBlock a:hover, div.catItemTagsBlock ul.catItemTags li:hover, #k2Container .button, span.catItemAddLink, span.userItemAddLink, span.userItemEditLink, span.catItemEditLink, span.itemEditLink, div.catItemTagsBlock ul.catItemTags li:hover, div.itemTagsBlock ul.itemTags li:hover, div.userItemTagsBlock ul.userItemTags li:hover, div.latestItemTagsBlock ul.latestItemTags li:hover {border-color: '.$this->_RGBA($gantry->get('accent-colorchooser'), '0.8').';}'."\n";
     endif; 
     
    // Logo
    $css .= $this->buildLogo();

		// Static file
        if ($gantry->get('static-enabled')) {
            // do file stuff
            jimport('joomla.filesystem.file');
            $filename = $gantry->templatePath.DS.'css'.DS.'static-styles.css';

            if (file_exists($filename)) {
                if ($gantry->get('static-check')) {
                    //check to see if it's outdated

                    $md5_static = md5_file($filename);
                    $md5_inline = md5($css);

                    if ($md5_static != $md5_inline) {
                        JFile::write($filename, $css);
                    }
                }
            } else {
                // file missing, save it
                JFile::write($filename, $css);
            }
            // add reference to static file
            $gantry->addStyle('static-styles.css',99);

        } else {
            // add inline style
            $gantry->addInlineStyle($css);
        }

		$this->_disableRokBoxForiPhone();

		// Style Inclusion
        $gantry->addStyle('gantry-core.css');
        $gantry->addStyle('joomla-core.css');
        $mainstyle = $gantry->get('main-style');
        $gantry->addStyle('main-'.$mainstyle.".css");
        $gantry->addStyle('accent.css');
        $gantry->addStyle('utilities.css');
        if ($gantry->get('typography-enabled')) $gantry->addStyle('typography.css');
        if ($gantry->get('stylepanel-enabled')) $gantry->addStyle('stylepanel.css');

        //third party
        if ($gantry->get('k2')) $gantry->addStyle('thirdparty-k2.css');
        if ($gantry->get('k2')) $gantry->addStyle('thirdparty-k2-'.$mainstyle.'.css');
	}

    function buildLogo(){
        global $gantry;

        if ($gantry->get('logo-type')!="custom") return "";

        $source = $width = $height = "";

        $logo = str_replace("&quot;", '"', str_replace("'", '"', $gantry->get('logo-custom-image')));
        $data = json_decode($logo);

        if (!$data){
            if (strlen($logo)) $source = $logo;
            else return "";
        } else {
            $source = $data->path;
        }

        if (substr($gantry->baseUrl, 0, strlen($gantry->baseUrl)) == substr($source, 0, strlen($gantry->baseUrl))){
            $file = JPATH_ROOT . DS . substr($source, strlen($gantry->baseUrl));
        } else {
            $file = JPATH_ROOT . DS . $source;
        }

        if (isset($data->width) && isset($data->height)){
            $width = $data->width;
            $height = $data->height;
        } else {
            $size = @getimagesize($file);
            $width = $size[0];
            $height = $size[1];
        }

        if (!preg_match('/^\//', $source))
        {
            $source = JURI::root(true).'/'.$source;
        }

        $output = "";
        $output .= "#rt-logo {background: url(".$source.") 50% 0 no-repeat !important;}"."\n";
        $output .= "#rt-logo {width: ".$width."px;height: ".$height."px;}"."\n";

        $file = preg_replace('/\//i', DS, $file);

        return (file_exists($file)) ?$output : '';
    }

    function _createGradient($direction, $from, $fromOpacity, $fromPercent, $to, $toOpacity, $toPercent){
        global $gantry;
        $browser = $gantry->browser;

        $fromColor = $this->_RGBA($from, $fromOpacity);
        $toColor = $this->_RGBA($to, $toOpacity);
        $gradient = $default_gradient = '';

        $default_gradient = 'background: linear-gradient('.$direction.', '.$fromColor.' '.$fromPercent.', '.$toColor.' '.$toPercent.');';

        switch ($browser->engine) {
            case 'gecko':
                $gradient = ' background: -moz-linear-gradient('.$direction.', '.$fromColor.' '.$fromPercent.', '.$toColor.' '.$toPercent.');';
                break;

            case 'webkit':
                if ($browser->shortversion < '5.1'){

                    switch ($direction){
                        case 'top':
                            $from_dir = 'left top'; $to_dir = 'left bottom'; break;
                        case 'bottom':
                            $from_dir = 'left bottom'; $to_dir = 'left top'; break;
                        case 'left':
                            $from_dir = 'left top'; $to_dir = 'right top'; break;
                        case 'right':
                            $from_dir = 'right top'; $to_dir = 'left top'; break;
                    }
                    $gradient = ' background: -webkit-gradient(linear, '.$from_dir.', '.$to_dir.', color-stop('.$fromPercent.','.$fromColor.'), color-stop('.$toPercent.','.$toColor.'));';
                } else {
                    $gradient = ' background: -webkit-linear-gradient('.$direction.', '.$fromColor.' '.$fromPercent.', '.$toColor.' '.$toPercent.');';
                }
                break;

            case 'presto':
                $gradient = ' background: -o-linear-gradient('.$direction.', '.$fromColor.' '.$fromPercent.', '.$toColor.' '.$toPercent.');';
                break;

            case 'trident':
                if ($browser->shortversion >= '10'){
                    $gradient = ' background: -ms-linear-gradient('.$direction.', '.$fromColor.' '.$fromPercent.', '.$toColor.' '.$toPercent.');';
                } else if ($browser->shortversion <= '6'){
                    $gradient = $from;
                    $default_gradient = '';
                } else {

                    $gradient_type = ($direction == 'left' || $direction == 'right') ? 1 : 0;
                    $from_nohash = str_replace('#', '', $from);
                    $to_nohash = str_replace('#', '', $to);

                    if (strlen($from_nohash) == 3) $from_nohash = str_repeat(substr($from_nohash, 0, 1), 6);
                    if (strlen($to_nohash) == 3) $to_nohash = str_repeat(substr($to_nohash, 0, 1), 6);

                    if ($fromOpacity == 0 || $fromOpacity == '0' || $fromOpacity == '0%') $from_nohash = '00' . $from_nohash;
                    if ($toOpacity == 0 || $toOpacity == '0' || $toOpacity == '0%') $to_nohash = '00' . $to_nohash;

                    $gradient = " filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#".$to_nohash."', endColorstr='#".$from_nohash."',GradientType=".$gradient_type." );";

                    $default_gradient = '';

                }
                break;

            default:
                $gradient = $from;
                $default_gradient = '';
                break;
        }

        return  $default_gradient . $gradient;
    }

    function _HEX2RGB($hexStr, $returnAsString = false, $seperator = ','){
        $hexStr = preg_replace("/[^0-9A-Fa-f]/", '', $hexStr);
        $rgbArray = array();

        if (strlen($hexStr) == 6){
            $colorVal = hexdec($hexStr);
            $rgbArray['red'] = 0xFF & ($colorVal >> 0x10);
            $rgbArray['green'] = 0xFF & ($colorVal >> 0x8);
            $rgbArray['blue'] = 0xFF & $colorVal;
        } elseif (strlen($hexStr) == 3){
            $rgbArray['red'] = hexdec(str_repeat(substr($hexStr, 0, 1), 2));
            $rgbArray['green'] = hexdec(str_repeat(substr($hexStr, 1, 1), 2));
            $rgbArray['blue'] = hexdec(str_repeat(substr($hexStr, 2, 1), 2));
        } else {
            return false;
        }

        return $returnAsString ? implode($seperator, $rgbArray) : $rgbArray;
    }

    function _RGBA($hex, $opacity){
        return 'rgba(' . $this->_HEX2RGB($hex, true) . ','.$opacity.')';
    }

	function _disableRokBoxForiPhone() {
		global $gantry;

		if ($gantry->browser->platform == 'iphone' || $gantry->browser->platform == 'android') {
			$gantry->addInlineScript("window.addEvent('domready', function() {\$\$('a[rel^=rokbox]').removeEvents('click');});");
		}
	}

}
