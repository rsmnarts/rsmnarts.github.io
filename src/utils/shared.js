import { forceCheck } from "react-lazyload";

export const featureNavigator = e => {
	const { 
		navigatorPosition, setNavigatorPosition, setNavigatorShape,
		isWideScreen
	} = this.props;

	e && e.preventDefault();

	if (navigatorPosition === "is-aside") {
		if (isWideScreen) {
			setNavigatorPosition("moving-featured");
			setTimeout(() => {
				setNavigatorPosition("resizing-featured");
				setTimeout(() => {
					setNavigatorPosition("is-featured");
					setNavigatorShape("open")
				});
			}, 300);
		} else {
			setTimeout(() => {
				setNavigatorPosition("is-featured");
			}, 0);
		}
	}
}

export const moveNavigatorAside = e => {
	const { 
		navigatorPosition, setNavigatorPosition, setNavigatorShape,
		isWideScreen
	} = this.props;
	const target = e ? e.currentTarget : null;
	const dataShape = target ? target.getAttribute("data-shape") : null;
	const navigatorShape = dataShape ? dataShape : "open";

	if (navigatorPosition === "is-featured") {
		if (isWideScreen) {
			setNavigatorPosition("moving-aside");

			setTimeout(() => {
				if (typeof window !== `undefined`) {
					setNavigatorPosition("resizing-aside");
					setNavigatorShape(navigatorShape);
					setTimeout(() => {
						setNavigatorPosition("is-aside");
						setTimeout(forceCheck, 600);
					});
				}
			}, 1000);
		} else {
			setTimeout(() => {
				setNavigatorPosition("is-aside");
			}, 100);
		}
	}
}