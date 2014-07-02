<?php
/**
 * @version   $Id: item.php 656 2012-05-02 18:35:49Z kevin $
 * @author    RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - ${copyright_year} RocketTheme, LLC
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 */

/**
 * @var $item RokSprocket_Item
 */

$class = (!$parameters->get('lists_enable_accordion') || $index == 0) ? 'active' : '';
$class .= strlen($item->custom_tags) ? ' '.$item->custom_tags : '';
$class = (strlen($class)) ? 'class="'.$class.'"' : '';

?>
<li <?php echo $class; ?> data-lists-item>
	<?php if ($item->custom_can_show_title): ?>
	<h4 class="sprocket-lists-title<?php if ($parameters->get('lists_enable_accordion')): ?> padding<?php endif; ?>" data-lists-toggler>
		<span>
		<?php if ($item->custom_can_have_link): ?><a href="<?php echo $item->getPrimaryLink()->getUrl(); ?>"><?php endif; ?>
			<?php echo $item->getTitle();?>
		<?php if ($item->custom_can_have_link): ?></a><?php endif; ?>
		<?php if ($parameters->get('lists_enable_accordion')): ?><span class="indicator"><span></span></span><?php endif; ?>
		</span>
	</h4>
	<?php endif; ?>
	<div class="sprocket-lists-item" data-lists-content>
		<div class="sprocket-padding <?php if (strlen($item->custom_tags)) : ?>tags-padding<?php endif; ?>">
			<?php if ($item->getPrimaryImage()) :?>
			<img src="<?php echo $item->getPrimaryImage()->getSource(); ?>" alt="" class="sprocket-lists-image" />
			<?php endif; ?>
			<?php echo $item->getText(); ?>
			<?php if ($item->getPrimaryLink()) : ?>
			<a href="<?php echo $item->getPrimaryLink()->getUrl(); ?>" class="sprocket-readmore"><span><?php rc_e('READ_MORE'); ?> +</span></a>
			<?php endif; ?>
		</div>
	</div>
	<div class="clear"></div>
	<?php if (strlen($item->custom_tags)) : ?>
		<span class="sprocket-corner-badge"></span>
		<span class="sprocket-badge-icon"></span>
	<?php endif; ?>
</li>

