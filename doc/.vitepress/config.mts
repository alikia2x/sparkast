import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "SparkHome",
    description: "The official documentation of SparkHome",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Home", link: "/" },
            { text: "Examples", link: "/markdown-examples" }
        ],

        sidebar: [
            {
                text: "Examples",
                items: [
                    { text: "Markdown Examples", link: "/markdown-examples" },
                    { text: "Runtime API Examples", link: "/api-examples" }
                ]
            }
        ],

        socialLinks: [{ icon: "github", link: "https://github.com/alikia2x/sparkhome" }],

        logo: "/favicon.ico"
    },
    locales: {
        root: {
            label: "English",
            lang: "en"
        },
        zh: {
            label: "中文",
            lang: "zh-CN",
            link: "/zh/"
        }
    },
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]]
});
