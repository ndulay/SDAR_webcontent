<?php
/**
* @version   $Id: profile.php 490 2012-05-01 04:04:23Z btowles $
* @author    RocketTheme http://www.rockettheme.com
* @copyright Copyright (C) 2007 - ${copyright_year} RocketTheme, LLC
* @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
*
* Gantry uses the Joomla Framework (http://www.joomla.org), a GNU/GPLv2 content management system
*
*/
// no direct access
defined( '_JEXEC' ) or die( 'Restricted index access' );
// load and inititialize gantry class
jimport('joomla.error.profiler');

$profile = JProfiler::getInstance('Gantry Global Init');

$profile->mark('Start');

require_once('lib/gantry/gantry.php');
$gantry->init();

$profile->mark('Stop');

$gantry->finalize();
