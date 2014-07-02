<?php
/**
* @version   $Id: error.php 1626 2012-07-12 13:07:15Z james $
* @author    RocketTheme http://www.rockettheme.com
* @copyright Copyright (C) 2007 - ${copyright_year} RocketTheme, LLC
* @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
*
* Gantry uses the Joomla Framework (http://www.joomla.org), a GNU/GPLv2 content management system
*
*/
defined( '_JEXEC' ) or die( 'Restricted access' );
if (!isset($this->error)) {
	$this->error = JError::raiseWarning( 403, JText::_('ALERTNOTAUTH') );
	$this->debug = false; 
}

// load and inititialize gantry class
require_once('lib/gantry/gantry.php');
$gantry->init();

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>

	<title><?php echo $this->error->getCode(); ?> - <?php echo $this->title; ?></title>
	<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/gantry-core.css" type="text/css" />
  	<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/libraries/gantry/css/grid-12.css" type="text/css" />
	<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/joomla-core.css" type="text/css" />
	<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/main-<?php $colorstyle = $gantry->get('main-style'); echo $colorstyle; ?>.css" type="text/css" />
	<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/accent.css" type="text/css" />
	<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/fusionmenu.css" type="text/css" />
	<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/splitmenu.css" type="text/css" />
	<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/template.css" type="text/css" />
	<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/error.css" type="text/css" />
	<style type="text/css">
		<?php 
			$accentColor = new Color($gantry->get('accent-colorchooser'));
			echo '.button, .readon, .rt-totop {background-color: '.$accentColor->lighten('10%').';color: '.$accentColor->darken('40%').'}'."\n";
    		echo '.button:hover, .readon:hover {color: '.$accentColor->darken('35%').'}'."\n";
			echo '.error-title span {color: '.$gantry->get('accent-colorchooser').';}'."\n";
		?>
	</style>

</head>
<body <?php echo $gantry->displayBodyTag(); ?>>
	<?php /** Begin Header **/ if ($gantry->countModules('header')) : ?>
	<div id="rt-header">
		<div class="rt-container">
			<?php echo $gantry->displayModules('header','standard','standard'); ?>
			<div class="clear"></div>
		</div>
	</div>
	<?php /** End Header **/ endif; ?>
	<div id="rt-error-body">
		<div class="rt-container">
			<div id="rt-body-surround" class="component-block component-content">
				<div class="rt-error-box">
					<h1 class="error-title title">Error: <span><?php echo $this->error->getCode(); ?></span> - <?php echo $this->error->getMessage(); ?></h1>
					<div class="error-content">
					<p><strong>You may not be able to visit this page because of:</strong></p>
					<ol>
						<li>an out-of-date bookmark/favourite</li>
						<li>a search engine that has an out-of-date listing for this site</li>
						<li>a mistyped address</li>
						<li>you have no access to this page</li>
						<li>The requested resource was not found.</li>
						<li>An error has occurred while processing your request.</li>
					</ol>
					<p></p>
					<p><a href="<?php echo $gantry->baseUrl; ?>" class="readon"><span>&larr; Home</span></a></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
<?php
$gantry->finalize();
?>