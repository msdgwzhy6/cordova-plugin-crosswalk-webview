module.exports = function(context) {

  var ConfigParser, XmlHelpers;
  try {
      ConfigParser = context.requireCordovaModule("cordova-lib/src/configparser/ConfigParser");
      XmlHelpers = context.requireCordovaModule("cordova-lib/src/util/xml-helpers");
  } catch (e) {
      // cordova-lib >= 5.3.4 doesn't contain ConfigParser and xml-helpers anymore
      ConfigParser = context.requireCordovaModule("cordova-common").ConfigParser;
      XmlHelpers = context.requireCordovaModule("cordova-common").xmlHelpers;
  }

  /** @external */
  var fs = context.requireCordovaModule('fs'),
      path = context.requireCordovaModule('path'),
      et = context.requireCordovaModule('elementtree');
       
  /** @defaults */   
  var pluginCopyFile = path.join(context.opts.plugin.dir, 'res','xwalk_app_strings.xml'), 
      androidPlatformDir = path.join(context.opts.projectRoot,
            'platforms', 'android'),
      resTarget = path.join(androidPlatformDir,'res'),
      zhTaget = path.join(resTarget,'values-zh-rCN');
      
  if (!fs.existsSync(zhTaget)){
    fs.mkdirSync(zhTaget);
  }
  
  var copyTarget = path.join(zhTaget,'xwalk_app_strings.xml')
      
  /** Init */
  var projectResXml = XmlHelpers.parseElementtreeSync(pluginCopyFile);
  
  fs.writeFileSync(copyTarget, projectResXml.write({indent: 4}), 'utf-8');
};
