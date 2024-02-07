type Link = {
	label: string;
	href: string;
	target?: "_blank";
	variant?: "link" | "default" | "outline";
};

type SiteConfig = {
	name: string;
	background: string
	navLinks: Link[]
	buttonLinks: Link[]
};

export const siteConfig: SiteConfig = {
	name: "Smart Home",
	background: "background.jpeg",
	navLinks: [
		{ label: "Guides", href: "/" },
		{ label: "Rules", href: "/" },
		{ label: "Donate", href: "/" },
		{ label: "Content Creators", href: "/" },
	],
	buttonLinks: [
		{ label: "Start now", href: "/" },
		{
			label: "Watch Preview",
			href: "/",
			target: "_blank",
			variant: "outline",
		},
	]
};