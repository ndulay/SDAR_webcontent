<?php
/**
* @version   $Id: theme.php 490 2012-05-01 04:04:23Z btowles $
* @author    RocketTheme http://www.rockettheme.com
* @copyright Copyright (C) 2007 - ${copyright_year} RocketTheme, LLC
* @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
*
* Gantry uses the Joomla Framework (http://www.joomla.org), a GNU/GPLv2 content management system
*
*/

class GantrySplitmenuTheme extends AbstractRokMenuTheme {

    protected $defaults = array(
        'roknavmenu_splitmenu_enable_current_id' => 0,
        'class_sfx' => ''
    );

    public function getFormatter($args){
        require_once(dirname(__FILE__).'/formatter.php');
        return new GantrySplitmenuFormatter($args);
    }

    public function getLayout($args){
        require_once(dirname(__FILE__).'/layout.php');
        return new GantrySplitmenuLayout($args);
    }
}
