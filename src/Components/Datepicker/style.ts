export const popupDatepickerCustomTheme = {
    root: {
        base: "relative",
    },
    popup: {
        root: {
            base: "absolute -top-[50vh] z-50 block pt-2",
            inner: "inline-block rounded-lg bg-white p-4 shadow-lg",
        },
        footer: {
            base: "mt-2 flex space-x-2",
            button: {
                base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
                today: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100",
                clear: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
            }
        }
    },
};