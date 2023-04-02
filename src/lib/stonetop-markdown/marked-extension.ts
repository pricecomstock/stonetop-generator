import { marked as markedInstance, Renderer, Tokenizer } from 'marked';

const defaultRenderer = new Renderer();
export const hooks = {
	postprocess: (html: string) => {
		let processed = html;

		// Convert \check to ▢ with checkbox class
		// Note consuming the following space
		processed = processed.replaceAll(/(\n)?(\\check[0-9]*\s*)/gi, (match) => {
			const number = match.replace(/\D/gi, '');
			const count = parseInt(number ? number[0] : '1');
			const checks = '▢ '.repeat(count).trim();
			return `\n<span class="checkboxes">${checks}</span>`;
		});
		// Inline check marks
		processed = processed.replaceAll(/(\\icheck[0-9]*\s*)/gi, (match) => {
			const number = match.replace(/\D/gi, '');
			const count = parseInt(number ? number[0] : '1');
			const checks = '▢ '.repeat(count).trim();
			return `\n<span class="checkboxes inline-choice">${checks}</span>`;
		});

		// Replace \statframe with a .statframe div, accepting parameters for name, value, and note
		processed = processed.replaceAll(
			/\\statframe\s*{([^}]*)}\s*{([^}]*)}\s*{([^}]*)}/gi,
			(match, p1, p2, p3) => {
				return `<div class="statframe">
	<div class="name">${p1}</div>
	<div class="value">${p2}</div>
	<div class="note">${p3}</div>
</div>`;
			}
		);

		processed = processed.replaceAll(/{{list/gi, "<div class='pseudo-list'>\n");
		processed = processed.replaceAll(/{{checkgroup/gi, "<div class='check-group'>\n");
		processed = processed.replaceAll(/{{indent/gi, "<div class='indented'>\n");
		processed = processed.replaceAll(
			/{{monster/gi,
			'<div class=\'monster\'><img src="img/creature-icon.png">\n'
		);
		processed = processed.replaceAll(/}}/gi, '</div>');

		return processed;
	},

	preprocess: (md: string) => {
		// Convert : to blank div
		let processed = md;

		processed = processed.replaceAll(/(\n)?(\\(prog|hold)[0-9]*)/gi, (match, p1) => {
			const number = match.replace(/\D/gi, '');
			const count = parseInt(number ? number[0] : '1');
			const progress = '◯ '.repeat(count).trim();
			// With shadows: ❍
			const startOfLine = Boolean(p1);
			return startOfLine
				? `<div class="progress">${progress}</div>`
				: `<span class="progress">${progress}</span>`;
		});

		processed = processed.replaceAll(/(\n)?(\\mark[0-9]*) (.+)/gi, (match, p1, p2, p3) => {
			const number = match.replace(/\D/gi, '');
			const count = parseInt(number ? number[0] : '1');
			const mark = '◯ '.repeat(count).trim();
			return `<div class="mark">${p3} <span class="bubbles">${mark}</span></div>`;
		});

		processed = processed.replaceAll(/(\n)?(\\load[0-9]*)/gi, (match, p1) => {
			const number = match.replace(/\D/gi, '');
			const count = parseInt(number ? number[0] : '1');
			const load = '◇'.repeat(count).trim();
			return `<span class="load">${load}</span>`;
		});

		processed = processed.replaceAll(/^(:+)$/gm, (match, p1) => {
			return '<div class="blank"></div>'.repeat(match.length);
		});

		// Add extra newline before \check so it can work like bullets
		processed = processed.replaceAll(/\n\\check/gi, '\n\n\\check');

		// Convert \mm and \gmm to ➤
		processed = processed.replaceAll(/\\mm\s*/gi, '\n<span class="mm-bullet">➤</span>');
		processed = processed.replaceAll(/\\gmm\s*/gi, '\n<span class="mm-bullet">➤</span>');

		return processed;
	}
};

// Rendering overrides
export const renderer = new Renderer();

// Fix for 1d6 headers looking weird in the smallcaps font
renderer.tablecell = (content, flags) => {
	if (flags.header && content.match(/^[0-9]/)) {
		return `<th class="numeric-header" align="right">${content}</th>`;
	}
	return defaultRenderer.tablecell(content, flags);
};

markedInstance.use({
	renderer,
	// @ts-expect-error - marked types are wrong
	hooks,
	extensions: []
});

markedInstance.use({});

export const marked = markedInstance;
