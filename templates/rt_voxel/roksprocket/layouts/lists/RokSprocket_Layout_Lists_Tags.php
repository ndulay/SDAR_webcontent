<?php
/**
 * @version   $Id: RokSprocket_Layout_Lists_Tags.php 1771 2012-07-19 10:09:21Z arifin $
 * @author    RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - ${copyright_year} RocketTheme, LLC
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 */

class RokSprocket_Layout_Lists_Tags extends RokSprocket_Layout_Lists
{

	protected $tagging = array("all" => "All");

	protected function cleanItemParams()
	{
		foreach ($this->items as $item_id => &$item) {

			$item->setPrimaryImage($this->setupImage($item, 'lists_image_default', 'lists_image_default_custom', 'lists_item_image'));
			$item->setPrimaryLink($this->setupLink($item,'lists_link_default','lists_link_default_custom', 'lists_item_link'));
			$item->setTitle($this->setupText($item,'lists_title_default',false,'lists_item_title'));
            $item->setText($this->setupText($item,'lists_description_default',false,'lists_item_description'));


			// clean for accordion/non-accordion mode

			$empty_title = !$item->getTitle() || !strlen($item->getTitle());
			if ($empty_title) $item->setTitle('&nbsp;');
			$item->custom_can_show_title = 1;
			$item->custom_can_have_link = 0;

			if (!$this->parameters->get('lists_enable_accordion')){
				if ($empty_title) $item->custom_can_show_title = 0;
			}

			if (!$this->parameters->get('lists_enable_accordion') && $item->getPrimaryLink()){
				$item->custom_can_have_link = 1;
			}

			// clean from tags and limit words amount
			$words_amount = $this->parameters->get('lists_previews_length', 20);
			//$stripped = strip_tags($item->getText());
			$preview = $this->_getWords($item->getText(), $words_amount);

            $append = strlen($item->getText()) != strlen($preview) ? "…" : "";
            $item->setText($preview . $append);

			// resizing images if needed
			if ($item->getPrimaryImage() && $this->parameters->get('lists_resize_enable', false)){
				$width = $this->parameters->get('lists_resize_width', 0);
				$height = $this->parameters->get('lists_resize_height', 0);
				$item->getPrimaryImage()->resize($width, $height);
			}

			// tagging
			$tags = $item->getParam('lists_item_tags', false);
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
