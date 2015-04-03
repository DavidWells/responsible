module.exports = function (config) {
  config.set({
    basePath : '',
    autoWatch : true,
    frameworks: ['jasmine'],
    browsers : ['Chrome'],
    plugins : [
      'karma-spec-reporter',
      'karma-phantomjs-launcher',
      "karma-chrome-launcher",
      'karma-jasmine'
    ],
    /*files: [
        {pattern: './demo/css/*.css', included: true},
    ],*/
    reporters : ['spec']
  });
};
