var step = 'pll';
$(function() {

  var body = $('body');

  var img = $('#image');
  var solution = $('#solution');

  var next = $('#next');
  next.attr('disabled', true);
  var show = $('#show');
  show.attr('disabled', true);
  var hint = $('#hint');
  hint.attr('disabled', true);

  var stepOll = $('#step-oll');
  var stepPll = $('#step-pll');

  axios.get('data.json')
    .then(function(result) {
      var data = result.data;

      var position = null;
      var hintPosition = -1;

      next.click(showNext);
      show.click(showSolution);
      hint.click(showHint);

      body.on('keypress', function(evt) {
        var code = evt.which;
        var key = String.fromCharCode(code).toUpperCase();

        if (key === 'N') showNext();
        if (key === 'S') showSolution();
        if (key === 'H') showHint();
      });

      stepOll.on('change', function () {
        step = 'oll';
        showNext();
      })
      stepPll.on('change', function () {
        step = 'pll';
        showNext();
      })

      showNext();

      ////////////////////

      function showNext() {
        var n = data[step].length;
        var idx = Math.floor(Math.random() * n);

        position = data[step][idx];
        img.attr('src', 'img/' + step + '/' + position.name + '.png');
        solution.text('');
        hintPosition = 0;

        next.attr('disabled', false);
        show.attr('disabled', false);
        hint.attr('disabled', false);
      }

      function showSolution() {
        solution.text(position.solution.join(' '));
        show.attr('disabled', true);
        hint.attr('disabled', true);
      }

      function showHint() {
        hintPosition++;
        var partialSolution = position.solution.slice(0, hintPosition);
        solution.text(partialSolution.join(' '));

        if (hintPosition === position.solution.length) {
          show.attr('disabled', true);
          hint.attr('disabled', true);
        }
      }
    });
});
