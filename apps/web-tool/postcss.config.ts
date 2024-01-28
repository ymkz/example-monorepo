import { Config } from 'postcss-load-config'

const postcssConfig: Config = {
  plugins: [
    require('postcss-preset-mantine'),
    require('postcss-simple-vars')({
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    }),
  ],
}

export default postcssConfig
