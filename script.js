///////////////////////////////////////////////
// GLOBAL VARS
var forceView = { // Force default shape or text
  shape: false,
  text: false
}

var tb3 = { // Roland TB-3
  cutoff: 0,
  resonance: 0
}

function gotMIDImessage(messageData) {
  ///////////////////////////////////////////////
  // VARS
  var action = messageData.data[0]; // 144 trigger, 128 Release
  var note = messageData.data[1]; // C3 = 60
  var velocity = messageData.data[2]; // 0 ~ 127
  var bus = messageData.target.name;
  var bus1 = "Gestionnaire IAC Bus 1"; // Kick
  var bus2 = "Gestionnaire IAC Bus 2"; // Closed Hat
  var bus3 = "Gestionnaire IAC Bus 3"; // Voice
  var bus4 = "Gestionnaire IAC Bus 4"; // Acid
  var bus5 = "Gestionnaire IAC Bus 5"; // Reverse Snare
  var busmft = "Midi Fighter Twister";
  var bustb3 = "TB-3";

  ///////////////////////////////////////////////
  // INPUTS LOG
  if(action == 144) {
    //console.log(bus+', Note: '+note+', Velocity: '+velocity);
  }

  ///////////////////////////////////////////////
  // EDIT GLOBAL VARS
  if(bus == bustb3 && note == 74) {
    tb3.cutoff = velocity;
  }

  ///////////////////////////////////////////////
  // SWITCH SHAPES & TEXT
  if(bus == bus5 && action == 128) {
    switchView();
  }

  ///////////////////////////////////////////////
  //🌀 SHAPES ///////////////////////////////////
  ///////////////////////////////////////////////

  ///////////////////////////////////////////////
  // KICK
  if(bus == bus1 && action == 144) {
    $('<div class="kick"></div>').appendTo('body').delay(100).queue(function() { $(this).remove(); });
    document.documentElement.style.setProperty('--square-rotate', Math.random() * 180+'deg');
    document.documentElement.style.setProperty('--square-rotate2', Math.random() * 180+'deg');
  }

  ///////////////////////////////////////////////
  // VORTEX
  if(bus == bus1 && action == 144 && velocity > 0) {
    $('.vortex-item').each(function( index ) {
      var rotate = Math.random() * 180;
      var size = Math.random() * 2 + .5;
      var delta = 0;
      if(tb3.cutoff > 80) {
        delta = (tb3.cutoff - 80) * 3;
      }
      else {
        delta = 0;
      }
      $(this).css('transform', 'rotate('+rotate+'deg) scale('+size+') translate('+delta+'px, '+-delta+'px)');
    });
    var toggle = Math.random();
    if(toggle < 0.015) {
      document.documentElement.style.setProperty('--vortex-border-width', '6px');
      document.documentElement.style.setProperty('--vortex-border-style', 'dashed double none');
      document.documentElement.style.setProperty('--vortex-radius', '50%');
    }
    else if (toggle > 0.985 ) {
      document.documentElement.style.setProperty('--vortex-border-width', '1px');
      document.documentElement.style.setProperty('--vortex-border-style', 'solid');
      document.documentElement.style.setProperty('--vortex-radius', '0');
    }
  }

  ///////////////////////////////////////////////
  // ACID COLOR
  if(bus == bus4 && action == 144) {
    document.documentElement.style.setProperty('--acid-color', 'yellow');
  }

  else if(bus == bus4 && action == 128) {
    document.documentElement.style.setProperty('--acid-color', 'white');
  }

  ///////////////////////////////////////////////
  // DOUBLE SQUARE
  if(bus == busmft & note == 16) {
    var opacity = velocity / 127;
    var size = .5 + 3 * velocity / 127;
    document.documentElement.style.setProperty('--bass-opacity', opacity);
    document.documentElement.style.setProperty('--square-size', size);
  }

  ///////////////////////////////////////////////
  // VOICE BLUR
  if(bus == busmft & note == 23) {
    var blur = (velocity / 127) * 20;
    document.documentElement.style.setProperty('--square-blur', blur+'px');
  }

  ///////////////////////////////////////////////
  // ELLIPSES
  if(bus == bus1 && action == 144) {

    var toggle = Math.random();

    if( toggle > .985 ) {
      document.documentElement.style.setProperty('--atom-color-1', '#FF0000');
      document.documentElement.style.setProperty('--atom-color-2', '#0000FF');
      document.documentElement.style.setProperty('--atom-color-3', '#00FF00');
    }

    else if ( toggle < .015 ) {
      document.documentElement.style.setProperty('--atom-color-1', '#FFFFFF');
      document.documentElement.style.setProperty('--atom-color-2', '#FFFFFF');
      document.documentElement.style.setProperty('--atom-color-3', '#FFFFFF');
    }

    var w1 = Math.random() * 75 + 25;
    var h1 = Math.random() * 75 + 25;
    var r1 = Math.random() * 90;
    var w2 = Math.random() * 75 + 25;
    var h2 = Math.random() * 75 + 25;
    var r2 = Math.random() * 90;
    var w3 = Math.random() * 75 + 25;
    var h3 = Math.random() * 75 + 25;
    var r3 = Math.random() * 90;
    $('.atom div:nth-child(1)').css('width', w1+'%');
    $('.atom div:nth-child(1)').css('height', h1+'%');
    $('.atom div:nth-child(1)').css('transform', 'rotate('+r1+'deg)');
    $('.atom div:nth-child(2)').css('width', w2+'%');
    $('.atom div:nth-child(2)').css('height', h2+'%');
    $('.atom div:nth-child(2)').css('transform', 'rotate('+r2+'deg)');
    $('.atom div:nth-child(3)').css('width', w3+'%');
    $('.atom div:nth-child(3)').css('height', h3+'%');
    $('.atom div:nth-child(3)').css('transform', 'rotate('+r3+'deg)');
  }

  ///////////////////////////////////////////////
  //🔠 TEXT /////////////////////////////////////
  ///////////////////////////////////////////////

  ///////////////////////////////////////////////
  // 60 RIOTS
  if(bus == bus2 && action == 144) {
    $('.name span').removeClass('focus');
    var i = Math.ceil(Math.random() * $('.name span').length);
    $('.name span:nth-child('+i+')').addClass('focus');
  }

  if(bus == bus1 && action == 144) {
    var toggle = Math.random();
    if( toggle > .7 ) {
      var i = Math.floor(Math.random() * 5);
      $('.name').attr('type', i);
    }
  }

  ///////////////////////////////////////////////
  // DIGITS
  if(bus == bus3 && action == 144) {
    var text = "";
    if(note ==  60) { text = "descending"; }
    if(note ==  61) { text = "drowing"; }
    if(note ==  62) { text = "contemplate"; }
    $('.digits').prepend('<span class="voice">'+text+'</span>');
  }

  if(bus == bus2 && action == 144 ) {
    var num = Math.floor(Math.random() * 9);
    $('.digits').prepend(num);
  }
}

function switchView() {
  var shape, text;
  if( forceView.shape === false ) {
    shape = Math.floor(Math.random() * 3);
  }
  else {
    shape = forceView.shape;
  }
  if( forceView.text === false ) {
    text = Math.floor(Math.random() * 2);
  }
  else {
    text = forceView.text;
  }

  console.log(shape)
  $('[shape]').hide();
  $('[shape="'+shape+'"]').show();
  $('[text]').hide();
  $('[text="'+text+'"]').show();
}

$(document).ready(function() {
  switchView();
});
