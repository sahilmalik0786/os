
tailwind.config = {
    // darkmode:'selector',
      darkMode: ['variant', [
    '@media (prefers-color-scheme: dark) { &:not(.light *) }',
    '&:is(.dark *)',
  ]],
}
