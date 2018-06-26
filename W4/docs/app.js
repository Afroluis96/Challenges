var aglio = require('aglio');
 
// Render a blueprint with a template by name
var blueprint = '# Some API Blueprint string';
var options = {
  themeVariables: 'default'
};
 
aglio.render(blueprint, options, function (err, html, warnings) {
    if (err) return console.log(err);
    if (warnings) console.log(warnings);
 
    console.log(html);
});
 
// Render a blueprint with a custom template file
/*options = {
  themeTemplate: '/path/to/my-template.jade'
};
aglio.render(blueprint, options, function (err, html, warnings) {
    if (err) return console.log(err);
    if (warnings) console.log(warnings);
 
    console.log(html);
});
 
 
// Pass custom locals along to the template, for example
// the following gives templates access to lodash and async
options = {
    themeTemplate: '/path/to/my-template.jade',
    locals: {
        _: require('lodash'),
        async: require('async')
    }
};
aglio.render(blueprint, options, function (err, html, warnings) {
   if (err) return console.log(err);
   if (warnings) console.log(warnings);
 
   console.log(html);
});*/