goog.require('entropy.solarsystem.SolarSystem');

goog.provide('entropy');


/*
 * Main function of the program, where everything gets called
 * at the beginning.
 */
entropy.render = function(context) {

	//Play sound
	//jBeep("http://104.131.100.253:6543/static/audio/theme1.wav");
    //var foo = new Sound("http://104.131.100.253:6543/static/audio/Enjoy-the-silence.mp3",100,true);
    //foo.start();

    //Create the menu
    var topMenu = new entropy.menu.MenuTop(context);

	//Load the solar system
	var solarSystem = new entropy.solarsystem.SolarSystem(
        context);

	//Start the renderer
	var renderer = new entropy.renderer.Renderer(solarSystem);

    //Load the solar system menu
    var solarSystemMenu = new entropy.menu.MenuSolarSystem(renderer);

    //Load the keylistener
    var keyListener =
        new entropy.interaction.KeyListener(renderer);

    //Load the domlistener
    var domListener =
        new entropy.interaction.DomListener(renderer);
};
