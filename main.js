$(function() {
    var body = $('body');

    var img = $('#pll-image');
    var solution = $('#pll-solution');

    var next = $('#next');
    next.attr('disabled', true);
    var show = $('#show');
    show.attr('disabled', true);
    var hint = $('#hint');
    hint.attr('disabled', true);

    $.get('data.json')
        .then(function(data) {
            var pllCase = null;
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

            showNext();

            ////////////////////

            function showNext() {
                var n = data.length;
                var idx = Math.floor(Math.random() * n);

                pllCase = data[idx];
                img.attr('src', 'img/' + pllCase.name + '.png');
                solution.text('');
                hintPosition = 0;

                next.attr('disabled', false);
                show.attr('disabled', false);
                hint.attr('disabled', false);
            }

            function showSolution() {
                solution.text(pllCase.solution.join(' '));
                show.attr('disabled', true);
                hint.attr('disabled', true);
            }

            function showHint() {
                hintPosition++;
                var partialSolution = pllCase.solution.slice(0, hintPosition);
                solution.text(partialSolution.join(' '));

                if (hintPosition === pllCase.solution.length) {
                    show.attr('disabled', true);
                    hint.attr('disabled', true);
                }
            }
        });
});
