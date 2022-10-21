import type {StorybookViteConfig} from "@storybook/builder-vite";
import {loadConfigFromFile, mergeConfig} from "vite";
import path from "path"

const config: StorybookViteConfig = {
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-svelte-csf"
    ],
    framework: "@storybook/svelte",
    core: {
        builder: "@storybook/builder-vite"
    },
    features: {
        // On-demand store does not work for .svelte stories, only CSF.
        // Requires all stories to be loaded in bulk.
        // REFERENCE https://storybook.js.org/docs/svelte/configure/overview#feature-flags
        storyStoreV7: false,
        // use own babel config instead of storybook provided one
        babelModeV7: true
    },
    async viteFinal(config, {configType}) {
        const userConfig = await loadConfigFromFile({command: "build", mode: process.env.NODE_ENV || "development"},
            path.resolve(__dirname, "../vite.config.js")
        );
        // return the customized config
        return mergeConfig(config, {
            ...userConfig,
            // customize the Vite config here
            resolve: {
                alias: {
                    $lib: path.resolve(__dirname, '../src/lib'),
                    //  when using typesafe-i18n
                    $i18n: path.resolve(__dirname, "../src/i18n"),
                    $app: path.resolve(__dirname, './sveltekit-mocks/app/')
                },
            },
        });
    },
}

export default config