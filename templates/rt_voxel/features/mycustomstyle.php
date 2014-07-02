<?php
/**
 * @package   Custom Feature (Add custum stylesheet) - RocketTheme
 * @version   August 1, 2010
 * @author    RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - 2010 RocketTheme, LLC
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 *
 *
 */

defined('JPATH_BASE') or die();

gantry_import('core.gantryfeature');

class GantryFeatureMyCustomStyle extends GantryFeature {
    var $_feature_name = 'mycustomstyle';

    function isEnabled() {
        return true;
    }

    function isInPosition($position) {
        return false;
    }

	function init() {
        global $gantry;

		//demo styles
        $gantry->addStyle("mycustomstyle.css");

	}

}