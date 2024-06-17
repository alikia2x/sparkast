// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import NotFoundLayout from "./NotFoundLayout.vue";

export default {
    extends: DefaultTheme,
    Layout() {
        return h(DefaultTheme.Layout, null, {
            "not-found": () => h(NotFoundLayout)
        });
    },
    enhanceApp({ app, router, siteData }) {
        // ...
    }
} satisfies Theme;
