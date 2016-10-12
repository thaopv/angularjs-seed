;(function() {
	'use strict';

	angular.module('myapp').factory('/services/string-helper', [
		'@lodash',
		'/data/config',
		function(_, config) {
			return {
				splitByCharacters: function(string, characters) {
					if (!string) {
						return;
					}

					var tokens = string.split(new RegExp(characters.join('|'), 'g'));
					return _.remove(tokens, function(val) {
						return (typeof val === 'string' && !!val);
					});
				},
				spitByCharacter: function(string, character) {
					if (!string) {
						return;
					}

					return _.remove(string.split(character), function(val) {
						return (typeof val === 'string' && !!val);
					});
				},
				joinToString: function(array, character) {
					if (!array) {
						return;
					}

					return array.join(character);
				},
				removeSpecials: function(character) {
					if (!character) {
						return character;
					}

					return character.replace(config.validation.specials, '');
				},
				standardSpaces: function(character) {
					if (!character) {
						return character;
					}

					return character.replace(config.validation.spaces, ' ');
				},
				hasSpecials: function(character) {
					return config.validation.specials.test(character);
				},
			};
		},
	]);
})();
