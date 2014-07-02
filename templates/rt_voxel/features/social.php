<?php
/**
* @version   $Id: social.php 690 2012-05-03 17:35:15Z josh $
* @author    RocketTheme http://www.rockettheme.com
* @copyright Copyright (C) 2007 - ${copyright_year} RocketTheme, LLC
* @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
*
* Gantry uses the Joomla Framework (http://www.joomla.org), a GNU/GPLv2 content management system
*
*/
defined('JPATH_BASE') or die();

gantry_import('core.gantryfeature');

class GantryFeatureSocial extends GantryFeature {
	var $_feature_name = 'social';

	function init(){
		global $gantry;
	}

	function render($position="") {
		ob_start();
		global $gantry;
		?>
		<div class="rt-block">
		<div class="rt-social-buttons">
			<?php if ($gantry->get('social-facebook') != "") : ?>
			<a class="social-button rt-facebook-btn" href="<?php echo $gantry->get('social-facebook'); ?>">
				<span></span>
			</a>
			<?php endif; ?>
			<?php if ($gantry->get('social-twitter') != "") : ?>
			<a class="social-button rt-twitter-btn" href="<?php echo $gantry->get('social-twitter'); ?>">
				<span></span>
			</a>
			<?php endif; ?>
			<?php if ($gantry->get('social-buzz') != "") : ?>
			<a class="social-button rt-buzz-btn" href="<?php echo $gantry->get('social-buzz'); ?>">
				<span></span>
			</a>
			<?php endif; ?>
			<?php if ($gantry->get('social-rss') != "") : ?>
			<a class="social-button rt-rss-btn" href="<?php echo $gantry->get('social-rss'); ?>">
				<span></span>
			</a>
			<?php endif; ?>
		</div>
		</div>
		<?php
		return ob_get_clean();
	}
}
