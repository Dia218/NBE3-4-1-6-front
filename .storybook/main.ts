import type { StorybookConfig } from "@storybook/nextjs";
import os from 'os';

const isWindows = os.platform() === 'win32';

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: [
    // 운영 체제에 맞게 경로 자동 설정
    isWindows ? "..\\public" : "../public",
  ],
};

export default config;
