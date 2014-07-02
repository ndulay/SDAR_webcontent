<?php
/**
 * @version   $Id: RokSprocket_Layout_Features_Tags.php 490 2012-05-01 04:04:23Z btowles $
 * @author	RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - ${copyright_year} RocketTheme, LLC
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 */

class RokSprocket_Layout_Features_Tags extends RokSprocket_Layout_Features
{

	protected $tagging = array("all" => "All");

	protected function cleanItemParams()
	{
		foreach ($this->items as $item_id => &$item) {
			$item->setPrimaryImage($this->setupImage($item, 'features_image_default', 'features_image_default_custom', 'features_item_image'));
			$item->setPrimaryLink($this->setupLink($item,'features_link_default','features_link_default_custom', 'features_item_link'));
			$item->setTitle($this->setupText($item,'features_title_default',false,'features_item_title'));
			$item->setText($this->setupText($item,'features_description_default',false,'features_item_description'));

			// resizing images if needed
			if ($item->getPrimaryImage() && $this->parameters->get('features_resize_enable', false)){
				$width = $this->parameters->get('features_resize_width', 0);
				$height = $this->parameters->get('features_resize_height', 0);
				$item->getPrimaryImage()->resize($width, $height);
			}

			// tagging
			$tags = $item->getParam('features_item_tags', false);
			$tags = ($tags ? explode(",", $tags) : array());
			$item->custom_tags = "";

			foreach($tags as $tag){
				$cleanName = trim($tag);
				$key = str_replace(' ', '-', str_replace(array("'", '"'), '', $cleanName));
				$name = $this->_camelize($cleanName, true, true);

				$item->custom_tags .= " sprocket-tags-" . $key;

				if (!array_key_exists($key, $this->tagging)){
					$this->tagging[$key] = $name;
				}
			}

			$item->custom_tags = trim($item->custom_tags);
		}
	}

	public function _camelize($string, $pascalCase = false, $keepSpaces = false){
		$string = str_replace(array('-', '_'), ' ', $string);
		$string = ucwords($string);

		if (!$keepSpaces) $string = str_replace(' ', '', $string);
		if (!$pascalCase) {
			return lcfirst($string);
		}

		return $string;
	}
}
