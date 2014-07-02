<?php
/**
 * @version   $Id: item.php 490 2012-05-01 04:04:23Z btowles $
 * @author    RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - 2012 RocketTheme, LLC
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 */

/**
 * @var $item RokSprocket_Item
 */
?>

<li class="sprocket-features-index-<?php echo $index . (strlen($item->custom_tags) ? ' '.$item->custom_tags : '');?>">
	<?php
		;
		if (($image = $item->getPrimaryImage())):
	?>
	<div class="sprocket-features-img-container" data-slideshow-image>
		<?php if ($item->getPrimaryLink()) : ?>
			<a href="<?php echo $item->getPrimaryLink()->getUrl(); ?>"><img src="<?php echo $image->getSource(); ?>" alt="" width="<?php echo $image->getWidth();?>" height="<?php echo $image->getHeight();?>" /></a>
		<?php else: ?>
			<img src="<?php echo $image->getSource(); ?>" alt="" width="<?php echo $image->getWidth();?>" height="<?php echo $image->getHeight();?>" />
		<?php endif; ?>
	</div>
	<?php endif; ?>
	<div class="sprocket-features-content" data-slideshow-content>
		<?php if ($parameters->get('features_show_title') && $item->getTitle()) : ?>
			<h2 class="sprocket-features-title">
				<?php echo $item->getTitle(); ?>
			</h2>
		<?php endif; ?>
		<?php if ($parameters->get('features_show_article_text') && ($item->getText() || $item->getPrimaryLink())) : ?>
			<div class="sprocket-features-desc <?php if (strlen($item->custom_tags)) : ?>tag-padding<?php endif; ?>">
				<span class="sprocket-features-desc-text">
					<?php echo $item->getText(); ?>
				</span>
				<?php if ($item->getPrimaryLink()) : ?>
				<a href="<?php echo $item->getPrimaryLink()->getUrl(); ?>" class="sprocket-readmore"><span><?php rc_e('READ_MORE'); ?> +</span></a>
				<?php endif; ?>
				<?php if (strlen($item->custom_tags)) : ?>
					<span class="sprocket-corner-badge"></span>
					<span class="sprocket-badge-icon"></span>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</div>
</li>
