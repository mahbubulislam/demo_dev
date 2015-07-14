/**
 * Created by Mahbubul on 7/14/2015.
 */
(function($, Drupal)
{
    function showPassBlock()
    {
        $("#block-pop-up-demo-custom-user-pass").fadeIn(300);
    }

    function hidePassBlock()
    {
        $("#block-pop-up-demo-custom-user-pass").fadeOut(300);
    }

    function userPassLinkListener()
    {
        $("a[href*='user/pass']").once("user-pass-link-listener", function()
        {
            $(this).click(function(e)
            {

                e.preventDefault();

                showPassBlock();
            });
        });
    }

    Drupal.behaviors.userPassBlock = {
        attach:function()
        {
            userPassLinkListener();
        }
    };

    // We need to create a custom AJAX command to be used by our AJAX submit
    // in order t hide our form after a successful submission. This will be triggered in
    // step 8 of the tutorial.
    Drupal.ajax.prototype.commands.passThemeHidePassPopup = function()
    {
        hidePassBlock();
    };
}(jQuery, Drupal));