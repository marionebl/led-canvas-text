var LedCanvasMatrix = require('led-canvas-matrix');

class LedCanvasText{
	constructor(str, font, ledFactory) {
		let matrices = [];

		str.split('').forEach((character) => {
			var fontCharacter = font.chars[character];
			let lineHeight = font.meta.lineHeight;

			if (! fontCharacter ) {
				return matrices.push(new LedCanvasMatrix(0, 0, 4, lineHeight, ledFactory));
			}

			let charWidth = fontCharacter.width || font.meta.charWidth;
			let pixelOffset = fontCharacter.offset || 0;

			let matrix = new LedCanvasMatrix(0, 0, charWidth, lineHeight, ledFactory);

			fontCharacter.data.forEach(function(pixel){
				matrix.index(pixel + pixelOffset).set(true);
			});

			matrices.push(matrix);
			matrices.push(new LedCanvasMatrix(0, 0, font.meta.charSpacing, lineHeight, ledFactory));
		});

		return matrices.reduce(function(base, next){
			return base.add(next);
		});
	}
}

module.exports = LedCanvasText;
