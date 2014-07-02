<?php
/**
* @version   $Id: stylepanel.php 537 2012-05-01 16:36:54Z kevin $
* @author    RocketTheme http://www.rockettheme.com
* @copyright Copyright (C) 2007 - ${copyright_year} RocketTheme, LLC
* @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
*
* Gantry uses the Joomla Framework (http://www.joomla.org), a GNU/GPLv2 content management system
*
*/
defined('JPATH_BASE') or die();

gantry_import('core.gantryfeature');

class GantryFeatureStylePanel extends GantryFeature {
	var $_feature_name = 'stylepanel';

	function init(){
		global $gantry;
		if ($this->isEnabled()){
			$gantry->addScript('stylepanel.js');
			$gantry->addScript('colorchooser.js');
			$gantry->addStyle($gantry->gantryUrl.'/admin/widgets/colorchooser/css/mooRainbow.css');
			$gantry->addScript($gantry->gantryUrl.'/admin/widgets/colorchooser/js/mooRainbow.js');
			$gantry->addInlineScript("var GantryURL = '". $gantry->gantryUrl."'");
			$gantry->addInlineStyle('.presets-block a.active {border: 1px solid '.$gantry->get('accent-color').';}');
		}
	}

	function isEnabled()
    {
        global $gantry;

        $cookie = 0;
        if ($gantry->browser->platform == 'iphone' || $gantry->browser->platform == 'android')
        {
            $prefix = $gantry->get('template_prefix');
            $cookiename = $prefix . $gantry->browser->platform . '-switcher';
            $cookie = $gantry->retrieveTemp('platform', $cookiename);
        }

        if (1 == (int)$this->get('enabled') && $cookie == 0) return true;
        return false;
    }

	function render($position="") {
		ob_start();
		global $gantry;

		$user =& JFactory::getUser();
		$site = JURI::root(true);
		?>
		<div class="style-panel-container">
			<div class="style-panel-toggle"><div class="style-panel-toggle2"><span>&lsaquo;</span></div></div>
			<div class="style-panel"><div class="style-panel2">
				<div class="presets-block">
					<span class="presets-title">Presets</span>
					<a href="<?php echo $site; ?>/?presets=preset1" class="preset-item style1"><span class="colortop"></span><span class="colorbottom"></span></a>
					<a href="<?php echo $site; ?>/?presets=preset2" class="preset-item style2"><span class="colortop"></span><span class="colorbottom"></span></a>
					<a href="<?php echo $site; ?>/?presets=preset3" class="preset-item style3"><span class="colortop"></span><span class="colorbottom"></span></a>
					<a href="<?php echo $site; ?>/?presets=preset4" class="preset-item style4"><span class="colortop"></span><span class="colorbottom"></span></a>
					<a href="<?php echo $site; ?>/?presets=preset5" class="preset-item style5"><span class="colortop"></span><span class="colorbottom"></span></a>
					<a href="<?php echo $site; ?>/?presets=preset6" class="preset-item style6"><span class="colortop"></span><span class="colorbottom"></span></a>
					<a href="<?php echo $site; ?>/?presets=preset7" class="preset-item style7"><span class="colortop"></span><span class="colorbottom"></span></a>
					<a href="<?php echo $site; ?>/?presets=preset8" class="preset-item style8"><span class="colortop"></span><span class="colorbottom"></span></a>
					<a href="<?php echo $site; ?>/?presets=preset9" class="preset-item style9"><span class="colortop"></span><span class="colorbottom"></span></a>
					<a href="<?php echo $site; ?>/?presets=preset10" class="preset-item style10"><span class="colortop"></span><span class="colorbottom"></span></a>
					<a href="<?php echo $site; ?>/?presets=preset11" class="preset-item style11"><span class="colortop"></span><span class="colorbottom"></span></a>
					<a href="<?php echo $site; ?>/?presets=preset12" class="preset-item style12"><span class="colortop"></span><span class="colorbottom"></span></a>
				</div>
				<div class="presets-block">
					<span class="presets-title">Main Style</span>
					<a href="<?php echo $site; ?>/?main-style=light" class="main-item light"></a>
					<a href="<?php echo $site; ?>/?main-style=dark" class="main-item dark"></a>
				</div>
				<div class="presets-block">
					<span class="presets-title">Patterns</span>
					<a href="#" rel="scratch" title="scratch" class="pattern-item scratch"></a>
					<a href="#" rel="graph" title="graph" class="pattern-item graph"></a>
					<a href="#" rel="diagonal" title="diagonal" class="pattern-item diagonal"></a>
					<a href="#" rel="crackle" title="crackle" class="pattern-item crackle"></a>
					<a href="#" rel="psychedelic" title="psychedelic" class="pattern-item psychedelic"></a>
					<a href="#" rel="quilt" title="quilt" class="pattern-item quilt"></a>
					<a href="#" rel="triangles" title="triangles" class="pattern-item triangles"></a>
					<a href="#" rel="leather-light" title="leather-light" class="pattern-item leather-light"></a>
					<a href="#" rel="leather-dark" title="leather-dark" class="pattern-item leather-dark"></a>
					<a href="#" rel="argyle" title="argyle" class="pattern-item argyle"></a>
					<a href="#" rel="iron" title="iron" class="pattern-item iron"></a>
					<a href="#" rel="vertical-lines" title="vertical-lines" class="pattern-item vertical-lines"></a>
				</div>
				<div class="presets-block">
					<span class="presets-title">Accent Color</span>
					<div class="wrapper">
						<input class="picker-input text-color inputbox" id="style-panel-accentcolor" type="text" size="8" maxlength="7" value="<?php echo $gantry->get('accent-colorchooser'); ?>" />
						<div class="picker" id="mooRainbow_style-panel-accentcolor_input">
							<div class="overlay" style="background-color: <?php echo $gantry->get('accent-colorchooser'); ?>"><div></div></div>
						</div>
					</div>
				</div>
				<a class="readon smallmargintop" rel="<?php echo JURI::current(true); ?>" href="<?php echo JURI::current(true); ?>"><span>Apply</span></a>
			</div></div>
		</div>
		<?php
		return ob_get_clean();
	}
}
