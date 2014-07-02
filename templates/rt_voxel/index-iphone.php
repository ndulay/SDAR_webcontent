<?php
/**
* @version   $Id: index-iphone.php 1624 2012-07-12 12:29:26Z james $
* @author    RocketTheme http://www.rockettheme.com
* @copyright Copyright (C) 2007 - ${copyright_year} RocketTheme, LLC
* @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
*
* Gantry uses the Joomla Framework (http://www.joomla.org), a GNU/GPLv2 content management system
*
*/
// no direct access
defined( 'GANTRY_VERSION' ) or die( 'Restricted index access' );
global $gantry;
$gantry->set('fixedheader', 0);

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $gantry->language; ?>" lang="<?php echo $gantry->language;?>" >
    <head>
        <?php
            $gantry->displayHead();
            $gantry->addStyles(array('template.css','iphone-gantry.css'));
			$gantry->addScript('iscroll.js');

            $gantry->addScript('roktabs.js');
			$hidden = '';
        ?>
			<?php
				$scalable = $gantry->get('iphone-scalable', 0) == "0" ? "0" : "1";
			?>
			<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=<?php echo $scalable; ?>;">

			<script type="text/javascript">
				var orient = function() {
					var dir = "rt-normal";
					switch(window.orientation) {
						case 0: dir = "rt-normal";break;
						case -90: dir = "rt-right";break;
						case 90: dir = "rt-left";break;
						case 180: dir = "rt-flipped";break;
					}
					$$(document.body, '#rt-wrapper')
						.removeClass('rt-normal')
						.removeClass('rt-left')
						.removeClass('rt-right')
						.removeClass('rt-flipped')
						.addClass(dir);
				}

				window.addEvent('domready', function() {
					orient();
					window.scrollTo(0, 1);
					new iScroll($$('#rt-menu ul.menu')[0]);
				});

			</script>
    </head>
    <body <?php echo $gantry->displayBodyTag(); ?> onorientationchange="orient()">
    	<div id="rt-page-surround">
			<?php /** Begin Drawer **/ if ($gantry->countModules('mobile-drawer')) : ?>
			<div id="rt-drawer">
				<div class="rt-container">
					<?php echo $gantry->displayModules('mobile-drawer','standard','standard'); ?>
					<div class="clear"></div>
				</div>
			</div>
			<?php /** End Drawer **/ endif; ?>
			<div class="main-surround">
				<?php /** Begin Header **/ if ($gantry->countModules('mobile-header')) : ?>
				<div id="rt-header">
					<div class="rt-container">
						<?php echo $gantry->displayModules('mobile-header','standard','standard'); ?>
						<div class="clear"></div>
					</div>
				</div>
				<?php /** End Header **/ endif; ?>
				<?php /** Begin Menu **/ if ($gantry->countModules('mobile-navigation')) : ?>
				<div id="rt-navigation"><div id="rt-navigation2"><div id="rt-navigation3">
				<div id="rt-menu">
					<div class="rt-container">
						<div id="rt-left-menu"></div>
						<div id="rt-right-menu"></div>
						<?php echo $gantry->displayModules('mobile-navigation','basic','basic'); ?>
						<div class="clear"></div>
					</div>
				</div>
				</div></div></div>
				<?php /** End Menu **/ endif; ?>
				<?php /** Begin Maintop **/ if ($gantry->countModules('mobile-maintop')) : ?>
				<div id="rt-maintop">
					<div class="rt-container">
						<?php echo $gantry->displayModules('mobile-maintop','standard','standard'); ?>
						<div class="clear"></div>
					</div>
				</div>
				<?php /** End Maintop **/ endif; ?>
				<?php /** Begin Breadcrumbs **/ if ($gantry->countModules('breadcrumb')) : ?>
				<div id="rt-breadcrumbs">
					<?php echo $gantry->displayModules('breadcrumb','basic','breadcrumbs'); ?>
					<div class="clear"></div>
				</div>
				<?php /** End Breadcrumbs **/ endif; ?>
				<?php /** Begin Main Body **/
					$display_mainbody = !($gantry->get("mainbody-enabled",true)==false && JRequest::getVar('view') == 'frontpage');
				?>

				<?php if ($display_mainbody): ?>
				<?php echo $gantry->displayMainbody('iphonemainbody','sidebar','standard','standard','standard','standard','standard'); ?>
				<?php endif; ?>
				<?php /** End Main Body **/ ?>
				<?php /** Begin Extension **/ if ($gantry->countModules('mobile-extension')) : ?>
				<div id="rt-extension">
					<div class="rt-container">
						<?php echo $gantry->displayModules('mobile-extension','standard','standard'); ?>
						<div class="clear"></div>
					</div>
				</div>
				<?php /** End Extension **/ endif; ?>
				<?php /** Begin Bottom **/ if ($gantry->countModules('mobile-bottom')) : ?>
				<div id="rt-bottom">
					<div class="rt-container">
						<?php echo $gantry->displayModules('mobile-bottom','standard','standard'); ?>
						<div class="clear"></div>
					</div>
				</div>
				<?php /** End Bottom **/ endif; ?>
				<?php /** Begin Footer **/ if ($gantry->countModules('mobile-footer')) : ?>
				<div id="rt-footer">
					<div class="rt-container">
						<?php echo $gantry->displayModules('mobile-footer','standard','standard'); ?>
						<div class="clear"></div>
					</div>
				</div>
				<?php /** End Footer **/ endif; ?>
			</div>
			<?php /** Begin Copyright **/ if ($gantry->countModules('mobile-copyright')) : ?>
			<div id="rt-copyright">
				<div class="rt-container">
					<?php echo $gantry->displayModules('mobile-copyright','standard','limited'); ?>
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
			<?php /** Begin Analytics **/ if ($gantry->countModules('analytics')) : ?>
			<?php echo $gantry->displayModules('analytics','basic','basic'); ?>
			<?php /** End Analytics **/ endif; ?>
		</div>
	</body>
</html>
