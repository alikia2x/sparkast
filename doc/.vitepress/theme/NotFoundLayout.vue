<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { ref } from 'vue'
const currentLanguage = ref("");
const rootPage = ref("")

const { lang, localeIndex, site } = useData()

if (localeIndex.value === "root") {
    rootPage.value = "/"
} else {
    if (site.value.locales[localeIndex.value].link != undefined) {
        rootPage.value = site.value.locales[localeIndex.value].link
    }
    else {
        rootPage.value = "/" + localeIndex.value + "/"
    }
}
currentLanguage.value = lang.value;

console.log(currentLanguage);

const i18nStrings = {
    "zh-CN": {
        notFoundTitle: "页面未找到",
        notFoundQuote: "抱歉，但我们无法找到对应的页面。",
        notFoundActionLink: "回到主页",
    },
    "en": {
        notFoundTitle: "PAGE NOT FOUND",
        notFoundQuote: "Sorry, the page you are looking for does not exist.",
        notFoundActionLink: "Go Home",
    }
};

const { Layout } = DefaultTheme
</script>

<template>
    <Layout>
        <template #not-found>
            <div class="notFound">
                <p class="NotFoundCode">404</p>
                <h1 class="NotFoundTitle">{{ i18nStrings[currentLanguage].notFoundTitle }}</h1>
                <div class="NotFoundDivider"></div>
                <blockquote class="NotFoundQuote">
                    <p>
                        {{ i18nStrings[currentLanguage].notFoundQuote }}
                    </p>
                </blockquote>
                <div class="NotFoundAction">
                    <a class="NotFoundLink" :href="rootPage" :aria-label="i18nStrings[currentLanguage].notFoundActionLink">
                        {{ i18nStrings[currentLanguage].notFoundActionLink }}
                    </a>
                </div>
            </div>
        </template>
    </Layout>
</template>


<style>
.NotFoundCode {
    font-size: 4rem;
    line-height: 4rem;
    font-weight: 600;
}

.NotFoundTitle {
    padding-top: 12px;
    letter-spacing: 2px;
    line-height: 20px;
    font-size: 20px;
    font-weight: 700;
}

.NotFoundDivider {
    margin: 24px auto 18px;
    width: 64px;
    height: 1px;
    background-color: var(--vp-c-divider);
}

.notFound {
    text-align: center;
    padding: 64px 24px 96px;
}

.NotFoundQuote {
    margin: 0 auto;
    max-width: 256px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(60, 60, 67, .78);
}

.NotFoundLink {
    display: inline-block;
    border: 1px solid var(--vp-c-brand-1);
    border-radius: 16px;
    padding: 3px 16px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-brand-1);
    transition: border-color .25s, color .25s;
}

.NotFoundAction{
    padding-top: 20px;
}

@media (min-width: 768px) {
    .notFound {
        padding: 96px 32px 168px;
    }
}
</style>