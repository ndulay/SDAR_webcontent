<?php
/**
* @version   $Id: date.php 490 2012-05-01 04:04:23Z btowles $
* @author    RocketTheme http://www.rockettheme.com
* @copyright Copyright (C) 2007 - ${copyright_year} RocketTheme, LLC
* @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
*
* Gantry uses the Joomla Framework (http://www.joomla.org), a GNU/GPLv2 content management system
*
*/
defined('JPATH_BASE') or die();

gantry_import('core.gantryfeature');
/**
 * @package     gantry
 * @subpackage  features
 */
class GantryFeatureDate extends GantryFeature {
    var $_feature_name = 'date';
   
	function render($position="") {
		global $gantry;
		ob_start();

		$now = &JFactory::getDate();		
		$format = $this->get('formats');

	    ?>
	    <div class="rt-block">
			<span class="rt-date"><span><?php echo $now->toFormat($format); ?></span></span>
		</div>
		<?php
	    return ob_get_clean();
	}
	
}