const map = require('lodash/map')
const omit = require('lodash/omit')
const plugin = require('tailwindcss/plugin')

module.exports = plugin(function({ addUtilities, e, theme }) {
  function generateOutlineStyleUtilities() {
    // TODO: Add the option to override these in theme config.
    let styleOptions = [
      'dashed',
      'dotted',
      'double',
      'groove',
      'ridge',
      'solid'
    ]

    return map(styleOptions, option => {
      return {
        [`.outline-${e(option)}`]: {
          outlineStyle: option
        }
      }
    })
  }

  function generateOutlineColorUtilities() {
    return map(theme('colors'), (variants, color) => {
      if (typeof(variants) == 'string') {
        return {
          [`.outline-${color}`]: {
            outlineColor: color
          }
        }
      }

      return map(variants, (value, name) => {
        return {
          [`.outline-${color}-${name}`]: {
            outlineColor: value
          }
        }
      })
    })
  }

  function generateOutlineWidthUtilities() {
    // TODO: Allow for using a 'theme.outline' key
    // and only default to the borderWidths if no
    // specific values have been set.
    let widths = omit(theme('borderWidth'), [0])

    return map(widths, (value, name) => {
      return {
        [`.outline-${name}`]: {
          outlineWidth: value
        }
      }
    })
  }

  addUtilities([
    ...generateOutlineColorUtilities(),
    ...generateOutlineStyleUtilities(),
    ...generateOutlineWidthUtilities()
  ], { variants: ['responsive', 'hover', 'focus']})
})
