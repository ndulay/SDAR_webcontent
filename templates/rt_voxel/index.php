<?php
/**
* @version   $Id: index.php 566 2012-05-01 18:57:42Z kevin $
* @author    RocketTheme http://www.rockettheme.com
* @copyright Copyright (C) 2007 - ${copyright_year} RocketTheme, LLC
* @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
*
* Gantry uses the Joomla Framework (http://www.joomla.org), a GNU/GPLv2 content management system
*
*/
// no direct access
defined( '_JEXEC' ) or die( 'Restricted index access' );
JHTML::_('behavior.modal');
// load and inititialize gantry class
require_once('lib/gantry/gantry.php');
$gantry->init();

function isBrowserCapable() {
  global $gantry;

  $browser = $gantry->browser;

  // ie.
  if ($browser->name == 'ie' && $browser->version < 8) return false;

  return true;
}
// get the current preset
$gpreset = str_replace(' ','',strtolower($gantry->get('name')));

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $gantry->language; ?>" lang="<?php echo $gantry->language;?>" >
<head>
  <?php
    $gantry->displayHead();
    $gantry->addStyles(array('template.css'));
    //$gantry->addScript('jquery.js');
    if ($gantry->browser->platform != 'iphone')
      $gantry->addInlineScript('window.addEvent("domready", function(){ new SmoothScroll(); });');

    if ($gantry->get('loadtransition') && isBrowserCapable()){
      $gantry->addScript('load-transition.js');
      $hidden = ' class="rt-hidden"';
    } else {
      $hidden = '';
    }
    $dashvar = JRequest::getVar('tmpl');
    $itemid = JRequest::getVar('Itemid');
    //echo $itemid; exit;
    //if( $itemid == 108 || $itemid == 231 || $itemid == 255 || $itemid == 511 || $itemid == 512 || $itemid == 513 || $itemid == 514 || $itemid == 517 || $itemid == 518 || $itemid == 520 || $itemid == 521 || $itemid == 522 || $itemid == 523 || $itemid == 524 || $itemid == 525 || $itemid == 537 || $itemid == 539 || $itemid == 540 || $itemid == 541 || $itemid == 542 || $itemid == 550)
    if( $itemid == 108 || $itemid == 231 || $itemid == 255 || $itemid == 228 || $itemid == 300 || $itemid == 429 || $itemid == 430 || $itemid == 203 || $itemid == 431 || $itemid == 521 || $itemid == 522 || $itemid == 523 || $itemid == 524 || $itemid == 525 || $itemid == 511 || $itemid == 512 || $itemid == 514 || $itemid == 519 || $itemid == 513 || $itemid == 518 || $itemid == 517 || $itemid == 520 || $itemid == 531 || $itemid == 414 || $itemid == 420 || $itemid == 422  || $itemid == 602 )
      { ?>
      <style type="text/css">
      #rt-utility {
        height: 53px;
      }
      /*#rt-utility #rt-utility5 .rt-container .rt-alpha {
        width: 455px !important;
      }
      #rt-utility #rt-utility5 .rt-container .rt-grid-4 {
        width: 210px;
      }
      #rt-utility #rt-utility5 .rt-container .rt-omega {
        width: 200px !important;
      }*/
      #rt-transition #rt-maintop .rt-container .rt-omega {
        width: 672px !important;
      }
      #rt-transition #rt-maintop .rt-container .rt-alpha {
        width: 220px !important;
      }
      #rt-transition #rt-maintop .rt-container .rt-alpha .membership_submenu .rt-block {
        background-color: #FFFFFF;
          border: 1px solid #CCCCCC;
        border-radius: 8px 8px 8px 8px !important;
          box-shadow: -1px 1px 4px rgba(0, 0, 0, 0.1);
        margin-top: 0;
      }
      #rt-transition #rt-maintop .rt-container .rt-omega .membership_staticimg .rt-block {
        margin-top: 0;
        padding: 0;
      }
      .rt-container .sidebar-left {
        width: 220px !important;
        left: -710px !important;
      }
      .rt-container .rt-push-4 {
        left: 240px !important;
        width: 690px !important;
      }
      </style>

      <?php
    }
    if($itemid == 532 || $itemid == 529 || $itemid == 528) {
    ?><style type="text/css">
        #rt-main,#rt-breadcrumbs {
    display: none;
    }
        </style>
        <?php
    }
        if( $itemid == 397 )
      { ?>
            <style type="text/css">
        #rt-main .sidebar-right {
    /*display: none;*/
    }
        </style>
        <?php
    }
  ?>
    <?php
        if( $itemid == 101 )
      {  ?>
             
            <style type="text/css">
        #rt-header .rt-container .rt-alpha {
        width: 230px !important;
        }
        #rt-header .rt-container .rt-grid-4 {
        width: 430px;
        }
        #rt-header .rt-container .rt-omega {
        width: 230px !important;
        }
      </style>
        <?php
    }
    
    if( $itemid == 108 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -120px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 420 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -70px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 255 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -120px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 231 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -130px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 228 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -45px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 429 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -50px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 203 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -30px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 431 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -55px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 521 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -110px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 522 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -125px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 523 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -15px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 524 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -10px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 525 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -90px;
      }
      </style>

      <?php
    }
    
    
    if( $itemid == 511 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -70px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 512 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -215px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 513 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -15px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 517 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -5px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 422 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -25px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 414 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -50px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 520 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -5px;
      }
      </style>

      <?php
    }
    
    if( $itemid == 602 )
      { ?>
      <style type="text/css">
      .rt-container .rt-push-4 {
        top: -35px;
      }
      </style>

      <?php
    }
    
  ?>
    
    <?php
        if( $dashvar == "component" )
    
      { //echo exit;?>
            <style type="text/css">
        #rt-main .rt-block {
      padding: 0 10px;
    }
        </style>
        <?php
    }
  ?>
    
<script type="text/javascript"> 
var $j = jQuery.noConflict();
$j(document).ready(function(){

//Larger thumbnail preview 

$j("ul.thumb li").hover(function() {
  $j(this).css({'z-index' : '10'});
  $j(this).find('img').addClass("hover").stop()
    .animate({
      marginTop: '-30px', 
      marginLeft: '-30px', 
      top: '50%', 
      left: '50%', 
      width: '50px', 
      height: '50px'
    }, 200);
  
  } , function() {
  $j(this).css({'z-index' : '0'});
  $j(this).find('img').removeClass("hover").stop()
    .animate({
      marginTop: '0', 
      marginLeft: '0',
      top: '0', 
      left: '0', 
      width: '30px', 
      height: '30px'
    }, 400);
});

/*$j("ul.thumb li.twi").hover(function() {
  $j(this).css({'z-index' : '10'});
  $j(this).find('img').addClass("hover").stop()
    .animate({
      marginTop: '-30px', 
      marginLeft: '-30px', 
      top: '50%', 
      left: '50%', 
      width: '50px', 
      height: '50px'
    }, 200);
    
  
  } , function() {
  $j(this).css({'z-index' : '1'});
  $j(this).find('img').removeClass("hover").stop()
    .animate({
      marginTop: '-5px', 
      marginLeft: '-5px',
      top: '0', 
      left: '0', 
      width: '40px', 
      height: '40px'
    }, 400);
});*/
});
</script>
</head>
  <body <?php echo $gantry->displayBodyTag(); ?>>
    <div id="rt-page-surround">
      <?php /** Begin Drawer **/ if ($gantry->countModules('drawer')) : ?>
      <div id="rt-drawer">
        <div class="rt-container">
          <?php echo $gantry->displayModules('drawer','standard','standard'); ?>
          <div class="clear"></div>
        </div>
      </div>
      <?php /** End Drawer **/ endif; ?>
      <div class="rt-container main-surround"><div class="main-surround2">
        <?php /** Begin Top **/ if ($gantry->countModules('top')) : ?>
        <div id="rt-top">
          <div class="rt-container">
            <?php echo $gantry->displayModules('top','standard','standard'); ?>
            <div class="clear"></div>
          </div>
        </div>
        <?php /** End Top **/ endif; ?>
        <?php /** Begin Header **/ if ($gantry->countModules('header')) : ?>
        <div id="rt-header">
          <div class="rt-container">
            <?php echo $gantry->displayModules('header','standard','standard'); ?>
            <div class="clear"></div>
          </div>
        </div>
        <?php /** End Header **/ endif; ?>
        <?php /** Begin Utility **/ if ($gantry->countModules('utility')) : ?>
        <div id="rt-utility"><div id="rt-utility2"><div id="rt-utility3"><div id="rt-utility4"><div id="rt-utility5">
          <div class="rt-container">
            <?php echo $gantry->displayModules('utility','standard','standard'); ?>
            <div class="clear"></div>
          </div>
        </div></div></div></div></div>
        <?php /** End Utility **/ endif; ?>
        <?php /** Begin Navigation **/ if ($gantry->countModules('navigation')) : ?>
        <div class="rt-container">
          <div id="rt-navigation"><div id="rt-navigation2"><div id="rt-navigation3">
            <?php echo $gantry->displayModules('navigation','standard','menu'); ?>
            <div class="clear"></div>
          </div></div></div>
        </div>
        <?php /** End Navigation **/ endif; ?>
        <?php /** Begin Sub Navigation **/ if ($gantry->countModules('subnavigation')) : ?>
        <div id="rt-subnavigation">
          <div class="rt-container">
            <?php echo $gantry->displayModules('subnavigation','standard','menu'); ?>
            <div class="clear"></div>
          </div>
        </div>
        <?php /** End Sub Navigation **/ endif; ?>
        <div id="rt-transition"<?php echo $hidden; ?>>
          <?php /** Begin Showcase **/ if ($gantry->countModules('showcase')) : ?>
          <div id="rt-showcase">
            <div class="rt-container">
              <?php echo $gantry->displayModules('showcase','standard','standard'); ?>
              <?php /** Begin Inset **/ if ($gantry->countModules('slideinset')) : ?>
                <div id="rt-slideinset">
                  <?php echo $gantry->displayModules('slideinset','basic','standard'); ?>
                </div>
              <?php /** End Inset **/ endif; ?>
              <div class="clear"></div>
            </div>
          </div>
          <?php /** End Showcase **/ endif; ?>
          <?php /** Begin Feature **/ if ($gantry->countModules('feature')) : ?>
          <div id="rt-feature">
            <div class="rt-container">
              <?php echo $gantry->displayModules('feature','standard','standard'); ?>
              <div class="clear"></div>
            </div>
          </div>
          <?php /** End Feature **/ endif; ?>
                    <?php /** Begin Breadcrumbs **/ if ($gantry->countModules('breadcrumb')) : ?>
          <div id="rt-breadcrumbs">
            <?php echo $gantry->displayModules('breadcrumb','basic','breadcrumbs'); ?>
            <div class="clear"></div>
          </div>
          <?php /** End Breadcrumbs **/ endif; ?>
          <?php /** Begin Main Top **/ if ($gantry->countModules('maintop')) : ?>
          <div id="rt-maintop">
            <div class="rt-container">
              <?php echo $gantry->displayModules('maintop','standard','standard'); ?>
              <div class="clear"></div>
            </div>
          </div>
          <?php /** End Main Top **/ endif; ?>
                    <!-- Commented by developer to replace breadcrum position on top of the main-top position -->
          <!--<?php /** Begin Breadcrumbs **/ if ($gantry->countModules('breadcrumb')) : ?>
          <div id="rt-breadcrumbs">
            <?php echo $gantry->displayModules('breadcrumb','basic','breadcrumbs'); ?>
            <div class="clear"></div>
          </div>
          <?php /** End Breadcrumbs **/ endif; ?>-->
          <?php /** Begin Main Body **/ ?>
            <?php echo $gantry->displayMainbody('mainbody','sidebar','standard','standard','standard','standard','standard'); ?>
          <?php /** End Main Body **/ ?>
          <?php /** Begin Main Bottom **/ if ($gantry->countModules('mainbottom')) : ?>
          <div id="rt-mainbottom">
            <div class="rt-container">
              <?php echo $gantry->displayModules('mainbottom','standard','standard'); ?>
              <div class="clear"></div>
            </div>
          </div>
          <?php /** End Main Bottom **/ endif; ?>
          <?php /** Begin Extension **/ if ($gantry->countModules('extension')) : ?>
          <div id="rt-extension">
            <div class="rt-container">
              <?php echo $gantry->displayModules('extension','standard','standard'); ?>
              <div class="clear"></div>
            </div>
          </div>
          <?php /** End Extension **/ endif; ?>
        </div>
        <?php /** Begin Bottom **/ if ($gantry->countModules('bottom')) : ?>
        <div id="rt-bottom">
          <div class="rt-container">
            <?php echo $gantry->displayModules('bottom','standard','standard'); ?>
            <div class="clear"></div>
          </div>
        </div>
        <?php /** End Bottom **/ endif; ?>
        <?php /** Begin Footer **/ if ($gantry->countModules('footer')) : ?>
        <div id="rt-footer">
          <div class="rt-container">
            <?php echo $gantry->displayModules('footer','standard','standard'); ?>
            <div class="clear"></div>
          </div>
        </div>
        <?php /** End Footer **/ endif; ?>
      </div></div>
      <?php /** Begin Copyright **/ if ($gantry->countModules('copyright')) : ?>
      <div id="rt-copyright">
        <div class="rt-container">
          <?php echo $gantry->displayModules('copyright','standard','standard'); ?>
          <div class="clear"></div>
        </div>
      </div>
      <?php /** End Copyright **/ endif; ?>
      <?php /** Begin Debug **/ if ($gantry->countModules('debug')) : ?>
      <div id="rt-debug">
        <div class="rt-container">
          <?php echo $gantry->displayModules('debug','standard','standard'); ?>
          <div class="clear"></div>
        </div>
      </div>
      <?php /** End Debug **/ endif; ?>
      <?php /** Begin Panel **/ if ($gantry->countModules('panel')) : ?>
      <?php echo $gantry->displayModules('panel','basic','basic'); ?>
      <?php /** End Panel **/ endif; ?>
      <?php /** Begin Popups **/
      echo $gantry->displayModules('popup','popup','popup');
      echo $gantry->displayModules('login','login','popup');
      /** End Popup s**/ ?>
      <?php /** Begin Analytics **/ if ($gantry->countModules('analytics')) : ?>
      <?php echo $gantry->displayModules('analytics','basic','basic'); ?>
      <?php /** End Analytics **/ endif; ?>
    </div>
  </body>
</html>
<?php
$gantry->finalize();

?>