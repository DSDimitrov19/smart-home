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
		{ label: "Devices", href: "/dashboard" },
		{ label: "Notifications", href: "/dashboard/notifications" }
	],
	buttonLinks: [
		{ label: "Start now", href: "/dashboard" },
		{
			label: "Watch Preview",
			href: "/",
			target: "_blank",
			variant: "outline",
		},
	]
};