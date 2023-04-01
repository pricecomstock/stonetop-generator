export const download = (dataUrl: string, filename: string) => {
	const link = document.createElement('a');
	link.href = dataUrl;
	link.download = filename;
	link.click();
};
