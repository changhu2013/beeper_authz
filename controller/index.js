

var fs = require('fs'),
	_  = require('lodash');

/**
 * 获取所有文件
 */
function _get_all_files(dir_name, all_files){

	_.each(fs.readdirSync(dir_name), function(file_name){

		var path = dir_name + '/' + file_name;

		if(fs.lstatSync(path).isDirectory()){
			_get_all_files(path, all_files);
		}else {
			all_files.push(path);
		}
	});

	return all_files;
};

var files = _get_all_files(__dirname, []);

_.each(files, function(file){

	var action = file.replace(__dirname + '/', '').replace('.js', ''),
		controller = require(file);

	for(var func_name in controller){
		var func = controller[func_name];

		if(_.isFunction(func)){
			module.exports[action + (func_name === 'index' ? '' : '/' + func_name)] = func;
		}
	}
});
