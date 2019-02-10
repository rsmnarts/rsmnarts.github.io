import theme from "../styles/theme";

export const isWideScreen = () => {
	if (typeof windows !== `undefined`) {
		const windowWidth = window.innetWidth;
		const mediaQueryL = theme.mediaQueryTresholds.L;

		return windowWidth >= mediaQueryL;
	}
}

export const timeoutThrottlerHandler = (timeouts, name, delay, handler) => {
	if (!timeouts[name]) {
		timeouts[name] = setTimeout(() => {
			timeouts[name] = null;
			handler();
		}, delay);
	}
}