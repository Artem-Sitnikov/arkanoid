
// class Level extends Button {};
function Level (name, img, width, height, map){
    Button.call(this, name, img, width, height);
    this.map = map;

}

Level.prototype = Object.create(Button.prototype);

Level.prototype.samlevel = function(e) {

    this.map = e.target.map;
    this.restart();
    console.log("New Level");
};

var level1Map = [
    "###############",
    "#             #",
    "#             #",
    "#             #",
    "#   ++++$++   #",
    "#  ++.++++++  #",
    "#   +++++++   #",
    "#  ++++*++++  #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#      @      #"
];

var level2Map = [
    "###############",
    "#             #",
    "#             #",
    "#        +    #",
    "#    +        #",
    "#      +      #",
    "#   +         #",
    "#      +  +   #",
    "#             #",
    "#       +     #",
    "#   +         #",
    "#        +    #",
    "# .           #",
    "#    +  +     #",
    "#          *  #",
    "#    +  ++    #",
    "#       +     #",
    "#   +  $      #",
    "#     +   +   #",
    "#             #",
    "#   +   +     #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#             #",
    "#          +  #",
    "#             #",
    "#             #",
    "#      @      #"
];

